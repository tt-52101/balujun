import {Component, OnInit,Injector, Input,ViewChild,AfterViewInit} from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
@Component({
  selector: 'app-create-or-edit-conductor',
  templateUrl: './create-or-edit-conductor.component.html',
  styles: []
})
export class CreateOrEditConductorComponent extends ModalComponentBase implements OnInit {

  constructor(
    injector: Injector,
  ) {
    super(injector);
  }


  allChecked = false;
  indeterminate = true;
  checked = true;
  checkOptionsOne = [
    { label: 'Apple', value: 'Apple', checked: true },
    { label: 'Pear', value: 'Pear', checked: false },
    { label: 'Orange', value: 'Orange', checked: false }
  ];

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


  ngOnInit() {
  }
  submitForm(){
    console.log('是否启用'+this.checked);
    
    console.log(this.allChecked);
    console.log(this.indeterminate);
    console.log(this.checkOptionsOne);
    
    
    console.log('保存');
    
  }

}
