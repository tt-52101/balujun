
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateActivityDetailInput,ActivityDetailEditDto, ActivityDetailServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-activity-detail',
  templateUrl: './create-or-edit-activity-detail.component.html',
  styleUrls:[
	'create-or-edit-activity-detail.component.less'
  ],
})

export class CreateOrEditActivityDetailComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: ActivityDetailEditDto=new ActivityDetailEditDto();

    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _activityDetailService: ActivityDetailServiceProxy
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
		this._activityDetailService.getForEdit(this.id).subscribe(result => {
			this.entity = result.activityDetail;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateActivityDetailInput();
		input.activityDetail = this.entity;

		this.saving = true;

		this._activityDetailService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
