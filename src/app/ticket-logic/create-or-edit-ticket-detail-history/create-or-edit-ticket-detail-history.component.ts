
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTicketDetailHistoryInput,TicketDetailHistoryEditDto, TicketDetailHistoryServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-ticket-detail-history',
  templateUrl: './create-or-edit-ticket-detail-history.component.html',
  styleUrls:[
	'create-or-edit-ticket-detail-history.component.less'
  ],
})

export class CreateOrEditTicketDetailHistoryComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: TicketDetailHistoryEditDto=new TicketDetailHistoryEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _ticketDetailHistoryService: TicketDetailHistoryServiceProxy
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
		this._ticketDetailHistoryService.getForEdit(this.id).subscribe(result => {
			this.entity = result.ticketDetailHistory;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateTicketDetailHistoryInput();
		input.ticketDetailHistory = this.entity;

		this.saving = true;

		this._ticketDetailHistoryService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
