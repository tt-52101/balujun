import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ReportRoutingModule } from './report-routing.module';

import { SalerTicketComponent } from './salerticket/salerticket.component';
import { SalerDailyComponent } from './salerdaily/salerdaily.component';
import { PayMethodComponent } from './paymethod/paymethod.component';
import { GroupComponent } from './group/group.component';
import { CreateOrEditSalerdailyComponent } from './salerdaily/create-or-edit-salerdaily/create-or-edit-salerdaily.component';
import { CreateOrEditSalerdailyTaoComponent } from './salerdaily/create-or-edit-salerdaily/create-or-edit-salerdaily-tao/create-or-edit-salerdaily-tao.component';
import { CreateOrEditSalerticketComponent } from './salerticket/create-or-edit-salerticket/create-or-edit-salerticket.component';
import { CreateOrEditSalerticketTaoComponent } from './salerticket/create-or-edit-salerticket/create-or-edit-salerticket-tao/create-or-edit-salerticket-tao.component';
import { CreateOrEditGroupComponent } from './group/create-or-edit-group/create-or-edit-group.component';

// import { SourceComponent } from './source/source.component';
// import { TravelComponent, } from './travel/travel.component';
// import { OtaComponent } from './ota/ota.component';



@NgModule({
  declarations: [

  SalerTicketComponent,
  SalerDailyComponent,
  PayMethodComponent,
  GroupComponent,
  CreateOrEditSalerdailyComponent,
  CreateOrEditSalerdailyTaoComponent,
  CreateOrEditSalerticketComponent,
  CreateOrEditSalerticketTaoComponent,
  CreateOrEditGroupComponent,
  // SourceComponent,
  // TravelComponent,
  // OtaComponent,



  ],
  imports: [
  CommonModule,
  ReportRoutingModule,
  SharedModule,
  
  ],
  entryComponents: [
    CreateOrEditSalerdailyComponent,
    CreateOrEditSalerdailyTaoComponent,
    CreateOrEditSalerticketComponent,
    CreateOrEditSalerticketTaoComponent,
    CreateOrEditGroupComponent

  ]
})

export class ReportModule {}