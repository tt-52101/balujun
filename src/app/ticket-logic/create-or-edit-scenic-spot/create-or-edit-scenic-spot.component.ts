
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateScenicSpotInput,ScenicSpotEditDto, ScenicSpotServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

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
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: ScenicSpotEditDto=new ScenicSpotEditDto();

    parentId=''
    scenicspotarr=[]


    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
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
      this._scenicSpotService.getForEdit(this.id).subscribe(result => {

        this._scenicSpotService.getPaged(null,null,999,0)
        .subscribe(result => {
            this.scenicspotarr = result.items;
        });
        console.log(result.scenicSpot)
        if(result.scenicSpot.id ==null){
            result.scenicSpot.parentId=null
        }
        this.entity = result.scenicSpot;
    });
  }

  onChange($event: string): void {
      console.log($event);
      this.parentId = $event
      for(var i=0;i<this.scenicspotarr.length;i++){
        if(this.scenicspotarr[i].id == $event){
          this.entity.parentId =this.scenicspotarr[i].id
      }
  }
      // this.entity.parentId = $event
  }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      const input = new CreateOrUpdateScenicSpotInput();
      input.scenicSpot = this.entity;

      this.saving = true;

      this._scenicSpotService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success(true);
   });
  }
}
