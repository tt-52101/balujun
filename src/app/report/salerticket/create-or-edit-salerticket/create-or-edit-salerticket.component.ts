import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {
	UserServiceProxy ,QueryData,
  TicketServiceProxy,
  SalesByPayMethodResultDto
	// SellerTicketResultDto,
	// GetTicketsInput
} from '@shared/service-proxies/service-proxies';
import { CreateOrEditSalerticketTaoComponent } from './create-or-edit-salerticket-tao/create-or-edit-salerticket-tao.component';


@Component({
  selector: 'app-create-or-edit-salerticket',
  templateUrl: './create-or-edit-salerticket.component.html',
  styles: []
})
export class CreateOrEditSalerticketComponent extends PagedListingComponentBase<SalesByPayMethodResultDto> implements OnInit {

  protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    throw new Error("Method not implemented.");
  }

  constructor(
		injector: Injector,
		private _userService: UserServiceProxy,
		private _ticketService: TicketServiceProxy,
		) {
		super(injector);
	}

  ngOnInit() {
  }

  list=[
		{
    aa:'未结账',
    bb:'10086',
    cc:'官网',
    dd:'个人',
    ee:'50',
    ff:'已支付',
    gg:'现金支付',
    hh:'1',
    ii:'张三',
    jj:'1008610010',
    ll:'2019-10-15 11:11:11',
    mm:'管理员',
    nn:'10000',
		}
  ]
  
  tao(id){
    this.modalHelper.static(CreateOrEditSalerticketTaoComponent, { id: id })
		.subscribe(result => {
		  if (result) {
			this.refresh();
		  }
		});
  }


}
