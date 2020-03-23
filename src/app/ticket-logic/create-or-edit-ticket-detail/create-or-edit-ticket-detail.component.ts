
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTicketDetailInput,TicketDetailEditDto, TicketDetailServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-ticket-detail',
  templateUrl: './create-or-edit-ticket-detail.component.html',
  styleUrls:[
	'create-or-edit-ticket-detail.component.less'
  ],
})

export class CreateOrEditTicketDetailComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: TicketDetailEditDto=new TicketDetailEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _ticketDetailService: TicketDetailServiceProxy
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
		this._ticketDetailService.getForEdit(this.id).subscribe(result => {
			this.entity = result.ticketDetail;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateTicketDetailInput();
		input.ticketDetail = this.entity;

		this.saving = true;

		this._ticketDetailService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
