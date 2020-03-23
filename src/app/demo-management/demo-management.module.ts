import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbpModule } from 'abp-ng2-module/dist/src/abp.module';
import { SharedModule } from '@shared/shared.module';
import { SimplemdeModule } from 'ngx-simplemde';

import { DemoManagementRoutingModule } from './demo-management-routing.module';
import { DemoUiComponent } from './demo-ui/demoui.component';
import { from } from 'rxjs';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    CommonModule,
    DemoManagementRoutingModule,
    SharedModule,
    AbpModule,
    SimplemdeModule.forRoot({
      style: 'antd',
      delay: 1,
      options: { toolbar: ['bold', 'italic', 'heading', '|', 'quote'] }
    })
  ],
  declarations: [...COMPONENTS, ...COMPONENTS_NOROUNT, DemoUiComponent],
  entryComponents: COMPONENTS_NOROUNT
})
export class DemoManagementModule {}
