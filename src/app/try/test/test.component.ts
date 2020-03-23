import { Component, OnInit, Injector } from '@angular/core';
import {
	PagedListingComponentBase,
	PagedRequestDto
} from '@shared/component-base/paged-listing-component-base';

import {
	UserListDto,
	UserServiceProxy,
	EntityDtoOfInt64,
	PagedResultDtoOfUserListDto
} from '@shared/service-proxies/service-proxies';

import { CreateOrEditComponent } from '@app/try/test/create-or-edit/create-or-edit.component';


import { finalize } from 'rxjs/operators';

import * as _ from 'lodash';
import { AppConsts } from 'abpPro/AppConsts';


@Component({
	selector: 'app-test',
	templateUrl: './test.component.html',
	styles: []
})

export class TestComponent extends PagedListingComponentBase<UserListDto>
implements OnInit {
	isEmailConfirmed=false

	selectedPermission: string[] = [];

	isActive: boolean = undefined;

	role: number[] = undefined;

	dataList=[];

	forminfo={
		info1:'',
		info2:'',
		info3:''
	}

	constructor(
		injector: Injector,
		private _userService: UserServiceProxy,
		) {
		super(injector)
	}



  /**
   * 添加信息模态框
   */
   create(): void {
   	this.modalHelper
   	.static(CreateOrEditComponent)
   	.subscribe(res => {
   		if (res) {
   			this.refresh();
   		}
   	});
   }

  /**
   * 编辑信息模态框
   * @param id 需要修改实体信息的ID
   */
   edit(): void {
   	const selectCount = this.selectedDataItems.length;
   	if (selectCount <= 0) {
   		abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
   		return;
   	}else if(selectCount >1){
   		abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
   		return;
   	}
   	this.modalHelper
   	.static(CreateOrEditComponent, { id: this.selectedDataItems[0].id })
   	.subscribe(res => {
   		if (res) {
   			this.refresh();
   		}
   	});
   }




	  /**
   * 获取远端数据
   * @param request
   * @param pageNumber
   * @param finishedCallback
   */
   protected fetchDataList(
   	request: PagedRequestDto,
   	pageNumber: number,
   	finishedCallback: Function
   	): void {
   	this._userService
   	.getPaged(
   		this.selectedPermission,
   		this.role,
   		this.isEmailConfirmed,
   		this.isActive,
   		undefined,
   		this.filterText,
   		request.sorting,
   		request.maxResultCount,
   		request.skipCount
   		)
   	.pipe(
   		finalize(() => {
   			finishedCallback();
   		})
   		)
   	.subscribe((result: PagedResultDtoOfUserListDto) => {
   		this.dataList = result.items;
   		this.showPaging(result);
   	});
   }

}
