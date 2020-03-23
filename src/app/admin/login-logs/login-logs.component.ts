import { Component, OnInit, Injector } from '@angular/core';
import {
  // LoginLogModel,
  AuditLogServiceProxy,
} from '@shared/service-proxies/service-proxies';
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from '@shared/component-base/paged-listing-component-base';

import { NzModalService } from 'ng-zorro-antd';
import { AppComponentBase } from '@shared/component-base/app-component-base';
@Component({
  selector: 'app-login-logs',
  templateUrl: './login-logs.component.html',
  styles: [],
})
export class LoginLogsComponent extends AppComponentBase {
  constructor(
    injector: Injector,
    private auditLogService: AuditLogServiceProxy,

    private _modalService: NzModalService,
    ) {
    super(injector);
  }
}
// export class LoginLogsComponent extends PagedListingComponentBase<LoginLogModel> {

//   startToEndDate = [];

//   username: string;
//   hasException: boolean = undefined;
//   sourceName:string;
//   sourceCode:string;
//   clientIpAddress:string;

//   constructor(
//     injector: Injector,
//     private auditLogService: AuditLogServiceProxy,

//     private _modalService: NzModalService,
//     ) {
//     super(injector);
//   }

//   fetchDataList(
//     request: PagedRequestDto,
//     pageNumber: number,
//     finishedCallback: Function,
//     ): void {
//     let startData;
//     let endData;
//     if (this.startToEndDate.length === 2) {
//       startData = this.startToEndDate[0] === null ? undefined : this.startToEndDate[0];
//       endData = this.startToEndDate[1] === null ? undefined : this.startToEndDate[1];
//     }

//     this.auditLogService
//     .getPagedLoginLogs(
//       startData,
//       endData,
//       this.username,
//       this.sourceName,
//       this.sourceCode,
//       this.clientIpAddress,
//       this.hasException,
//       this.sorting,
//       request.maxResultCount,
//       request.skipCount,
//       )
//     .finally(() => {
//       finishedCallback();
//     })
//     .subscribe(result => {
//       this.dataList = result.items;
//       this.showPaging(result);
//     });
//   }

//   protected delete(entity: LoginLogModel): void { }

//   showDetails(item: LoginLogModel): void {
//     this._modalService.create({
//       nzTitle: this.l('Details'),
//       nzContent: item.exception,
//       nzClosable: false,
//       nzCancelText:null,
//       nzOnOk: () => {

//       }
//     });
//   }


//   truncateStringWithPostfix(text: string, length: number): string {
//     return abp.utils.truncateStringWithPostfix(text, length);
//   }
// }
