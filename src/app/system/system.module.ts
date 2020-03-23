import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { SystemRoutingModule } from './system-routing.module';

import { CheckRecordComponent } from './check-record.component';

import { CreateOrEditCheckRecordComponent } from './create-or-edit-check-record/create-or-edit-check-record.component';


@NgModule({
  declarations: [
    CheckRecordComponent,
    CreateOrEditCheckRecordComponent,
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    CreateOrEditCheckRecordComponent
  ]
})
export class SystemModule {}


//system 

//System
