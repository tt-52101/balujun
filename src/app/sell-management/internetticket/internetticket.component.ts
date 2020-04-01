import { Component, OnInit, Injector } from '@angular/core';

import { appModuleAnimation } from '@shared/animations/routerTransition';

import { AppComponentBase } from '@shared/component-base/app-component-base';

import {
  ActivityServiceProxy,
  GetActivitysInput,
  TicketDetailServiceProxy, QueryData,
} from '@shared/service-proxies/service-proxies';

import { NzModalService } from 'ng-zorro-antd';

import { getLodop } from '../../common/lodop.js';

import * as moment from 'moment';
import { LogLevel } from 'msal';

let LODOP;

@Component({
  selector: 'app-internetticket',
  templateUrl: './internetticket.component.html',
  styleUrls: ['./internetticket.component.less'],
  animations: [appModuleAnimation()],
})
export class InternetTicketComponent extends AppComponentBase implements OnInit {

  constructor(
    injector: Injector,
    private _activityService: ActivityServiceProxy,
    private _ticketDetailService: TicketDetailServiceProxy,
    private _modalService: NzModalService,
    ) {
    super(injector);
    this.curmenupower = JSON.parse(localStorage.getItem('curmenupower'))
    this.isAllOperation = eval(localStorage.getItem('isAllOperation'))
  }

  isAllOperation = false
  curmenupower = []

  queryData = [{
    field: "qrCode",
    method: "=",
    value: "",
    logic: "and"
  }, {
    field: "activityNo",
    method: "=",
    value: "",
    logic: "and"
  }]

  orderlist = []
  orderinfo = {}
  orderticket = []

  single = false
  allChecked = false
  checkboxIndeterminate = false
  selectedDataItems = []

  ngOnInit(): void {
    this.init();
  }

  init(): void { }

  query(): void {
    var arr = []
    if (this.queryData[0].value) {
      for (var i = 0; i < this.queryData.length-1; i++) {
        if (this.queryData[i].value) {
          arr.push(new QueryData(this.queryData[i]))
        }
      }
      this._ticketDetailService.getPaged(arr,'','',999,0)
      .subscribe(result => {

        if (result.items.length > 0) {
          this.single = true
          for (var i = 0; i < result.items.length; i++) {
            result.items[i].isPrint = false
          }
          this.orderticket = result.items
          console.log(result);
          this.orderinfo = result.items[0].activityDetail.activity
          console.log(this.orderinfo);
          
        } else {
          abp.message.warn(this.l('NoOrder'));
        }
      });
    } else if(this.queryData[1].value){
      var arr=[]
      for (var i = 1; i <this.queryData.length; i++) {
        if(this.queryData[i].value){
          arr.push(new QueryData(this.queryData[i]))
        }
      }
      var formdata=new GetActivitysInput
      formdata.queryData = arr;
      formdata.sorting = null;
      formdata.maxResultCount = 999;
      formdata.skipCount = 0;
      
      this._activityService.getPaged(formdata)
      .subscribe(result => {
        console.log(result);
        
        if(result.items.length==0){
          abp.message.warn(this.l('NoOrder'));
        }else{
          this.single=false
          this.orderlist = result.items;
        }
      });
    }else{
      abp.message.warn('请输入订单号或者扫二维码');
    }
  }

  checkAll($event) {
    // console.log($event)
    if ($event) {
      for (var i = 0; i < this.orderticket.length; i++) {
        this.orderticket[i].checked = true
      }
    } else {
      for (var i = 0; i < this.orderticket.length; i++) {
        this.orderticket[i].checked = false
      }
    }
  }

  refreshCheckStatus(entityList: any[]): void {
    // 是否全部选中
    const allChecked = entityList.every(value => value.checked === true);
    // 是否全部未选中
    const allUnChecked = entityList.every(value => !value.checked);
    // 是否全选
    this.allChecked = allChecked;
    // 全选框样式控制
    this.checkboxIndeterminate = !allChecked && !allUnChecked;
    // 已选中数据
    this.selectedDataItems = entityList.filter(value => value.checked);

  }

  select(item) {
    console.log(item.activityNo);
    this.single = true
    this.orderinfo = item
    console.log(this.orderinfo);

    var arr = [
    new QueryData({
      field: "ActivityDetail.Activity.ActivityNo",
      method: "=",
      value: item.activityNo,
      logic: "and"
    })]


    this._ticketDetailService.getPaged(arr,'','',999,0)
    .subscribe(result => {
      console.log(result.items);

      this.orderticket = result.items
    });
  }





  printticket() {
    // console.log(this.orderticket)

    var idarr = []
    var ticketarr = []
    for (var i = 0; i < this.orderticket.length; i++) {
      if (this.orderticket[i].checked) {
        idarr.push(this.orderticket[i].id)
        ticketarr.push(this.orderticket[i])
      }
    }

    if (idarr.length == 0) {
      abp.message.warn(this.l('PleaseSelectAtLeastOneItem'));
      return
    }
    LODOP=getLodop();
    if(LODOP){
      var top = 100; //最高坐标
      var left = 90; //最左坐标
      var width = 10; //上边距
      var height = 12; //右边距
      var QRcodeWidth = 95; //二维码大小
      var paperWidth = 700; //纸张宽度
      var paperHeight = 1200; //纸张长度
      var fontWidth = 400; //文字区域宽度
      var fontHeight = 17; //文字区域高度
      LODOP.SET_PRINT_STYLEA(0, "DataCharset", "UTF-8");
      LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
      LODOP.PRINT_INITA("");
      LODOP.SET_PRINT_STYLE("FontSize", 10);
      //设置打印方向及纸张类型，自定义纸张宽度，设定纸张高，

      LODOP.SET_PRINT_PAGESIZE(1, paperWidth, paperHeight, "");
      for (var i = 0; i <ticketarr.length; i++) {
        var item =ticketarr[i];
        LODOP.NewPage();
        LODOP.ADD_PRINT_BARCODE(top, left + height + 1.5 * fontHeight, QRcodeWidth, QRcodeWidth, "QRCode", item.qrCode);

        LODOP.SET_PRINT_STYLEA(0, "Angle", 270); //逆时针旋转270度
        LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 7 * fontHeight, fontWidth, fontHeight, "票　　类：" + item.ticketPriceName);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
        LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 6 * fontHeight, fontWidth, fontHeight, "票　　价：" + item.ticketPrice);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270)
        LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 5 * fontHeight, fontWidth, fontHeight, "票　　号：" + item.ticketNo);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
        LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 4 * fontHeight, fontWidth, fontHeight, "开始日期：" + item.startDateTime._i.split('T')[0]);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
        LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 3 * fontHeight, fontWidth, fontHeight, "结束日期：" + item.endDateTime._i.split('T')[0]);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
        LODOP.ADD_PRINT_TEXT(top + width + QRcodeWidth, left + height + 2 * fontHeight, fontWidth, fontHeight, "可验次数：" + item.checkingQuantity);
        LODOP.SET_PRINT_STYLEA(0, "Angle", 270);
      }
      this._ticketDetailService.printTicketDetail(idarr)
      .subscribe(result => {});
      // LODOP.PREVIEW()
      LODOP.PRINT();

      this._ticketDetailService.printTicketDetail(idarr)
      .subscribe(result => {
        this.select(this.orderinfo)
        this.notify.success(this.l('PrintSuccess'));
        this.allChecked=false
        this.checkboxIndeterminate=false

      });

    }else{
      abp.message.error('打印失败！请检查打印控件是否安装以及版本是否最新。控件下载地址：http://www.lodop.net/download.html。请根据设备系统下载对应版本。');
    }


  }
}