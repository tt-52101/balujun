import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { CustomerServiceProxy, PagedResultDtoOfCustomerListDto, CustomerListDto,
  // GetCustomersInput,

  QueryData } from '@shared/service-proxies/service-proxies';
  import { CreateOrEditCustomerComponent } from './create-or-edit-customer/create-or-edit-customer.component';
  // import { AppConsts } from '@shared/AppConsts';
  //  import { FileDownloadService } from '@shared/utils/file-download.service';

  import { AppConsts } from 'abpPro/AppConsts';

  @Component({
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.less'],
    animations: [appModuleAnimation()],
  })



  export class CustomerComponent extends PagedListingComponentBase < CustomerListDto >
  implements OnInit {

    constructor(
      injector: Injector,
      private _customerService: CustomerServiceProxy
      ) {
      super(injector);
      
      this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
      this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
    }

    isAllOperation=false
    curmenupower=[]

    queryData=[{
      field: "customerName",
      method: "%",
      value: "",
      logic: "and"
    },{
      field: "mobile",
      method: "%",
      value: "",
      logic: "and"
    },{
      field: "sex",
      method: "=",
      value: "",
      logic: "and"
    },{
      field: "verifiableType",
      method: "=",
      value: "",
      logic: "and"
    },{
      field: "certificatesNum",
      method: "%",
      value: "",
      logic: "and"
    }]

    imgurl=AppConsts.remoteServiceBaseUrl

    search():void{

      // var formdata = new GetCustomersInput()

      // var arr=[]
      // for (var i = this.queryData.length - 1; i >= 0; i--) {
      //   if(this.queryData[i].value){
      //     arr.push(new QueryData(this.queryData[i]))
      //   }
      // }

      // formdata.queryData = arr;
      // formdata.sorting = null
      // formdata.maxResultCount = 999;
      // formdata.skipCount = 0;

      // this._customerService.getPaged(formdata)
      // .subscribe(result => {
      //   // result.items.forEach(function(item){
      //     //   if(item.photo){
      //       //     if(item.photo.indexOf(',') > -1){
      //         //       // item.photo=item.photo.split(',')
      //         //     }else{
      //           //       item.photo=this.imgurl+'/'+item.photo
      //           //     }
      //           //   }
      //           // })
      //           this.dataList = result.items;
      //           this.showPaging(result);
      //         });
    }

    viewbigpic(img){
      window.open(img)
    }

    protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

      // var formdata = new GetCustomersInput()

      // var arr=[]
      // for (var i = this.queryData.length - 1; i >= 0; i--) {
      //   if(this.queryData[i].value){
      //     arr.push(new QueryData(this.queryData[i]))
      //   }
      // }

      // formdata.queryData = arr;
      // formdata.sorting = request.sorting
      // formdata.maxResultCount = request.maxResultCount;
      // formdata.skipCount = request.skipCount;

      // this._customerService.getPaged(formdata)
      // .finally(() => {
      //   finishedCallback();
      // })
      // .subscribe(result => {
      //   this.dataList = result.items;
      //   this.showPaging(result);
      // });
    }

    /**
     * 新增或编辑DTO信息
     * @param id 当前DTO的Id
     */
     createOrEdit(id ? : number): void {
       this.modalHelper.static(CreateOrEditCustomerComponent, { id: id })
       .subscribe(result => {
         if (result) {
           this.refresh();
         }
       });
     }


    /**
     * 删除功能
     * @param entity 角色的实体信息
     */
     delete(entity: CustomerListDto): void {
       this._customerService.delete(entity.id)
       .subscribe(() => {
          /**
           * 刷新表格数据并跳转到第一页（`pageNumber = 1`）
           */
           this.refreshGoFirstPage();
           this.notify.success(this.l('SuccessfullyDeleted'));
         });
     }

    /**
     * 批量删除
     */
     batchDelete(): void {
       const selectCount = this.selectedDataItems.length;
       if (selectCount <= 0) {
         abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
         return;
       }

       abp.message.confirm(
         this.l('ConfirmDeleteXItemsWarningMessage', selectCount),
         res => {
           if (res) {
             const ids = _.map(this.selectedDataItems, 'id');
             this._customerService.batchDelete(ids).subscribe(() => {
               this.refreshGoFirstPage();
               this.notify.success(this.l('SuccessfullyDeleted'));
             });
           }
         },
         );
     }


    /**
     * 导出为Excel表
     */
     exportToExcel(): void {
       abp.message.error('功能开发中！！！！');
       // this._customerService.getCustomerexportToExcel().subscribe(result => {
         // this._fileDownloadService.downloadTempFile(result);
         // });
       }

     }
