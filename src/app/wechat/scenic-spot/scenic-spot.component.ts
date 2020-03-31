
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';

import {WeChatScenicSpotServiceProxy, WeChatScenicSpotListDto } from '@shared/service-proxies/service-proxies';

import { CreateOrEditScenicSpotComponent } from './create-or-edit-scenic-spot/create-or-edit-scenic-spot.component';

import { AppConsts } from 'abpPro/AppConsts';

@Component({
	templateUrl: './scenic-spot.component.html',
	styleUrls: ['./scenic-spot.component.less'],
	animations: [appModuleAnimation()],
})

export class  ScenicSpotComponent extends PagedListingComponentBase<WeChatScenicSpotListDto>
implements OnInit {
	
	imgurl=AppConsts.remoteServiceBaseUrl

	constructor(
		injector: Injector,
		private _weChatScenicSpotService: WeChatScenicSpotServiceProxy,
		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}
	isAllOperation=false
	curmenupower=[]
	
	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		this._weChatScenicSpotService.getPaged(
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
	}

	viewbigpic(src){
		window.open(this.imgurl + '/'+src)
	}
	
	createOrEdit(id?: number): void {
		this.modalHelper.static(CreateOrEditScenicSpotComponent, { id: id })
		.subscribe(result => {
			if (result) {
				this.refresh();
			}
		});
	}
	
	delete(entity: WeChatScenicSpotListDto): void {
		this._weChatScenicSpotService.delete(entity.id)
		.subscribe(() => {
			this.refreshGoFirstPage();
			this.notify.success(this.l('SuccessfullyDeleted'));
		});
	}
	
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
					this._weChatScenicSpotService.batchDelete(ids).subscribe(() => {
						this.refreshGoFirstPage();
						this.notify.success(this.l('SuccessfullyDeleted'));
					});
				}
			},
			);
	}
}
