
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {
	UserServiceProxy ,QueryData,
	TicketServiceProxy,
	SalesBySellerDailyServiceProxy,
	SalesBySellerDailyResultDto
	// SellerTicketResultDto,
	// GetTicketsInput
} from '@shared/service-proxies/service-proxies';


import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';
import * as moment from 'moment';
import { CreateOrEditSalerdailyComponent } from './create-or-edit-salerdaily/create-or-edit-salerdaily.component';

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
		private _ticketService: TicketServiceProxy,
		) {
		super(injector);

		// var test=localStorage.getItem('power')
		// this.test=test
		// console.log(test)
	}


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
	}];

	CreationTime=''

	boatId=''
	ticketId=''

	boatList=[]
	ticketlarr=[]

	orderlist=[]
	ticketlist=[]
	visible = false;
	childvisible=false

	disabledDate = (current: Date): boolean => {
		// Can not select days before today and today
		return differenceInCalendarDays(current, new Date()) > 0;
	};

	total:any;
	userList=[]
	schedulelist=[]

	dataList1=[
		{
			userName:'张三',
			saleCount:'aa',
			refundCount:'aa',
			totalCount:'aa',
			cashSaleAmount:'aa',
			cardSaleAmount:'aa',
			weiChatSaleAmount:'aa',
			zhiFuBaoSaleAmount:'aa',
			totalSaleAmount:'aa',
			cashRefundAmount:'aa',
			cardRefundAmount:'aa',
			weiChatRefundAmount:'aa',
			zhiFuBaoRefundAmount:'aa',
			totalRefundAmount:'aa',
			totalAmount:'aa',

		}
	]

	total1=[
		{
			
			saleCount:'aa',
			refundCount:'aa',
			totalCount:'aa',
			cashSaleAmount:'aa',
			cardSaleAmount:'aa',
			weiChatSaleAmount:'aa',
			zhiFuBaoSaleAmount:'aa',
			totalSaleAmount:'aa',
			cashRefundAmount:'aa',
			cardRefundAmount:'aa',
			weiChatRefundAmount:'aa',
			zhiFuBaoRefundAmount:'aa',
			totalRefundAmount:'aa',
			totalAmount:'aa',

		}
	]

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
			console.log(result.items);
			
			if(result.totalCount>0){
				this.dataList = result.items;
				this.total= [result.total]
				this.showPaging(result);
				}
			});

		// this.getuser()
		// this.getschedule()
		// this.getticket()
	}

	// getticket(){
	// 	const formdata = new GetTicketsInput()
	// 	formdata.queryData = [];
	// 	formdata.sorting = null;
	// 	formdata.maxResultCount = 999;
	// 	formdata.skipCount = 0;

	// 	this._ticketService.getPaged(formdata)
	// 	.subscribe(result => {
	// 		this.ticketlarr = result.items;
	// 	});
	// }

	// getschedule(){
	// 	var formdata = new GetSchedulesInput
	// 	formdata.queryData = [];
	// 	formdata.sorting = null;
	// 	formdata.maxResultCount = 999;
	// 	formdata.skipCount = 0;

	// 	this._scheduleService.getPaged(formdata)
	// 	.subscribe(result => {
	// 		this.schedulelist = result.items;
	// 	});
	// }


	// }

	close(): void {
		this.visible = false;
	}
	open(activityIds): void {
		
		this.modalHelper.static(CreateOrEditSalerdailyComponent, { id: activityIds })
		.subscribe(result => {
		  if (result) {
			this.refresh();
		  }
		});
	  }


	// openchild(tickets): void {
	// 	this.childvisible = true;
	// 	this.ticketlist = tickets;
	// }

	// closechild(): void {
	// 	this.childvisible = false;
	// }





	datechange($event): void {
		var myDate = new Date($event);
		var year=myDate.getFullYear();
		var month=myDate.getMonth()+1;
		var date=myDate.getDate();
		var fulldate=year+'-'+month+'-'+date
		this.queryData[2].value=moment(fulldate).format('YYYY-MM-DD HH:mm:ss');
		this.queryData[3].value=moment(fulldate).add(1, 'd').format('YYYY-MM-DD HH:mm:ss');
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


}
