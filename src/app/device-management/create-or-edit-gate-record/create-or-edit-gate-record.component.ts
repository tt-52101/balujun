
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateGateRecordInput,GateRecordEditDto, GateRecordServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-gate-record',
  templateUrl: './create-or-edit-gate-record.component.html',
  styleUrls:[
	'create-or-edit-gate-record.component.less'
  ],
})

export class CreateOrEditGateRecordComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: GateRecordEditDto=new GateRecordEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _gateRecordService: GateRecordServiceProxy
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
		this._gateRecordService.getForEdit(this.id).subscribe(result => {
			this.entity = result.gateRecord;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateGateRecordInput();
		input.gateRecord = this.entity;

		this.saving = true;

		this._gateRecordService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
