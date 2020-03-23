import { Component, Injector, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AppComponentBase } from '@shared/component-base/app-component-base';
import { CustomerServiceProxy } from '@shared/service-proxies/service-proxies';
import { SignalRService } from '@shared/service-proxies/signalrservice';


import { ReuseTabService } from '@delon/abc';

@Component({
  selector: 'app-guestdisplay',
  templateUrl: './guestdisplay.component.html',
  styleUrls: ['guestdisplay.component.less']
})
export class GuestdisplayComponent extends AppComponentBase implements OnInit {


  constructor(
    injector: Injector,
    public signalRService: SignalRService,
    private _reuseTabService: ReuseTabService,
    ) {
    super(injector);
  }

  totalamount=0;

  scheduleCode:any;
  routeName:any;
  startTimeStr:any;
  endTimeStr:any;
  saleDateStr:any;

  ticketlist=[]

  groupid=0

  ngOnInit() {
    this.startconnedt()
  }

  startconnedt(){
    var that=this
    var query = window.location.href.split('=')[1]

    that.signalRService.startConnection(query);

    that.signalRService.onclose()

    console.log(that.signalRService)

    that.signalRService.hubConnection.on("messageReceived", (username: number, message: string) => {
      // console.log(message)
      if(message=='joinGroup' && that.groupid==0){
        that.groupid=username
        return
      }
      if(username == that.groupid){
        var methodname=message.split('&')[0]
        var data=JSON.parse(message.split('&')[1])

        if(methodname=='updateSchedule'){
          that.scheduleCode=data.scheduleCode;
          that.routeName=data.routeName;
          that.startTimeStr=data.startTimeStr;
          that.endTimeStr=data.endTimeStr;
          that.saleDateStr=data.saleDateStr;
        }
        else if(methodname=='addTicket'){
          var ticket ={
            ticketName:data.ticket.ticketName,
            customerName:data.customer.customerName,
            verifiableType:that.l(data.customer.verifiableType),
            price:data.ticket.price
          }
          that.ticketlist.push(ticket)
          that.countprice()
        }
        else if(methodname=='deleteTicket'){
          that.ticketlist.splice(data.index,1)
          that.countprice()
        }
        else if(methodname=='replace'){
          var ticket ={
            ticketName:data.info.ticket.ticketName,
            customerName:data.info.customer.customerName,
            verifiableType:that.l(data.info.customer.verifiableType),
            price:data.info.ticket.price
          }
          that.ticketlist.splice(data.index,1,ticket)
          that.countprice()
        }
        
      }



    });

  }

  countprice(){
    var totalamount=0
    for (var i =0; i<this.ticketlist.length; i++) {
      totalamount+=this.ticketlist[i].price
    }
    this.totalamount=totalamount
  }


}
