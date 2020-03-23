import { Component } from '@angular/core';
import { SettingsService } from '@delon/theme';

@Component({
  selector: 'layout-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  searchToggleStatus: boolean;

  time: string;
  date: string;
  day: string;

  constructor(public settings: SettingsService) {}

  ngOnInit() {
    // this.settings.setLayout('theme', 'light');
    // console.log(this.settings.layout)
    var that=this
    that.settime();
    setInterval(function(){
      that.settime();
    },1000)
  }


  settime() {
    var now = new Date();
    var year = now.getFullYear(); //年
    var month = now.getMonth() + 1; //月
    var day = now.getDate(); //日
    var week = now.getDay() + '';
    // console.log(week)
    var hour=now.getHours();
    var minute=now.getMinutes();

    var date = year + "年" + month + "月" + day + "日";
    switch (week) {
      case '1':
      week = '星期一';
      break;
      case '2':
      week = '星期二';
      break;
      case '3':
      week = '星期三';
      break;
      case '4':
      week = '星期四';
      break;
      case '5':
      week = '星期五';
      break;
      case '6':
      week = '星期六';
      break;
      case '0':
      week = '星期日';
      break;
    }

    this.date=date
    if(minute<10){
      this.time=hour + ':0' + minute
    }else{
      this.time=hour + ':' + minute
    }

    this.day=week
  }

  toggleCollapsedSidebar() {
    this.settings.setLayout('collapsed', !this.settings.layout.collapsed);
  }

  searchToggleChange() {
    this.searchToggleStatus = !this.searchToggleStatus;
  }
}
