import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { OrganisationlnfoRoutingModule } from './organisation-structure-routing.module';
import { BranchComponent } from './branch.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';

import { CreateOrEditBranchComponent } from './create-or-edit-branch/create-or-edit-branch.component';
import { CreateOrEditRoleComponent } from './roles/create-or-edit-role/create-or-edit-role.component';
import { CreateOrEditPowerRoleComponent } from './roles/create-or-edit-power-role/create-or-edit-power-role.component';
import { CreateOrEditUserComponent } from './users/create-or-edit-user/create-or-edit-user.component';

@NgModule({
  declarations: [
    BranchComponent,
    RolesComponent,
    UsersComponent,


    CreateOrEditBranchComponent,
    CreateOrEditRoleComponent,
    CreateOrEditPowerRoleComponent,
    CreateOrEditUserComponent,
   
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganisationlnfoRoutingModule
  ],
  entryComponents: [
    CreateOrEditBranchComponent,
    CreateOrEditRoleComponent,
    CreateOrEditPowerRoleComponent,
    CreateOrEditUserComponent,
  ]
})

export class organisationStructure {}
