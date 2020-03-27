
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {ActivityServiceProxy, PagedResultDtoOfActivityListDto, ActivityListDto,
	GetActivitysInput,
	TicketDetailServiceProxy,
	AccountServiceProxy,
	PayMethodServiceProxy,
	SourceServiceProxy,

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
		private _sourceService: SourceServiceProxy
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
		formdata.sorting = request.sorting
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


	search(){
		var formdata = new GetActivitysInput
		var arr=[]
		for (var i = 0;i<this.queryData.length; i++) {
			if(this.queryData[i].value){
				arr.push(new QueryData(this.queryData[i]))
			}
		}
		formdata.queryData = arr;
		formdata.sorting = null;
		formdata.maxResultCount = 999;
		formdata.skipCount = 0;

		this._activityService.getPaged(formdata)
		.subscribe(result => {
			this.dataList = result.items;
			this.showPaging(result);
		});
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
					// this._accountService.settleAccount(ids).subscribe(result => {
					// 	if(result.resultCode=='000'){
					// 		this.notify.success(this.l('SuccessfullyEditd'));
					// 	}else{
					// 		this.notify.error(result.resultMessage);
					// 	}
					// 	this.refreshGoFirstPage();
					// });
				}
			},
			);
	}


	open(activity,activityNo): void {
		var arr=[new QueryData({
			field: "ActivityDetail.Activity.ActivityNo",
			method: "=",
			value: activityNo,
			logic: "and"
		})]
		// this._ticketDetailService.getPaged(arr,null,999,0)
		// .subscribe(result => {
		// 	// console.log(result)
		// 	this.visible = true;
		// 	this.activityinfo = [activity];
		// 	this.ticketlist = result.items;
		// });
	}


	close(): void {
		this.visible = false;
	}

	getsource(){
		// this._sourceService.getPaged(null,999,0)
		// .subscribe(result => {
		// 	this.sourceList = result.items;
		// });
	}

	getpayMethod(){
		// this._payMethodService.getPaged(null,999,0)
		// .subscribe(result => {
		// 	this.payMethodList = result.items;
		// });
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


	// 	this._ticketDetailService.printTicketDetail(idarr)
	// 	.subscribe(result => {
	// 		this.open(this.activityinfo[0],this.activityinfo[0].activityNo)
	// 		this.notify.success(this.l('PrintSuccess'));

	// 		this.allChecked1=false

	// 		// LODOP=getLodop();
	// 		// var top = 22; //最高坐标
	// 		// var left = 100; //最左坐标
	// 		// var width = 10; //上边距
	// 		// var height = 12; //右边距
	// 		// var QRcodeWidth = 120; //二维码大小
	// 		// var paperWidth = 700; //纸张宽度
	// 		// var paperHeight = 1200; //纸张长度
	// 		// var fontWidth = 400; //文字区域宽度
	// 		// var fontHeight = 20; //文字区域高度
	// 		// LODOP.SET_PRINT_STYLEA(0, "DataCharset", "UTF-8");
	// 		// LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
	// 		// LODOP.PRINT_INITA("");
	// 		// LODOP.SET_PRINT_STYLE("FontSize", 10);
	// 		// //设置打印方向及纸张类型，自定义纸张宽度，设定纸张高，
	// 		// LODOP.SET_PRINT_PAGESIZE(1, paperWidth, paperHeight, "");
	// 		// for (var i = 0; i < ticketarr.length; i++) {
	// 			//   var item = ticketarr[i];

	// 			//   var saleDate=moment(item.schedule.saleDate).format('YYYY-MM-DD');
	// 			//   var startTime=moment(item.schedule.startTime).format('HH:mm:ss');

	// 			//   LODOP.NewPage(); //创建新的打印页
	// 			//   LODOP.ADD_PRINT_BARCODE(top + 15, left + height, QRcodeWidth, QRcodeWidth, "QRCode", item.qrCode);

	// 			//   LODOP.SET_PRINT_STYLEA(0, "Angle", 270); //逆时针旋转270度
	// 			//   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 5 * fontHeight, fontWidth, fontHeight, "票    号：" + item.ticketNo);
	// 			//   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
	// 			//   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 4 * fontHeight, fontWidth, fontHeight, "船    名：" + item.schedule.boat.boatName);
	// 			//   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
	// 			//   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 3 * fontHeight, fontWidth, fontHeight, "航班日期：" + saleDate);
	// 			//   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
	// 			//   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 2 * fontHeight, fontWidth, fontHeight, "开船时间：" + startTime);
	// 			//   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
	// 			//   LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 1 * fontHeight, fontWidth, fontHeight, "乘客姓名：" + item.customer.customerName);
	// 			//   LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
	// 			// }
	// 			// //LODOP.PRINT();
	// 			// LODOP.PREVIEW()

	// 			// window.print();
	// 		});
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

