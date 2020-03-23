
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {GateRecordServiceProxy, PagedResultDtoOfGateRecordListDto, GateRecordListDto,DeviceServiceProxy,GetDevicesInput } from '@shared/service-proxies/service-proxies';
import { CreateOrEditGateRecordComponent } from './create-or-edit-gate-record/create-or-edit-gate-record.component';
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';

import * as moment from 'moment';

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

@Component({
	templateUrl: './gate-record.component.html',
	styleUrls: ['./gate-record.component.less'],
	animations: [appModuleAnimation()],
})


export class  GateRecordComponent extends PagedListingComponentBase<GateRecordListDto>
implements OnInit {
	
	constructor(
		injector: Injector,
		private _gateRecordService: GateRecordServiceProxy,
		private _deviceService: DeviceServiceProxy,  
		) {
		super(injector);
	}

	devicList=[]
	queryData=[{
		field: "deviceId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "creationTime",
		method: ">=",
		value: "",
		logic: "and"
	},{
		field: "creationTime",
		method: "<=",
		value: "",
		logic: "and"
	}]

	
	/**
	* 获取后端数据列表信息
	* @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
	* @param pageNumber 当前页码
	* @param finishedCallback 完成后回调函数
	*/
	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		this._gateRecordService.getPaged(
			'',
			request.sorting,
			request.maxResultCount,
			request.skipCount,
			)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			this.dataList = result.items;
			this.showPaging(result);
		});


		
		const formdata = new GetDevicesInput();
		formdata.queryData = []
		formdata.sorting = null
		formdata.maxResultCount = 999;
		formdata.skipCount = 0;

		this._deviceService.getPaged(formdata)
		.subscribe(result => {
			this.devicList = result.items;
		});
	}
	
	/**
	* 新增或编辑DTO信息
	* @param id 当前DTO的Id
	*/
	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditGateRecordComponent, { id: id })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}
	
	disabledDate = (current: Date): boolean => {
		// Can not select days before today and today
		return differenceInCalendarDays(current, new Date()) > 0;
	};

	datechange($event): void {
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

	}

	/**
	* 删除功能
	* @param entity 角色的实体信息
	*/
	delete(entity: GateRecordListDto): void {
		this._gateRecordService.delete(entity.id)
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
					this._gateRecordService.batchDelete(ids).subscribe(() => {
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
		// this._gateRecordService.getGateRecordexportToExcel().subscribe(result => {
			// this._fileDownloadService.downloadTempFile(result);
			// });
		}
		
	}

