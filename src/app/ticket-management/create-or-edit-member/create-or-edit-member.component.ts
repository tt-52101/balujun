import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateCustomerInput,CustomerEditDto, CustomerServiceProxy,
  GetCustomersInput,
  QueryData ,
  UploadUserPictureDto,
  VerifiableTypeEnum,} from '@shared/service-proxies/service-proxies';
  import { Validators, AbstractControl, FormControl } from '@angular/forms';

import { UtilsService } from '@abp/utils/utils.service';
import { AppConsts } from 'abpPro/AppConsts';

@Component({
  selector: 'app-create-or-edit-member',
  templateUrl: './create-or-edit-member.component.html',
  styleUrls: ['./create-or-edit-member.component.less'],
})
export class CreateOrEditMemberComponent 
extends ModalComponentBase
implements OnInit {


  entity: CustomerEditDto=new CustomerEditDto();


  uploadurl=''

  hearder={
    Authorization:''
  }
  photo=''

  video:any;
  canvas:any;
  context:any;

  cantakepic=true;

  // issOnlineUrl = "http://127.0.0.1:24010/ZKIDROnline";

  // browserFlag :any;
 /**
  * 初始化的构造函数
  */
  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    private _utilsService: UtilsService,
    ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
    this.getBrowserType()

    var Cardreaderset={
      Cert : {
        callBack : function(result){
          console.log(result)
          this.setCertificateData(result);
        },
        select : this.elementRef.nativeElement.querySelector('.readfile')
      },
      Methods : {
        showMessage : function(type,message){
          console.log(type,message)
        },
        downloadDrive : function(){
          abp.message.warn("请安装相关硬件驱动！")

        }
      }
    }
    // cardreader(Cardreaderset);
  }

  getBrowserType() {
    var browserFlag = "";
    //是否支持html5的cors跨域
    if (typeof(Worker) !== "undefined") {
      browserFlag = "html5";
    }
    //此处判断ie8、ie9
    else if (navigator.userAgent.indexOf("MSIE 7.0") > 0 || navigator.userAgent.indexOf("MSIE 8.0") > 0 || navigator.userAgent
      .indexOf("MSIE 9.0") > 0) {
      browserFlag = "simple";
  } else {
    browserFlag = "upgradeBrowser"; //当前浏览器不支持该功能,请升级浏览器
  }
  // this.browserFlag=browserFlag
}

setCertificateData(result) {
  console.log(result.Certificate);
  //姓名
  // F.ui.CustomerName.setText(result.Certificate.Name);
  // //身份证号
  // F.ui.IdNumber.setText(result.Certificate.IDNumber);
  // //性别 
  // var sex = result.Certificate.Sex == "男" ? "M" : "W";
  // F.ui.Sex.setValue(sex);

  //身份证头像
  //imgData =result.Certificate.Base64Photo;
  //$("#id_img_pers").attr("src","data:image/jpg;base64,"+imgData);


  //$("#birthday").val(result.Certificate.Birthday.replace(/\./g,"-").substr(0,10));
  //$("#certNumber").val(result.Certificate.IDNumber);
  //$("#idIssued").val(result.Certificate.IDIssued);
  //$("#issuedValidDate").val(result.Certificate.IssuedData+"-"+result.Certificate.ValidDate);

  //imgData =result.Certificate.Base64Photo;
  //$("#id_img_pers").attr("src","data:image/jpg;base64,"+imgData);
  //$("#personIdPhoto").val(imgData);
  //$("#personPhoto").val("");

  //$("#personName").val(result.Certificate.Name);
  //$("#gender").val(result.Certificate.Sex);
  //$("#nation").val(result.Certificate.Nation);
  //$("#address").val(result.Certificate.Address);
}




legal(con) {

  if (!(/^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(this.entity.certificatesNum)) && this.entity.verifiableType == VerifiableTypeEnum.IdentityCard) {//身份证
    con.setErrors({ legal: true })
  }
  if( !(/(H|M)(\d{10})$/.test(this.entity.certificatesNum)) && this.entity.verifiableType == VerifiableTypeEnum.ReturnCard){//回乡证
    con.setErrors({ legal: true })
  }
  if( !(/(^\d{8})$/.test(this.entity.certificatesNum)) && this.entity.verifiableType == VerifiableTypeEnum.TaiwanCard){//台胞证
    con.setErrors({ legal: true })
  }
}

