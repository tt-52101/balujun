
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { PowerRoleServiceProxy} from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-power-role',
  templateUrl: './create-or-edit-power-role.component.html',
  styleUrls:[
  'create-or-edit-power-role.component.less'
  ],
})

export class CreateOrEditPowerRoleComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any ;

    roleList=[];

    powerList=[];//所有权限

    powerIdList=[];//选中权限

    selectedPermission = [];

    /**
    * 初始化的构造函数
    */
    constructor(
      injector: Injector,
      private _powerRoleService: PowerRoleServiceProxy,
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

      // this.getrolepower()

    }

    getrolepower(){
      // this._powerRoleService.getPowerRoleListById(this.id)
      // .subscribe(result => {
      //   // console.log(result)
      //   var items= result.items;
      //   var powerList=[];
      //   var hadmenu=0;
      //   for (var i =0;i<items.length;i++) {

      //     if(items[i].isEnabled){
      //       for (var j =0;j<powerList.length;j++) {
      //         if(items[i].menuId == powerList[j].menuId){
      //           powerList[j].child.push({
      //             label:items[i].powerName,
      //             value:items[i].id,
      //             checked:items[i].isCheck
      //           })
      //           hadmenu=1
      //         }
      //       }
      //       if(hadmenu == 0){
      //         powerList.push({
      //           menuId:items[i].menuId,
      //           menuname:items[i].menu.menuName,
      //           child:[{
      //             label:items[i].powerName,
      //             value:items[i].id,
      //             checked:items[i].isCheck
      //           }]
      //         })
      //       }
      //       if(hadmenu == 1){
      //         hadmenu = 0
      //       }
      //       if(items[i].isCheck){
      //         this.powerIdList.push(items[i].id)
      //       }
      //     }
      //   };

      //   // console.log(powerList)
      //   // console.log(this.powerIdList)
      //   this.powerList=powerList
      // });
    }

    ngModelChange(a){
      // console.log(a)
      // this.powerIdList=[]
      // console.log(this.powerIdList)
      for(var i =0;i<a.length;i++) {
        if(a[i].checked){
          if(this.powerIdList.indexOf(a[i].value)==-1){
            this.powerIdList.push(a[i].value)
          }
        }else{
          if(this.powerIdList.indexOf(a[i].value)>-1){
            this.powerIdList.splice(this.powerIdList.indexOf(a[i].value),1)
          }
        }
      }
      // console.log(this.powerIdList)
    }

    allcheckChange(){
      var powerIdList=[]
      for(var i =0;i<this.powerList.length;i++) {
        for(var j =0;j<this.powerList[i].child.length;j++) {
          this.powerList[i].child[j].checked=true
          powerIdList.push(this.powerList[i].child[j].value)
        }
      }
      this.powerIdList=powerIdList
    }

    allnotcheckChange(){
      for(var i =0;i<this.powerList.length;i++) {
        for(var j =0;j<this.powerList[i].child.length;j++) {
          this.powerList[i].child[j].checked=false
        }
      }
      this.powerIdList=[]
    }

    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {

      // this.saving = true;
      // console.log(this.powerIdList)
      // this._powerRoleService.batchAddOrUpdate(
      //   this.id,
      //   this.powerIdList
      //   )
      // .finally(() => (this.saving = false))
      // .subscribe(() => {
      //   this.notify.success(this.l('SavedSuccessfully'));
      //   this.success(true);
      // });
    }
  }
