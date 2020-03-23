import {
  Component,
  OnInit,
  Injector,
  Input,
  ViewChild,
  AfterViewInit
} from '@angular/core';

import { FormControl, AbstractControl, Validators } from '@angular/forms';
import { AppConsts } from 'abpPro/AppConsts';

import * as _ from 'lodash';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';

import {
  IOrganizationUnitsTreeComponentData,
  OrganizationUnitsTreeComponent
} from '@app/admin/shared/organization-unit-tree/organization-unit-tree.component';
import {
  UserRoleDto,
  OrganizationUnitListDto,
  UserEditDto
} from '@shared/service-proxies/service-proxies';
import { UploadFile } from 'ng-zorro-antd';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TokenService } from '@abp/auth/token.service';

@Component({
  selector: 'app-create-or-edit',
  templateUrl: './create-or-edit.component.html',
  styleUrls: ['./create-or-edit.component.less']
})
export class CreateOrEditComponent extends ModalComponentBase
implements OnInit {
  @ViewChild(OrganizationUnitsTreeComponent, { static: false })
  organizationUnitTree: OrganizationUnitsTreeComponent;

  forminfo = {

    info1: '',
    info2: '',
    info3: 1,
    info4: [],
    info5: '',
    info6: '',
    info7: [],
    info8: '',
  }

  selectlist = [
    { key: "订阅号", value: 1 },
    { key: "认证订阅号", value: 2 },
    { key: "服务号", value: 3 },
    { key: "认证服务号", value: 4 }
  ]

  public editor;


  constructor(
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit(): void {

    this.init();
  }


  init(): void {


  }


  EditorCreated(quill): void {
    console.log(quill)
    const toolbar = quill.getModule('toolbar');
    console.log(toolbar)
    toolbar.addHandler('image', this.imageHandler.bind(this));
    // console.log(toolbar)
    this.editor = quill;
  }

  imageHandler() {
    const Imageinput = document.createElement('input');
    Imageinput.setAttribute('type', 'file');
    Imageinput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
    Imageinput.classList.add('ql-image');
    Imageinput.addEventListener('change', () => {

      // console.log(Imageinput.files[0])

      // const file = Imageinput.files[0];
      // const data: FormData = new FormData();
      // data.append('file', file, file.name);
      // const headers = new Headers();
      // headers.append('Accept', 'application/json');
      // const options = new RequestOptions({ headers: header });

      // console.log(options)

      if (Imageinput.files != null && Imageinput.files[0] != null) {
        // this.http.post('http://xxxx/upload', data, options)
        //   .subscribe(res => {
        //     const range = this.editor.getSelection(true);
        //     const index = range.index + range.length;
        //     this.editor.insertEmbed(range.index, 'image', 'http://' + res.url);
        //     //this.editor.insertEmbed(this.editor.getSelection(true).index, 'image', imageUrl);
        //   });
      }
	  
    });
    Imageinput.click();
  }

  contentChanged(quill): void {
    console.log(quill.html)
    this.forminfo.info8 = quill.html

  }


  save(): void {

  }
}
