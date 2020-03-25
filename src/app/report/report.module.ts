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
  CreateOrEditSalerdailyTaoComponent
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
    CreateOrEditSalerdailyTaoComponent

  ]
})

export class ReportModule {}