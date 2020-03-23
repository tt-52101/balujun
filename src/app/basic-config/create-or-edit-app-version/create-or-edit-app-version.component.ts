
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateClientVersionInput,ClientVersionEditDto, ClientVersionServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

import { UtilsService } from '@abp/utils/utils.service';

import { AppConsts } from 'abpPro/AppConsts';

@Component({
    selector: 'create-or-edit-app-version',
    templateUrl: './create-or-edit-app-version.component.html',
    styleUrls:[
    'create-or-edit-app-version.component.less'
    ],
})

export class CreateOrEditAppVersionComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: ClientVersionEditDto=new ClientVersionEditDto();

    uploadurl=''
    baseurl=''
    hearder={
        Authorization:''
    }

    appName=''

    /**
    * 初始化的构造函数
    */
    constructor(
        injector: Injector,
        private _clientVersionService: ClientVersionServiceProxy,
        private _utilsService: UtilsService,
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
        this._clientVersionService.getForEdit(this.id).subscribe(result => {
            this.entity = result.clientVersion;
        });

        this.uploadurl=AppConsts.remoteServiceBaseUrl+'/api/File/UploadClientAsync'
        this.hearder.Authorization='Bearer '+ this._utilsService.getCookieValue("Abp.AuthToken");
    }

    handleChange(info): void {
        console.log(info)
        switch (info.file.status) {

            case 'done':
            console.log(info.file.response.result)
            this.appName=info.file.response.result.appName
            this.entity.appName=info.file.response.result.appName
            this.entity.versionName=info.file.response.result.versionName
            this.entity.versionCode=info.file.response.result.versionCode
            this.entity.deviceType=info.file.response.result.deviceType

            break;
            case 'error':
            abp.message.error(this.l('UploadFail'));
            break;
        }
    }


    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
        const input = new CreateOrUpdateClientVersionInput();
        input.clientVersion = this.entity;

        this.saving = true;

        this._clientVersionService.createOrUpdate(input)
        .finally(() => (this.saving = false))
        .subscribe(() => {
            this.notify.success(this.l('SavedSuccessfully'));
            this.success(true);
        });
    }
}
