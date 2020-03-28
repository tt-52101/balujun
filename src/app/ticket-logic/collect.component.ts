
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {  
	TicketAccountServiceProxy,
	PagedResultDtoOfAccountListDto,
	AccountListDto,
	GetAccountsInput,
	PayMethodServiceProxy,
	AccountServiceProxy,
	AccountDetailServiceProxy,
	TicketDetailServiceProxy,
	QueryData
} from '@shared/service-proxies/service-proxies';

// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';

@Component({
	templateUrl: './collect.component.html',
	styleUrls: ['./collect.component.less'],
	animations: [appModuleAnimation()],
})


export class CollectComponent extends PagedListingComponentBase<AccountListDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _accountService: AccountServiceProxy,
		private _ticketaccountService: TicketAccountServiceProxy,
		private _payMethodService: PayMethodServiceProxy,
		private _accountDetailService: AccountDetailServiceProxy,
		private _ticketDetailService: TicketDetailServiceProxy,
		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}

	isAllOperation=false
	curmenupower=[]
	
	visible = false;

	payMethodList=[]

	queryData = [{
		field: "accountNo",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "accountStatus",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "payMethodId",
		method: "=",
		value: "",
		logic: "and"
	},{
		field: "accountDate",
		method: ">=",
		value: "",
		logic: "and"
	},{
		field: "accountDate",
		method: "<=",
		value: "",
		logic: "and"
	}];

	collectionTime=""


	accountinfo = []
	ticketlist = []

	selectedDataItems = []

	protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
		const formdata = new GetAccountsInput();
		var arr = []
		for (var i = this.queryData.length - 1; i >= 0; i--) {
			if (this.queryData[i].value) {
				arr.push(new QueryData(this.queryData[i]))
			}
		}
		formdata.queryData = arr;
				formdata.filterText = ''
		formdata.sorting = 'creationTime desc'
		formdata.maxResultCount = request.maxResultCount;
		formdata.skipCount = request.skipCount;

		this._ticketaccountService.getPaged(formdata)
		.finally(() => {
			finishedCallback();
		})
		.subscribe(result => {
			this.dataList = result.items;
			this.showPaging(result);
		});
	}

	datechange($event): void {
		this.queryData[3].value = $event[0]
		this.queryData[4].value = $event[1]
	}

	close(): void {
		this.visible = false;
	}


	collect() {
		const selectCount = this.selectedDataItems.length;
		if (selectCount <= 0) {
			abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
			return;
		}
		abp.message.confirm(
			this.l('ConfirmCollectXItemsWarningMessage', selectCount),
			res => {
				if (res) {
					const ids = _.map(this.selectedDataItems, 'id');
					this._ticketaccountService.collectAccounts(ids).subscribe(result => {
						if (result.resultCode == '000') {
							this.notify.success('收款成功');
							this.refreshGoFirstPage()
						} else {
							this.notify.error(result.resultMessage);
						}
					});
				}
			},
			);
	}


	cancelCollect(){
		const selectCount = this.selectedDataItems.length;
		if (selectCount <= 0) {
			abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
			return;
		}
		abp.message.confirm(
			this.l('ConfirmCancelSettleXItemsWarningMessage', selectCount),
			res => {
				if (res) {
					const ids = _.map(this.selectedDataItems, 'id');
					this._ticketaccountService.rCollectAccounts(ids).subscribe(result => {
						if (result.resultCode == '000') {
							this.notify.success('取消收款成功');
							this.refreshGoFirstPage()
						} else {
							this.notify.error(result.resultMessage);
						}
					});
				}
			},
			);
	}



	open(account, id): void {
		var arr = [new QueryData({
			field: "ActivityDetail.Activity.accountsId",
			method: "=",
			value: id,
			logic: "and"
		})]
		console.log(arr)
		// this._ticketDetailService.getPaged(arr, null, 999, 0)
		// .subscribe(result => {
			// 	console.log(result)
			// 	this.visible = true;
			// 	this.accountinfo = [account];
			// 	this.ticketlist = result.items;
			// });
		}






	}
