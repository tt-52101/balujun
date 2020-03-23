
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateRechargeRecordInput,RechargeRecordEditDto, RechargeRecordServiceProxy,TravelAgencyServiceProxy,
//  GetTravelAgencysInput,
 PayMethodServiceProxy} from '@shared/service-proxies/service-proxies';
 import { Validators, AbstractControl, FormControl } from '@angular/forms';

 @Component({
  selector: 'create-or-edit-recharge-record',
  templateUrl: './create-or-edit-recharge-record.component.html',
  styleUrls:[
  'create-or-edit-recharge-record.component.less'
  ],
})

 export class CreateOrEditRechargeRecordComponent
 extends ModalComponentBase
 implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: RechargeRecordEditDto=new RechargeRecordEditDto();
    queryData = [];

    travellist=[]

    paymethodList=[]
    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _rechargeRecordService: RechargeRecordServiceProxy,
      private _travelAgencyService: TravelAgencyServiceProxy,
      private _payMethodService: PayMethodServiceProxy
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
      this._rechargeRecordService.getForEdit(this.id).subscribe(result => {

        // const formdata = new GetTravelAgencysInput()
        // formdata.queryData = this.queryData;
        // formdata.sorting = null
        // formdata.maxResultCount = 999;
        // formdata.skipCount = 0;

      //   this._travelAgencyService.getPagedForPost(formdata)
      //   .subscribe(result => {
      //    this.travellist = result.items;
      //  });


      //   this._payMethodService.getPaged(null,999,0)
      //   .subscribe(result => {
      //     this.paymethodList = result.items;
      //   });

        this.entity = result.rechargeRecord;
      });
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      const input = new CreateOrUpdateRechargeRecordInput();
      input.rechargeRecord = this.entity;

      this.saving = true;

      this._rechargeRecordService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success(true);
     });
    }
  }