mobilelegal(con){
  if( !(/^1[3456789]\d{9}$/.test(this.entity.mobile))){//台胞证
    con.setErrors({ mobilelegal: true })
  }
}



init(): void {
  this.entity.verifiableType=VerifiableTypeEnum.IdentityCard
  this.uploadurl=AppConsts.remoteServiceBaseUrl+'/api/File/UploadImageAsync'
  this.hearder.Authorization='Bearer '+ this._utilsService.getCookieValue("Abp.AuthToken");
  var that=this

  setTimeout(() => {
    this.video = this.elementRef.nativeElement.querySelector('video');
    this.canvas = this.elementRef.nativeElement.querySelector('canvas');
    // console.log(this.video)
    this.context = this.canvas.getContext('2d');

    if (navigator.mediaDevices.getUserMedia) {

      var constraints = { video : {width: 190, height: 200} }; 

      navigator.mediaDevices.getUserMedia(constraints)
      .then(function(mediaStream) {
        var video = that.elementRef.nativeElement.querySelector('video')
        video.srcObject = mediaStream;
        video.onloadedmetadata = function(e) {
          video.play();
        };
      })
      .catch(function(err) { that.cantakepic=false; 
        // console.log(err.name + ": " + err.message); 
      });
    } else if(navigator.getUserMedia){
      // this.getUserMedia({video : {width: 480, height: 320}}, this.success, this.error);
    } else {
      // alert('不支持访问用户媒体');
    }
  }, 1000);
}

makepic(){
  if(this.cantakepic){
    this.context.drawImage(this.video, 0, 0, 190, 200);
    var basestr = this.canvas.toDataURL("image/png")
    // console.log(basestr)
    var formdata=new UploadUserPictureDto
    formdata.pictureString=basestr.split(',')[1]
    this._customerService.userPictureBase64(formdata)
    .subscribe(res => {
      console.log(res.uri)
      this.entity.photo=res.uri
    });
  }else{
    abp.message.error('无法拍照，请检查设备');
  }

}




// search(){
//   if(this.entity.certificatesNum){
//    //  this._customerService.exists(this.entity.certificatesNum)
//    //  .subscribe(res => {
//    //    console.log(res)
//    //    if(res.exist){
//    //      // abp.message.success("游客信息已填入表格")
//    //      // this.notify.success(this.l('SavedSuccessfully'));
//    //      // delete res.customer.dateOfBirthStr
//    //      // console.log(this.entity)
//    //      this.entity=res.customer;
//    //      this.success(res.customer);
//    //    }else{
//    //      abp.message.warn("当前游客信息未录入系统")
//    //    }
//    //  });
//   }else{
//     abp.message.error('请先输入证件号码');
//   }
// }


handleChange(info): void {
  // console.log(info)
  switch (info.file.status) {
    case 'done':
    this.photo=info.file.name
    this.entity.photo=info.file.response.result.uri
    break;
    case 'error':
    abp.message.error(this.l('UploadFail'));
    break;
  }
}


submitForm(): void {
  const input = new CreateOrUpdateCustomerInput();
  // console.log(input.customer)
  // console.log(this.entity)

  var formdata = new GetCustomersInput()

  var arr=[new QueryData({
    field: "certificatesNum",
    method: "=",
    value: this.entity.certificatesNum,
    logic: "and"
  })]


  formdata.queryData = arr;
  formdata.sorting = null
  formdata.maxResultCount = 999;
  formdata.skipCount = 0;

  this._customerService.getPaged(formdata)
  .subscribe(result => {
    console.log(result.items)
    if(result.items.length>0){
      abp.message.warn("当前游客信已录入系统，已替换为系统中游客信息")
      this.success(result.items[0]);
    }else{
      this.entity.loginPwd="12346"
      input.customer = this.entity;

      this.saving = true;

      this._customerService.createOrUpdate(input)
      .finally(() => (this.saving = false))
      .subscribe(res => {
        console.log(res)

        this._customerService.exists(this.entity.certificatesNum)
        .subscribe(res => {
          console.log(res)
          this.notify.success(this.l('SavedSuccessfully'));
          this.success(res.customer);
        });
      });
    }
  });
}


}
