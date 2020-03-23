import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { ReportRoutingModule } from './report-routing.module';

import { SalerTicketComponent } from './salerticket/salerticket.component';
import { SalerDailyComponent } from './salerdaily/salerdaily.component';
import { PayMethodComponent } from './paymethod/paymethod.component';
// import { SourceComponent } from './source/source.component';
// import { TravelComponent, } from './travel/travel.component';
// import { OtaComponent } from './ota/ota.component';



@NgModule({
  declarations: [

  SalerTicketComponent,
  SalerDailyComponent,
  PayMethodComponent,
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


  ]
})

export class ReportModule {}