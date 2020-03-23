
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTicketIntroduceInput,TicketIntroduceEditDto, TicketIntroduceServiceProxy,TicketServiceProxy,
  // GetTicketsInput,
  ScenicSpotServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';
import { UtilsService } from '@abp/utils/utils.service';

import { AppConsts } from 'abpPro/AppConsts';
@Component({
  selector: 'create-or-edit-ticket-introduce',
  templateUrl: './create-or-edit-ticket-introduce.component.html',
  styleUrls:[
  'create-or-edit-ticket-introduce.component.less'
  ],
})

export class CreateOrEditTicketIntroduceComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: TicketIntroduceEditDto=new TicketIntroduceEditDto();

    uploadurl=''
    baseurl=''
    hearder={
      Authorization:''
    }

    coverMap=''
    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _ticketIntroduceService: TicketIntroduceServiceProxy,
      private _ticketService: TicketServiceProxy,
      private _scenicSpotService: ScenicSpotServiceProxy,
      private _utilsService: UtilsService,
      ) {
      super(injector);
    }

    ngOnInit() :void{
      this.init();
    }

    queryData=[]
    scenicspotList=[
      {
        id:0,
        scenicSpotName:'无'
      },
      {
        id:1,
        scenicSpotName:'crp.wav'
      },
      {
        id:2,
        scenicSpotName:'lrp.wav'
      },
      {
        id:3,
        scenicSpotName:'ttp.wav'
      },
    ]
    ticketList=[]

    dateRange = [];
    /**
    * 初始化方法
    */
    init(): void {
      this._ticketIntroduceService.getForEdit(this.id).subscribe(result => {
       this.entity = result.ticketIntroduce;
       this.coverMap=result.ticketIntroduce.coverMap;
     });
     
    
     
      // const formdata = new GetTicketsInput();
      // formdata.queryData = this.queryData;
      // formdata.sorting = null
      // formdata.maxResultCount = 999;
      // formdata.skipCount = 0;

      // this._ticketService.getPaged(formdata)
      // .subscribe(result => {
      //   this.ticketList = result.items;
      // });

      // this._scenicSpotService.getPaged(null,null,999,0)
      // .subscribe(result => {
      //   this.scenicspotList = result.items;
      // });


      this.uploadurl=AppConsts.remoteServiceBaseUrl+'/api/File/UploadImageAsync'
      this.hearder.Authorization='Bearer '+ this._utilsService.getCookieValue("Abp.AuthToken");
    }


    onChange($event): void {
      console.log(this.dateRange);
      
      console.log('onChange: ', $event);
    }


    handleChange(info): void {
      console.log(info)
      switch (info.file.status) {

        case 'done':
        this.coverMap=info.file.name
        this.entity.coverMap=info.file.response.result.uri
        break;
        case 'error':
        abp.message.error(this.l('UploadFail'));
        break;
      }
    }

    onChange1($event: number): void {
      this.entity.scenicSpotId = $event
    }

    onChange2($event: number): void {
      this.entity.ticketId = $event
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      console.log(this.entity);
      
      const input = new CreateOrUpdateTicketIntroduceInput();
      input.ticketIntroduce = this.entity;

      this.saving = true;

      this._ticketIntroduceService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success(true);
     });
    }
  }
