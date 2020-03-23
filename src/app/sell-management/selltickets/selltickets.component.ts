import { Component, OnInit, Injector } from '@angular/core';

import { appModuleAnimation } from '@shared/animations/routerTransition';

import { CreateOrEditPassengerComponent } from './create-or-edit-passenger/create-or-edit-passenger.component';

import { AppComponentBase } from '@shared/component-base/app-component-base';
// import { ReuseTabService } from '@delon/abc';

import { AppConsts } from 'abpPro/AppConsts';

import { NzModalService } from 'ng-zorro-antd';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import { SignalRService } from '@shared/service-proxies/signalrservice';

import {

  // WharfServiceProxy,
  PayMethodServiceProxy,


  ActivityServiceProxy,
  // CreateActivityModel,

  // TicketPriceServiceProxy,

  SourceServiceProxy,

  // CreateActivityDetailModel,
  QueryData
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-selltickets',
  templateUrl: './selltickets.component.html',
  styleUrls: ['./selltickets.component.less'],
  animations: [appModuleAnimation()],
})
export class SellTicketsComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector,
    // private _reuseTabService: ReuseTabService,

    // private _wharfService: WharfServiceProxy,
    private _payMethodService: PayMethodServiceProxy,
    // private _ticketPriceService: TicketPriceServiceProxy,
    private _activityService: ActivityServiceProxy,

    private _modalService: NzModalService,

    private _sourceService: SourceServiceProxy,

    public signalRService: SignalRService
    ) {
    super(injector);
    // this._reuseTabService.title = this.l('航班售票');
     this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
    this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
  }

  isAllOperation=false
  curmenupower=[]
  

  imgurl=AppConsts.remoteServiceBaseUrl


  hblist = []

  nowtimestamp = 0
  starttimestamp = 0
  datearr=[]
  nowdate = ""
  nowday = ''


  hangbanquery=[{
    field: "scheduleCode",
    method: "%",
    value: "",
    logic: "and"
  },{
    field: "routeId",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "boatId",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "wharfId",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "scheduleStatus",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "saleDate",
    method: ">=",
    value: "",
    logic: "and"
  },{
    field: "saleDate",
    method: "<=",
    value: "",
    logic: "and"
  },{
    field: "checkStartTime",
    method: ">",
    value: "",
    logic: "and"
  },{
    field: "Boat.runStatus",
    method: "=",
    value: 'Running',
    logic: "and"
  }]

  hangbanList=[]

  hangxianquery=[]
  hangxianList=[]

  youchanquery=[{
    field: "runStatus",
    method: "=",
    value: "Running",
    logic: "and"
  }]
  youchuanList=[]

  matouquery=[]
  matouList=[]

  paymethodList=[]

  sourceId='';

  scheduleId='';
  schedule={
    scheduleCode:'',
    route:{
      routeName:''
    },
    startTimeStr:'',
    endTimeStr:'',
    saleDateStr:''
  };

  orderdetail=[]

  curticket={}

  orderinfo={
    payMethodId: '',
  }

  totalamount=0;
  receivable=0;
  discount=1;
  receive=0;
  change=0;

  today=0

  showcalendar=false
  calendardate=''

  groupid=0

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, new Date()) < 0;
  };

  calendarctrl(){
    this.showcalendar=!this.showcalendar
  }

  clear(){
    for (var i = 0; i <6 ; i++) {
      this.hangbanquery[i].value=''
    }
  }

  calendarChange($event){
    // console.log($event)
    var now = new Date($event);

    this.starttimestamp=now.getTime();

    this.settime(0)
    this.showcalendar=!this.showcalendar


    var now = new Date(now)
    var year=now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var week = now.getDay() + '';
    switch (week) {
      case '1':
      week = '星期一';
      break;
      case '2':
      week = '星期二';
      break;
      case '3':
      week = '星期三';
      break;
      case '4':
      week = '星期四';
      break;
      case '5':
      week = '星期五';
      break;
      case '6':
      week = '星期六';
      break;
      case '0':
      week = '星期日';
      break;
    }

    var fulldate=year+'-'+month+'-'+day;
    this.nowdate = month + "月" + day + "日";
    this.nowday =week
    this.hangbanquery[5].value=moment(fulldate).format('YYYY-MM-DD HH:mm:ss');
    this.hangbanquery[6].value=moment(fulldate).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
    this.hangbanquery[7].value=moment().format('YYYY-MM-DD HH:mm:ss');

  }

  ngOnInit() {

    this.getnowdate()


    this.calendardate=new Date().toString();
    var now = new Date();
    this.starttimestamp=now.getTime();
    this.settime(0)


    var groupidtemp =localStorage.getItem('groupid')
    if(groupidtemp){
      this.groupid=parseInt(groupidtemp)
    }else{
      var groupid=new Date().getTime()
      this.groupid=groupid
      localStorage.setItem('groupid',groupid+'')
    }

    this.signalRService.startConnection(this.groupid);
  }

  openguest(){
    window.open("/#/guest/guestdisplay?gn="+this.groupid,'_blank',"menubar=0,scrollbars=1, resizable=1,status=1,titlebar=0,toolbar=0,location=1");

    var that =this
    setTimeout(function(){
      if(that.schedule.scheduleCode){
        that.updateSchedule()
      }

      if(that.orderdetail.length>0){
        for (var i =0 ;i< that.orderdetail.length ; i++) {
          that.addTicket(that.orderdetail[i])
        }
      }
    },4000)
  }

  updateSchedule(){
    var data={
      scheduleCode:this.schedule.scheduleCode,
      routeName:this.schedule.route.routeName,
      startTimeStr:this.schedule.startTimeStr.split(' ')[1],
      endTimeStr:this.schedule.endTimeStr.split(' ')[1],
      saleDateStr:this.schedule.saleDateStr.split(' ')[0]
    }
    this.signalRService.send(this.groupid,'updateSchedule'+'&'+JSON.stringify(data));
  }

  addTicket(ticketitem){
    this.signalRService.send(this.groupid,'addTicket&'+JSON.stringify(ticketitem))
  }

  replace(data){
    this.signalRService.send(this.groupid,'replace&'+JSON.stringify(data))
  }

  deletet(i){
    this.signalRService.send(this.groupid,'deleteTicket&'+i)
  }


  settlement(){
    if(this.orderdetail.length==0){
      abp.message.warn(this.l('PleaseSelectTicket'));
      return
    }

    if(this.receive<this.totalamount){
      abp.message.warn(this.l('RecieveAmountLessTanReceivableAmount'));
      return
    }
    // var orderdata = new CreateActivityModel()
    // // console.log(orderdata)
    // orderdata.sourceId= this.sourceId;
    // orderdata.payMethodId= this.orderinfo.payMethodId;
    // orderdata.activityDetails=[]
    // for (var i = 0; i<this.orderdetail.length;i++) {
    //   orderdata.activityDetails.push(new CreateActivityDetailModel({
    //     ticketPriceId:this.orderdetail[i].ticket.id,
    //     customerId:this.orderdetail[i].customerId,
    //     quantity:1,
    //     scheduleId:this.scheduleId
    //   }))
    // }

    // this._activityService.createActivity(orderdata)
    // .subscribe(result => {
    //   if(result.resultCode == "000"){
    //     this.notify.success(result.resultMessage);
    //     this.gethangban()
    //     this.orderdetail=[]
    //     this.countprice()
    //   }else{
    //     abp.message.warn(result.resultMessage);
    //   }
    // });
  }






  createOrEdit(item,titem): void {
    // console.log(item)
    // console.log(titem)
    // console.log(this.scheduleId)

    // console.log(item.scheduleId)


    if(item.scheduleStatus !== "WaitCheck"){
      abp.message.warn(this.l('ScheduleStopSale'));
      return
    }

    if(item.surplusQuantity ==0){
      abp.message.warn(this.l('TicketsSoldOut'));
      return
    }

    // console.log(new Date(item.startTimeStr).getTime())
    // console.log(new Date().getTime())
    if(new Date(item.startTimeStr).getTime() < new Date().getTime()){
      abp.message.warn(this.l('ScheduleStopSale'));
      return
    }

    this.curticket=titem

    if(this.scheduleId && this.scheduleId!==item.id){
      this._modalService.create({
        nzTitle: this.l('Tips'),
        nzContent: this.l('IsReplaceSchedule'),
        nzClosable: false,
        nzOnOk: () => {
          this.schedule=item
          this.scheduleId=item.id
          this.orderdetail=[]

          this.updateSchedule()
          this.createcustomer()
        }
      });
    }else if(this.scheduleId && this.scheduleId==item.id){
      this.createcustomer()
    }
    else if(!this.scheduleId){
      this.scheduleId=item.id
      this.schedule=item
      this.updateSchedule()

      this.createcustomer()
    }
  }




  createcustomer(){

    this.modalHelper.static(CreateOrEditPassengerComponent)
    .subscribe(result => {
      if (result) {
        // console.log(result)
        var hadadd=false
        var hadindex=0
        for (var i =0; i<this.orderdetail.length; i++) {
          if( this.orderdetail[i].customerId == result.id){
            hadadd=true
            hadindex=i
          }
        }

        if(hadadd){
          this._modalService.create({
            nzTitle:  this.l('Tips'),
            nzContent:  this.l('IsReplacePassenger'),
            nzClosable: false,
            nzOnOk: () => {
              var item={
                customer:result,
                customerId:result.id,
                ticket: this.curticket
              }
              this.orderdetail[hadindex]=item
              var data={
                info:item,
                index:hadindex
              }
              this.replace(data)

              this.countprice()
            }
          });
        }else{
          var ticketitem={
            customer:result,
            customerId:result.id,
            ticket: this.curticket
          }
          this.orderdetail.push(ticketitem)
          this.addTicket(ticketitem)

          this.countprice()
        }
      }
    });
  }


  countprice(){
    var totalamount=0
    for (var i =0; i<this.orderdetail.length; i++) {
      totalamount+=this.orderdetail[i].ticket.price
    }
    this.totalamount=totalamount
    this.receivable=totalamount
  }

  deleteticket(i){
    this.orderdetail.splice(i,1);

    this.deletet(i)

    this.countprice()
  }


  settime(e){

    var now = new Date()
    var year=now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    this.today= new Date(year+'-'+month+'-'+day).getTime()

    if(e==1){
      var starttimestamp=this.starttimestamp - 7 * 86400000
      if (starttimestamp < this.today) {
        var now = new Date();
        this.starttimestamp=now.getTime();
        this.calendarChange(now)
        
        // abp.message.warn(this.l('TicketSaleClose'))
        return
      }
    }else if(e==2){
      var starttimestamp=this.starttimestamp + 7 * 86400000
    }else if(e==0){
      var starttimestamp=this.starttimestamp
    }
    this.starttimestamp=starttimestamp
    this.datearr=[]
    for(var i = 0 ; i < 7 ; i++){
      var myDate = new Date(starttimestamp + i * 86400000);
      var year=myDate.getFullYear();
      var month=myDate.getMonth()+1;
      var date=myDate.getDate();
      var dateitem={
        fulldate:year+'-'+month+'-'+date,
        date:month+"月"+date+"日",
        day:"星期" + "日一二三四五六".charAt(myDate.getDay()),
        enable:false
      }
      var thisdate=new Date()
      var year1=thisdate.getFullYear();
      var month1=thisdate.getMonth()+1;
      var date1=thisdate.getDate();


      if(dateitem.fulldate==year1+'-'+month1+'-'+date1){
        dateitem.day='今天'
      }
      if(myDate.getTime() < new Date(new Date(new Date().toLocaleDateString()).getTime()).getTime()){
        dateitem.enable=false
      }else{
        dateitem.enable=true
      }
      this.datearr.push(dateitem)
    }
    // console.log(this.datearr)
  }

  datechange(a,b,c,d){
    if(!d){
      abp.message.warn(this.l('TicketSaleClose'))
      return
    }
    this.nowdate = a
    this.nowday = b
    this.hangbanquery[5].value=moment(c).format('YYYY-MM-DD HH:mm:ss');
    this.hangbanquery[6].value=moment(c).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');

    this.hangbanquery[7].value=moment().format('YYYY-MM-DD HH:mm:ss');

  }


  getnowdate(){
    var timestamp = (new Date()).getTime();

    var now = new Date(timestamp)
    var year=now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var week = now.getDay() + '';
    switch (week) {
      case '1':
      week = '星期一';
      break;
      case '2':
      week = '星期二';
      break;
      case '3':
      week = '星期三';
      break;
      case '4':
      week = '星期四';
      break;
      case '5':
      week = '星期五';
      break;
      case '6':
      week = '星期六';
      break;
      case '0':
      week = '星期日';
      break;
    }
    this.nowdate = month + "月" + day + "日";
    this.nowday = week

    var fulldate=year+'-'+month+'-'+day;
    this.hangbanquery[5].value=moment(fulldate).format('YYYY-MM-DD HH:mm:ss');
    this.hangbanquery[6].value=moment(fulldate).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
    this.hangbanquery[7].value=moment().format('YYYY-MM-DD HH:mm:ss');


    // this.getmatou()
    this.getpaymethod()
  }





  // getmatou(){
    //   const formdata = new GetWharfsInput()
    //   formdata.queryData = this.matouquery;
    //   formdata.sorting = null
    //   formdata.maxResultCount = 999;
    //   formdata.skipCount = 0;
    //   this._wharfService.getPaged(formdata)
    //   .subscribe(result => {
      //     this.matouList = result.items;
      //   });
      // }


      getpaymethod(){
        this._payMethodService.getPaged(null,null,999,0)
        .subscribe(result => {
          this.paymethodList = result.items;
          // this.orderinfo.payMethodId=result.items[0].id
        });
      }




    }
