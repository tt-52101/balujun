import { Component, OnInit,Injector } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { TravelAgencyEditDto, TravelAgencyServiceProxy, CreateOrUpdateTravelAgencyInput } from '@shared/service-proxies/service-proxies';
@Component({
  selector: 'app-create-or-edit-tourist-information',
  templateUrl: './create-or-edit-tourist-information.component.html',
  styles: []
})
export class CreateOrEditTouristInformationComponent extends ModalComponentBase implements OnInit {

     /**
    * 编辑时DTO的id
    */
   id: any ;
   list:any=[
		{
			ticketName:'成人票',
			ticketCode:'张三',
			ticketMode:15992591634,
			ticketType:'备注一下',
			checkMethod:1.0,
			ticketClassify:'是',
      sort:'张三',
      sex:'男',
      payMethod:'手机'
		}
	]

   entity: TravelAgencyEditDto=new TravelAgencyEditDto();
   
  constructor(
    injector: Injector,
		private _travelAgencyService: TravelAgencyServiceProxy
  ) {
    super(injector);
   }

  ngOnInit() {

    this.init();
  }
      /**
    * 初始化方法
    */
   init(): void {
		this._travelAgencyService.getForEdit(this.id).subscribe(result => {
			this.entity = result.travelAgency;
    });
    console.log(this.entity);

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
