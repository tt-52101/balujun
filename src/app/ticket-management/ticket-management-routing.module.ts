import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndividualTicket } from './individual-ticket.component';
import { GroupBooking } from './group-booking.component';


import { ResaleSingle } from './resalesingle/resalesingle.component';
import { ResaleGroup } from './resalegroup/resalegroup.component';

import { CheckTicket } from './checkticket/checkticket.component';

const routes: Routes = [{
	path: '',
	children: [
	{ path: 'Individual-ticket', component: IndividualTicket, data: { title: '散客售票' } },
	{ path: 'group-booking', component: GroupBooking, data: { title: '团体售票' } },

	{ path: 'resalesingle', component: ResaleSingle, data: { title: '散客售票补录' } },
	{ path: 'resalegroup', component: ResaleGroup, data: { title: '团体售票补录' } },

	{ path: 'checkticket', component: CheckTicket, data: { title: '手工验票' } },

	{
		path: '**',
		redirectTo: 'Individual-ticket'
	}
	]
}, ];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class tickeTRoutingModule {}

