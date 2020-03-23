import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from '@app/admin/users/users.component';
import { RolesComponent } from '@app/admin/roles/roles.component';
import { AuditLogsComponent } from '@app/admin/audit-logs/audit-logs.component';
import { MaintenanceComponent } from '@app/admin/maintenance/maintenance.component';
import { HostSettingsComponent } from '@app/admin/host-settings/host-settings.component';
import { EditionsComponent } from '@app/admin/editions/editions.component';
import { LanguagesComponent } from '@app/admin/languages/languages.component';
import { LanguageTextsComponent } from '@app/admin/language-texts/language-texts.component';
import { TenantsComponent } from '@app/admin/tenants/tenants.component';

import { SubscriptionManagementComponent } from '@app/admin/subscription-management/subscription-management.component';
import { TenantSettingsComponent } from '@app/admin/tenant-settings/tenant-settings.component';
// import { HangfireComponent } from './hangfire/hangfire.component';

import { LoginLogsComponent } from '@app/admin/login-logs/login-logs.component';

const routes: Routes = [
  { path: 'users', component: UsersComponent ,data: { title: '用户管理' }},
  { path: 'roles', component: RolesComponent ,data: { title: '角色管理' }},
  { path: 'auditLogs', component: AuditLogsComponent,data: { title: '操作日志' } },
  { path: 'loginLogs', component: LoginLogsComponent,data: { title: '登录日志' } },


  { path: 'maintenance', component: MaintenanceComponent },
  { path: 'host-settings', component: HostSettingsComponent },
  { path: 'editions', component: EditionsComponent },
  { path: 'languages', component: LanguagesComponent },
  { path: 'languagetexts', component: LanguageTextsComponent },
  { path: 'tenants', component: TenantsComponent },
  {
    path: 'subscription-management',
    component: SubscriptionManagementComponent
  },
  { path: 'tenant-settings', component: TenantSettingsComponent },
  // {
  //   path: 'hangfire',
  //   component: HangfireComponent,
  //   data: { title: '调度管理' }
  // },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
