
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {
	SalesBySellerServiceProxy,
	SalesBySellerResultDto,
	UserServiceProxy,
	QueryData,
	TicketPriceServiceProxy,
	GetTicketPricesInput,

	SalesCommonServiceProxy,
	SalesCommonActivityInput,
	SalesCommonActivityDetailInput
} from '@shared/service-proxies/service-proxies';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
	templateUrl: './salerticket.component.html',
	styleUrls: ['./salerticket.component.less'],
	animations: [appModuleAnimation()],
})


export class  SalerTicketComponent extends PagedListingComponentBase<SalesBySellerResultDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _salesBySellerService: SalesBySellerServiceProxy,
		private _salesCommonService: SalesCommonServiceProxy,
		private _userService: UserServiceProxy,
		private _ticketPriceService: TicketPriceServiceProxy,
		) {
		super(injector);
		this.documentHeight=document.body.offsetHeight
	}



	queryData = [{
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

	ticketId=''

	ticketlist=[]

	collectionTime=''

	total:any;


	documentHeight=0

	ordervisible=false

	orderlist=[]
	orderids=[]
	oindex=1
	ototal=100
	opagesize=10

	ticketvisible=false
	orderid=0
	ticketdetail=[]
	tindex=1
	ttotal=100
	tpagesize=10

	disabledDate = (current: Date): boolean => {
		return differenceInCalendarDays(current, new Date()) > 0;
	};

	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		var arr=[]
		for (var i = this.queryData.length - 1; i >= 0; i--) {
			if(this.queryData[i].value){
				arr.push(new QueryData(this.queryData[i]))
			}
		}
		this._salesBySellerService.getPaged(arr,'','',request.maxResultCount,request.skipCount,this.ticketId)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			this.dataList = result.items;
			console.log(result.filters.Sellers)
			this.userList=result.filters.Sellers
			this.ticketlist=result.filters.Tickets
			if(result.totalCount>0){
				this.total= [result.total]
			}else{
				this.total=[]
			}
			this.showPaging(result);
		});

		// this.getuser()

		// this.gettickets()
	}

	onChange($event): void {
		if($event == null){
			this.ticketId=''
		}
	}



	gettickets(){
		const formdata = new GetTicketPricesInput()
		formdata.queryData = [];
		formdata.sorting = '';
		formdata.maxResultCount = 999;
		formdata.skipCount = 0;

		this._ticketPriceService.getPaged(formdata)
		.subscribe(result => {
			this.ticketlist = result.items;
		});
	}

	datechange($event): void {
		if($event.length>0){
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

			this.queryData[1].value=moment(fulldate1).format('YYYY-MM-DD HH:mm:ss')
			this.queryData[2].value=moment(fulldate2).format('YYYY-MM-DD HH:mm:ss')
		}else{
			this.queryData[1].value=''
			this.queryData[2].value=''
		}
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
			'',
			999,
			0
			)
		.subscribe((result) => {
			this.userList = result.items;
		});
	}




	openorder(ids): void {
		this.orderids=ids
		this.ordervisible = true;
		this.getorder()
	}

	getorder(){
		var formdata=new SalesCommonActivityInput
		formdata.activityIds=this.orderids
		formdata.filterText=''
		formdata.sorting='activityDate desc'
		formdata.maxResultCount=this.opagesize
		formdata.skipCount=(this.oindex - 1) * this.opagesize

		this._salesCommonService.getPagedActivities(formdata)
		.subscribe(result => {
			this.ototal=result.totalCount
			this.orderlist = result.items;
		});
	}

	oSizeChange($event):void{
		this.oindex=1
		this.opagesize=$event
		this.getorder()
	}

	oIndexChange($event):void{
		this.oindex=$event
		this.getorder()
	}

	closeorder(): void {
		this.oindex=1
		this.ordervisible = false;
	}


	openticket(id): void {
		this.orderid=id
		this.ticketvisible = true;
		this.getticket()
	}

	getticket(){
		var formdata=new SalesCommonActivityDetailInput
		formdata.activityId=this.orderid+''
		formdata.filterText=''
		formdata.sorting=''
		formdata.maxResultCount=this.tpagesize
		formdata.skipCount=(this.tindex - 1) * this.tpagesize

		this._salesCommonService.getPagedActivityDetails(formdata)
		.subscribe(result => {
			this.ttotal=result.totalCount
			this.ticketdetail = result.items;
		});
	}


	tSizeChange($event):void{
		this.tindex=1
		this.tpagesize=$event
		this.getorder()
	}

	tIndexChange($event):void{
		this.tindex=$event
		this.getorder()
	}

	closeticket(): void {
		this.tindex=1
		this.ticketvisible = false;
	}

}
