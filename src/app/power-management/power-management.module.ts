import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerManagementRoutingModule } from './power-management-routing.module';
import { MenuComponent } from './menu/menu.component';
import { CreateOrEditMenuComponent } from './menu/create-or-edit-menu/create-or-edit-menu.component';
import { PowerComponent } from './power/power.component';
import { CreateOrEditPowerComponent } from './power/create-or-edit-power/create-or-edit-power.component';
import { BatchCreatePowerComponent } from './power/batch-create-power/batch-create-power.component';
// import { PowerRoleComponent } from './power-role/power-role.component';
// import { CreateOrEditPowerRoleComponent } from './power-role/create-or-edit-power-role/create-or-edit-power-role.component';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
  MenuComponent,
  CreateOrEditMenuComponent,
  PowerComponent,
  CreateOrEditPowerComponent,
  BatchCreatePowerComponent,
  // PowerRoleComponent,
  // CreateOrEditPowerRoleComponent
  ],
  imports: [
  CommonModule,
  PowerManagementRoutingModule,
  SharedModule,
  ],
  entryComponents: [
  CreateOrEditMenuComponent,
  CreateOrEditPowerComponent,
  BatchCreatePowerComponent,
  // CreateOrEditPowerRoleComponent
  ]
})
export class PowerManagementModule {}
