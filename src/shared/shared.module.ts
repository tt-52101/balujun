import { CustomComponentModule } from '@shared/components/custom-components.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { AbpModule } from '@abp/abp.module';
import { RouterModule } from '@angular/router';

import { AppSessionService } from '@shared/session/app-session.service';
import { AppUrlService } from '@shared/nav/app-url.service';
import { AppAuthService } from '@shared/auth/app-auth.service';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';

// region: third libs
import {
  NgZorroAntdModule,
  NzSpinModule,
  NzSpinComponent
} from 'ng-zorro-antd';
import { CountdownModule } from 'ngx-countdown';

/**
 * 第三方的一些组件模块
 */
const THIRDMODULES = [
  NgZorroAntdModule,
  CountdownModule,
  CustomComponentModule,
  DirectivesModule,
  NzSpinModule,
  OverlayModule
];

import { DelonABCModule } from '@delon/abc';
import { DelonFormModule } from '@delon/form';
import { AlainThemeModule } from '@delon/theme';

// endregion
import { DelonChartModule } from '@delon/chart';
import { DelonACLModule } from '@delon/acl';
import { PermissionService } from './auth';
import { DirectivesModule } from './directives/directives.module';
import {
  FileDownloadService,
  TreeDataHelperService,
  ArrayToTreeConverterService
} from './utils';
import { MomentFromNowPipe } from './utils/moment-from-now.pipe';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptor } from './utils/global-loading/loading.interceptor';
import { OverlayModule } from '@angular/cdk/overlay';
import { OverlayComponent } from './utils/global-loading/overlay/overlay.component';

@NgModule({
  imports: [
    CommonModule,
    AbpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    AlainThemeModule.forChild(),
    DelonABCModule,
    DelonACLModule,
    DelonChartModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES
  ],
  declarations: [MomentFromNowPipe, OverlayComponent],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlainThemeModule,
    DelonABCModule,
    DelonACLModule,
    DelonChartModule,
    DelonFormModule,
    // third libs
    ...THIRDMODULES,
    MomentFromNowPipe
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true
    }
  ],
  entryComponents: [OverlayComponent]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AppSessionService,
        AppUrlService,
        AppAuthService,
        AppRouteGuard,
        FileDownloadService,
        TreeDataHelperService,
        ArrayToTreeConverterService,
        PermissionService
      ]
    };
  }
}
