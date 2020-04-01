
import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdatePowerInput,PowerEditDto, PowerServiceProxy,PowerTypeEnum } from '@shared/service-proxies/service-proxies';
import { MenuServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'create-or-edit-power',
  templateUrl: './create-or-edit-power.component.html',
  styleUrls:[
  'create-or-edit-power.component.less'
  ],
})

export class CreateOrEditPowerComponent
extends ModalComponentBase
implements OnInit {
    /**
    * 编辑时DTO的id
    */
    id: any;

    entity: PowerEditDto=new PowerEditDto();

    menuId :any;
    menuarr = [];
    menulist=[];

    iocName = "";
    iconarr = [
    { title: "anticon anticon-api", icon: 'api' },
    { title: "anticon anticon-appstore", icon: 'appstore' },
    { title: "anticon anticon-book", icon: 'book' },
    { title: "anticon anticon-cloud", icon: 'cloud' },
    { title: "anticon anticon-copyright", icon: 'copyright' },
    { title: "anticon anticon-dashboard", icon: 'dashboard' },
    { title: "anticon anticon-database", icon: 'database' },
    { title: "anticon anticon-dingding", icon: 'dingding' },
    { title: "anticon anticon-dislike", icon: 'dislike' },
    { title: "anticon anticon-download", icon: 'download' },
    { title: "anticon anticon-edit", icon: 'edit' },
    { title: "anticon anticon-ellipsis", icon: 'ellipsis' },
    { title: "anticon anticon-file", icon: 'file' },
    { title: "anticon anticon-fork", icon: 'fork' },
    { title: "anticon anticon-frown", icon: 'frown' },
    { title: "anticon anticon-fullscreen", icon: 'fullscreen' },
    { title: "anticon anticon-github", icon: 'github' },
    { title: "anticon anticon-global", icon: 'global' },
    { title: "anticon anticon-hdd", icon: 'hdd' },
    { title: "anticon anticon-laptop", icon: 'laptop' },
    { title: "anticon anticon-like", icon: 'like' },
    { title: "anticon anticon-lock", icon: 'lock' },
    { title: "anticon anticon-logout", icon: 'logout' },
    { title: "anticon anticon-mail", icon: 'mail' },
    { title: "anticon anticon-message", icon: 'message' },
    { title: "anticon anticon-printer", icon: 'printer' },
    { title: "anticon anticon-rocket", icon: 'rocket' },
    { title: "anticon anticon-scan", icon: 'scan' },
    { title: "anticon anticon-search", icon: 'search' },
    { title: "anticon anticon-setting", icon: 'setting' },
    { title: "anticon anticon-sound", icon: 'sound' },
    { title: "anticon anticon-star", icon: 'star' },
    { title: "anticon anticon-taobao", icon: 'taobao' },
    { title: "anticon anticon-team", icon: 'team' },
    { title: "anticon anticon-tool", icon: 'tool' },
    { title: "anticon anticon-trophy", icon: 'trophy' },
    { title: "anticon anticon-usb", icon: 'usb' },
    { title: "anticon anticon-user", icon: 'user' },
    ];

    /**
    * 初始化的构造函数
    */
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

    ismenu=false
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
        if(this.entity.category==PowerTypeEnum.Data){
          this.showselect=true
        }
        if(this.entity.category==PowerTypeEnum.MENU){
          this.ismenu=true
        }
        this.menuId = result.power.menuId+''
      });
    }

    catetorychange(){
      this.entity.powerCode=''
      this.entity.powerName=''
      // console.log(this.entity.category)
      // console.log(PowerTypeEnum.Data)
      if(this.entity.category==PowerTypeEnum.Data){
        this.showselect=true
        this.ismenu=false
      }else if(this.entity.category==PowerTypeEnum.MENU){
        this.ismenu=true
        this.showselect=false
        this.entity.powerName='拥有菜单'
        this.entity.powerCode='ownmenu'
      }
      else{
        this.ismenu=false
        this.showselect=false
      }
    }

    powerCodeselect($event){
      console.log($event)
      if( $event=="viewown"){ 
        this.entity.powerName="仅查看自己的数据"
      }
      else if( $event=="viewownorgan"){ 
        this.entity.powerName="仅查看所在机构的数据"
      }
      else if( $event=="viewsuborgan"){ 
        this.entity.powerName="仅查看所在机构的子机构的数据"
      }
      else if( $event=="viewallorgan"){ 
        this.entity.powerName="查看所有机构的数据"
      }
    }


    onChange($event: number): void {
      console.log($event)
      for(var i = 0;i < this.menulist.length; i++){
        if(this.menulist[i].id == $event){
          this.menuId = $event
          this.entity.menuId = $event
          this.entity.menuPath = this.menulist[i].navigateUrl
        }
      }
    }


    iconChange($event: string): void {
      // console.log($event);
      this.iocName = $event
      this.entity.iocName = $event
      this.entity.iocClassName = $event
    }


    /**
    * 保存方法,提交form表单
    */
    submitForm(): void {
      const input = new CreateOrUpdatePowerInput();
      this.entity.method=''
      this.entity.params=''
      this.entity.groupName=''
      input.power = this.entity;
      this.saving = true;

      this._powerService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(() => {
        this.notify.success(this.l('SavedSuccessfully'));
        this.success(true);
      });
    }
  }
