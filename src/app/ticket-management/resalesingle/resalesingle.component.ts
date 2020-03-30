import { Component, Injector, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';


import { AppComponentBase } from '@shared/component-base/app-component-base';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as moment from 'moment';


import {
    ActivityServiceProxy,
    CreateActivityModel,
    TicketPriceServiceProxy,
    GetTicketPricesInput,
    PayMethodServiceProxy,
    SourceServiceProxy,
    QueryData,
    OrderTypeEnum,
    CreateActivityDetailModel,
    TicketDetailServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './resalesingle.component.html',
    styleUrls: ['./resalesingle.component.less'],
    animations: [appModuleAnimation()],
})


export class ResaleSingle extends AppComponentBase implements OnInit {

    constructor(
        injector: Injector,
        private _ticketPriceService: TicketPriceServiceProxy,
        private _payMethodService: PayMethodServiceProxy,
        private _sourceService: SourceServiceProxy,
        private _activityService: ActivityServiceProxy,
        private _ticketDetailService: TicketDetailServiceProxy, 
        ) {
        super(injector);
        this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
        this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
        this.effectivetime =[new Date(),new Date()]
        this.datechange([new Date(),new Date()])
    }

    isAllOperation=false
    curmenupower=[]
    sourceId=0

    effectivetime=[]
    paymethodList=[]

    orderticket = [];
    startDateTime=''
    endDateTime=''
    
    ticketlist=[]

    editindex=-1;
    discountlist=[]
    discount = 100;
    totalprice=0
    change=0
    totalnum=0

    receive=0
    remark=''
    orderinfo={
        payMethodId: 0,
    }

    disabledDate = (current: Date): boolean => {
        return differenceInCalendarDays(current, new Date()) < 0;
    };

    ngOnInit(): void {
        this.getticket()
        this.getpaymethod()
        this.getsource()
        for (var i = 100; i >= 1; i--) {
            this.discountlist.push(i)
        }
    }

    getsource(){
        this._sourceService.getPaged('','',999,0)
        .subscribe(result => {
            for (var i = 0; i<result.items.length;i++) {
                if(result.items[i].sourceCode=='Reception'){
                    this.sourceId=result.items[i].id
                }
            }
        });
    }


    getpaymethod(){
        this._payMethodService.getPaged('','',999,0)
        .subscribe(result => {
            this.paymethodList = result.items;
            this.orderinfo.payMethodId=result.items[0].id
        });
    }

    getticket(){
        var arr=[]
        arr.push(new QueryData({
            field: "isEnabled",
            method: "=",
            value: 'true',
            logic: "and"
        }))
        var formdata=new GetTicketPricesInput
        formdata.queryData=arr
        formdata.filterText=''
        formdata.sorting=''
        formdata.maxResultCount=999
        formdata.skipCount=0
        
        this._ticketPriceService.getPagedCustomer(formdata)
        .subscribe(result => {
            this.ticketlist = result.items;
            var orderticket=[]
            this.ticketlist.forEach(function(titem){
                orderticket.push({
                    ticketid:titem.id,
                    ticketname:titem.ticketName,
                    ticketprice:titem.price,
                    ticketcount:0,
                    num:0,
                })
            })
            this.orderticket=orderticket
        });
    }

    addRow(): void {
        if(this.ticketlist.length>0){
            this.editindex= this.orderticket.length
            this.orderticket =this.orderticket.concat([{
                ticketid:this.ticketlist[0].id,
                ticketname:this.ticketlist[0].ticketName,
                ticketprice:this.ticketlist[0].price,
                ticketcount:0,
                num:0,
            }])
            this.countprice()
        }else{
            abp.message.warn('暂无散客票');
        }

    }

    startEdit(i: number): void {
        this.editindex = i;
    }

    ticketchange($event){
        if($event){
            var ticket=this.ticketlist.filter(d => d.id == $event)
            this.orderticket[this.editindex].ticketname=ticket[0].ticketName
            this.orderticket[this.editindex].ticketprice=ticket[0].price
            this.countprice()
        }
    }

    numchange(i){
        this.countprice()
    }

    deleteRow(i): void {
        this.orderticket= this.orderticket.filter((item,index) =>  index !=i )
        this.countprice()
    }



    datechange($event): void {

        var year=$event[0].getFullYear();
        var month = $event[0].getMonth() + 1;
        var day = $event[0].getDate();

        var fulldate1=year+'-'+month+'-'+day;

        var year=$event[1].getFullYear();
        var month = $event[1].getMonth() + 1;
        var day = $event[1].getDate();

        var fulldate2=year+'-'+month+'-'+day;

        this.startDateTime=fulldate1
        this.endDateTime=fulldate2

    }

    discountchange($event){
        this.discount=$event
        this.countprice()  
    }

    countprice(){
        var totalprice=0
        var totalnum=0
        this.orderticket.forEach(function(item){
            if(item.ticketid){
                item.ticketcount=item.ticketprice * item.num
                totalprice +=item.ticketcount
                totalnum +=item.num
            }
        })
        this.totalprice=totalprice * this.discount / 100

        this.totalnum=totalnum
        this.parsenum()
    }
    parsenum(){
        var change=parseFloat((this.receive - this.totalprice)+'').toFixed(2)
        return change
    }

    settlement(){
        if(this.totalnum==0){
            abp.message.warn('请添加票型');
            return
        }

        if(!this.startDateTime || !this.endDateTime){
            abp.message.warn('请选择有效日期');
            return
        }

        if(this.receive<this.totalprice){
            abp.message.warn('实收金额小于应收金额');
            return
        }

        var orderdata = new CreateActivityModel()
        orderdata.sourceId= this.sourceId;
        orderdata.payMethodId= this.orderinfo.payMethodId;
        orderdata.orderType=OrderTypeEnum.OrderTypeCustomer
        orderdata.startDateTime=this.startDateTime;
        orderdata.endDateTime= this.endDateTime;
        orderdata.remark=this.remark

        var activityDetails=[]
        this.orderticket.forEach(function(item){
            if(item.num>0){
                activityDetails.push(new CreateActivityDetailModel({
                    ticketPriceId:item.ticketid,
                    quantity:item.num,
                    customerId:0,
                }))
            }
        })
        orderdata.discount=this.discount / 100

        orderdata.activityDetails=activityDetails

        this._activityService.createActivity(orderdata)
        .subscribe(result => {
            console.log(result)
            if(result.resultCode == "000"){
                this.notify.success(result.resultMessage);

                this.orderticket=[]
                this.getticket()
                this.receive=0
                this.countprice()

                
            }else{
                abp.message.warn(result.resultMessage);
            }
        });

    }

}