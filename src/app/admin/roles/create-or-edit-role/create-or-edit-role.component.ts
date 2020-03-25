import { finalize } from 'rxjs/operators';
import { Component, OnInit, Injector, ViewChild, Input } from '@angular/core';
import {
  RoleEditDto,
  PermissionServiceProxy,
  RoleServiceProxy,
  CreateOrUpdateRoleInput,
  UserEditDto,
  TicketPriceServiceProxy,QueryData
} from '@shared/service-proxies/service-proxies';
import { PermissionTreeComponent } from '@app/admin/shared/permission-tree/permission-tree.component';

import { ModalComponentBase } from '@shared/component-base/modal-component-base';

@Component({
  selector: 'app-create-or-edit-role',
  templateUrl: './create-or-edit-role.component.html',
  styles: []
})
export class CreateOrEditRoleComponent extends ModalComponentBase
implements OnInit {
  @ViewChild(PermissionTreeComponent, { static: false })
  permissionTree: PermissionTreeComponent;

  /**
   * 编辑时Id
   */
   id?: number;
  /**
   * 用户实体
   */
   user: UserEditDto = new UserEditDto();
  /**
   * 角色实体
   */
   role: RoleEditDto = new RoleEditDto();


   ticketlist=[]
   ticketPriceIds=[]

   allChecked = false;
   indeterminate = true;

   
   constructor(
     injector: Injector, 
     private _roleService: RoleServiceProxy,
     private _ticketPriceService: TicketPriceServiceProxy,
     ) {
     super(injector);
   }

   ngOnInit() {
     // 初始化数据
     this.init();
   }
  /**
   * 初始化
   */
   init(): void {
     const self = this;

     self._roleService.getForEdit(self.id).subscribe(result => {
       self.role = result.role;
      //  self.ticketPriceIds= result.ticketPriceIds;
       this.getticket()
       // self.permissionTree.editData = result;
     });
   }


   getticket(){
     var arr=[]
     arr.push(new QueryData({
       field: "isEnabled",
       method: "=",
       value: 'true',
       logic: "and"
     }))
     var that = this;
     var ticketlist=[]
     this._ticketPriceService.getPaged(null)
     .subscribe(result => {
       result.items.forEach(function(item){
         var ticket={
           label:item.ticketName,
           value:item.id,
           checked:false
         }
         if(that.ticketPriceIds.indexOf(item.id) > -1){
           ticket.checked=true
         }
         ticketlist.push(ticket)
       })
       this.ticketlist = ticketlist;
       this.updateSingleChecked()
     });
   }

   ngModelChange(a){
     this.ticketPriceIds=a
   }

   updateAllChecked(): void {
     this.indeterminate = false;
     if (this.allChecked) {
       this.ticketlist = this.ticketlist.map(item => {
         return {
           ...item,
           checked: true
         };
       });
     } else {
       this.ticketlist = this.ticketlist.map(item => {
         return {
           ...item,
           checked: false
         };
       });
     }
   }

   updateSingleChecked(): void {
     if (this.ticketlist.every(item => !item.checked)) {
       this.allChecked = false;
       this.indeterminate = false;
     } else if (this.ticketlist.every(item => item.checked)) {
       this.allChecked = true;
       this.indeterminate = false;
     } else {
       this.indeterminate = true;
     }
   }


   save(): void {
     this.saving = true;
     const input: CreateOrUpdateRoleInput = new CreateOrUpdateRoleInput();
     input.role = this.role;
     input.grantedPermissionNames = [];

     var ticketPriceIds=[]
     this.ticketlist.forEach(function(item){
       if(item.checked){
         ticketPriceIds.push(item.value)
       }
     })
    //  input.ticketPriceIds=ticketPriceIds

     this.saving = true;
     this._roleService
     .createOrUpdate(input)
     .pipe(finalize(() => (this.saving = false)))
     .subscribe(() => {
       this.notify.success(this.l('SavedSuccessfully'));
       this.success();
     });
   }
 }
