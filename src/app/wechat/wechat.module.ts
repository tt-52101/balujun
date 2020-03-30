import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { WeChatRoutingModule } from './wechat-routing.module';

import { ScenicSpotComponent } from './scenic-spot/scenic-spot.component';

import { CreateOrEditScenicSpotComponent } from './scenic-spot/create-or-edit-scenic-spot/create-or-edit-scenic-spot.component';



@NgModule({
  declarations: [
  ScenicSpotComponent,

  CreateOrEditScenicSpotComponent,

  ],
  imports: [
  CommonModule,
  WeChatRoutingModule,
  SharedModule,
  ],
  entryComponents: [
  CreateOrEditScenicSpotComponent,


  ]
})

export class WeChatModule {}