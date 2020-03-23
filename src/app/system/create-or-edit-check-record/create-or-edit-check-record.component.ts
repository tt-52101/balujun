
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateCheckRecordInput,CheckRecordEditDto, CheckRecordServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-check-record',
  templateUrl: './create-or-edit-check-record.component.html',
  styleUrls:[
	'create-or-edit-check-record.component.less'
  ],
})

export class CreateOrEditCheckRecordComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: CheckRecordEditDto=new CheckRecordEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _checkRecordService: CheckRecordServiceProxy
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
		this._checkRecordService.getForEdit(this.id).subscribe(result => {
			this.entity = result.checkRecord;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateCheckRecordInput();
		input.checkRecord = this.entity;

		this.saving = true;

		this._checkRecordService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
