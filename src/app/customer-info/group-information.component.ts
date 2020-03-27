import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { OrganizationServiceProxy, PagedResultDtoOfOrganizationListDto, OrganizationListDto,
	GetOrganizationsInput 
} from '@shared/service-proxies/service-proxies';
import { CreateOrEditGroupInformationComponent } from './create-or-edit-group-information/create-or-edit-group-information.component';

@Component({
	templateUrl: './group-information.component.html',
	styleUrls: [],
	animations: [appModuleAnimation()],
})

export class GroupInformation extends PagedListingComponentBase<OrganizationListDto> implements OnInit {

	constructor(
		injector: Injector,
		private _organizationService: OrganizationServiceProxy,       
		) {
		super(injector);
		this.curmenupower = JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation = eval(localStorage.getItem('isAllOperation'))
	}

	isAllOperation = false
	curmenupower = []
	queryData = [];


	protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
		const formdata = new GetOrganizationsInput();
		formdata.queryData = this.queryData;
		formdata.filterText = '';
		formdata.sorting = request.sorting
		formdata.maxResultCount = request.maxResultCount;
		formdata.skipCount = request.skipCount;

		this._organizationService.getPaged(formdata)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			this.dataList = result.items;
			this.showPaging(result);
		});


	}

    /**
	* 新增或编辑DTO信息
	* @param id 当前DTO的Id
	*/
	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditGroupInformationComponent, { id: id })
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
	delete(entity: OrganizationListDto): void {
		this._organizationService.delete(entity.id)
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
					this._organizationService.batchDelete(ids).subscribe(() => {
						this.refreshGoFirstPage();
						this.notify.success(this.l('SuccessfullyDeleted'));
					});
				}
			},
			);
	}

}