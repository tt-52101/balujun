import { Component, Injector, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';

import { AppComponentBase } from '@shared/component-base/app-component-base';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as moment from 'moment';

import { getLodop } from '../common/lodop.js';

let LODOP;

import {
    ActivityServiceProxy,
    CreateActivityModel,
    TicketPriceServiceProxy,
    GetTicketPricesInput,
    PayMethodServiceProxy,
    SourceServiceProxy,
    QueryData,
    OrderTypeEnum,
    CreateActivityDetailModel
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
        if(this.ticketlist.length>0){
            this.editindex= this.orderticket.length
            this.orderticket =this.orderticket.concat([{
                ticketid:this.ticketlist[0].id,
                ticketname:this.ticketlist[0].ticketName,
                ticketprice:this.ticketlist[0].price,
                ticketcount:this.ticketlist[0].price,
                num:1,
                // curstomer:[{
                    //     certificatesNum:'',
                    //     customerName:'',
                    //     mobile:'',
                    //     sex:'Man',
                    //     verifiableType:'IdentityCard',
                    // }]
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
        // if(i>0){
            //     var curstomer=this.orderticket[this.editindex].curstomer
            //     if(curstomer.length > i){
                //         this.orderticket[this.editindex].curstomer =curstomer.splice(0,i)
                //     }else if(curstomer.length < i){
                    //         var len = i - curstomer.length
                    //         for (var j =0;j < len; j++) {
                        //             curstomer.push({
                            //                 certificatesNum:'',
                            //                 customerName:'',
                            //                 mobile:'',
                            //                 sex:'Man',
                            //                 verifiableType:'IdentityCard',
                            //             })
                            //         }
                            //     }
                            // }
                            this.countprice()
                        }

                        deleteRow(i): void {
                            this.orderticket= this.orderticket.filter((item,index) =>  index !=i )
                        }

                        createOrEdit(i): void {
                            localStorage.setItem('orderticket',JSON.stringify(this.orderticket))
                            this.modalHelper.static(CreateOrEditCustomerComponent, { tindex: i })
                            .subscribe(result => {
                                if (result) {
                                    // this.refresh();
                                }
                            });
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
                            console.log(this.totalprice)
                            // this.change=this.totalprice - receive
                            
                            this.totalnum=totalnum
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
                                activityDetails.push(new CreateActivityDetailModel({
                                    ticketPriceId:item.ticketid,
                                    quantity:item.num,

                                    scheduleId:0,
                                    customerId:0,

                                }))
                            })
                            orderdata.discount=this.discount / 100

                            orderdata.activityDetails=activityDetails

                            this._activityService.createActivity(orderdata)
                            .subscribe(result => {
                                console.log(result)
                                if(result.resultCode == "000"){
                                    this.notify.success(result.resultMessage);
                                    this.orderticket=[]
                                    this.countprice()
                                }else{
                                    abp.message.warn(result.resultMessage);
                                }
                            });


                            // LODOP=getLodop();
                            // var top = 22; //最高坐标
                            // var left = 100; //最左坐标
                            // var width = 10; //上边距
                            // var height = 12; //右边距
                            // var QRcodeWidth = 120; //二维码大小
                            // var paperWidth = 700; //纸张宽度
                            // var paperHeight = 1200; //纸张长度
                            // var fontWidth = 400; //文字区域宽度
                            // var fontHeight = 20; //文字区域高度
                            // LODOP.SET_PRINT_STYLEA(0, "DataCharset", "UTF-8");
                            // LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
                            // LODOP.PRINT_INITA("");
                            // LODOP.SET_PRINT_STYLE("FontSize", 10);
                            // //设置打印方向及纸张类型，自定义纸张宽度，设定纸张高，
                            // LODOP.SET_PRINT_PAGESIZE(1, paperWidth, paperHeight, "");
                            // // for (var i = 0; i < orderticket.length; i++) {
                                // //   var item = orderticket[i];

                                // //   var saleDate=moment(item.schedule.saleDate).format('YYYY-MM-DD');
                                // //   var startTime=moment(item.schedule.startTime).format('HH:mm:ss');

                                // //   LODOP.NewPage(); //创建新的打印页
                                // //   LODOP.ADD_PRINT_BARCODE(top + 15, left + height, QRcodeWidth, QRcodeWidth, "QRCode", item.qrCode);

                                // //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270); //逆时针旋转270度
                                // //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 5 * fontHeight, fontWidth, fontHeight, "票    号：" + item.ticketNo);
                                // //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
                                // //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 4 * fontHeight, fontWidth, fontHeight, "船    名：" + item.schedule.boat.boatName);
                                // //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
                                // //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 3 * fontHeight, fontWidth, fontHeight, "航班日期：" + saleDate);
                                // //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
                                // //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 2 * fontHeight, fontWidth, fontHeight, "开船时间：" + startTime);
                                // //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
                                // //   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 1 * fontHeight, fontWidth, fontHeight, "乘客姓名：" + item.customer.customerName);
                                // //   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
                                // // }

                                // LODOP.PREVIEW()
                                // // LODOP.PRINT();


                            }




                        }