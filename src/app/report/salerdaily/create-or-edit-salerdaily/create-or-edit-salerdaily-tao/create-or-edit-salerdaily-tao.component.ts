import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {
  UserServiceProxy, QueryData,
  TicketServiceProxy,
  SalesCommonActivityInput,
  SalesCommonServiceProxy,
  SalesBySellerDailyResultDto,
  SalesCommonActivityDetailInput,
} from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-create-or-edit-salerdaily-tao',
  templateUrl: './create-or-edit-salerdaily-tao.component.html',
  styles: []
})

export class CreateOrEditSalerdailyTaoComponent extends PagedListingComponentBase<SalesBySellerDailyResultDto> implements OnInit {
  id: any
  ticketlist:any[]
  constructor(
    injector: Injector,
    private _SalesCommonServiceProxy: SalesCommonServiceProxy,
  ) {
    super(injector);
  }
  protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {


    console.log(this.id);
    
    const formdata = new SalesCommonActivityDetailInput();
    formdata.activityId = this.id
    formdata.sorting = ''
    formdata.maxResultCount = 99;
    formdata.skipCount = 0;
    formdata.filterText = ''
    this._SalesCommonServiceProxy.getPagedActivityDetails(formdata)
      .subscribe(result => {
        // this.childvisible = true;
        console.log(result);
        this.ticketlist = result.items;
      });
  }




  list = [
    {
      aa: '未结账',
      bb: '10086',
      cc: '官网',
      dd: '个人',
      ee: '50',
      ff: '已支付',
      gg: '现金支付',
      hh: '1',
      ii: '张三',
      jj: '1008610010',
      ll: '2019-10-15 11:11:11',
      mm: '管理员',
      nn: '10000',
    },
    {
      aa: '未结账',
      bb: '10086',
      cc: '官网',
      dd: '个人',
      ee: '50',
      ff: '已支付',
      gg: '现金支付',
      hh: '1',
      ii: '张三',
      jj: '1008610010',
      ll: '2019-10-15 11:11:11',
      mm: '管理员',
      nn: '10000',
    }
  ]



}
