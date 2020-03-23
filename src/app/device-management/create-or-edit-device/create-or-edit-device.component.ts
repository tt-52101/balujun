
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateDeviceInput,DeviceEditDto, DeviceServiceProxy ,TicketStationServiceProxy} from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'create-or-edit-device',
    templateUrl: './create-or-edit-device.component.html',
    styleUrls:[
    'create-or-edit-device.component.less'
    ],
})

export class CreateOrEditDeviceComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: DeviceEditDto=new DeviceEditDto();

    stationList=[]

    constructor(
        injector: Injector,
        private _ticketStationService: TicketStationServiceProxy,
        private _deviceService: DeviceServiceProxy
        ) {
        super(injector);
    }

    ngOnInit() :void{
        this.init();
    }


    init(): void {
        this._deviceService.getForEdit(this.id).subscribe(result => {
            this.entity = result.device;
        });
        this.getstation()
    }


    getstation(){
        this._ticketStationService.getPaged(null,null,999,0)
        .subscribe(result => {
            this.stationList = result.items;
        });
    }

    submitForm(): void {
        const input = new CreateOrUpdateDeviceInput();
        input.device = this.entity;

        this.saving = true;

        this._deviceService.createOrUpdate(input)
        .finally(() => (this.saving = false))
        .subscribe(() => {
            this.notify.success(this.l('SavedSuccessfully'));
            this.success(true);
        });
    }
}
