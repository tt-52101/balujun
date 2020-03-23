import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { TravelManagementRoutingModule } from './travel-management-routing.module';

import { TravelAgencyComponent } from './travel-agency.component';
import { RechargeRecordComponent } from './recharge-record.component';
import { TravelTicketDetailComponent } from './travel-ticket-detail.component';

import { CreateOrEditTravelAgencyComponent } from './create-or-edit-travel-agency/create-or-edit-travel-agency.component';
import { CreateOrEditRechargeRecordComponent } from './create-or-edit-recharge-record/create-or-edit-recharge-record.component';
import { CreateOrEditTravelTicketDetailComponent } from './create-or-edit-travel-ticket-detail/create-or-edit-travel-ticket-detail.component';


@NgModule({
  declarations: [
    TravelAgencyComponent,
    CreateOrEditTravelAgencyComponent,
    RechargeRecordComponent,
    CreateOrEditRechargeRecordComponent,
    TravelTicketDetailComponent,
    CreateOrEditTravelTicketDetailComponent,
  ],
  imports: [
    CommonModule,
    TravelManagementRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    CreateOrEditTravelAgencyComponent,
    CreateOrEditRechargeRecordComponent,
    CreateOrEditTravelTicketDetailComponent,
  ]
})
export class TravelManagementModule {}
