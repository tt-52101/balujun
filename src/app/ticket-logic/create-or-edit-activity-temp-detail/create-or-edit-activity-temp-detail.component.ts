
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateActivityTempDetailInput,ActivityTempDetailEditDto, ActivityTempDetailServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-activity-temp-detail',
  templateUrl: './create-or-edit-activity-temp-detail.component.html',
  styleUrls:[
	'create-or-edit-activity-temp-detail.component.less'
  ],
})

export class CreateOrEditActivityTempDetailComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: ActivityTempDetailEditDto=new ActivityTempDetailEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _activityTempDetailService: ActivityTempDetailServiceProxy
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
		this._activityTempDetailService.getForEdit(this.id).subscribe(result => {
			this.entity = result.activityTempDetail;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateActivityTempDetailInput();
		input.activityTempDetail = this.entity;

		this.saving = true;

		this._activityTempDetailService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
