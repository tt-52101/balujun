
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateVerifiableSetInput,VerifiableSetEditDto, VerifiableSetServiceProxy ,DeviceServiceProxy,GetDevicesInput} from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
    selector: 'create-or-edit-verifiable-set',
    templateUrl: './create-or-edit-verifiable-set.component.html',
    styleUrls:[
    'create-or-edit-verifiable-set.component.less'
    ],
})

export class CreateOrEditVerifiableSetComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: VerifiableSetEditDto=new VerifiableSetEditDto();

    devicList=[]
    /**
    * 初始化的构造函数
    */
    constructor(
        injector: Injector,
        private _verifiableSetService: VerifiableSetServiceProxy,
        private _deviceService: DeviceServiceProxy,  
        ) {
        super(injector);
    }

    ngOnInit() :void{
        this.init();

        const formdata = new GetDevicesInput();
        formdata.queryData = []
        formdata.sorting = null
        formdata.maxResultCount = 999;
        formdata.skipCount = 0;

        this._deviceService.getPaged(formdata)
        .subscribe(result => {
            this.devicList = result.items;
        });
    }


    /**
    * 初始化方法
    */
    init(): void {
        this._verifiableSetService.getForEdit(this.id).subscribe(result => {
            this.entity = result.verifiableSet;
        });
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
        const input = new CreateOrUpdateVerifiableSetInput();
        input.verifiableSet = this.entity;

        this.saving = true;

        this._verifiableSetService.createOrUpdate(input)
        .finally(() => (this.saving = false))
        .subscribe(() => {
            this.notify.success(this.l('SavedSuccessfully'));
            this.success(true);
        });
    }
}
