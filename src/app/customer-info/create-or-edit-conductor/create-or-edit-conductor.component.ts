import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { TicketRoleEditDto, QueryData, TicketRoleServiceProxy, GetTicketRoleForUpdateOutput,UpdateTicketRoleInput } from '@shared/service-proxies/service-proxies';


@Component({
  selector: 'app-create-or-edit-conductor',
  templateUrl: './create-or-edit-conductor.component.html',
  styles: []
})
export class CreateOrEditConductorComponent extends ModalComponentBase implements OnInit {

  /**
* 编辑时DTO的id
*/
  id: any;

  entity: GetTicketRoleForUpdateOutput = new GetTicketRoleForUpdateOutput();

  constructor(
    injector: Injector,
    private _ticketRoleServiceProxy: TicketRoleServiceProxy
  ) {
    super(injector);
  }

  allChecked = true;
  indeterminate = false;
  checked = true;

  checkOptionsOne = [];

  ngOnInit() {
    this.init()
  }

  init(): void {
    this._ticketRoleServiceProxy.getForUpdate(this.id)
      .subscribe(result => {
        let i = 0
        result.allTicketPrices.forEach(item => {
          if (!item.isAvailable) {
            this.allChecked = false
          }
          this.checkOptionsOne[i] = {
            label: '',
            value: Number,
            checked: false,
          }
          this.checkOptionsOne[i].label = item.ticket.ticketName
          this.checkOptionsOne[i].value = item.id
          this.checkOptionsOne[i].checked = item.isAvailable
          i++
        });
        this.entity = result
        console.log(this.entity);

      });
  }

  updateAllChecked(): void {

    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: true
        };
      });
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => {
        return {
          ...item,
          checked: false
        };
      });
    }
  }

  updateSingleChecked(): void {
    console.log(this.checkOptionsOne);
    if (this.checkOptionsOne.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  submitForm() {
    let arr = []
    this.checkOptionsOne.forEach(item => {
      if (item.checked == true) {
        arr.push(item.value)
      }
    })
    console.log(arr);
    const formdata = new UpdateTicketRoleInput();
    formdata.roleId = this.entity.id
    formdata.availableTicketPriceIds = arr
    formdata.isEnabled = this.entity.isEnabled
    // this._ticketRoleServiceProxy.update(this.entity.id,arr,this.entity.isEnabled) 
    this._ticketRoleServiceProxy.update(formdata) 
    .subscribe(result => {
      this.notify.success(this.l('SavedSuccessfully'));
      this.success(true);
  });
  }

}
