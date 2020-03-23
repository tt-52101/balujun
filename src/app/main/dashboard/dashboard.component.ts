import { Component, OnInit, Injector } from '@angular/core';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd';
import { appModuleAnimation } from '@shared/animations/routerTransition';

// import {ScheduleServiceProxy, PagedResultDtoOfScheduleListDto, ScheduleListDto,GetSchedulesInput,  QueryData,OperServiceProxy,AnalyticType} from '@shared/service-proxies/service-proxies';

declare var echarts: any;

import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],

  animations: [appModuleAnimation()],
})
export class DashboardComponent extends AppComponentBase implements OnInit {
  peoplecount = 0;
  incomecount = 0;

  // range1 = AnalyticType.Daily
  // range2 = AnalyticType.Daily

  datepicker = '';

  schedulelist = [];

  nzSelectedIndex=0

  queryData=[{
    field: "saleDate",
    method: ">=",
    value: "",
    logic: "and"
  },{
    field: "saleDate",
    method: "<=",
    value: "",
    logic: "and"
  }]

  // count=0

  // countfunc(){
  //   this.count += this.count
  // }

  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, new Date()) < 0;
  };
  

  constructor(
    injector: Injector,
    private http: _HttpClient,
    public msg: NzMessageService,
    // private _scheduleService: ScheduleServiceProxy,
    // private _operService: OperServiceProxy,
    ) {
    super(injector);
  }



  ngOnInit(): void {
    // console.log('haslogin')
    var that = this
    setTimeout(function() {
      that.setecharts1()
      // that.setecharts2()
    }, 600)

    this.getschedule(1)
  };


  getschedule(days){
    // console.log(days)
    if(days == 0){
      this.schedulelist=[]
      return
    }else if(days == -1){

    }else{
      var now=new Date()
      var nextnow=new Date(now.getTime()+ (days * 86400000));
      var year=now.getFullYear();
      var month = now.getMonth() + 1;
      var day = now.getDate();

      var nextyear = new Date(nextnow).getFullYear();
      var nextmonth = new Date(nextnow).getMonth() + 1;
      var nextday = new Date(nextnow).getDate();

      this.queryData[0].value=year+'-'+month+'-'+day + ' 00:00:00'
      this.queryData[1].value=nextyear+'-'+nextmonth+'-'+nextday + ' 00:00:00'
    }

    // var formdata = new GetSchedulesInput()
    var arr=[]
    // for (var i = this.queryData.length - 1; i >= 0; i--) {
    //   if(this.queryData[i].value){
    //     arr.push(new QueryData(this.queryData[i]))
    //   }
    // }
    // formdata.queryData = arr;
    // formdata.sorting = null;
    // formdata.maxResultCount = 999;
    // formdata.skipCount = 0;

    // this._scheduleService.getPaged(formdata)
    // .subscribe(result => {
    //   this.schedulelist = result.items;
    // });

  }

  setecharts1(): void {
    var datestr=new Date().getFullYear()+'-'+new Date().getMonth()+'-'+new Date().getDate()
    // this._operService.revenueAnal(datestr,this.range1)
    // .subscribe(result => {
    //   let date1 = result.customerAnal.timeSpan
    //   let data1 =result.customerAnal.count;
    //   let data2 =result.financeAnal.amount;
    //   this.peoplecount=result.customerAnal.totalCount
    //   this.incomecount = result.financeAnal.totalAmount
    //   let option1 = {
    //     legend: {
    //       top:32,
    //       left:'center',
    //       data:['游客数量','收入']
    //     },
    //     tooltip: {
    //       show: true,
    //       trigger: 'axis',
    //       axisPointer: {
    //         type: 'cross'
    //       }
    //     },
    //     title: {
    //       left: 'center',
    //       text: '',
    //       textStyle: {
    //         fontSize: 25
    //       }
    //     },
    //     xAxis: {
    //       type: 'category',
    //       boundaryGap: false,
    //       data: date1
    //     },
    //     yAxis: [{
    //       type: 'value',
    //       boundaryGap: [0, '100%'],
    //       splitLine:{
    //         show: false
    //       }
    //     },{
    //       type: 'value',
    //       boundaryGap: [0, '100%'],
    //       splitLine:{
    //         show: false
    //       }
    //     },],
    //     dataZoom: [{
    //       type: 'inside',
    //       start: 0,
    //       end: 100
    //     }],
    //     series: [{
    //       name: '游客数量',
    //       type: 'line',
    //       smooth: true,
    //       symbol: 'none',
    //       sampling: 'average',
    //       itemStyle: {
    //         color: '#495BE6'
    //       },
    //       yAxisIndex: 0,
    //       // areaStyle: {
    //       //   color: {
    //       //     type: 'radial',
    //       //     x: 0.9,
    //       //     y: 0.9,
    //       //     r: 0.9,
    //       //     colorStops: [{
    //       //       offset: 0,
    //       //       color: '#CAD2FC'
    //       //     }, {
    //       //       offset: 1,
    //       //       color: '#F1EBFF'
    //       //     }],
    //       //   }
    //       // },
    //       // data: [100, 200, 300, 400, 600, 1000, 700, 300, 410, 510, 610, 810, 510, 710, 510, 710, 200, 500, 200, 400, 500, 300, 800, 1000]
    //       data:data1
    //     },{
    //       name: '收入',
    //       type: 'line',
    //       smooth: true,
    //       symbol: 'none',
    //       sampling: 'average',
    //       itemStyle: {
    //         color: '#41baff'
    //       },
    //       yAxisIndex: 1,
    //       // areaStyle: {
    //       //   color: {
    //       //     type: 'radial',
    //       //     x: 0.9,
    //       //     y: 0.9,
    //       //     r: 0.9,
    //       //     colorStops: [{
    //       //       offset: 0,
    //       //       color: '#8abaeb'
    //       //     }, {
    //       //       offset: 1,
    //       //       color: '#65a6e4'
    //       //     }],
    //       //   }
    //       // },
    //       // data: [8000, 7100, 1000, 6100, 10000, 10000, 11000, 12000, 18000, 10000, 12000, 13000, 6100, 12000, 15000, 12000, 13000, 17000, 16000, 13000, 14000, 1000, 12000, 11000]
    //       data:data2
    //     },


    //     ]
    //   };
    //   let chart1 = echarts.init(document.getElementById("container1")).setOption(option1, true)
    // });



  };

  // setecharts2(): void {
  //   // let data2 = [
  //   // { value: 35, name: '老人票' },
  //   // { value: 31, name: '假日票' },
  //   // { value: 24, name: '儿童票' },
  //   // { value: 48, name: '成人票' },
  //   // ]
  // //   this._operService.ticketRates(this.range2)
  // //   .subscribe(result => {
  // //     // console.log(result)
  // //     let data2=[]
  // //     var arr=[]
  // //     for (var i =0;i< result.length; i++) {
  // //       arr.push({
  // //         name:result[i].ticketTypeName,
  // //         value:result[i].count
  // //       })
  // //     }
  // //     data2=arr
  // //     let option2 = {
  // //       title: {
  // //         text: '',
  // //         x: 'center',
  // //         textStyle: {
  // //           fontSize: 25
  // //         }
  // //       },
  // //       color: [
  // //       "#5d77ff", "#9e7bff", "#889aff", "#c8d0ff", "#4cb666", "#41baff", "#9e7bff", "#308de5", "#4cb666", "#8abaeb", "#65a6e4", "#7384f5", "#6a95ef", "#c0d7ff", "#f5cead"
  // //       ],
  // //       tooltip: {
  // //         trigger: 'item',
  // //         formatter: "{b} : {c}"
  // //       },
  // //       legend: {
  // //         orient: 'vertical',
  // //         type: 'scroll',
  // //         right: 'right',
  // //         data: data2
  // //       },
  // //       series: [{
  // //         name: '访问来源',
  // //         type: 'pie',
  // //         radius: '55%',
  // //         center: ['50%', '50%'],
  // //         data: data2,
  // //         itemStyle: {
  // //           normal: {
  // //             labelLine: {
  // //               length: 50,
  // //             },
  // //             label: {
  // //               textStyle: {
  // //                 color: '#3C4353',
  // //                 fontSize: 16
  // //               }
  // //             }
  // //           },
  // //           emphasis: {
  // //             shadowBlur: 10,
  // //             shadowOffsetX: 0,
  // //             shadowColor: 'rgba(0, 0, 0, 0.5)'
  // //           }
  // //         }
  // //       }]
  // //     };

  // //     let chart2 = echarts.init(document.getElementById("container2")).setOption(option2, true)
  // //   });



  // // };


  // datechange($event): void {
  //   if($event[0].getTime() == $event[1].getTime()){
  //     $event[1]=new Date($event[1].getTime()+24*60*60*1000)
  //   }

  //   var year=$event[0].getFullYear();
  //   var month = $event[0].getMonth() + 1;
  //   var day = $event[0].getDate();

  //   var fulldate1=year+'-'+month+'-'+day;

  //   var year=$event[1].getFullYear();
  //   var month = $event[1].getMonth() + 1;
  //   var day = $event[1].getDate();

  //   var fulldate2=year+'-'+month+'-'+day;

  //   this.queryData[0].value=moment(fulldate1).format('YYYY-MM-DD HH:mm:ss')
  //   this.queryData[1].value=moment(fulldate2).format('YYYY-MM-DD HH:mm:ss')
  //   this.nzSelectedIndex=4
  //   this.getschedule(-1)
  // };


}
