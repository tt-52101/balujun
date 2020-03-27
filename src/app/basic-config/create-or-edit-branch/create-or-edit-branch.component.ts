
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateBranchInput,BranchEditDto, BranchServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-branch',
  templateUrl: './create-or-edit-branch.component.html',
  styleUrls:[
  'create-or-edit-branch.component.less'
  ],
})

export class CreateOrEditBranchComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: BranchEditDto=new BranchEditDto();

    parentId = '';
    branchList = [];

    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _branchService: BranchServiceProxy
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
      this._branchService.getForEdit(this.id).subscribe(result => {
        this._branchService.getPaged('','',999,0)
        .subscribe(result => {
            this.branchList = result.items;
        });
        this.entity = result.branch;
        // this.parentId = result.branch.parentId
    });
  }


  onChange($event: number): void {
      this.entity.parentId = $event
  }


    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
        if (this.entity.level != 1 && !this.entity.parentId) {
          abp.message.warn(this.l('PleaseSelectParent'));
          return
      }
      const input = new CreateOrUpdateBranchInput();
      input.branch = this.entity;

      this.saving = true;

      this._branchService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success(true);
   });
  }
}
