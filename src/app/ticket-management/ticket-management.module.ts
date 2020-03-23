import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { tickeTRoutingModule } from './ticket-management-routing.module';

import { SharedModule } from '@shared/shared.module';
import { IndividualTicket } from './individual-ticket.component';
import { GroupBooking } from './group-booking.component';

import { CreateOrEditTicketComponent } from './create-or-edit-ticket/create-or-edit-ticket.component';


@NgModule({
  declarations: [
    IndividualTicket,
    GroupBooking,
    CreateOrEditTicketComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    tickeTRoutingModule

  ],
  entryComponents: [
    CreateOrEditTicketComponent
  ]
})

export class TicketManagement {}
