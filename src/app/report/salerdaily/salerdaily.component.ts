
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {
	UserServiceProxy ,QueryData,
	SalesBySellerDailyServiceProxy,
	SalesBySellerDailyResultDto,
	TicketPriceServiceProxy,
	GetTicketPricesInput,
	SalesCommonServiceProxy,
	SalesCommonActivityInput,
	SalesCommonActivityDetailInput
} from '@shared/service-proxies/service-proxies';


import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as moment from 'moment';
// import { CreateOrEditSalerdailyComponent } from './create-or-edit-salerdaily/create-or-edit-salerdaily.component';

@Component({
	templateUrl: './salerdaily.component.html',
	styleUrls: ['./salerdaily.component.less'],
	animations: [appModuleAnimation()],
})


export class  SalerDailyComponent extends PagedListingComponentBase<SalesBySellerDailyResultDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _userService: UserServiceProxy,
		private _salesBySellerDailyServiceProxy: SalesBySellerDailyServiceProxy,
		private _salesCommonService: SalesCommonServiceProxy,
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
	}];

	
	userList=[]

	ticketId=''

	ticketlist=[]

	CreationTime=''

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
		
		this._salesBySellerDailyServiceProxy.getPaged(arr,'','',request.maxResultCount,request.skipCount,this.ticketId)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			console.log(result);
			this.dataList = result.items;
			if(result.totalCount>0){
				this.total= [result.total]
			}else{
				this.total=[]
			}
			this.showPaging(result);
		});

		this.getuser()
		this.gettickets()
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
		console.log($event)
		if($event){

			var date1=$event
			var date2=new Date($event.getTime()+24*60*60*1000)

			var year=date1.getFullYear();
			var month = date1.getMonth() + 1;
			var day = date1.getDate();

			var fulldate1=year+'-'+month+'-'+day;

			var year1 =date2.getFullYear();
			var month1 = date2.getMonth() + 1;
			var day1 = date2.getDate();

			var fulldate2=year1+'-'+month1+'-'+day1;

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
		formdata.sorting=''
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
