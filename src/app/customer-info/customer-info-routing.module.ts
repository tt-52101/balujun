import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TouristInformation } from './tourist-Information.component';
import { GroupInformation } from './group-information.component';
import { Conductor } from './conductor.component';




const routes: Routes = [{
	path: '',
	children: [
		{ path: 'tourist-info', component: TouristInformation, data: { title: '游客信息管理' } },
		{ path: 'group-info', component: GroupInformation, data: { title: '团队管理' } },
		{ path: 'conductor', component: Conductor, data: { title: '角色可售票类型管理' } },
	]
}, ];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class CustomerlnfoRoutingModule {}

