import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchComponent } from './branch.component';
import { RolesComponent } from './roles/roles.component';
import { UsersComponent } from './users/users.component';





const routes: Routes = [{
	path: '',
	children: [
		{ path: 'branch', component: BranchComponent, data: { title: '机构管理' }},
		{ path: 'roles', component: RolesComponent ,data: { title: '角色管理' }},
		{ path: 'user', component: UsersComponent ,data: { title: '用户管理' }},

	]
}, ];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class OrganisationlnfoRoutingModule {}

