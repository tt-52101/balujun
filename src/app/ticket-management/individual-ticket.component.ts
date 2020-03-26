import { Component, Injector, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { CreateOrEditTicketComponent } from './create-or-edit-ticket/create-or-edit-ticket.component';

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
    OrderTypeEnum
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: './individual-ticket.component.html',
    styleUrls: ['./individual-ticket.component.less'],
    animations: [appModuleAnimation()],
})


export class IndividualTicket extends AppComponentBase implements OnInit {

    constructor(
        injector: Injector,
        private _ticketPriceService: TicketPriceServiceProxy,
        private _payMethodService: PayMethodServiceProxy,
        private _sourceService: SourceServiceProxy,
        private _activityService: ActivityServiceProxy,
        ) {
        super(injector);
        this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
        this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
    }

    isAllOperation=false
    curmenupower=[]
    sourceId=0

    effectivetime=''
    paymethodList=[]

    orderticket = [];
    startDateTime=''
    endDateTime=''
    
    ticketlist=[]

    editindex=-1;
    discountlist=[]
    discount = 100;
    totalprice=0
    totalnum=0

    receive=0

    orderinfo={
        payMethodId: 0,
    }

    disabledDate = (current: Date): boolean => {
        return differenceInCalendarDays(current, new Date()) < 0;
    };

    ngOnInit(): void {
        this.getticket()
        this.getpaymethod()
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
        this._payMethodService.getPagedGet('','',999,0)
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
        });
    }

    addRow(): void {
        this.editindex= this.orderticket.length
        this.orderticket =this.orderticket.concat([{
            ticketid:'',
            ticketname:'请选择票型',
            ticketprice:0,
            ticketcount:0,
            num:1,
            curstomer:[]
        }])
        this.countprice()
    }

    startEdit(i: number): void {
        this.editindex = i;
    }

    ticketchange($event){
        var ticket=this.ticketlist.filter(d => d.id == $event)
        this.orderticket[this.editindex].ticketname=ticket[0].ticketName
        this.orderticket[this.editindex].ticketprice=ticket[0].price
        this.countprice()
    }

    numchange(i){
        if(i>0){
            var curstomer=this.orderticket[this.editindex].curstomer
            if(curstomer.length > i){
                this.orderticket[this.editindex].curstomer =curstomer.splice(0,i)
            }else if(curstomer.length < i){
                var len = i - curstomer.length
                for (var j =0;j < len; j++) {
                    curstomer.push({
                        name:''
                    })
                }
            }
        }
        this.countprice()
    }

    deleteRow(i): void {
        this.orderticket= this.orderticket.filter((item,index) =>  index !=i )
    }

    createOrEdit(id?: number): void {
        console.log(123);
        
        this.modalHelper.static(CreateOrEditTicketComponent, { id: id })
        .subscribe(result => {
            if (result) {
                // this.refresh();
            }
        });
    }

    datechange($event): void {
        this.startDateTime=$event[0]
        this.endDateTime=$event[1]
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
    }


    settlement(){
        if(this.totalnum==0){
            abp.message.warn('请添加票型');
            return
        }
        var orderdata = new CreateActivityModel()
        orderdata.sourceId= this.sourceId;
        orderdata.payMethodId= this.orderinfo.payMethodId;
        orderdata.orderType=OrderTypeEnum.OrderTypeCustomer
        orderdata.startDateTime=moment(this.startDateTime);
        orderdata.endDateTime= moment(this.endDateTime);
        // orderdata.startDateTime=this.startDateTime;
        // orderdata.endDateTime= this.endDateTime;

        console.log(orderdata.startDateTime)
        console.log(orderdata.endDateTime)

        orderdata.activityDetails=[]

        // this._activityService.createActivity(orderdata)
        // .subscribe(result => {
            //     if(result.resultCode == "000"){
                //         this.notify.success(result.resultMessage);
                //         this.orderticket=[]
                //         this.countprice()
                //     }else{
                    //         abp.message.warn(result.resultMessage);
                    //     }
                    // });

                }




            }