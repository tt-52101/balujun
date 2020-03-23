import { Component, OnInit, Injector } from '@angular/core';

import { appModuleAnimation } from '@shared/animations/routerTransition';

import { AppComponentBase } from '@shared/component-base/app-component-base';

import {ActivityServiceProxy,
  // GetActivitysInput,
  TicketDetailServiceProxy, QueryData} from '@shared/service-proxies/service-proxies';

import { NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-refundticket',
  templateUrl: './refundticket.component.html',
  styleUrls: ['./refundticket.component.less'],
  animations: [appModuleAnimation()],
})
export class RefundTicketComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector,

    private _activityService: ActivityServiceProxy,
    private _ticketDetailService: TicketDetailServiceProxy,
    private _modalService: NzModalService,
    ) {
    super(injector);
    this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
    this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
  }

  isAllOperation=false
  curmenupower=[]

  queryData=[{
    field: "ticketNo",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "qrcode",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "mobile",
    method: "=",
    value: "",
    logic: "and"
  },{
    field: "activityType",
    method: "=",
    value: "ActivityTypePayment",
    logic: "and"
  },{
    field: "buyer",
    method: "%",
    value: "",
    logic: "and"
  }]

  certificatesNum=''

  orderlist=[]

  orderinfo={}

  orderticket=[
    {
      ticketName:'成人票',
      ticketNo:'张三',
      customerName:15992591634,
      mobile:123456,
      unitPrice:200,
      ticketStatus:'已激活',
      stime:'2019-10-14 09:40:00',
      etime:'2019-10-15 09:40:00'
    }
  ]


  rDiscount='0.9'
  refundcount=0
  single=false

  remark=''

  allChecked=false
  checkboxIndeterminate=false
  selectedDataItems=[]


  ngOnInit(): void {
    this.init();
  }

  init(): void {
    this.orderlist=[
      {
        activityNo:132456,
        buyer:'张三',
        mobile:15992591634,
        certificatesNum:1.0,
        totalQuantity:'现金支付',
        totalAmount:'支付成功',
        payName:'创建时间',
        payMethod:true,
        sourceName:'前台',
        unitPrice:200,
        totalQuantity2:9,
        etime:'2019-10-15 09:40:00'
      }
    ]
  }

  query(): void {
    var arr=[]
    if(this.queryData[0].value || this.queryData[1].value){
      for (var i = 0;i < 2; i++) {
        if(this.queryData[i].value){
          arr.push(new QueryData(this.queryData[i]))
        }
      }

      this._ticketDetailService.getPaged('',null,999,0)
      .subscribe(result => {
        if(result.items.length>0){
          this.single=true
          // for (var i =0;i< result.items.length; i++) {
            //   result.items[i].isPrint=false
            // }

            
            // this.orderticket=result.items
            // this.orderinfo = result.items[0].activity;
          }else{
            abp.message.warn(this.l('NoOrder'));
          }
        });

    }else{
      for (var i = 2;i < 4; i++) {
        if(this.queryData[i].value){
          arr.push(new QueryData(this.queryData[i]))
        }
      }

      // var formdata=new GetActivitysInput
      // formdata.queryData = arr;
      // formdata.sorting = null;
      // formdata.certificatesNum=this.certificatesNum
      // formdata.maxResultCount = 999;
      // formdata.skipCount = 0;

      // this._activityService.getPaged(formdata)
      // .subscribe(result => {
      //   if(result.items.length==0){
      //     abp.message.warn(this.l('NoOrder'));
      //   }
      //   else{
      //   // else if(result.items.length==1){
      //     // this.orderinfo = result.items;
      //     // this.select(result.items[0])
      //     // this.single=true
      //   // }else{
      //     this.single=false
      //     this.orderlist = result.items;
      //   }
      // });

    }

  }

  select(item){
    // console.log(item)
    // if(item.payStatus!=='PayStatusPayment'){
    //   abp.message.warn(this.l('该订单不能退款'));
    //   return
    // }
    console.log(item);
    
    this.single=true
    this.orderinfo=item

    // var formdata=new GetActivitysInput
    // formdata.queryData = arr;
    // formdata.sorting = null;
    // formdata.maxResultCount = 999;
    // formdata.skipCount = 0;

    var arr=[new QueryData({
      field: "ActivityDetail.Activity.ActivityNo",
      method: "=",
      value: item.activityNo,
      logic: "and"
    })]


    this._ticketDetailService.getPaged('',null,999,0)
    .subscribe(result => {
      // this.orderticket=result.items
    });
  }


  countprice(){

    var arr=[]
    // for (var i =0;i< this.orderticket.length; i++) {
    //   if(this.orderticket[i].checked){
    //     arr.push(this.orderticket[i].id)
    //   }
    // }
    // if(arr.length==0){
      //   abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
      //   return
      // }

      if(arr.length==0){
        return
      }

      console.log(arr,this.rDiscount)
      this._activityService.sumRefund(arr,parseFloat(this.rDiscount))
      .subscribe(result => {
        console.log(result)
        // if(result.resultCode == '000'){
        //   this.refundcount=result.date
        // }else{
        //   abp.message.warn(this.l(result.resultMessage));
        // }

        // window.print();
      });
    }


    printticket(){
      // var hadcheck=0
      // var isPrint=0
      var arr=[]
      // for (var i =0;i< this.orderticket.length; i++) {
      //   if(this.orderticket[i].checked){
      //     arr.push(this.orderticket[i].id)
      //   }
      // }

      if(arr.length==0){
        abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
        return
      }


      console.log()
      this._activityService.refundTicket(arr,parseFloat(this.rDiscount),this.remark)
      .subscribe(result => {
        if(result.resultCode == "000"){

          this.select(this.orderinfo)
          this.notify.success(this.l('RefundSuccess'));
          this.orderlist=[]
          this.single=false
        }else{
          abp.message.warn(result.resultMessage);
        }
      });
    }


    checkAll($event){
      console.log($event)
      // if($event){
      //   for (var i =0;i< this.orderticket.length; i++) {
      //     this.orderticket[i].checked=true
      //   }
      // }else{
      //   for (var i =0;i< this.orderticket.length; i++) {
      //     this.orderticket[i].checked=false
      //   }
      // }
      this.countprice()
    }


    refreshCheckStatus(entityList: any[]): void {
      // 是否全部选中
      const allChecked = entityList.every(value => value.checked === true);
      // 是否全部未选中
      const allUnChecked = entityList.every(value => !value.checked);
      // 是否全选
      this.allChecked = allChecked;
      // 全选框样式控制
      this.checkboxIndeterminate = !allChecked && !allUnChecked;
      // 已选中数据
      this.selectedDataItems = entityList.filter(value => value.checked);

      this.countprice()
    }
  }
