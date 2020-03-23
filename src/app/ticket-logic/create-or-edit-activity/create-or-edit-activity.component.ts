
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateActivityInput,ActivityEditDto, ActivityServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-activity',
  templateUrl: './create-or-edit-activity.component.html',
  styleUrls:[
	'create-or-edit-activity.component.less'
  ],
})

export class CreateOrEditActivityComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: ActivityEditDto=new ActivityEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _activityService: ActivityServiceProxy
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
		this._activityService.getForEdit(this.id).subscribe(result => {
			this.entity = result.activity;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateActivityInput();
		input.activity = this.entity;

		this.saving = true;

		this._activityService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
