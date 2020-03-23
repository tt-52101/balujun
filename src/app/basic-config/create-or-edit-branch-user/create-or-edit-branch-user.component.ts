
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateBranchUserInput,BranchUserEditDto, BranchUserServiceProxy,BranchServiceProxy,UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-branch-user',
  templateUrl: './create-or-edit-branch-user.component.html',
  styleUrls:[
  'create-or-edit-branch-user.component.less'
  ],
})

export class CreateOrEditBranchUserComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    entity: BranchUserEditDto=new BranchUserEditDto();

    filterText = '';
    selectedPermission: string[] = [];
    isActive: boolean = undefined;
    isEmailConfirmed: boolean = undefined;
    role: number[] = undefined;

    branchList=[]
    userList=[]

    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _branchUserService: BranchUserServiceProxy,
      private _branchService: BranchServiceProxy,
      private _userService: UserServiceProxy,
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
      this._branchUserService.getForEdit(this.id).subscribe(result => {
        this._branchService.getPaged('',null,999,0)
        .subscribe(result => {
            this.branchList = result.items;
        });

        this._userService.getPaged(
          this.selectedPermission,
          this.role,
          this.isEmailConfirmed,
          this.isActive,
          undefined,
          this.filterText,
          null,
          999,
          0
          )
        .subscribe(result => {
          this.userList = result.items;
      });


        this.entity = result.branchUser;
    });
  }


  onChange1($event: number): void {
      this.entity.branchId = $event
  }

  onChange2($event: number): void {
      this.entity.userId = $event
  }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      const input = new CreateOrUpdateBranchUserInput();
      input.branchUser = this.entity;

      this.saving = true;

      this._branchUserService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success(true);
   });
  }
}
