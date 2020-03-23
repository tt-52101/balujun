
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdatePayMethodInput,PayMethodEditDto, PayMethodServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-pay-method',
  templateUrl: './create-or-edit-pay-method.component.html',
  styleUrls:[
	'create-or-edit-pay-method.component.less'
  ],
})

export class CreateOrEditPayMethodComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: PayMethodEditDto=new PayMethodEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _payMethodService: PayMethodServiceProxy
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
		this._payMethodService.getForEdit(this.id).subscribe(result => {
			this.entity = result.payMethod;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdatePayMethodInput();
		input.payMethod = this.entity;

		this.saving = true;

		this._payMethodService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
