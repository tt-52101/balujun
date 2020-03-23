
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTravelTicketDetailInput,TravelTicketDetailEditDto, TravelTicketDetailServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-travel-ticket-detail',
  templateUrl: './create-or-edit-travel-ticket-detail.component.html',
  styleUrls:[
	'create-or-edit-travel-ticket-detail.component.less'
  ],
})

export class CreateOrEditTravelTicketDetailComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: TravelTicketDetailEditDto=new TravelTicketDetailEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _travelTicketDetailService: TravelTicketDetailServiceProxy
	) {
		super(injector);
    }

    ngOnInit() :void{
		this.init();
    }


    /**
    * 初始化方法
    */
    init(): void {
		this._travelTicketDetailService.getForEdit(this.id).subscribe(result => {
			this.entity = result.travelTicketDetail;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateTravelTicketDetailInput();
		input.travelTicketDetail = this.entity;

		this.saving = true;

		this._travelTicketDetailService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
