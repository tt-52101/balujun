
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {VerifiableSetServiceProxy, PagedResultDtoOfVerifiableSetListDto, VerifiableSetListDto ,DeviceServiceProxy,GetDevicesInput,QueryData } from '@shared/service-proxies/service-proxies';
import { CreateOrEditVerifiableSetComponent } from './create-or-edit-verifiable-set/create-or-edit-verifiable-set.component';
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';

@Component({
	templateUrl: './verifiable-set.component.html',
	styleUrls: ['./verifiable-set.component.less'],
	animations: [appModuleAnimation()],
})


export class  VerifiableSetComponent extends PagedListingComponentBase<VerifiableSetListDto>
implements OnInit {
	
	constructor(
		injector: Injector,
		private _verifiableSetService: VerifiableSetServiceProxy,
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
	}]
	
	/**
	* 获取后端数据列表信息
	* @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
	* @param pageNumber 当前页码
	* @param finishedCallback 完成后回调函数
	*/
	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		this._verifiableSetService.getPaged(
			request.filterText,
			request.sorting,
			request.maxResultCount,
			request.skipCount,
			)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			console.log(result.items)
			this.dataList = result.items;
			this.showPaging(result);
		});


		const formdata = new GetDevicesInput();
		formdata.queryData = [new QueryData(this.queryData[0])]
		formdata.filterText=''
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
		this.modalHelper.static(CreateOrEditVerifiableSetComponent, { id: id })
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
	delete(entity: VerifiableSetListDto): void {
		this._verifiableSetService.delete(entity.id)
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
					this._verifiableSetService.batchDelete(ids).subscribe(() => {
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
		// this._verifiableSetService.getVerifiableSetexportToExcel().subscribe(result => {
			// this._fileDownloadService.downloadTempFile(result);
			// });
		}

	}

