
import { Component, Injector, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import {
	TicketDetailServiceProxy,
	CheckTicketServiceProxy,


	QueryData,
} from '@shared/service-proxies/service-proxies';



@Component({
	templateUrl: './checkticket.component.html',
	styleUrls: ['./checkticket.component.less'],
	animations: [appModuleAnimation()],
})


export class CheckTicket extends AppComponentBase implements OnInit {
	
	constructor(
		injector: Injector,

		private _ticketDetailService: TicketDetailServiceProxy,
		private _checkTicketService: CheckTicketServiceProxy

		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}

	isAllOperation=false
	curmenupower=[]


	
	ticketlist=[]

	queryData = [{
		field: "ticketNo",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "qrcode",
		method: "=",
		value: "",
		logic: "and"
	}];

	ticketdetailId=''
	ticketNo=''
	qrcode=''
	time='1'
	ngOnInit(): void {

	}


	getticket(): void {
		var arr=[]
		for (var i = this.queryData.length - 1; i >= 0; i--) {
			if (this.queryData[i].value) {
				arr.push(new QueryData(this.queryData[i]))
			}
		}
		this._ticketDetailService.getPaged(arr,'','',999,0)
		.subscribe(result => {
			if(result.totalCount==0){
				abp.message.warn('无相关票据');
			}else{
				this.ticketlist = result.items;
			}
		});
	}


	numchange($event){
console.log($event)
	}


	check(){
		if(this.ticketlist.length == 0){
			abp.message.warn('请先查询票据');
			return
		}
		if(!this.time){
			abp.message.warn('请输入刷票次数');
			return
		}

		var ticket=this.ticketlist[0]
		this._checkTicketService.ticketDetailIdOpen(ticket.qrcode,ticket.ticketNo,ticket.activityDetailId)
		.subscribe(result => {
			console.log(result)
			this.getticket()
		});
	}





}

