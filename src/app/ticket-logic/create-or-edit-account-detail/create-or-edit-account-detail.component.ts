
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateAccountDetailInput,AccountDetailEditDto, AccountDetailServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-account-detail',
  templateUrl: './create-or-edit-account-detail.component.html',
  styleUrls:[
	'create-or-edit-account-detail.component.less'
  ],
})

export class CreateOrEditAccountDetailComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: AccountDetailEditDto=new AccountDetailEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _accountDetailService: AccountDetailServiceProxy
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
		this._accountDetailService.getForEdit(this.id).subscribe(result => {
			this.entity = result.accountDetail;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateAccountDetailInput();
		input.accountDetail = this.entity;

		this.saving = true;

		this._accountDetailService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
