import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateMenuInput, MenuEditDto, MenuServiceProxy } from '@shared/service-proxies/service-proxies';
import { Validators, AbstractControl, FormControl } from '@angular/forms';
​
@Component({
  selector: 'create-or-edit-menu',
  templateUrl: './create-or-edit-menu.component.html',
  styleUrls: [
  'create-or-edit-menu.component.less'
  ],
})

export class CreateOrEditMenuComponent
extends ModalComponentBase
implements OnInit {
  /**
   * 编辑时DTO的id
   */
   id: any;
 
   entity: MenuEditDto = new MenuEditDto();

   parentId = '';
   menuarr = [];

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
     private _menuService: MenuServiceProxy
     ) {
     super(injector);
   }

   ngOnInit(): void {
     this.init();
   }



   init(): void {
     this._menuService.getForEdit(this.id).subscribe(result => {
       this._menuService.getMenuDropDown()
       .subscribe(res => {
         // console.log(res)
         this.menuarr = res
       });
       this.entity = result.menu;
       this.parentId = result.menu.parentId+''
       console.log(this.parentId)
     });
   }

   onChange($event: string): void {
     console.log($event);
     this.parentId = $event
     this.entity.parentId = parseInt($event)
   }


   iconChange($event: string): void {
     console.log($event);
     this.iocName = $event
     this.entity.iocName = $event
     this.entity.iocClassName = $event
   }


   submitForm(): void {
     if (this.entity.level != 1 && !this.entity.parentId) {
       abp.message.warn(this.l('PleaseSelectParent'));
       return
     }
     const input = new CreateOrUpdateMenuInput();
     if(this.entity.level != 1){
       this.entity.iocName='anticon anticon-file'
       this.entity.iocClassName='anticon anticon-file'
     }
     input.menu = this.entity;
     this.saving = true;

     this._menuService.createOrUpdate(input)
     .finally(() => (this.saving = false))
     .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success(true);
     });
   }
 }
