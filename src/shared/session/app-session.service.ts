import { Injectable } from '@angular/core';
import {
  SessionServiceProxy,
  UserLoginInfoDto,
  TenantLoginInfoDto,
  ApplicationInfoDto,
  GetCurrentLoginInformationsOutput,
} from '@shared/service-proxies/service-proxies';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';

@Injectable()
export class AppSessionService {
  private _user: UserLoginInfoDto;
  private _tenant: TenantLoginInfoDto;
  private _application: ApplicationInfoDto;

  constructor(
    private _sessionService: SessionServiceProxy,
    private _abpMultiTenancyService: AbpMultiTenancyService,
    ) { }

  get application(): ApplicationInfoDto {
    return this._application;
  }

  get user(): UserLoginInfoDto {
    // console.log(this._user)
    return this._user;
  }

  get userId(): number {
    return this.user ? this.user.id : null;
  }

  get tenant(): TenantLoginInfoDto {
    return this._tenant;
  }

  get tenantId(): number {
    return this.tenant ? this.tenant.id : null;
  }

  getShownLoginName(): string {
    const userName = this._user.userName;
    if (!this._abpMultiTenancyService.isEnabled) {
      return userName;
    }

    return (this._tenant ? this._tenant.tenancyName + '\\' : '') + userName;
  }

  init(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this._sessionService.getCurrentLoginInformations()
      .toPromise()
      .then(
        (result: GetCurrentLoginInformationsOutput) => {
          // console.log(result)
          this._application = result.application;
          this._user = result.user;
          this._tenant = result.tenant;

          resolve(true);
        },
        err => {
          // console.log(err)
          reject(err);
        },
        );
    });
    
    // this._sessionService.getCurrentLoginInformations()
    // .toPromise()
    // .then(
    //   (result: GetCurrentLoginInformationsOutput) => {
    //     console.log(result)
    //     this._application = result.application;
    //     this._user = result.user;
    //     this._tenant = result.tenant;


    //   },
    //   err => {
    //     console.log(err)
    //   },
    //   );
  }



  changeTenantIfNeeded(tenantId?: number): boolean {
    if (this.isCurrentTenant(tenantId)) {
      return false;
    }

    abp.multiTenancy.setTenantIdCookie(tenantId);
    location.reload();
    return true;
  }

  get session(): SessionServiceProxy {
    return this._sessionService;
  }

  private isCurrentTenant(tenantId?: number) {
    if (!tenantId && this.tenant) {
      return false;
    } else if (tenantId && (!this.tenant || this.tenant.id !== tenantId)) {
      return false;
    }

    return true;
  }


}
