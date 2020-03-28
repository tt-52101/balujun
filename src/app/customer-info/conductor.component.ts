import { Component, Injector, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { TicketRoleListDto, QueryData, TicketRoleServiceProxy, GetTicketRolesInput, PagedResultDtoOfUserListDto, UserServiceProxy, TicketPriceServiceProxy, GetTicketPricesInput } from '@shared/service-proxies/service-proxies';
import { RoleListDto, RoleServiceProxy } from '@shared/service-proxies/service-proxies';


import { CreateOrEditConductorComponent } from './create-or-edit-conductor/create-or-edit-conductor.component';
@Component({
    templateUrl: './conductor.component.html',
    styleUrls: [],
    animations: [appModuleAnimation()],
})




export class Conductor extends PagedListingComponentBase<TicketRoleListDto> implements OnInit {
    constructor(
        injector: Injector,
        private _ticketRoleServiceProxy: TicketRoleServiceProxy,
        private _roleService: RoleServiceProxy,
        private _userService: UserServiceProxy,
        private _ticketPriceService: TicketPriceServiceProxy,
    ) {
        super(injector);
    }

    queryData = [{
        field: "rolename",
        method: "=",
        value: "",
        logic: "and"
    }, {
        field: "username",
        method: "=",
        value: "",
        logic: "and"
    }, {
        field: "ticketname",
        method: "=",
        value: "",
        logic: "and"
    }]

    selectedPermission: string[] = [];

    rolelist = []
    userlist = []
    ticketlist = []
    protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {

        const formdata = new GetTicketRolesInput();
        var arr = []
        for (var i = 0; i = 0; i--) {
            if (this.queryData[i].value) {
                arr.push(new QueryData(this.queryData[i]))
            }
        }

        formdata.sorting = request.sorting
        formdata.maxResultCount = request.maxResultCount;
        formdata.skipCount = request.skipCount;


        this._ticketRoleServiceProxy.getPaged(this.queryData[0].value||'', this.queryData[1].value||'', this.queryData[2].value||'', formdata)
            .finally(() => {
                finishedCallback();
            })
            .subscribe(result => {
                this.dataList = result.items;
                this.showPaging(result);
            });
        this.rolelists()
        this.userlists()
        this.ticketlistlists()
    }






    /**
 * 新增或编辑DTO信息
 * @param id 当前DTO的Id
 */
    createOrEdit(id?: number): void {
        this.modalHelper.static(CreateOrEditConductorComponent, { id: id })
            .subscribe(result => {
                if (result) {
                    this.refresh();
                }
            });
    }

    rolelists() {
        this._roleService.getPaged(this.selectedPermission, '', '', 99, 0)
            .subscribe(result => {
                console.log(result.items);

                this.rolelist = result.items
            });
    }

    userlists() {
        this._userService
            .getPaged(this.selectedPermission, [], undefined, undefined, undefined, '', '', 99, 0)
            .subscribe(result => {
                this.userlist = result.items
            });
    }

    ticketlistlists() {

        const formdata = new GetTicketPricesInput();

        formdata.queryData = [];
        formdata.sorting = ''
        formdata.maxResultCount = 99;
        formdata.skipCount = 0;

        this._ticketPriceService.getPaged(formdata)
            .subscribe(result => {
                this.ticketlist = result.items
            });

    }




}