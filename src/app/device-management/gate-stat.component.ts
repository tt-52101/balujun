
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {HistoryServiceProxy, PagedResultDtoOfGateHistoryResultDto,GateHistoryResultDto ,QueryData,
	DeviceServiceProxy,GetDevicesInput,
	TicketServiceProxy,
	// GetTicketsInput,
	// ScheduleServiceProxy,GetSchedulesInput,
	UserServiceProxy
} from '@shared/service-proxies/service-proxies';
import { CreateOrEditGateRecordComponent } from './create-or-edit-gate-record/create-or-edit-gate-record.component';
// import { AppConsts } from '@shared/AppConsts';
//import { FileDownloadService } from '@shared/utils/file-download.service';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
	templateUrl: './gate-stat.component.html',
	styleUrls: ['./gate-stat.component.less'],
	animations: [appModuleAnimation()],
})


export class  GateStatComponent extends PagedListingComponentBase<GateHistoryResultDto>
implements OnInit {
	
	constructor(
		injector: Injector,
		private _historyService: HistoryServiceProxy,
		private _deviceService: DeviceServiceProxy,
		private _ticketService: TicketServiceProxy,
		// private _scheduleService: ScheduleServiceProxy,
		private _userService: UserServiceProxy,
		) {
		super(injector);
	}


	queryData=[{
		field: "DeviceId",
		method: "=",
		value: "",
		logic: "and"
	},
	{
		field: "TicketId",
		method: "=",
		value: "",
		logic: "and"
	},
	// {
	// 	field: "CreatorUserId ",
	// 	method: "=",
	// 	value: "",
	// 	logic: "and"
	// },{
	// 	field: "CreationTime",
	// 	method: ">=",
	// 	value: "",
	// 	logic: "and"
	// },{
	// 	field: "CreationTime",
	// 	method: "<=",
	// 	value: "",
	// 	logic: "and"
	// }
]
	collectionTime=''

	Devices=[]
	userList=[]
	Checkers=[]
	Tickets=[]
	ticketId=''
	scheduleId=''

	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		var arr=[]
		for (var i = this.queryData.length - 1; i >= 0; i--) {
			if(this.queryData[i].value){
				arr.push(new QueryData(this.queryData[i]))
			}
		}

		
		this._historyService.getPagedStat(
			arr,
			'',
			request.sorting,
			request.maxResultCount,
			request.skipCount,
			this.ticketId,
			// this.scheduleId
			)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {

			this.dataList = result.items;
			console.log(result);
			
			this.showPaging(result);
			this.getdevice()
			this.getticket()
			// this.getuser()
		});
	}

		
	getdevice(){
		const formdata = new GetDevicesInput();
		formdata.queryData = [];
		formdata.sorting = null
		formdata.maxResultCount = 999;
		formdata.skipCount = 0;
		this._deviceService.getPaged(formdata)
		.subscribe(result => {
			this.Devices = result.items;
			this.showPaging(result);
		});
	}

	// getuser(){
	// 	this._userService
	// 	.getPaged(
	// 		undefined,
	// 		undefined,
	// 		undefined,
	// 		undefined,
	// 		undefined,
	// 		'',
	// 		null,
	// 		999,
	// 		0
	// 		)
	// 	.subscribe((result) => {
	// 		this.userList = result.items;
	// 	});
	// }


	getticket(){
		this._ticketService.getPaged('','',99,0)
		.subscribe(result => {
			this.Tickets = result.items;
			this.showPaging(result);
		});
	}


	disabledDate = (current: Date): boolean => {
		return differenceInCalendarDays(current, new Date()) > 0;
	};

	datechange($event): void {
		console.log($event)
		if($event.length == 2){
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
	}
}

