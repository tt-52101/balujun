import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { TouristInformation } from './tourist-Information.component';
import { GroupInformation } from './group-information.component';
import { Conductor } from './conductor.component';

import { CustomerlnfoRoutingModule } from './customer-info-routing.module';
import { CreateOrEditTouristInformationComponent } from './create-or-edit-tourist-information/create-or-edit-tourist-information.component';
import { CreateOrEditGroupInformationComponent } from './create-or-edit-group-information/create-or-edit-group-information.component';
import { CreateOrEditConductorComponent } from './create-or-edit-conductor/create-or-edit-conductor.component';


@NgModule({
  declarations: [
    TouristInformation,
    GroupInformation,
    Conductor,
    CreateOrEditTouristInformationComponent,
    CreateOrEditGroupInformationComponent,
    CreateOrEditConductorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CustomerlnfoRoutingModule
  ],
  entryComponents: [
    CreateOrEditTouristInformationComponent,
    CreateOrEditGroupInformationComponent,
    CreateOrEditConductorComponent
  ]
})

export class Customerlnfo {}
