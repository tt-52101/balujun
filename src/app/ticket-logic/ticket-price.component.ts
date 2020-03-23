
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { DeviceServiceProxy, PagedResultDtoOfDeviceListDto, DeviceListDto, GetDevicesInput,QueryData ,TicketStationServiceProxy} from '@shared/service-proxies/service-proxies';
import { CreateOrEditTicketPriceComponent } from './create-or-edit-ticket-price/create-or-edit-ticket-price.component';
import { da_DK } from 'ng-zorro-antd';
import { EEXIST } from 'constants';
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';


@Component({
	templateUrl: './ticket-price.component.html',
	styleUrls: ['./ticket-price.component.less'],
	animations: [appModuleAnimation()],
})


export class  TicketPriceComponent extends PagedListingComponentBase<DeviceListDto>
implements OnInit {

	constructor(
		injector: Injector,
		private _deviceService: DeviceServiceProxy,    
		private _ticketStationService: TicketStationServiceProxy,
		) {
		super(injector);
		this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
		this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
	}

	isAllOperation=false
	curmenupower=[]

	datalist=[
		{
			id:0,
			aa:'aa',
			bb:'bb',
			cc:'cc',
			dd:'da',
			ee:'eeee',
			ff:'ff',
			gg:'gg',
			hh:'hh',
			ii:'2019-10-14 09:40:00',
			jj:'2019-10-14 09:40:00',
			ll:'ll',
			yy:'yy'
		},
		{
			id:1,
			aa:'aa',
			bb:'bb',
			cc:'cc',
			dd:'da',
			ee:'eeee',
			ff:'ff',
			gg:'gg',
			hh:'hh',
			ii:'2019-10-14 09:40:00',
			jj:'2019-10-14 09:40:00',
			ll:'ll',
			yy:'yy'
		},
	]

	queryData=[{
		field: "deviceName",
		method: "%",
		value: "",
		logic: "and"
	  },{
		field: "ticketStationId",
		method: "=",
		value: "",
		logic: "and"
	  },{
		field: "deviceType",
		method: "=",
		value: "",
		logic: "and"
	  },{
		field: "deviceStatus",
		method: "=",
		value: "",
		logic: "and"
	  }]

	  stationList=[]
	/**
	* 获取后端数据列表信息
	* @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
	* @param pageNumber 当前页码
	* @param finishedCallback 完成后回调函数
	*/
	protected fetchDataList(request: PagedRequestDto,pageNumber: number,finishedCallback: Function): void {
		const formdata = new GetDevicesInput();
    var arr=[]
    for (var i = this.queryData.length - 1; i >= 0; i--) {
      if(this.queryData[i].value){
        arr.push(new QueryData(this.queryData[i]))
      }
    }

    formdata.queryData = arr;
    formdata.sorting = request.sorting
    formdata.maxResultCount = request.maxResultCount;
    formdata.skipCount = request.skipCount;

    this._deviceService.getPaged(formdata)
    .finally(() => {
      finishedCallback();
    })
    .subscribe(result => {
      this.dataList = result.items;
      this.showPaging(result);
    });

    this.getstation()
  }

  getstation(){
    this._ticketStationService.getPaged('','',999,0)
    .subscribe(result => {
      this.stationList = result.items;
    });
  }

  createOrEdit(id ? : number): void {
    this.modalHelper.static(CreateOrEditTicketPriceComponent, { id: id })
    .subscribe(result => {
      if (result) {
        this.refresh();
      }
    });
  }


  delete(entity: DeviceListDto): void {
    this._deviceService.delete(entity.id)
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
             this._deviceService.batchDelete(ids).subscribe(() => {
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
       // this._deviceService.getDeviceexportToExcel().subscribe(result => {
         // this._fileDownloadService.downloadTempFile(result);
         // });
       }

	}
