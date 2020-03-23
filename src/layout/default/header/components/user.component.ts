import { AppComponentBase } from '@shared/component-base/app-component-base';
import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { ChangePasswordModalComponent } from '@layout/default/profile/change-password-modal.component';
import { LoginAttemptsModalComponent } from '@layout/default/profile/login-attempts-modal.component';
import { MySettingsModalComponent } from '@layout/default/profile/my-settings-modal.component';
import { ImpersonationService } from '@shared/auth';
import { AppSessionService } from '@shared/session/app-session.service';

@Component({
  selector: 'header-user',
  template: `
    <div
      class="alain-pro__nav-item d-flex align-items-center px-sm"
      nz-dropdown
      nzPlacement="bottomRight"
      [nzDropdownMenu]="dropdownMenu"
    >
      <nz-avatar
        [nzSrc]="'/assets/images/user.png'"
        nzSize="small"
        class="mr-sm"
      ></nz-avatar>
      {{ loginUserName }}
    </div>

    <nz-dropdown-menu #dropdownMenu="nzDropdownMenu">
      <div nz-menu class="width-sm">
        <!-- 返回我的账户 -->
        <div
          nz-menu-item
          (click)="backToMyAccount()"
          *ngIf="isImpersonatedLogin"
        >
          <i nz-icon nzType="rollback"></i>
          {{ l('BackToMyAccount') }}
        </div>
        <!-- 密码修改 -->
        <!--<div nz-menu-item (click)="changePassword()">
          <i nz-icon nzType="ellipsis"></i>
          {{ l('ChangePassword') }}
        </div>-->
        <!-- 登陆记录 -->
        <!--<div nz-menu-item (click)="showLoginAttempts()">
          <i nz-icon nzType="bars"></i>
          {{ l('LoginAttempts') }}
        </div>-->
        <!-- 设置 -->
        <!--<div nz-menu-item (click)="changeMySettings()">
          <i nz-icon nzType="setting"></i>
          {{ l('MySettings') }}
        </div>-->
        <!--<li nz-menu-divider></li>-->
        <!-- 注销 -->
        <div nz-menu-item (click)="logout()">
          <i nz-icon nzType="logout"></i>
          {{ l('Logout') }}
        </div>
      </div>
    </nz-dropdown-menu>
  `
})
export class HeaderUserComponent extends AppComponentBase implements OnInit {
  loginUserName: string;
  isImpersonatedLogin: boolean;

  constructor(
    injector: Injector,
    private authService: AppAuthService,
    private impersonationService: ImpersonationService
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.isImpersonatedLogin = this.abpSession.impersonatorUserId > 0;
    this.loginUserName = this.appSession.getShownLoginName();
  }

  changePassword(): void {
    this.modalHelper.open(ChangePasswordModalComponent).subscribe(result => {
      if (result) {
        this.logout();
      }
    });
  }

  showLoginAttempts(): void {
    this.modalHelper.open(LoginAttemptsModalComponent).subscribe(result => {});
  }

  changeMySettings(): void {
    this.modalHelper.open(MySettingsModalComponent).subscribe(result => {});
  }

  backToMyAccount(): void {
    this.impersonationService.backToImpersonator();
  }
  logout(): void {
    this.authService.logout();
  }
}
