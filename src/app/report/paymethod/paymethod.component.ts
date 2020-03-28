
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {PayMethodServiceProxy, PagedResultDtoOfPayMethodListDto,QueryData,TicketServiceProxy,
	SalesByPayMethodServiceProxy,SalesByPayMethodResultDto,SalesCommonServiceProxy
} from '@shared/service-proxies/service-proxies';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
	templateUrl: './paymethod.component.html',
	styleUrls: ['./paymethod.component.less'],
	animations: [appModuleAnimation()],
})


export class PayMethodComponent extends PagedListingComponentBase<SalesByPayMethodResultDto>
	implements OnInit {

	constructor(
		injector: Injector,
		private _payMethodService: PayMethodServiceProxy,
		private _salesByPayMethodServiceProxy: SalesByPayMethodServiceProxy,
		private _ticketService: TicketServiceProxy,
		private _SalesCommonServiceProxy: SalesCommonServiceProxy,
	) {
		super(injector);
	}

	queryData = [{
		field: "PayMethodId",
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

	payMethodList = []
	boatId = ''
	ticketId = ''
	routeId = ''

	boatList = []
	ticketarr = []
	routelist = []



	orderlist = []
	ticketlist = []
	visible = false;
	childvisible = false

	collectionTime = ''

	total: any;

	protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

		var arr = []

		for (var i = 0; i < this.queryData.length; i++) {
			if (this.queryData[i].value) {
				arr.push(new QueryData(this.queryData[i]))
			}
		}
		this._salesByPayMethodServiceProxy.getPaged(arr,'',request.sorting,request.maxResultCount,request.skipCount,'')
			.finally(() => {
				finishedCallback();
			})
			.subscribe(result => {
				this.dataList = result.items;
				if (result.totalCount > 0) {
					this.total = [result.total]
				}
				this.showPaging(result);
			});

		this.getpaymethod()
	}


	datechange($event): void {

		if ($event[0].getTime() == $event[1].getTime()) {
			$event[1] = new Date($event[1].getTime() + 24 * 60 * 60 * 1000)
		}
		var year = $event[0].getFullYear();
		var month = $event[0].getMonth() + 1;
		var day = $event[0].getDate();

		var fulldate1 = year + '-' + month + '-' + day;

		var year = $event[1].getFullYear();
		var month = $event[1].getMonth() + 1;
		var day = $event[1].getDate();

		var fulldate2 = year + '-' + month + '-' + day;

		this.queryData[1].value = moment(fulldate1).format('YYYY-MM-DD HH:mm:ss')
		this.queryData[2].value = moment(fulldate2).format('YYYY-MM-DD HH:mm:ss')

	}

	disabledDate = (current: Date): boolean => {
		// Can not select days before today and today
		return differenceInCalendarDays(current, new Date()) > 0;
	};


	open(id): void {
		console.log(id);
		
		this.visible = true;

		this._SalesCommonServiceProxy.getPagedActivities('','',99,0,[id])

		.subscribe(result => {
		

			this.visible = true;
			this.orderlist = result.items;
			console.log(this.orderlist);
		});
	}

	close(): void {
		this.visible = false;
	}


	openchild(tickets): void {
		this.childvisible = true;
		this.ticketlist = tickets;
	}

	closechild(): void {
		this.childvisible = false;
	}



	getpaymethod() {
		this._payMethodService.getPaged('', '', 999, 0)
			.subscribe(result => {
				this.payMethodList = result.items
			});
	}

}
