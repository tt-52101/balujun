
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {ActivityServiceProxy, PagedResultDtoOfActivityListDto, ActivityListDto,
	GetActivitysInput,
	TicketDetailServiceProxy,
	// GetTicketDetailsInput,

	AccountServiceProxy,
	PayMethodServiceProxy,
	SourceServiceProxy,
	TicketAccountServiceProxy,
	QueryData,
} from '@shared/service-proxies/service-proxies';
import { CreateOrEditActivityComponent } from './create-or-edit-activity/create-or-edit-activity.component';
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';

@Component({
	templateUrl: './activity.component.html',
	styleUrls: ['./activity.component.less'],
	animations: [appModuleAnimation()],
})


export class ActivityComponent extends PagedListingComponentBase<ActivityListDto>
implements OnInit {
	
	constructor(
		injector: Injector,
		private _accountService: AccountServiceProxy,
		private _ticketDetailService: TicketDetailServiceProxy,
		private _activityService: ActivityServiceProxy,
		private _payMethodService: PayMethodServiceProxy,
		private _sourceService: SourceServiceProxy,
		private _ticketAccountService: TicketAccountServiceProxy,
		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}

	isAllOperation=false
	curmenupower=[]
	
	visible = false;

	sourceList=[]
	payMethodList=[]

	queryData = [{
		field: "activityNo",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "sourceId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "ActivityType",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "payMethodId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "activityDate",
		method: ">=",
		value: "",
		logic: "and"
	},{
		field: "activityDate",
		method: "<=",
		value: "",
		logic: "and"
	},{
		field: "closed",
		method: "=",
		value: "false",
		logic: "and"
	}];

	boattime=""


	activityinfo=[]
	ticketlist=[]

	selectedDataItems1=[]
	checkboxIndeterminate1=false
	allChecked1=false

	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		const formdata = new GetActivitysInput();
		var arr=[]
		for (var i = 0;i<this.queryData.length; i++) {

			if(this.queryData[i].value){
				arr.push(new QueryData(this.queryData[i]))
			}
		}
		formdata.queryData = arr;
		formdata.sorting = 'creationTime desc'
		formdata.maxResultCount = request.maxResultCount;
		formdata.skipCount = request.skipCount;

		this._activityService.getPaged(formdata)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			console.log(result.items);
			
			this.dataList = result.items;
			this.showPaging(result);
		});

		this.getsource()
		this.getpayMethod()
	}



	settle(){
		const selectCount = this.selectedDataItems.length;
		if (selectCount == 0) {
			abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
			return;
		}
		abp.message.confirm(
			this.l('ConfirmSettleXItemsWarningMessage', selectCount),
			res => {
				if (res) {
					const ids = _.map(this.selectedDataItems, 'id');
					this._ticketAccountService.settleAccount(ids).subscribe(result => {
						if(result.resultCode=='000'){
							this.notify.success(this.l('SuccessfullyEditd'));
						}else{
							this.notify.error(result.resultMessage);
						}
						this.refreshGoFirstPage();
					});
				}
			},
			);
	}


	open(activity,activityNo): void {
		// var formdata=new GetTicketDetailsInput
		var arr=[new QueryData({
			field: "ActivityDetail.Activity.ActivityNo",
			method: "=",
			value: activityNo,
			logic: "and"
		})]
		// formdata.queryData=arr
		// formdata.filterText=''
		// formdata.sorting=''
		// formdata.maxResultCount=999
		// formdata.skipCount=0
		this._ticketDetailService.getPaged(arr,'','',990,0)
		.subscribe(result => {
			console.log(result)
			this.visible = true;
			// this.activityinfo = [activity];
			this.ticketlist = result.items;
		});
	}


	close(): void {
		this.visible = false;
	}

	getsource(){
		this._sourceService.getPaged('','',999,0)
		.subscribe(result => {
			this.sourceList = result.items;
		});
	}

	getpayMethod(){
		this._payMethodService.getPaged('','',999,0)
		.subscribe(result => {
			this.payMethodList = result.items;
		});
	}

	datechange($event): void {
		this.queryData[4].value=$event[0]
		this.queryData[5].value=$event[1]
	}



	reprint(){
		var idarr=[]
		var ticketarr=[]
		for (var i =0;i< this.ticketlist.length; i++) {
			if(this.ticketlist[i].checked){
				idarr.push(this.ticketlist[i].id)
				ticketarr.push(this.ticketlist[i])
			}
		}

		console.log(idarr)

		if(idarr.length==0){
			abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
			return
		}



	}

	checkAll1($event){
		console.log($event)
		if($event){
			for (var i =0;i< this.ticketlist.length; i++) {
				this.ticketlist[i].checked=true
			}
		}else{
			for (var i =0;i< this.ticketlist.length; i++) {
				this.ticketlist[i].checked=false
			}
		}
	}


	refreshCheckStatus1(entityList: any[]): void {
		// 是否全部选中
		const allChecked1 = entityList.every(value => value.checked === true);
		// 是否全部未选中
		const allUnChecked1 = entityList.every(value => !value.checked);
		// 是否全选
		this.allChecked1 = allChecked1;
		// 全选框样式控制
		this.checkboxIndeterminate1 = !allChecked1 && !allUnChecked1;
		// 已选中数据
		this.selectedDataItems1 = entityList.filter(value => value.checked);

	}














	/**
	* 新增或编辑DTO信息
	* @param id 当前DTO的Id
	*/
	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditActivityComponent, { id: id })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}
	
	
	/**
	* 删除功能
	* @param entity 角色的实体信息
	*/
	delete(entity: ActivityListDto): void {
		this._activityService.delete(entity.id)
		.subscribe(() => {
		/**
		* 刷新表格数据并跳转到第一页（`pageNumber = 1`）
		*/
		this.refreshGoFirstPage();
		this.notify.success(this.l('SuccessfullyDeleted'));
	});
	}
	
	/**
	* 批量删除
	*/
	batchDelete(): void {
		const selectCount = this.selectedDataItems.length;
		if (selectCount <= 0) {
			abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
			return;
		}

		abp.message.confirm(
			this.l('ConfirmDeleteXItemsWarningMessage', selectCount),
			res => {
				if (res) {
					const ids = _.map(this.selectedDataItems, 'id');
					this._activityService.batchDelete(ids).subscribe(() => {
						this.refreshGoFirstPage();
						this.notify.success(this.l('SuccessfullyDeleted'));
					});
				}
			},
			);
	}
	
	
	/**
	* 导出为Excel表
	*/
	exportToExcel(): void {
		abp.message.error('功能开发中！！！！');
		// this._activityService.getActivityexportToExcel().subscribe(result => {
			// this._fileDownloadService.downloadTempFile(result);
			// });
		}
		
	}

