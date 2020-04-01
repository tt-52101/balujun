import { Component, Injector, ViewChild, OnInit } from '@angular/core';

import { LoginService, ExternalLoginProvider } from './login.service';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { AbpSessionService } from '@abp/session/abp-session.service';
import {
  SessionServiceProxy,
  UpdateUserSignInTokenOutput
} from '@shared/service-proxies/service-proxies';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { AppCaptchaType } from 'abpPro/AppEnums';
import { CaptchaComponent } from 'account/component/captcha/captcha.component';
import { AppConsts } from 'abpPro/AppConsts';

import { AppSessionService } from '@shared/session/app-session.service';

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  animations: [appModuleAnimation()]
})
export class LoginComponent extends AppComponentBase implements OnInit {
  submitting = false;
  hidepwd=true;

  changepwd():void{
    this.hidepwd=!this.hidepwd
  }


  // 是否启用验证码
  isEnabledVerification: boolean;
  verificationImgUrl = '../assets/images/captcha.png';

  /**
   * 是否已选中租户
   */
   get multiTenancySideIsTeanant(): boolean {
     return this.appSession.tenantId > 0;
   }

  /**
   * 允许注册租户
   */
   get isTenantSelfRegistrationAllowed(): boolean {
     if (this.appSession.tenantId) {
       return false;
     }
     return this.setting.getBoolean('App.Host.AllowSelfRegistration');
   }

   get isMultiTenancyEnabled(): boolean {
     return abp.multiTenancy.isEnabled;
   }

  /**
   * 允许注册用户
   */
   get isSelfRegistrationAllowed(): boolean {
     if (!this.appSession.tenantId) {
       return false;
     }
     return this.setting.getBoolean('App.AllowSelfRegistrationUser');
   }

  /**
   * 是否使用登陆验证码
   */
   get useCaptcha(): boolean {
     return this.setting.getBoolean('App.UseCaptchaOnUserLogin');
   }

  /**
   * 激活的三方登陆类型
   */
   get enabledExternalLoginTypes(): string[] {
     return JSON.parse(
       this.setting.get('App.UserManagement.ExternalLoginProviders')
       );
   }

  /**
   * 如果使用验证码,获取长度
   */
   get captchaLength(): number {
     return this.setting.getInt('App.CaptchaOnUserLoginLength');
   }

  /**
   * 验证码类型
   */
   get captchaType(): number {
     if (this.appSession.tenantId) {
       return AppCaptchaType.TenantUserLogin;
     } else {
       return AppCaptchaType.HostUserLogin;
     }
   }

   // 验证码组件
   @ViewChild(CaptchaComponent, { static: false }) captcha: CaptchaComponent;

   constructor(
     injector: Injector,
     public loginService: LoginService,
     private _abpSessionService: AbpSessionService,
     private _sessionAppService: SessionServiceProxy,
     private _sessionService: AppSessionService
     ) {
     super(injector);
   }

   async ngOnInit() {
     await this.loginService.initExternalLoginProviders();

     // this.titleSrvice.setTitle(this.l('LogIn'));

     if (this._abpSessionService.userId > 0 && UrlHelper.getReturnUrl()) {
       this._sessionAppService
       .updateUserSignInToken()
       .subscribe((result: UpdateUserSignInTokenOutput) => {
         const initialReturnUrl = UrlHelper.getReturnUrl();
         const returnUrl =
         initialReturnUrl +
         (initialReturnUrl.indexOf('?') >= 0 ? '&' : '?') +
         'accessToken=' +
         result.signInToken +
         '&userId=' +
         result.encodedUserId +
         '&tenantId=' +
         result.encodedTenantId;

         location.href = returnUrl;
       });
     }
   }

   getCaptchaType(): number {
     if (this.appSession.tenantId) {
       return AppCaptchaType.TenantUserLogin;
     } else {
       return AppCaptchaType.HostUserLogin;
     }
   }

   login(): void {
     this.submitting = true;
     // console.log(this.loginService.authenticateModel)
     // this.loginService.authenticateModel.sourceCode=''
     this.loginService.authenticate((success: boolean) => {
       console.log(success)
       if (!success) {
         // 登陆失败,刷新验证码
         this.clearimg();
       }

       this._sessionService.init()
       // console.log(this._sessionService,new Date().getTime())
       this.submitting = false;
     });
   }

   async externalLogin(provider: ExternalLoginProvider) {
     await this.loginService.externalAuthenticate(provider);
   }

   //#region 验证码功能
   onKey(e: KeyboardEvent): any {
     if (e.key === 'Tab') {
       this.initImg();
     }
   }
   initImg(): void {
     const userName = this.loginService.authenticateModel.userNameOrEmailAddress;
     if (!userName || userName === '' || this.verificationImgUrl !== '../assets/images/captcha.png') {
       return;
     }
     this.clearimg();
   }


   clearimg(): void {
     const userName = this.loginService.authenticateModel.userNameOrEmailAddress;
     if (!userName || userName === '') {
       // 未输入账号
       return;
     }

     let tid: any = this.appSession.tenantId;
     if (!tid) {
       tid = '';
     }
     const timestamp = new Date().getTime();

     this.verificationImgUrl =
     AppConsts.remoteServiceBaseUrl +
     '/api/TokenAuth/GenerateVerification' +
     '?name=' +
     userName +
     '&tid=' +
     tid +
     '&t=' +
     timestamp;
   }

   //#endregion
 }
