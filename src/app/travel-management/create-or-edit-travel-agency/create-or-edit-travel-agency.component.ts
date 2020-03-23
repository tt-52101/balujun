
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTravelAgencyInput,TravelAgencyEditDto, TravelAgencyServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-travel-agency',
  templateUrl: './create-or-edit-travel-agency.component.html',
  styleUrls:[
	'create-or-edit-travel-agency.component.less'
  ],
})

export class CreateOrEditTravelAgencyComponent
  extends ModalComponentBase
    implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

	  entity: TravelAgencyEditDto=new TravelAgencyEditDto();
    /**
    * 初始化的构造函数
    */
    constructor(
		injector: Injector,
		private _travelAgencyService: TravelAgencyServiceProxy
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
		this._travelAgencyService.getForEdit(this.id).subscribe(result => {
			this.entity = result.travelAgency;
		});
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
		const input = new CreateOrUpdateTravelAgencyInput();
		input.travelAgency = this.entity;

		this.saving = true;

		this._travelAgencyService.createOrUpdate(input)
		.finally(() => (this.saving = false))
		.subscribe(() => {
			this.notify.success(this.l('SavedSuccessfully'));
			this.success(true);
		});
    }
}
