
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PowerComponent } from './power/power.component';
// import { PowerRoleComponent } from './power-role/power-role.component';

const routes: Routes = [
    {
        path: '',
        children: [
            { path: 'menu', component: MenuComponent ,data: { title: '菜单管理' }},
            { path: 'power', component: PowerComponent,data: { title: '权限管理' } },
            // { path: 'power-role', component: PowerRoleComponent,data: { title: '角色权限' } },
        ]
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PowerManagementRoutingModule { }
