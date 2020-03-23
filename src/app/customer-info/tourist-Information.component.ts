
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {
	CustomerListDto,
	QueryData,
	CustomerServiceProxy
} from '@shared/service-proxies/service-proxies';
import { CreateOrEditTouristInformationComponent } from './create-or-edit-tourist-information/create-or-edit-tourist-information.component'

@Component({
    templateUrl: './tourist-Information.component.html',
    styleUrls: [],
    animations: [appModuleAnimation()],
})

export class TouristInformation extends PagedListingComponentBase<CustomerListDto> implements OnInit{

	
	constructor(
		injector: Injector,
		// private _customerService: ScheduleServiceProxy,
		// private _boatService: BoatServiceProxy,
		// private _routeService: RouteServiceProxy,
		private _customerService: CustomerServiceProxy
		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}
	
	isAllOperation=false
	curmenupower=[]



	

	scqueryData=[{
		field: "scheduleCode",
		method: "%",
		value: "",
		logic: "and"
	},{
		field: "routeId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "boatId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "scheduleStatus",
		method: "=",
		value: "",
		logic: "and"
	}]

	list=[
		{
			ticketName:'成人票',
			ticketCode:'张三',
			ticketMode:15992591634,
			ticketType:'备注一下',
			checkMethod:1.0,
			ticketClassify:'是',
			sort:'张三',
			sex:'男'
		}
	]

	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {

		this.isTableLoading = false;

	}





	// 编辑
		/**
	* 新增或编辑DTO信息
	* @param id 当前DTO的Id
	*/
	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditTouristInformationComponent, { id: id })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}

	// 删除
	delete(entity: CustomerListDto): void {
		this._customerService.delete(entity.id)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyDeleted'));
		});
	}
	

	//批量删除
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
					this._customerService.batchDelete(ids).subscribe(() => {
						this.refreshGoFirstPage();
						this.notify.success(this.l('SuccessfullyDeleted'));
					});
				}
			},
			);
	}
	
	




}