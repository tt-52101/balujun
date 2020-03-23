import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuestRoutingModule } from 'guest/guest-routing.module';

import { SharedModule } from '@shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

import { AbpModule } from '@abp/abp.module';

import { GuestdisplayComponent } from './guestdisplay.component';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    GuestRoutingModule,

    SharedModule,
    AbpModule,

  ],
  declarations: [GuestdisplayComponent],
  entryComponents: [],
  providers: []
})
export class GuestModule {}
