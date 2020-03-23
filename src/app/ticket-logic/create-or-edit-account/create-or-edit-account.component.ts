
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateAccountInput,AccountEditDto,
  //  TicketAccountServiceProxy 
  } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-account',
  templateUrl: './create-or-edit-account.component.html',
  styleUrls:[
	'create-or-edit-account.component.less'
  ],
})

export class CreateOrEditAccountComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: AccountEditDto=new AccountEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		// private _accountService: TicketAccountServiceProxy
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
		// this._accountService.getForEdit(this.id).subscribe(result => {
		// 	this.entity = result.account;
		// });
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateAccountInput();
		input.account = this.entity;

		this.saving = true;

		// this._accountService.createOrUpdate(input)
		// .finally(() => (this.saving = false))
		// .subscribe(() => {
		// 	this.notify.success(this.l('SavedSuccessfully'));
		// 	this.success(true);
		// });
    }
}
