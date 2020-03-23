import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTicketInput, TicketEditDto, TicketServiceProxy } from '@shared/service-proxies/service-proxies';

import { UtilsService } from '@abp/utils/utils.service';

import { AppConsts } from 'abpPro/AppConsts';

@Component({
  selector: 'app-create-or-edit-group-information',
  templateUrl: './create-or-edit-group-information.component.html',
  styles: []
})
export class CreateOrEditGroupInformationComponent extends ModalComponentBase implements  OnInit {

  /**
     * 编辑时DTO的id
     */
  id: any;

  entity: TicketEditDto = new TicketEditDto();

  uploadurl = ''
  baseurl = ''
  hearder = {
    Authorization: ''
  }


  constructor(
    injector: Injector,
    private _ticketService: TicketServiceProxy,
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
    this._ticketService.getForEdit(this.id).subscribe(result => {
      this.entity = result.ticket;
  
    });

    this.hearder.Authorization = 'Bearer ' + this._utilsService.getCookieValue("Abp.AuthToken");
  }

  /**
    * 保存方法,提交form表单
    */
  submitForm(): void {
    const input = new CreateOrUpdateTicketInput();
    input.ticket = this.entity;

    this.saving = true;

    this._ticketService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.success(true);
      });
  }

}
