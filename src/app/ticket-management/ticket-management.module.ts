import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tickeTRoutingModule } from './ticket-management-routing.module';

import { SharedModule } from '@shared/shared.module';
import { IndividualTicket } from './individual-ticket.component';
import { GroupBooking } from './group-booking.component';

import { ResaleSingle } from './resalesingle/resalesingle.component';
import { ResaleGroup } from './resalegroup/resalegroup.component';

import { CheckTicket } from './checkticket/checkticket.component';


import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';
import { CreateOrEditMemberComponent } from './create-or-edit-member/create-or-edit-member.component';


@NgModule({
  declarations: [
    IndividualTicket,
    GroupBooking,
    ResaleSingle,
    ResaleGroup,
    CheckTicket,
    CreateOrEditCustomerComponent,
    CreateOrEditMemberComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    tickeTRoutingModule

  ],
  entryComponents: [
    CreateOrEditCustomerComponent,
    CreateOrEditMemberComponent
  ]
})

export class TicketManagement {}
