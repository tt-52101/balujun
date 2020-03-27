import { Component, OnInit, Injector, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ModalComponentBase } from '@shared/component-base/modal-component-base';
import { CreateOrUpdateCustomerInput,CustomerEditDto, CustomerServiceProxy,
  GetCustomersInput,
  QueryData ,
  UploadUserPictureDto,
  VerifiableTypeEnum,
  SexEnum,
} from '@shared/service-proxies/service-proxies';

import { Validators, AbstractControl, FormControl } from '@angular/forms';

import { UtilsService } from '@abp/utils/utils.service';
import { AppConsts } from 'abpPro/AppConsts';

import * as baseISSOnline from 'assets/baseISSOnline.js';
import ZK from 'assets/baseISSObject.js';

@Component({
  selector: 'app-create-or-edit-customer',
  templateUrl: './create-or-edit-customer.component.html',
  styleUrls: ['./create-or-edit-customer.component.less'],
})

export class CreateOrEditCustomerComponent 
extends ModalComponentBase
implements OnInit {

  tindex:any;

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

  orderticket=[]
  customerlist=[]


  selectedIndex = 0;


  constructor(
    injector: Injector,
    private _customerService: CustomerServiceProxy,
    private _utilsService: UtilsService,
    ) {
    super(injector);
  }

  ngOnInit(): void {
    this.init();
    this.setcardreader()
  }

  init(): void {
    this.entity.verifiableType=VerifiableTypeEnum.IdentityCard
    this.uploadurl=AppConsts.remoteServiceBaseUrl+'/api/File/UploadImageAsync'
    this.hearder.Authorization='Bearer '+ this._utilsService.getCookieValue("Abp.AuthToken");


    this.orderticket=JSON.parse(localStorage.getItem('orderticket'))
    this.customerlist=this.orderticket[this.tindex].curstomer

    this.entity= this.customerlist[0]

    var that=this

    setTimeout(() => {
      that.setvideo()
    }, 1000);
  }

  selectChange($event): void {
    console.log($event.index);
    this.selectedIndex=$event.index
    this.entity= this.customerlist[$event.index]
  }



  setCertificateData(result) {

    this.entity.customerName=result.Certificate.Name
    this.entity.certificatesNum=result.Certificate.IDNumber
    if(result.Certificate.Sex == '男'){
      this.entity.sex=SexEnum.Man
    }else{
      this.entity.sex=SexEnum.Woman
    }


  }




  search(){
    if(this.entity.certificatesNum){
      // this._customerService.exists(this.entity.certificatesNum)
      // .subscribe(res => {
      //   console.log(res)
      //   if(res.exist){
      //     // abp.message.success("游客信息已填入表格")
      //     // this.notify.success(this.l('SavedSuccessfully'));
      //     // delete res.customer.dateOfBirthStr
      //     // console.log(this.entity)
      //     this.entity=res.customer;
      //     this.success(res.customer);
      //   }else{
      //     abp.message.warn("当前游客信息未录入系统")
      //   }
      // });
    }else{
      abp.message.error('请先输入证件号码');
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
    if( !(/^1[3456789]\d{9}$/.test(this.entity.mobile))){
      con.setErrors({ mobilelegal: true })
    }
  }


  setcardreader(){
    var that=this
    var Cardreaderset={
      Cert : {
        callBack : function(result){
          that.setCertificateData(result);
        },
        select : '#button_readID'
      },
      Methods : {
        downloadDrive : function(){
          abp.message.warn("请安装相关硬件驱动！")
        },
        showMessage : function(type,message){
          abp.message.warn(message)
        }
      }
    }

    baseISSOnline.createISSonlineDevice(Cardreaderset)
  }


  createshebei(){
    var Device=new baseISSOnline.Device
    Device.startFun()
  }




  setvideo(){
    var that=this
    this.video = this.elementRef.nativeElement.querySelector('video');
    this.canvas = this.elementRef.nativeElement.querySelector('canvas');
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
        console.log(err.name + ": " + err.message); 
      });
    } else if(navigator.getUserMedia){
      // this.getUserMedia({video : {width: 480, height: 320}}, this.success, this.error);
    } else {
      // alert('不支持访问用户媒体');
    }
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



}
