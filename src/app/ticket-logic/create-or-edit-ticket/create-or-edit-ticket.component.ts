import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTicketInput,TicketEditDto, TicketServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';


import { UtilsService } from '@abp/utils/utils.service';
import { AppConsts } from 'abpPro/AppConsts';

@Component({
  selector: 'create-or-edit-ticket',
  templateUrl: './create-or-edit-ticket.component.html',
  styleUrls: [
    'create-or-edit-ticket.component.less'
  ],
})

export class CreateOrEditTicketComponent
  extends ModalComponentBase
  implements OnInit {
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

  audioName = ''

  /**
  * 初始化的构造函数
  */
  constructor(
    injector: Injector,
    private _ticketService: TicketServiceProxy,
    private _utilsService: UtilsService,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
  }

  queryData = []

  /**
  * 初始化方法
  */

  

  init(): void {
    this._ticketService.getForEdit(this.id).subscribe(result => {
      this.entity = result.ticket;
      this.audioName = result.ticket.audioName
      console.log(this.entity);
    });

    this.uploadurl = AppConsts.remoteServiceBaseUrl + '/api/File/UploadImageAsync'
    this.hearder.Authorization = 'Bearer ' + this._utilsService.getCookieValue("Abp.AuthToken");
  }




  handleChange(info): void {
    console.log(info)
    switch (info.file.status) {

      case 'done':
        this.audioName = info.file.name
        this.entity.audioName = info.file.response.result.uri
        break;
      case 'error':
        abp.message.error(this.l('UploadFail'));
        break;
    }
  }


  // onChange1($event): void {
  //   console.log(this.dateRange);

  //   console.log('onChange: ', $event);
  // }

  /**
  * 保存方法,提交form表单
  */
  submitForm(): void {
    console.log(this.entity);

      const input = new CreateOrUpdateTicketInput();
      console.log(input);
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
