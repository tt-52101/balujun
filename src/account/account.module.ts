import { ForgotPasswordComponent } from './passwords/forgot-password.component';
import { CommonModule } from '@angular/common';
import { NgModule, NgZone } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AccountRoutingModule } from './account-routing.module';

import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';

import { SharedModule } from '@shared/shared.module';

import { AccountComponent } from './account.component';
import { TenantChangeComponent } from './tenant/tenant-change.component';
import { TenantChangeModalComponent } from './tenant/tenant-change-modal.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AccountLanguagesComponent } from './account-languages/account-languages.component';

import { LoginService } from './login/login.service';
import { NgZorroAntdModule, NzModalService } from 'ng-zorro-antd';
import { AbpModule } from '@abp/abp.module';
import { ResetPasswordComponent } from './passwords/reset-password.component';
import { TenantRegisterComponent } from './tenant-register/tenant-register.component';
import { CaptchaComponent } from './component/captcha/captcha.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginCallbackComponent } from './login-callback/login-callback.component';
import { ActivationComponent } from './activation/activation.component';
import { TokenAuthServiceProxy } from '../shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { UtilsService } from 'abp-ng2-module/dist/src/utils/utils.service';
import { MessageService } from 'abp-ng2-module/dist/src/message/message.service';
import { TokenService } from 'abp-ng2-module/dist/src/auth/token.service';
import { LogService } from 'abp-ng2-module/dist/src/log/log.service';
import { SocialLoginModule, AuthServiceConfig, AuthService } from "angularx-social-login";
// import { GoogleLoginProvider, FacebookLoginProvider } from "angularx-social-login";
import { environment } from '../environments/environment';


const authService = new AuthService(new AuthServiceConfig(
  [
//   {
//     id: GoogleLoginProvider.PROVIDER_ID,
//     provider: new GoogleLoginProvider(environment.externalLogin.google.clientId, {
//       redirect_uri: environment.externalLogin.redirectUri,
//     })
//   },
//   {
//     id: FacebookLoginProvider.PROVIDER_ID,
//     provider: new FacebookLoginProvider(environment.externalLogin.facebook.appId, {
//       redirect_uri: environment.externalLogin.redirectUri
//     })
//   },
]
));

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    SharedModule,
    AbpModule,
    SocialLoginModule,
    // CommonModule,
    // FormsModule,

    // NgZorroAntdModule,
    // AbpModule,
    // SharedModule,
    // ServiceProxyModule,
    AccountRoutingModule
  ],
  declarations: [
    AccountComponent,
    TenantChangeComponent,
    TenantChangeModalComponent,
    LoginComponent,
    LoginCallbackComponent,
    RegisterComponent,
    AccountLanguagesComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    TenantRegisterComponent,
    CaptchaComponent,
    ActivationComponent
  ],
  providers: [
    {
      provide: LoginService,
      useFactory: (
        tokenAuthService,
        router,
        zone,
        utilsService,
        messageService,
        tokenService,
        logService,
        modalService,
      ) =>
        new LoginService(
          tokenAuthService,
          router,
          zone,
          utilsService,
          messageService,
          tokenService,
          logService,
          modalService,
          authService,
        ),
      deps: [
        TokenAuthServiceProxy,
        Router,
        NgZone,
        UtilsService,
        MessageService,
        TokenService,
        LogService,
        NzModalService,
      ]
    }
  ],
  entryComponents: [TenantChangeModalComponent]
})
export class AccountModule { }
