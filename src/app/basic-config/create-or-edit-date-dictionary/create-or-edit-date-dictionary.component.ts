
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateDateDictionaryInput,DateDictionaryEditDto, DateDictionaryServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-date-dictionary',
  templateUrl: './create-or-edit-date-dictionary.component.html',
  styleUrls:[
  'create-or-edit-date-dictionary.component.less'
  ],
})

export class CreateOrEditDateDictionaryComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: DateDictionaryEditDto=new DateDictionaryEditDto();

    parentId = '';
    parentarr = [];

    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _dateDictionaryService: DateDictionaryServiceProxy
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
      this._dateDictionaryService.getForEdit(this.id).subscribe(result => {
       this._dateDictionaryService.getPaged(null,null,999,0)
       .subscribe(res => {
        this.parentarr = res.items
      });
       this.entity = result.dateDictionary;
       // this.parentId = result.menu.parentId
     });
    }

    onChange($event: string): void {
      console.log($event);
      this.parentId = $event
      for(var i=0;i<this.parentarr.length;i++){
        if(this.parentarr[i].id == $event){
          this.entity.parentId =this.parentarr[i].id
        }
      }
      // this.entity.parentId = $event
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      const input = new CreateOrUpdateDateDictionaryInput();
      input.dateDictionary = this.entity;

      this.saving = true;

      this._dateDictionaryService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success(true);
     });
    }
  }
