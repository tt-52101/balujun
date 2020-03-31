import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalerTicketComponent } from './salerticket/salerticket.component';
import { SalerDailyComponent } from './salerdaily/salerdaily.component';
import { PayMethodComponent } from './paymethod/paymethod.component';
import { GroupComponent } from './group/group.component';
import { SourceComponent } from './source/source.component';
import { TicketComponent, } from './ticket/ticket.component';
// import { OtaComponent } from './ota/ota.component';


const routes: Routes = [{
	path: '',
	children: [
	{ path: 'salerticket', component: SalerTicketComponent, data: { title: '销售员售票统计' } },
	{ path: 'salerdaily', component: SalerDailyComponent, data: { title: '销售员日结统计' } },
	{ path: 'ticket', component: TicketComponent, data: { title: '票型销售统计' } },
	{ path: 'paymethod', component: PayMethodComponent, data: { title: '支付方式统计' } },
	{ path: 'group', component: GroupComponent, data: { title: '团体售票统计' } },
	{ path: 'source', component: SourceComponent, data: { title: '订单来源统计' } },
	// { path: 'travel', component:TravelComponent, data: { title: '旅行社售票统计' } },
	// { path: 'ota', component: OtaComponent, data: { title: 'OTA售票统计' } },

	]
}, ];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ReportRoutingModule {}