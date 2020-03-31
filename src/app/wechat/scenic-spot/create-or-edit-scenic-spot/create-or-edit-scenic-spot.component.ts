
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateWeChatScenicSpotInput,  WeChatScenicSpotEditDto, WeChatScenicSpotServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';
import { AppConsts } from 'abpPro/AppConsts';
import { UtilsService } from '@abp/utils/utils.service';


import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse } from '@angular/common/http';
import { UploadXHRArgs } from 'ng-zorro-antd/upload';

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
    accept:'text/plain'
  }
  picture=''

  file=''

  constructor(
    injector: Injector,
    private _weChatScenicSpotService: WeChatScenicSpotServiceProxy,
    private _utilsService: UtilsService,
    private http: HttpClient

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
    // console.log(this.uploadurl)
    // console.log(this.hearder.Authorization)
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


  // customReq = (item: UploadXHRArgs) => {
    //   const formData = new FormData();
    //   formData.append('file', item.file as any);
    //   formData.append('id', '1000');
    //   const req = new HttpRequest('POST', item.action!, formData, {
      //     reportProgress: true,
      //     withCredentials: true
      //   });

      //   return this.http.request(req).subscribe(
      //     (event: HttpEvent<any>) => {
        //       if (event.type === HttpEventType.UploadProgress) {
          //         if (event.total! > 0) {
            //           (event as any).percent = (event.loaded / event.total!) * 100;
            //         }
            //         item.onProgress!(event, item.file!);
            //       } else if (event instanceof HttpResponse) {
              //         item.onSuccess!(event.body, item.file!, event);
              //       }
              //     },
              //     err => {
                //       item.onError!(err, item.file!);
                //     }
                //     );
                // };
              }
