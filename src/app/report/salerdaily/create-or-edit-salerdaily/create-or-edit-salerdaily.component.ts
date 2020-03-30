import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {
  UserServiceProxy, QueryData,
  TicketServiceProxy,
  SalesCommonActivityInput,
  SalesCommonServiceProxy,
  SalesBySellerDailyResultDto,
} from '@shared/service-proxies/service-proxies';

import { CreateOrEditSalerdailyTaoComponent } from './create-or-edit-salerdaily-tao/create-or-edit-salerdaily-tao.component';

@Component({
  selector: 'app-create-or-edit-salerdaily',
  templateUrl: './create-or-edit-salerdaily.component.html',
  styles: []
})


export class CreateOrEditSalerdailyComponent extends PagedListingComponentBase<SalesBySellerDailyResultDto> implements OnInit {

  id: any;
  orderlist: any[]
  protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

    console.log(this.id);
    const formdata = new SalesCommonActivityInput();
    formdata.activityIds = this.id
    formdata.sorting = ''
    formdata.maxResultCount = request.maxResultCount;
    formdata.skipCount = request.skipCount;
    formdata.filterText = ''
    this._SalesCommonServiceProxy.getPagedActivities(formdata)
      .subscribe(result => {
        this.orderlist = result.items;
        console.log(this.orderlist);

      });

  }

  constructor(
    injector: Injector,
    private _SalesCommonServiceProxy: SalesCommonServiceProxy,
  ) {
    super(injector);
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
    }
  ]


  tao(id) {
    this.modalHelper.static(CreateOrEditSalerdailyTaoComponent, { id: id })
      .subscribe(result => {
        if (result) {
          this.refresh()
        }
      });
  }

}
