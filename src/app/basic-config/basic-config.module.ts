import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { BasicConfigRoutingModule } from './basic-config-routing.module';

import { BranchComponent } from './branch.component';
import { BranchUserComponent } from './branch-user.component';
import { DateDictionaryComponent } from './date-dictionary.component';
import { PayMethodComponent } from './pay-method.component';

import { AppVersionComponent } from './appversion.component';

import { CreateOrEditBranchComponent } from './create-or-edit-branch/create-or-edit-branch.component';
import { CreateOrEditBranchUserComponent } from './create-or-edit-branch-user/create-or-edit-branch-user.component';
import { CreateOrEditDateDictionaryComponent } from './create-or-edit-date-dictionary/create-or-edit-date-dictionary.component';
import { CreateOrEditPayMethodComponent } from './create-or-edit-pay-method/create-or-edit-pay-method.component';

import { CreateOrEditAppVersionComponent } from './create-or-edit-app-version/create-or-edit-app-version.component';


@NgModule({
  declarations: [
  BranchComponent,
  BranchUserComponent,
  DateDictionaryComponent,
  PayMethodComponent,
  AppVersionComponent,
  CreateOrEditBranchComponent,
  CreateOrEditBranchUserComponent,
  CreateOrEditDateDictionaryComponent,
  CreateOrEditPayMethodComponent,
  CreateOrEditAppVersionComponent,
  ],
  imports: [
  CommonModule,
  BasicConfigRoutingModule,
  SharedModule,
  ],
  entryComponents: [
  CreateOrEditBranchComponent,
  CreateOrEditBranchUserComponent,
  CreateOrEditDateDictionaryComponent,
  CreateOrEditPayMethodComponent,
  CreateOrEditAppVersionComponent,

  ]
})

export class BasicConfigModule {}