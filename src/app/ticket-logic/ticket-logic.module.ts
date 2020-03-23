import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';



import { TicketLogicRoutingModule } from './ticket-logic-routing.module';

import { AccountComponent } from './account.component';
import { AccountDetailComponent } from './account-detail.component';
import { ActivityComponent } from './activity.component';
import { ActivityDetailComponent } from './activity-detail.component';
import { ActivityTempDetailComponent } from './activity-temp-detail.component';
import { TicketComponent } from './ticket.component';
import { TicketDetailComponent } from './ticket-detail.component';
import { TicketDetailHistoryComponent } from './ticket-detail-history.component';
import { TicketIntroduceComponent } from './ticket-introduce.component';
import { TicketPriceComponent } from './ticket-price.component';
import { TicketStationComponent } from './ticket-station.component';
// import { TicketStationEnableComponent } from './ticket-station-enable.component';
// import { TicketUserEnableComponent } from './ticket-user-enable.component';

import { ScenicSpotComponent } from './scenic-spot.component';
import { CollectComponent } from './collect.component';


import { CreateOrEditAccountComponent } from './create-or-edit-account/create-or-edit-account.component';
import { CreateOrEditAccountDetailComponent } from './create-or-edit-account-detail/create-or-edit-account-detail.component';
import { CreateOrEditActivityComponent } from './create-or-edit-activity/create-or-edit-activity.component';
import { CreateOrEditActivityDetailComponent } from './create-or-edit-activity-detail/create-or-edit-activity-detail.component';
import { CreateOrEditActivityTempDetailComponent } from './create-or-edit-activity-temp-detail/create-or-edit-activity-temp-detail.component';
import { CreateOrEditTicketComponent } from './create-or-edit-ticket/create-or-edit-ticket.component';
import { CreateOrEditTicketDetailComponent } from './create-or-edit-ticket-detail/create-or-edit-ticket-detail.component';
import { CreateOrEditTicketDetailHistoryComponent } from './create-or-edit-ticket-detail-history/create-or-edit-ticket-detail-history.component';
import { CreateOrEditTicketIntroduceComponent } from './create-or-edit-ticket-introduce/create-or-edit-ticket-introduce.component';
import { CreateOrEditTicketPriceComponent } from './create-or-edit-ticket-price/create-or-edit-ticket-price.component';
import { CreateOrEditTicketStationComponent } from './create-or-edit-ticket-station/create-or-edit-ticket-station.component';


import { CreateOrEditScenicSpotComponent } from './create-or-edit-scenic-spot/create-or-edit-scenic-spot.component';

import { Datezone } from '../common/datezone.pipe';

@NgModule({
  imports: [
  CommonModule,
  TicketLogicRoutingModule,
  SharedModule,
  
  ],

  declarations: [
  Datezone,

  AccountComponent,
  AccountDetailComponent,
  ActivityComponent,
  ActivityDetailComponent,
  ActivityTempDetailComponent,
  TicketComponent,
  TicketDetailComponent,
  TicketDetailHistoryComponent,
  TicketIntroduceComponent,
  TicketPriceComponent,
  TicketStationComponent,


  ScenicSpotComponent,
  CollectComponent,

  CreateOrEditAccountComponent,
  CreateOrEditAccountDetailComponent,
  CreateOrEditActivityComponent,
  CreateOrEditActivityDetailComponent,
  CreateOrEditActivityTempDetailComponent,
  CreateOrEditTicketComponent,
  CreateOrEditTicketDetailComponent,
  CreateOrEditTicketDetailHistoryComponent,
  CreateOrEditTicketIntroduceComponent,
  CreateOrEditTicketPriceComponent,
  CreateOrEditTicketStationComponent,


  CreateOrEditScenicSpotComponent,

  ],
  entryComponents: [
  CreateOrEditAccountComponent,
  CreateOrEditAccountDetailComponent,
  CreateOrEditActivityComponent,
  CreateOrEditActivityDetailComponent,
  CreateOrEditActivityTempDetailComponent,
  CreateOrEditTicketComponent,
  CreateOrEditTicketDetailComponent,
  CreateOrEditTicketDetailHistoryComponent,
  CreateOrEditTicketIntroduceComponent,
  CreateOrEditTicketPriceComponent,
  CreateOrEditTicketStationComponent,


  CreateOrEditScenicSpotComponent,

  ]
})


export class TicketLogicModule {}