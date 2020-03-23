import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/component-base';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AuthenticateResultModel,
  TokenAuthServiceProxy,
  ActivateAccountModel,
  ActivateType,
  AuthenticateModel
} from '@shared/service-proxies/service-proxies';
import { AppCaptchaType } from 'abpPro/AppEnums';
import { CaptchaComponent } from 'account/component/captcha/captcha.component';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { LoginService } from 'account/login/login.service';

@Component({
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.less'],
  animations: [appModuleAnimation()]
})
export class ActivationComponent extends AppComponentBase implements OnInit {
  ActivateType = ActivateType;
  public model: ActivateAccountModel & { passwordConfirm?: string };
  private loginResult: AuthenticateResultModel;
  constructor(
    injector: Injector,
    private _router: Router,
    private _tokenAuthServiceProxy: TokenAuthServiceProxy,
    private _loginService: LoginService,

    private _activatedRoute: ActivatedRoute
    ) {
    super(injector);
  }
  @ViewChild(CaptchaComponent, { static: false }) captcha: CaptchaComponent;
  /**
   * 是否使用验证码
   */
   get useCaptcha(): boolean {
     return this.setting.getBoolean('App.UseCaptchaOnUserRegistration');
   }

  /**
   * 如果使用验证码,获取长度
   */
   get captchaLength(): number {
     return this.setting.getInt('App.CaptchaOnUserRegistrationLength');
   }

  /**
   * 验证码类型
   */
   get captchaType(): number {
     return AppCaptchaType.TenantUserRegister;
     // if (this.appSession.tenantId) {
       //   return AppCaptchaType.TenantUserRegister;
       // } else {
         //   return AppCaptchaType.HostUserLogin;
         // }
       }
       async ngOnInit() {
         this.titleSrvice.setTitle(this.l('ActivateAccount'));
         this._activatedRoute.paramMap.subscribe(async _ => {
           this.loginResult = window.history.state;
           this.model = new ActivateAccountModel({
             password: undefined,
             verificationCode: undefined,
             emailAddress: undefined,
             activateType: ActivateType.NewAccount,
             userId: this.loginResult.userId.toString()
           });
           this.loginResult.waitingForActivation = true;
           if (!this.loginResult.waitingForActivation) {
             this._router.navigate(['account/login']);
           }
         });
       }

       onKey(e: KeyboardEvent): any {
         if (e.key === 'Tab') {
           this.captcha.initImg();
         }
       }
       toggleActivateType() {
         if (this.model.activateType === ActivateType.NewAccount) {
           this.model.activateType = ActivateType.BindExistAccount;
         } else {
           this.model.activateType = ActivateType.NewAccount;
         }
       }
       async activateAccount() {
         let res = await this._tokenAuthServiceProxy
         .activateAccount(this.model)
         .toPromise();

         this._loginService.authenticateModel = new AuthenticateModel({
           ...res,
           ...this.model,
           rememberClient: false,
           returnUrl: undefined,
          //  sourceCode:'Reception',
           userNameOrEmailAddress: this.model.emailAddress
         });

         console.log(this._loginService.authenticateModel)

         this._loginService.authenticate((success: boolean) => {
           if (!success && this.useCaptcha) {
             // 登陆失败,刷新验证码
             this.captcha.clearimg();
           }
         });
       }
     }
