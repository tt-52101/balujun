import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '@app/app-routing.module';

import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { AbpModule } from '@abp/abp.module';
import { LayoutModule } from '@layout/layout.module';
import { ImpersonationService } from '@shared/auth';
import { NotificationsComponent } from './notifications/notifications.component';
import { UserNotificationHelper } from '@shared/helpers/UserNotificationHelper';
import { AppSharedModule } from './app-shared/app-shared.module';
import { QuillModule } from 'ngx-quill'


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    SharedModule,
    AbpModule,
    QuillModule.forRoot(),
    AppSharedModule.forRoot()
  ],
  declarations: [NotificationsComponent],
  entryComponents: [],
  providers: [ImpersonationService, UserNotificationHelper]
})
export class AppModule {}
