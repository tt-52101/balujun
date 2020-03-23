import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellTicketsComponent } from './selltickets/selltickets.component';
import { InternetTicketComponent } from './internetticket/internetticket.component';
import { RefundTicketComponent } from './refundticket/refundticket.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
{
	path: '',
	children: [
	{ path: 'selltickets', component: SellTicketsComponent ,data: { title: '航班售票' } },
	{ path: 'internetticket', component: InternetTicketComponent ,data: { title: '网络取票' } },
	{ path: 'refundticket', component: RefundTicketComponent ,data: { title: '退票管理' } },
	{ path: 'customer', component: CustomerComponent ,data: { title: '游客信息管理' } },
	// {
	// 	path: '**',
	// 	redirectTo: 'selltickets'
	// }
	]
}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class SellManagementRoutingModule {}
