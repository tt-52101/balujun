import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TryRoutingModule } from './try-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@shared/shared.module';

import { AbpModule } from '@abp/abp.module';


import { TestComponent } from './test/test.component';
import { CreateOrEditComponent } from './test/create-or-edit/create-or-edit.component';


import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    TryRoutingModule,
    SharedModule,
    AbpModule,
    QuillModule
  ],
  declarations: [
    TestComponent,
    CreateOrEditComponent
  ],
  entryComponents: [
    CreateOrEditComponent
  ],
  providers: []
})
export class TryModule {}
