import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TravelAgencyComponent } from './travel-agency.component';
import { RechargeRecordComponent } from './recharge-record.component';
import { TravelTicketDetailComponent } from './travel-ticket-detail.component';


const routes: Routes = [{
  path: '',
  children: [
    { path: 'travel-agency', component: TravelAgencyComponent, data: { title: '旅行社信息管理' } },
    { path: 'recharge-record', component: RechargeRecordComponent, data: { title: '旅行社充值管理' } },
    { path: 'travel-ticket-detail', component: TravelTicketDetailComponent, data: { title: '旅行社购票明细' } },
  ]
}, ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TravelManagementRoutingModule {}
