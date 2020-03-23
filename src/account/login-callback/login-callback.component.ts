import { Component, OnInit, Injector, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExternalAuthenticateModel } from '@shared/service-proxies/service-proxies';
import { LoginService } from 'account/login/login.service';
import { AppComponentBase } from '@shared/component-base';
import { UrlHelper } from '@shared/helpers/UrlHelper';
import { LoadingService } from '@shared/utils/global-loading/loading.service';

@Component({
  templateUrl: './login-callback.component.html',
  styles: []
})
export class LoginCallbackComponent extends AppComponentBase implements OnInit {

  constructor(private _route: ActivatedRoute,
    injector: Injector,
    private _loginService: LoginService) {
    super(injector);
  }

  ngOnInit() {
    let providerName = UrlHelper.getQueryParameters().providerName;
    if (providerName) {
      this._loginService.initExternalLoginProviders(() => {
        let selectedProvider = this._loginService.externalLoginProviders.find(x => x.name === providerName);
        this._loginService.externalAuthenticate(selectedProvider);
      })
    }
  }
}
