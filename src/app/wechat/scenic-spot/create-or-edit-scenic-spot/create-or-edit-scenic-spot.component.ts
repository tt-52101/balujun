
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateWeChatScenicSpotInput,  WeChatScenicSpotEditDto, WeChatScenicSpotServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';
import { AppConsts } from 'abpPro/AppConsts';
import { UtilsService } from '@abp/utils/utils.service';

@Component({
  selector: 'create-or-edit-scenic-spot',
  templateUrl: './create-or-edit-scenic-spot.component.html',
  styleUrls:[
  'create-or-edit-scenic-spot.component.less'
  ],
})

export class CreateOrEditScenicSpotComponent
extends ModalComponentBase
implements OnInit {

  id: any ;

  entity:   WeChatScenicSpotEditDto=new   WeChatScenicSpotEditDto();


  uploadurl=''
  baseurl=''
  hearder={
    Authorization:''
  }
  picture=''

  file=''

  constructor(
    injector: Injector,
    private _weChatScenicSpotService: WeChatScenicSpotServiceProxy,
    private _utilsService: UtilsService,
    ) {
    super(injector);
  }

  ngOnInit() :void{
    this.init();
  }

  init(): void {
    this._weChatScenicSpotService.getForEdit(this.id).subscribe(result => {
      this.entity = result.weChatScenicSpot;
      this.picture=result.weChatScenicSpot.coverPicture;
    });
    console.log(AppConsts.remoteServiceBaseUrl)
    this.uploadurl=AppConsts.remoteServiceBaseUrl+'/api​/services​/app​/WeChatScenicSpot​/UpLoadPictures'
    // this.hearder.Authorization='Bearer '+ this._utilsService.getCookieValue("Abp.AuthToken");
    console.log(this.uploadurl)
    console.log(this.hearder.Authorization)
  }


  handleChange(info): void {
    console.log(info)
    switch (info.file.status) {
      case 'done':
      this.picture=info.file.name
      this.entity.coverPicture=info.file.response.result.uri
      break;
      case 'error':
      abp.message.error('上传失败');
      break;
    }
  }


  submitForm(): void {

    const input = new CreateOrUpdateWeChatScenicSpotInput();
    input.weChatScenicSpot = this.entity;

    this.saving = true;

    this._weChatScenicSpotService.createOrUpdate(input)
    .finally(() => (this.saving = false))
    .subscribe(() => {
      this.notify.success(this.l('SavedSuccessfully'));
      this.success(true);
    });
  }
}
