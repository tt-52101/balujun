import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DeviceComponent } from './device.component';
import { GateRecordComponent } from './gate-record.component';
import { VerifiableSetComponent } from './verifiable-set.component';



const routes: Routes = [{
	path: '',
	children: [
	{ path: 'device', component: DeviceComponent, data: { title: '设备管理' } },
	{ path: 'gate-record', component: GateRecordComponent, data: { title: '闸机记录' } },
	{ path: 'verifiable-set', component: VerifiableSetComponent, data: { title: '可验证设置' } },

	]
}, ];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class DeviceManagementRoutingModule {}
