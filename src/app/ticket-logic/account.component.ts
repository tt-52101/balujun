import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import {
  TicketAccountServiceProxy,
  PagedResultDtoOfAccountListDto,
  AccountListDto,
  GetAccountsInput,
  PayMethodServiceProxy,
  AccountServiceProxy,
  AccountDetailServiceProxy,
  TicketDetailServiceProxy,
  QueryData
} from '@shared/service-proxies/service-proxies';
import { CreateOrEditAccountComponent } from './create-or-edit-account/create-or-edit-account.component';
// import { AppConsts } from '@shared/AppConsts';
//  import { FileDownloadService } from '@shared/utils/file-download.service';

import * as moment from 'moment';

import { getLodop } from '../common/lodop.js';

let LODOP;

@Component({
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.less'],
  animations: [appModuleAnimation()],
})


export class AccountComponent extends PagedListingComponentBase < AccountListDto >
implements OnInit {

  constructor(
    injector: Injector,
    private _accountService: AccountServiceProxy,
    private _ticketaccountService: TicketAccountServiceProxy,
    private _payMethodService: PayMethodServiceProxy,
    private _accountDetailService: AccountDetailServiceProxy,
    private _ticketDetailService: TicketDetailServiceProxy,
    ) {
    super(injector);
    this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
    this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
  }

  isAllOperation=false
  curmenupower=[]
  
  payMethodList = []

  queryData = [{
    field: "accountNo",
    method: "=",
    value: "",
    logic: "and"
  }, {
    field: "accountStatus",
    method: "=",
    value: "",
    logic: "and"
  }, {
    field: "payName",
    method: "=",
    value: "",
    logic: "and"
  }, {
    field: "creationTime",
    method: ">=",
    value: "",
    logic: "and"
  }, {
    field: "creationTime",
    method: "<=",
    value: "",
    logic: "and"
  }];

  collectionTime = ""

  accountinfo = []
  ticketlist = []

  allChecked = false
  checkboxIndeterminate = false
  selectedDataItems = []


  selectedDataItems1=[]
  checkboxIndeterminate1=false
  allChecked1=false


  visible = false;

  documentHeight=0


  protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
    this.documentHeight=document.body.offsetHeight
    const formdata = new GetAccountsInput();
    var arr = []
    for (var i = this.queryData.length - 1; i >= 0; i--) {
      if (this.queryData[i].value) {
        arr.push(new QueryData(this.queryData[i]))
      }
    }
    formdata.queryData = arr;
    formdata.filterText = ''
    formdata.sorting = 'creationTime desc'
    formdata.maxResultCount = request.maxResultCount;
    formdata.skipCount = request.skipCount;

    this._ticketaccountService.getPaged(formdata)
    .finally(() => {
      finishedCallback();
    })
    .subscribe(result => {
      this.dataList = result.items;
      this.showPaging(result);
    });
  }


  datechange($event): void {
    // this.queryData[4].value = $event[0]
    // this.queryData[5].value = $event[1]
    if($event[0].getTime() == $event[1].getTime()){
      $event[1]=new Date($event[1].getTime()+24*60*60*1000)
    }

    var year=$event[0].getFullYear();
    var month = $event[0].getMonth() + 1;
    var day = $event[0].getDate();

    var fulldate1=year+'-'+month+'-'+day;

    var year=$event[1].getFullYear();
    var month = $event[1].getMonth() + 1;
    var day = $event[1].getDate();

    var fulldate2=year+'-'+month+'-'+day;

    this.queryData[4].value=moment(fulldate1).format('YYYY-MM-DD HH:mm:ss')
    this.queryData[5].value=moment(fulldate2).format('YYYY-MM-DD HH:mm:ss')
  }

  close(): void {
    this.visible = false;
  }


  cancelSettle() {
    const selectCount = this.selectedDataItems.length;
    if (selectCount <= 0) {
      abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
      return;
    }
    abp.message.confirm(
      this.l('ConfirmCancelSettleXItemsWarningMessage', selectCount),
      res => {
        if (res) {
          const ids = _.map(this.selectedDataItems, 'id');
          this._ticketaccountService.rSettleAccount(ids).subscribe(result => {
            if (result.resultCode == '000') {
              this.notify.success('修改成功');
              this.refreshGoFirstPage()
            } else {
              this.notify.error(result.resultMessage);
            }
          });
        }
      },
      );
  }


  open(account, id): void {
    var arr=[new QueryData({
      field: "ActivityDetail.Activity.AccountsId",
      method: "=",
      value: id,
      logic: "and"
    })]
    this._ticketDetailService.getPaged(arr,'','',999,0)
    .subscribe(result => {
      console.log(result)
      this.visible = true;
      this.accountinfo = [account];
      this.ticketlist = result.items;
    });
  }


  reprint(){
    var idarr=[]
    var ticketarr=[]
    for (var i =0;i< this.ticketlist.length; i++) {
      if(this.ticketlist[i].checked){
        idarr.push(this.ticketlist[i].id)
        ticketarr.push(this.ticketlist[i])
      }
    }

    console.log(idarr)

    if(idarr.length==0){
      abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
      return
    }

    LODOP=getLodop();
    if(LODOP){
      var top = 390; //最高坐标
      var left = 15; //最左坐标
      var width = 10; //上边距
      var height = 12; //右边距
      var QRcodeWidth = 75; //二维码大小
      var paperWidth = 600; //纸张宽度
      var paperHeight = 1500; //纸张长度
      var fontWidth = 400; //文字区域宽度
      var fontHeight = 16; //文字区域高度
      LODOP.SET_PRINT_STYLEA(0, "DataCharset", "UTF-8");
      LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
      LODOP.PRINT_INITA("");
      LODOP.SET_PRINT_STYLE("FontSize", 7.5);
      //设置打印方向及纸张类型，自定义纸张宽度，设定纸张高，
      var idarr=[]
      LODOP.SET_PRINT_PAGESIZE(1, paperWidth, paperHeight, "");
      for (var i = 0; i < ticketarr.length; i++) {
        var item = ticketarr[i];
        idarr.push(item.ticketDetailId)
        LODOP.NewPage();
        LODOP.ADD_PRINT_BARCODE(top + width + 44, left + height + 6.5 * fontHeight, QRcodeWidth, QRcodeWidth, "QRCode", item.qrCode);

        LODOP.SET_PRINT_STYLEA(0, "Angle", 270); //逆时针旋转270度
        LODOP.ADD_PRINT_TEXT(top + width, left + height + 6 * fontHeight, fontWidth, fontHeight, "票　　类：" + item.ticketName);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
        LODOP.ADD_PRINT_TEXT(top + width, left + height + 5 * fontHeight, fontWidth, fontHeight, "票　　价：" + item.ticketPrice);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270)
        LODOP.ADD_PRINT_TEXT(top + width, left + height + 4 * fontHeight, fontWidth, fontHeight, "票　　号：" + item.ticketNo);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
        LODOP.ADD_PRINT_TEXT(top + width, left + height + 3 * fontHeight, fontWidth, fontHeight, "开始日期：" + item.playDate);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
        LODOP.ADD_PRINT_TEXT(top + width, left + height + 2 * fontHeight, fontWidth, fontHeight, "结束日期：" + item.playTime);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
        LODOP.ADD_PRINT_TEXT(top + width, left + height + 1 * fontHeight, fontWidth, fontHeight, "可验次数：" + item.checkingQuantity);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
      }
      this._ticketDetailService.printTicketDetail(idarr)
      .subscribe(result => {});
      // LODOP.PREVIEW()
      LODOP.PRINT();

      this._ticketDetailService.printTicketDetail(idarr)
      .subscribe(result => {
        this.open(this.accountinfo[0],this.accountinfo[0].id)
        this.checkboxIndeterminate1=false
        this.allChecked1=false
      });

    }else{
      abp.message.error('打印失败！请检查打印控件是否安装以及版本是否最新。控件下载地址：http://www.lodop.net/download.html。请根据设备系统下载对应版本。');
    }



  }

  checkAll1($event){
    console.log($event)
    if($event){
      for (var i =0;i< this.ticketlist.length; i++) {
        this.ticketlist[i].checked=true
      }
    }else{
      for (var i =0;i< this.ticketlist.length; i++) {
        this.ticketlist[i].checked=false
      }
    }
  }


  refreshCheckStatus1(entityList: any[]): void {
    // 是否全部选中
    const allChecked1 = entityList.every(value => value.checked === true);
    // 是否全部未选中
    const allUnChecked1 = entityList.every(value => !value.checked);
    // 是否全选
    this.allChecked1 = allChecked1;
    // 全选框样式控制
    this.checkboxIndeterminate1 = !allChecked1 && !allUnChecked1;
    // 已选中数据
    this.selectedDataItems1 = entityList.filter(value => value.checked);

  }







}
