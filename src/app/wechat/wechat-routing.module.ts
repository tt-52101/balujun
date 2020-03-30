import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScenicSpotComponent } from './scenic-spot/scenic-spot.component';



const routes: Routes = [{
	path: '',
	children: [
	{ path: 'scenic-spot', component: ScenicSpotComponent, data: { title: '景点管理' } },




	]
}, ];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class WeChatRoutingModule {}