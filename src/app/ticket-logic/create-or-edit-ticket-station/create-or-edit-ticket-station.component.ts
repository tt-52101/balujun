
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateTicketStationInput,TicketStationEditDto, TicketStationServiceProxy ,ScenicSpotServiceProxy} from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-ticket-station',
  templateUrl: './create-or-edit-ticket-station.component.html',
  styleUrls:[
  'create-or-edit-ticket-station.component.less'
  ],
})

export class CreateOrEditTicketStationComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: TicketStationEditDto=new TicketStationEditDto();

    scList=[]
    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _ticketStationService: TicketStationServiceProxy,
      private _scenicSpotService: ScenicSpotServiceProxy
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
      this._ticketStationService.getForEdit(this.id).subscribe(result => {
         this.entity = result.ticketStation;

         this._scenicSpotService.getPaged(
            null,
            null,
            999,
            0,
            )
         .subscribe(result => {
            this.scList = result.items;
        });

     });
  }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      const input = new CreateOrUpdateTicketStationInput();
      input.ticketStation = this.entity;

      this.saving = true;

      this._ticketStationService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
         this.notify.success(this.l('SavedSuccessfully'));
         this.success(true);
     });
  }
}
