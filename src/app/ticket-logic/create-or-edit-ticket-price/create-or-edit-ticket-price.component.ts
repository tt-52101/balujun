import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import {
  CreateOrUpdateTicketPriceInput, TicketPriceEditDto, TicketPriceServiceProxy, TicketServiceProxy
} from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

import * as moment from 'moment';

@Component({
  selector: 'create-or-edit-ticket-price',
  templateUrl: './create-or-edit-ticket-price.component.html',
  styleUrls: [
    'create-or-edit-ticket-price.component.less'
  ],
})

export class CreateOrEditTicketPriceComponent
  extends ModalComponentBase
  implements OnInit {
  /**
  * 编辑时DTO的id
  */
  id: any;

  entity: TicketPriceEditDto = new TicketPriceEditDto();


  queryData = []

  ticketList = []


  upperTime = ""
  lowerTime = ""



  /**
  * 初始化的构造函数
  */
  constructor(
    injector: Injector,
    private _ticketPriceService: TicketPriceServiceProxy,
    private _ticketService: TicketServiceProxy,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
  }


  change1($event):void{
    this.entity.upperTimeStr=this.formatDate($event)
    console.log(this.formatDate($event))
    console.log(this.entity.upperTimeStr)
  }

  change2($event):void{
    this.entity.lowerTimeStr=this.formatDate($event)
  }

  formatDate(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) { month = '0' + month }
    let day = date.getDate();
    if (day < 10) { day = '0' + day }
    let hours = date.getHours();
    if (hours < 10) { hours = '0' + hours }
    let minutes = date.getMinutes();
    if (minutes < 10) { minutes = '0' + minutes }
    let seconds = date.getSeconds();
    if (seconds < 10) { seconds = '0' + seconds }
    var datesrt = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
    return datesrt
  }


  /**
  * 初始化方法
  */
  init(): void {


    this._ticketPriceService.getForEdit(this.id).subscribe(result => {
      if(result.ticketPrice.id){
        result.ticketPrice.upperTimeStr = result.ticketPrice.upperTime.toString()
        result.ticketPrice.lowerTimeStr = result.ticketPrice.lowerTime.toString()
      }else{
       result.ticketPrice.upperTime=moment()
       result.ticketPrice.lowerTime=moment()
       result.ticketPrice.upperTimeStr=this.formatDate(new Date())
       result.ticketPrice.lowerTimeStr=this.formatDate(new Date())
       // result.ticketPrice.scheduleId=''
      //  result.ticketPrice.ticketId=''
     }
     this.entity = result.ticketPrice;
     console.log(this.entity)
   });



    this._ticketService.getPaged('', '', 999, 0)
      .subscribe(result => {
        this.ticketList = result.items;  
      });
  }





  /**
  * 保存方法,提交form表单
  */
  submitForm(): void {
    console.log(this.entity.ticketId);

    const input = new CreateOrUpdateTicketPriceInput();
    // this.entity.upperTimeStr=this.formatDate(new Date(this.entity.upperTimeStr))
    //   this.entity.lowerTimeStr=this.formatDate(new Date(this.entity.lowerTimeStr))
    input.ticketPrice = this.entity;
    console.log(input.ticketPrice)

    this.saving = true;

    this._ticketPriceService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.success(true);
      });
  }
}
