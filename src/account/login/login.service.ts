import { Injectable, FactoryProvider, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import {
  ExternalLoginProviderInfoModel,
  ExternalAuthenticateModel,
  ExternalAuthenticateResultModel,UserLoginInfoDto
} from '@shared/service-proxies/service-proxies';

// import { AppSessionService } from '@shared/session/app-session.service';

import {
  TokenAuthServiceProxy,
  AuthenticateModel,
  AuthenticateResultModel
} from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppConsts } from 'abpPro/AppConsts';

import * as _ from 'lodash';
import { UtilsService } from '@abp/utils/utils.service';
import { MessageService } from '@abp/message/message.service';
import { LogService } from '@abp/log/log.service';
import { TokenService } from '@abp/auth/token.service';
import { environment } from '@env/environment';
import { ScriptLoaderService } from '@shared/utils/script-loader.service';
import { html } from 'lit-html';
import { NzModalService } from 'ng-zorro-antd';
import { HttpClient } from '@angular/common/http';
import { UserAgentApplication } from 'msal';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

declare global {
  export const QC: {
    Login: {
      showPopup: (oOpts: { appId: string; redirectURI: string }) => void;
      check(): boolean;
      getMe(callback: (openId: string, accessToken: string) => void);
    } & ((
      options: {
        btnId: string;
        showModal: boolean;
        scope: string;
        size: 'A_XL' | 'A_L' | 'A_M' | 'A_S' | 'B_M' | 'B_S' | 'C_S';
      },
      loginFun: Function,
      logoutFun: Function,
      outCallBackFun: Function
      ) => void);
  };

  export class WxLogin {
    constructor(param: {
      self_redirect?: boolean;
      id: string;
      appid: string;
      scope: string;
      redirect_uri: string;
      state?: string;
      style?: string;
      href?: string;
    });
  }
}

export class ExternalLoginProvider extends ExternalLoginProviderInfoModel {

  static readonly QQ: string = 'QQ';
  static readonly Wechat: string = 'Wechat';
  static readonly Microsoft: string = 'Microsoft';


  icon: string;
  initialized = false;

  constructor(
    providerInfo: ExternalLoginProviderInfoModel,

    ) {
    super();

    this.name = providerInfo.name;
    this.clientId = providerInfo.clientId;
    this.additionalParams = providerInfo.additionalParams;
    this.icon = ExternalLoginProvider.getSocialIcon(this.name);
  }

  private static getSocialIcon(providerName: string): string {
    providerName = providerName.toLowerCase();

    if (providerName === 'google') {
      providerName = 'google-plus';
    }

    if (providerName === 'microsoft') {
      providerName = 'windows';
    }

    return providerName;
  }
}

@Injectable()
export class LoginService {
  static readonly twoFactorRememberClientTokenName =
  'TwoFactorRememberClientToken';

  authenticateModel: AuthenticateModel = new AuthenticateModel();
  authenticateResult: AuthenticateResultModel;
  externalLoginProviders: ExternalLoginProvider[] = [];
  rememberMe: boolean;

  constructor(
    private _tokenAuthService: TokenAuthServiceProxy,
    private _router: Router,
    public zone: NgZone,
    private _utilsService: UtilsService,
    private _messageService: MessageService,
    private _tokenService: TokenService,
    private _logService: LogService,
    private _modalService: NzModalService,
    private authService: AuthService,
    // private _sessionService: AppSessionService
    ) { }

  authenticate(
    finallyCallback?: (success: boolean) => void,
    redirectUrl?: string
    ): void {
    finallyCallback = finallyCallback || ((success: boolean) => { });

    let success = false;
    this._tokenAuthService
    .authenticate(this.authenticateModel)
    .finally(() => {
      finallyCallback(success);
    })
    .subscribe(result => {
      success = true;
      this.processAuthenticateResult(result, redirectUrl);
    });
  }

  async externalAuthenticate(provider: ExternalLoginProvider): Promise<void> {
    await this.ensureExternalLoginProviderInitialized(provider, async () => {
      const queryParams = UrlHelper.getQueryParametersUsingHash();
    });
  }
  standardLoginCallback(user: SocialUser, provider: string): any {
    const model = new ExternalAuthenticateModel();
    model.authProvider = provider;
    model.providerAccessCode = user.authToken;
    model.providerKey = user.id;
    // model.singleSignIn = UrlHelper.getSingleSignIn();

    this._tokenAuthService
    .externalAuthenticate(model)
    .subscribe((result: ExternalAuthenticateResultModel) => {
      if (result.waitingForActivation) {
        this._router.navigate(['account/activation'], {
          state: result
        });
        return;
      }

      this.login(
        result.accessToken,
        result.encryptedAccessToken,
        result.expireInSeconds
        );
    });
  }


  async initExternalLoginProviders(callback?: Function) {
    // const providers = await this._tokenAuthService
    // .getExternalAuthenticationProviders()
    // .toPromise();
    // this.externalLoginProviders = _.map(
    //   providers,
    //   p => new ExternalLoginProvider(p)
    //   );

    // if (callback) {
    //   callback();
    // }
  }
  async ensureExternalLoginProviderInitialized(
    loginProvider: ExternalLoginProvider,
    callback: () => void
    ) {

    if (loginProvider && loginProvider.initialized) {
      callback();
      return;
    }
  }

  private processAuthenticateResult(
    authenticateResult: AuthenticateResultModel,
    redirectUrl?: string
    ) {
    if (authenticateResult.shouldResetPassword) {
      // 需要重置密码
      this._router.navigate(['account/reset-password'], {
        queryParams: {
          userId: authenticateResult.userId,
          tenantId: abp.session.tenantId,
          resetCode: authenticateResult.passwordResetCode
        }
      });
    }
    if (authenticateResult.waitingForActivation) {
      this._router.navigate(['account/activation'], {
        state: authenticateResult
      });
    } else if (authenticateResult.accessToken) {
      // Successfully logged in
      // tslint:disable-next-line:max-line-length
      this.login(
        authenticateResult.accessToken,
        authenticateResult.encryptedAccessToken,
        authenticateResult.expireInSeconds,
        this.rememberMe
        );
    } else {
      // Unexpected result!

      this._logService.warn('Unexpected authenticateResult!');
      this._router.navigate(['account/login']);
    }
  }

  private login(
    accessToken: string,
    encryptedAccessToken: string,
    expireInSeconds: number,
    rememberMe?: boolean,
    twoFactorRememberClientToken?: string,
    redirectUrl?: string
    ): void {
    const tokenExpireDate = rememberMe
    ? new Date(new Date().getTime() + 1000 * expireInSeconds)
    : undefined;

    this._tokenService.setToken(accessToken, tokenExpireDate);

    this._utilsService.setCookieValue(
      AppConsts.authorization.encrptedAuthTokenName,
      encryptedAccessToken,
      tokenExpireDate,
      abp.appPath
      );

    // console.log(this._sessionService._user)
    // this._sessionService._user=new UserLoginInfoDto()
    

    let initialUrl = UrlHelper.initialUrl;


    if (initialUrl.indexOf('/login') > 0) {
      initialUrl = AppConsts.appBaseUrl;
    }
    // http://localhost:8000/#/app/power-management/power

    // console.log(initialUrl)
    location.href = initialUrl;
    // window.history.forward()

  }
}
