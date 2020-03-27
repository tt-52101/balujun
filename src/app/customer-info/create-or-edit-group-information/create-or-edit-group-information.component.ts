import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { GetOrganizationForEditOutput, OrganizationEditDto, OrganizationServiceProxy } from '@shared/service-proxies/service-proxies';

import { UtilsService } from '@abp/utils/utils.service';

import { AppConsts } from 'abpPro/AppConsts';

@Component({
  selector: 'app-create-or-edit-group-information',
  templateUrl: './create-or-edit-group-information.component.html',
  styles: []
})
export class CreateOrEditGroupInformationComponent extends ModalComponentBase implements  OnInit {

  id: any;

  entity: OrganizationEditDto = new OrganizationEditDto();

  constructor(
    injector: Injector,
    private _organizationService: OrganizationServiceProxy,   
    private _utilsService: UtilsService,
    ) {
    super(injector);
  }

  ngOnInit() {
    this.init();
  }
  /**
* 初始化方法
*/
init(): void {
  this._organizationService.getForEdit(this.id).subscribe(result => {
    this.entity = result.organization;

  });


}

  /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      const input = new GetOrganizationForEditOutput();
      input.organization = this.entity;

      this.saving = true;

      this._organizationService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.success(true);
      });
    }

  }
