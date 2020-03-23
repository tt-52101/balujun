
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {SellerTicketServiceProxy, SellerTicketResultDto,UserServiceProxy ,QueryData,
  
  TicketServiceProxy,
  // GetTicketsInput
} from '@shared/service-proxies/service-proxies';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
  templateUrl: './salerticket.component.html',
  styleUrls: ['./salerticket.component.less'],
  animations: [appModuleAnimation()],
})


export class  SalerTicketComponent extends PagedListingComponentBase<SellerTicketResultDto>
implements OnInit {

  constructor(
    injector: Injector,
    private _sellerticketService: SellerTicketServiceProxy,
    private _userService: UserServiceProxy,

    private _ticketService: TicketServiceProxy,
    ) {
    super(injector);
  }

  visible=false

  ticketinfo=[]

  queryData = [{
    field: "ScheduleId",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "CreatorUserId",
    method: "=",
    value: "",
    logic: "and"
  }, {
    field: "CreationTime",
    method: ">=",
    value: "",
    logic: "and"
  }, {
    field: "CreationTime",
    method: "<=",
    value: "",
    logic: "and"
  },];



  userList=[]
  schedulelist=[]

  boatId=''
  ticketId=''
  
  boatList=[]
  ticketlist=[]

  collectionTime=''

  total:any;
  
  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, new Date()) > 0;
  };

  protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
    var arr=[]
    for (var i = this.queryData.length - 1; i >= 0; i--) {
      if(this.queryData[i].value){
        arr.push(new QueryData(this.queryData[i]))
      }
    }
    console.log(request)
  //   this._sellerticketService.getPaged(arr,null,request.maxResultCount,request.skipCount,this.boatId,this.ticketId)
  //   .finally(() => {
  //     finishedCallback();
  //   })
  //   .subscribe(result => {
  //     this.dataList = result.items;
  //     if(result.totalCount>0){
  //       this.total= [result.total]
  //     }
  //     this.showPaging(result);
  //   });

  //   this.getuser()
  //   this.getschedule()
  //   this.getboat()
  //   this.getticket()
  // }

  // getticket(){
  //   const formdata = new GetTicketsInput()
  //   formdata.queryData = [];
  //   formdata.sorting = null;
  //   formdata.maxResultCount = 999;
  //   formdata.skipCount = 0;

  //   this._ticketService.getPaged(formdata)
  //   .subscribe(result => {
  //     this.ticketlist = result.items;
  //   });
  // }

  // getboat(){
  //   const formdata = new GetBoatsInput()
  //   formdata.queryData = [];
  //   formdata.sorting = null;
  //   formdata.maxResultCount = 999;
  //   formdata.skipCount = 0;

  //   this._boatService.getPaged(formdata)
  //   .subscribe(result => {
  //     this.boatList = result.items;
  //   });
  }

  getschedule(){
    // var formdata = new GetSchedulesInput
    // formdata.queryData = [];
    // formdata.sorting = null;
    // formdata.maxResultCount = 999;
    // formdata.skipCount = 0;

    // this._scheduleService.getPaged(formdata)
    // .subscribe(result => {
    //   this.schedulelist = result.items;
    // });
  }

  datechange($event): void {
    if($event[0].getTime() == $event[1].getTime()){
      $event[1]=new Date($event[1].getTime()+24*60*60*1000)
    }

    var year=$event[0].getFullYear();
    var month = $event[0].getMonth() + 1;
    var day = $event[0].getDate();

    var fulldate1=year+'-'+month+'-'+day;

    var year=$event[1].getFullYear();
    var month = $event[1].getMonth() + 1;
    var day = $event[1].getDate();

    var fulldate2=year+'-'+month+'-'+day;

    this.queryData[2].value=moment(fulldate1).format('YYYY-MM-DD HH:mm:ss')
    this.queryData[3].value=moment(fulldate2).format('YYYY-MM-DD HH:mm:ss')

  }

  getuser(){
    this._userService
    .getPaged(
      undefined,
      undefined,
      undefined,
      undefined,
      undefined,
      '',
      null,
      999,
      0
      )
    .subscribe((result) => {
      this.userList = result.items;
    });
  }


  open(id): void {

    // this._sellerticketService.sellerTicketDetailStat(id)
    // .subscribe(result => {
    //   console.log(result)
    //   this.visible = true;
    //   this.ticketinfo = result.items;
    // });
  }


  close(): void {
    this.visible = false;
  }



}
