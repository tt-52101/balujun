import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { TicketRoleListDto, QueryData, TicketRoleServiceProxy } from '@shared/service-proxies/service-proxies';
import { CreateOrEditConductorComponent } from './create-or-edit-conductor/create-or-edit-conductor.component';
@Component({
    templateUrl: './conductor.component.html',
    styleUrls: [],
    animations: [appModuleAnimation()],
})




export class Conductor extends PagedListingComponentBase<TicketRoleListDto> implements OnInit {
    constructor(
        injector: Injector,
        private _ticketRoleServiceProxy: TicketRoleServiceProxy
    ) {
        super(injector);
    }

    queryData = [{
        field: "position",
        method: "=",
        value: "",
        logic: "and"
      }, {
        field: "ticketName",
        method: "%",
        value: "",
        logic: "and"
      }, {
        field: "ticketId",
        method: "=",
        value: "",
        logic: "and"
      }]


    protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

    
        var arr = []
        for (var i = this.queryData.length - 1; i >= 0; i--) {
          if (this.queryData[i].value) {
            arr.push(new QueryData(this.queryData[i]))
          }
        }

     
        this._ticketRoleServiceProxy.getPaged(arr,'',request.sorting,request.maxResultCount,request.skipCount,'','')
            .finally(() => {
                finishedCallback();
            })
            .subscribe(result => {
              
                
                this.dataList = result.items;
                console.log(result.items);

                this.showPaging(result);
            });
    }
   






    scqueryData = [
        {
            id: 0,
            value: [
                '后台',
                '官网',
                '小程序',
                '自助机',
                '手持机'
            ]
        },
        {
            id: 1,
            value: ''
        },
        {
            id: 2,
            value: ''
        },

    ]
   

  

    getlist() {
        console.log('点击查询');

    }



    /**
 * 新增或编辑DTO信息
 * @param id 当前DTO的Id
 */
    createOrEdit(id?: number): void {
        this.modalHelper.static(CreateOrEditConductorComponent, { id: id })
            .subscribe(result => {
                if (result) {
                    // this.refresh();
                }
            });
    }





}