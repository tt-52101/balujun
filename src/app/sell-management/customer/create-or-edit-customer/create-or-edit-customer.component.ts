
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateCustomerInput,CustomerEditDto, CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';
import { UtilsService } from '@abp/utils/utils.service';
import { AppConsts } from 'abpPro/AppConsts';
@Component({
  selector: 'create-or-edit-customer',
  templateUrl: './create-or-edit-customer.component.html',
  styleUrls:[
  'create-or-edit-customer.component.less'
  ],
})

export class CreateOrEditCustomerComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: CustomerEditDto=new CustomerEditDto();

    uploadurl=''
    baseurl=''
    hearder={
      Authorization:''
  }

  photo=''

    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _customerService: CustomerServiceProxy,
      private _utilsService: UtilsService,
      ) {
      super(injector);
  }

  ngOnInit() :void{
      this.init();
  }


    /**
    * 初始化方法
    */
    init(): void {
      this._customerService.getForEdit(this.id).subscribe(result => {
         this.entity = result.customer;
         this.photo=result.customer.photo;
     });
      this.uploadurl=AppConsts.remoteServiceBaseUrl+'/api/File/UploadImageAsync'
      this.hearder.Authorization='Bearer '+ this._utilsService.getCookieValue("Abp.AuthToken");
  }

  handleChange(info): void {
      console.log(info)
      switch (info.file.status) {

        case 'done':
        this.photo=info.file.name
        this.entity.photo=info.file.response.result.uri
        break;
        case 'error':
        abp.message.error(this.l('UploadFail'));
        break;
    }
}

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      const input = new CreateOrUpdateCustomerInput();
      delete this.entity.dateOfBirth
      input.customer = this.entity;

      this.saving = true;

      this._customerService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
         this.notify.success(this.l('SavedSuccessfully'));
         this.success(true);
     });
  }
}
