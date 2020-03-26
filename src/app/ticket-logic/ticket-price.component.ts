
import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { TicketPriceListDto, QueryData, GetTicketPricesInput, TicketPriceServiceProxy, TicketServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditTicketPriceComponent } from './create-or-edit-ticket-price/create-or-edit-ticket-price.component';




@Component({
  templateUrl: './ticket-price.component.html',
  styleUrls: ['./ticket-price.component.less'],
  animations: [appModuleAnimation()],
})


export class TicketPriceComponent extends PagedListingComponentBase<TicketPriceListDto>
  implements OnInit {

  constructor(
    injector: Injector,
    private _ticketPriceService: TicketPriceServiceProxy,
    private _ticketService: TicketServiceProxy,
  ) {
    super(injector);
  }

  isAllOperation = false
  curmenupower = []
  ticketList = []

  queryData = [{
    field: "position",
    method: "=",
    value: "",
    logic: "and"
  }, {
    field: "ticketName",
    method: "%",
    value: "",
    logic: "and"
  }, {
    field: "ticketId",
    method: "=",
    value: "",
    logic: "and"
  }]

  stationList = []
	/**
	* 获取后端数据列表信息
	* @param request 请求的数据的dto 请求必需参数 skipCount: number; maxResultCount: number;
	* @param pageNumber 当前页码
	* @param finishedCallback 完成后回调函数
	*/
  protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

    const formdata = new GetTicketPricesInput();
    var arr = []
    for (var i = this.queryData.length - 1; i >= 0; i--) {
      if (this.queryData[i].value) {
        arr.push(new QueryData(this.queryData[i]))
      }
    }


    formdata.queryData = arr;
    formdata.sorting = request.sorting
    formdata.maxResultCount = request.maxResultCount;
    formdata.skipCount = request.skipCount;

    console.log(formdata);
    
    this._ticketPriceService.getPaged(formdata)
      .finally(() => {
        finishedCallback();
      })
      .subscribe(result => {
        this.dataList = result.items;
        console.log(result.items);
        
        this.showPaging(result);
      });

    this.getstation()
  }

  getstation() {
    this._ticketService.getPaged('', '', 999, 0)
      .subscribe(result => {
        this.ticketList = result.items;
      });
  }

  createOrEdit(id?: number): void {
    console.log(123);

    this.modalHelper.static(CreateOrEditTicketPriceComponent, { id: id })
      .subscribe(result => {
        if (result) {
          this.refresh();
        }
      });
  }


  delete(entity: TicketPriceListDto): void {
    this._ticketPriceService.delete(entity.id)
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
          this._ticketPriceService.batchDelete(ids).subscribe(() => {
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
