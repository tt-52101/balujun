import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndividualTicket } from './individual-ticket.component';
import { GroupBooking } from './group-booking.component';





const routes: Routes = [{
	path: '',
	children: [
		{ path: 'Individual-ticket', component: IndividualTicket, data: { title: '散客售票' } },
		{ path: 'group-booking', component: GroupBooking, data: { title: '团体售票' } },
	]
}, ];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class tickeTRoutingModule {}

