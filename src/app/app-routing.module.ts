import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { LayoutDefaultComponent } from '@layout/default/layout-default.component';
import { NotificationsComponent } from './notifications/notifications.component';

const routes: Routes = [{
  path: '',
  component: LayoutDefaultComponent,
  canActivate: [AppRouteGuard],
  canActivateChild: [AppRouteGuard],
  children: [
  {
    path: 'main',
    loadChildren: 'app/main/main.module#MainModule',
    data: { preload: true }
  },

  {
    path: 'ticket-logic',
    loadChildren: 'app/ticket-logic/ticket-logic.module#TicketLogicModule',
    data: { preload: true }
  },

  {
    path: 'sell-management',
    loadChildren: 'app/sell-management/sell-management.module#SellManagementModule',
    data: { preload: true }
  },

  {
    path: 'report',
    loadChildren: 'app/report/report.module#ReportModule',
    data: { preload: true }
  },


  {
    path: 'travel-management',
    loadChildren: 'app/travel-management/travel-management.module#TravelManagementModule',
    data: { preload: true }
  },

  {
    path: 'device-management',
    loadChildren: 'app/device-management/device-management.module#DeviceManagementModule',
    data: { preload: true }
  },

  {
    path: 'admin',
    loadChildren: 'app/admin/admin.module#AdminModule',
    data: { preload: true }
  },

  {
    path: 'system',
    loadChildren: 'app/system/system.module#SystemModule',
    data: { preload: true }
  },

  {
    path: 'basic-config',
    loadChildren: 'app/basic-config/basic-config.module#BasicConfigModule',
    data: { preload: true }
  },

  {
    path: 'power-management',
    loadChildren: 'app/power-management/power-management.module#PowerManagementModule',
    data: { preload: true }
  },
  {
    path: 'customer-info',
    loadChildren: 'app/customer-info/customer-info.module#Customerlnfo',
    data: { preload: true }
  },
  {
    path: 'organisation-structure',
    loadChildren: 'app/organisation-structure/organisation-structure.module#organisationStructure',
    data: { preload: true }
  },
  {
    path: 'ticket-management',
    loadChildren: 'app/ticket-management/ticket-management.module#TicketManagement',
    data: { preload: true }
  },

  {
    path: 'wechat',
    loadChildren: 'app/wechat/wechat.module#WeChatModule',
    data: { preload: true }
  }




  // {
    //   path: 'notifications',
    //   component: NotificationsComponent,
    //   data: { titleI18n: 'Notifications', reuse: true }
    // },
    // {
      //   path: 'wechat',
      //   loadChildren: 'app/wechat-management/wechat-management.module#WechatManagementModule',
      //   data: { preload: true }
      // },
      // {
        //   path: 'demo',
        //   loadChildren: 'app/demo-management/demo-management.module#DemoManagementModule',
        //   data: { preload: true }
        // }

        // {
          //   path: '**',
          //   redirectTo: 'main',
          // },
          ]
        }];

        @NgModule({
          imports: [RouterModule.forChild(routes)],
          exports: [RouterModule]
        })
        export class AppRoutingModule {}
