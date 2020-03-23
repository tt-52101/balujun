import { Injectable } from '@angular/core';

import { AppSessionService } from '@shared/session/app-session.service';

import { Observable } from "rxjs/Rx";

import {
  SessionServiceProxy,
  GetCurrentLoginInformationsOutput
} from '@shared/service-proxies/service-proxies';

import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild
} from '@angular/router';
import { PermissionService } from './permission.service';

@Injectable()
export class AppRouteGuard implements CanActivate, CanActivateChild {
  constructor(
    private _permissionChecker: PermissionService,
    private _router: Router,
    private _sessionService: AppSessionService,
    private sessionService: SessionServiceProxy,
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> {

    return this.check()
  }

  check(): Observable<boolean>{
    return new Observable<boolean>((obserber) => {
      this.sessionService.getCurrentLoginInformations()
      .subscribe(
        (result: GetCurrentLoginInformationsOutput) => {
          // console.log(result)
          if(result.user){
            obserber.next(true)
          }
          else{
            this._router.navigate(['/account/login']);
            obserber.next(false)
          }
          obserber.complete();
        }
        );
    })
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  selectBestRoute(): string {
    // if (!this._sessionService.user) {
      //   return '/account/login';
      // }

      // if (this._permissionChecker.isGranted('Pages.Users')) {
        //   return '/app/admin/users';
        // }

        return '/app/home';
      }
    }
