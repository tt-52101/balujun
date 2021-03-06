
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { PowerServiceProxy, PagedResultDtoOfPowerListDto, PowerListDto ,MenuServiceProxy,QueryData} from '@shared/service-proxies/service-proxies';
import { CreateOrEditPowerComponent } from './create-or-edit-power/create-or-edit-power.component';
import { BatchCreatePowerComponent } from './batch-create-power/batch-create-power.component';
//import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';

@Component({
	templateUrl: './power.component.html',
	styleUrls: ['./power.component.less'],
	animations: [appModuleAnimation()],
})


export class PowerComponent extends PagedListingComponentBase<PowerListDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _powerService: PowerServiceProxy,
		private _menuService: MenuServiceProxy
		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}

	isAllOperation=false
	curmenupower=[]

	menuarr=[]

	queryData=[{
		field: "menuId",
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
	protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
		var arr=[]
		if(this.queryData[0].value){
			arr.push(new QueryData(this.queryData[0]))
		}
		this._powerService.getPaged(
			arr,
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
			this.getmenu()
			console.log(this.dataList);
			this.showPaging(result);
		});
	}

	getmenu(){
		this._menuService.getMenuDropDown()
		.subscribe(res => {
			this.menuarr = res
		});
	}



	onChange($event: string): void {
		this.queryData[0].value = $event
		this.refreshGoFirstPage()
	}
	
	/**
	* 新增或编辑DTO信息
	* @param id 当前DTO的Id
	*/
	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditPowerComponent, { id: id })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}



	//批量增加
	batchcreate(){
		this.modalHelper.static(BatchCreatePowerComponent)
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
	delete(entity: PowerListDto): void {
		this._powerService.delete(entity.id)
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
					this._powerService.batchDelete(ids).subscribe(() => {
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
		// this._powerService.getPowerexportToExcel().subscribe(result => {
			// this._fileDownloadService.downloadTempFile(result);
			// });
		}

	}

