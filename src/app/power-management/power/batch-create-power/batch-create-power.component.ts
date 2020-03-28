
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdatePowerInput,PowerEditDto, PowerServiceProxy,PowerTypeEnum } from '@shared/service-proxies/service-proxies';
import { MenuServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'batch-create-power',
  templateUrl: './batch-create-power.component.html',
  styleUrls:[
  'batch-create-power.component.less'
  ],
})

export class BatchCreatePowerComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any;

    entity: PowerEditDto=new PowerEditDto();

    menuId :number;
    menuarr = [];
    menulist=[];

    powerList=[{
      label:'拥有菜单',
      value:'ownmenu',
    },{
      label:'仅查看自己的数据',
      value:'viewown',
    },{
      label:'仅查看所在机构的数据',
      value:'viewownorgan',
    },{
      label:'仅查看所在机构的子机构的数据',
      value:'viewsuborgan',
    },{
      label:'查看所有机构的数据',
      value:'viewallorgan',
    },

    {
      label:'添加或修改',
      value:'CreateOrUpdate',
    },
    {
      label:'删除',
      value:'Delete',
    },
    {
      label:'批量删除',
      value:'BatchDelete',
    },


    ];


    powerCodeList=[];//选中权限


    constructor(
      injector: Injector,
      private _powerService: PowerServiceProxy,
      private _menuService: MenuServiceProxy
      ) {
      super(injector);
    }

    ngOnInit() :void{
      this.init();
    }

    showselect=false;
    /**
    * 初始化方法
    */
    init(): void {
      this._powerService.getForEdit(this.id).subscribe(result => {
        this._menuService.getMenuDropDown().subscribe(res => {
          this.menuarr = res
        });

        this._menuService.getPaged('','',999,0).subscribe(result => {
          this.menulist = result.items;
        })

        this.entity = result.power;
        this.menuId = result.power.menuId
      });
    }

    ngModelChange(a){
      this.powerCodeList=[]
      for(var i =0;i<a.length;i++) {
        if(a[i].checked){
          this.powerCodeList.push(a[i].value)
        }
      }
      console.log(this.powerCodeList)
    }



    onChange($event: number): void {
      // console.log($event)
      for(var i = 0;i < this.menulist.length; i++){
        if(this.menulist[i].id == $event){
          this.menuId = $event
          this.entity.menuId = $event
          this.entity.menuPath = this.menulist[i].navigateUrl
        }
      }
    }


    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      console.log(this.powerCodeList)
      this.saving = true;

      this._powerService.batchCreate(this.menuId,this.powerCodeList)
      .finally(() => (this.saving = false))
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.success(true);
      });
    }
  }
