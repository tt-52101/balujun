import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckRecordComponent } from './check-record.component';


const routes: Routes = [{
  path: '',
  children: [
    { path: 'check-record', component: CheckRecordComponent, data: { title: '校验记录' } },
  ]
}, ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class SystemRoutingModule {}
