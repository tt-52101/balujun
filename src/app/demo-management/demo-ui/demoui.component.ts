import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import {
  UserServiceProxy,
  PagedResultDtoOfUserListDto
} from '@shared/service-proxies/service-proxies';
import { FileDownloadService } from '@shared/utils';

@Component({
  selector: 'app-demoui',
  templateUrl: './demoui.component.html',
  styleUrls: ['./demoui.component.less']
})
export class DemoUiComponent extends AppComponentBase implements OnInit {
  validateForm: FormGroup;
  listOfData = [];
  constructor(
    injector: Injector,
    private fb: FormBuilder,
    private _userService: UserServiceProxy,
    private _fileDownloadService: FileDownloadService
  ) {
    super(injector);
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      content: ['1111111111111111', [Validators.required]]
    });
    this._userService
      .getPaged([], undefined, undefined, undefined, undefined, '', '', 20, 0)
      .subscribe((result: PagedResultDtoOfUserListDto) => {
        this.listOfData = result.items;
      });
  }

  /**
   * 演示-markdown 提交表单
   * @param value 表单值
   */
  submitForm(value: any) {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }
  /**
   * 演示-markdown 重置表单
   * @param e
   */
  resetForm(e: MouseEvent): void {
    e.preventDefault();
    // 因为simplemde组件 如果用 FormGroup reset 会赋值null 出现 字符串分割异常
    this.validateForm.setValue({ content: '' });
    // this.validateForm.reset();
    // for (const key in this.validateForm.controls) {
    //   this.validateForm.controls[key].markAsPristine();
    //   this.validateForm.controls[key].updateValueAndValidity();
    // }
  }

  /**
   * 演示-导出excel
   */
  exportToExcel(): void {
    this._userService.getUsersToExcel().subscribe(result => {
      console.log(result);
      this._fileDownloadService.downloadTempFile(result);
    });
    // 调用后端的到处方法
  }
}
