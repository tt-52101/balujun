import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GuestdisplayComponent } from './guestdisplay.component';


@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        children: [
          { path: 'guestdisplay', component: GuestdisplayComponent  ,data: { title: '客显界面' }},

        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class GuestRoutingModule { }
