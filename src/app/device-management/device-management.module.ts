import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { DeviceManagementRoutingModule } from './device-management-routing.module';

import { DeviceComponent } from './device.component';
import { GateRecordComponent } from './gate-record.component';
import { VerifiableSetComponent } from './verifiable-set.component';

import { CreateOrEditDeviceComponent } from './create-or-edit-device/create-or-edit-device.component';
import { CreateOrEditGateRecordComponent } from './create-or-edit-gate-record/create-or-edit-gate-record.component';
import { CreateOrEditVerifiableSetComponent } from './create-or-edit-verifiable-set/create-or-edit-verifiable-set.component';

@NgModule({
  declarations: [
    DeviceComponent,
    GateRecordComponent,
    VerifiableSetComponent,
    CreateOrEditDeviceComponent,
    CreateOrEditGateRecordComponent,
    CreateOrEditVerifiableSetComponent
  ],
  imports: [
    CommonModule,
    DeviceManagementRoutingModule,
    SharedModule,
  ],
  entryComponents: [
    CreateOrEditDeviceComponent,
    CreateOrEditGateRecordComponent,
    CreateOrEditVerifiableSetComponent,
  ]
})

export class DeviceManagementModule {}
