import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchComponent } from './branch.component';
import { BranchUserComponent } from './branch-user.component';
import { DateDictionaryComponent } from './date-dictionary.component';
import { PayMethodComponent } from './pay-method.component';
import { AppVersionComponent } from './appversion.component';


const routes: Routes = [{
	path: '',
	children: [
	{ path: 'branch', component: BranchComponent, data: { title: '机构管理' } },
	{ path: 'branch-user', component: BranchUserComponent, data: { title: '机构用户管理' } },
	{ path: 'date-dictionary', component: DateDictionaryComponent, data: { title: '数据字典' } },
	{ path: 'pay-method', component: PayMethodComponent, data: { title: '支付方式' } },
	{ path: 'appversion', component: AppVersionComponent, data: { title: 'App版本管理' } },



	]
}, ];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class BasicConfigRoutingModule {}