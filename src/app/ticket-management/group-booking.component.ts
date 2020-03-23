import { Component, Injector, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { CreateOrEditTicketComponent } from './create-or-edit-ticket/create-or-edit-ticket.component';
import { AppComponentBase } from '@shared/component-base/app-component-base';


@Component({
    templateUrl: './group-booking.component.html',
    styleUrls: ['./group-booking.component.less'],
    animations: [appModuleAnimation()],
})


export class GroupBooking extends AppComponentBase implements OnInit {



    optionList: any[] = [];
    selectedUser: string;
    isLoading = false;
    search=[]
    listname=[]


    list=[
        {
            id:0,
            name:'aa',
            optionList:['aa', 'bb', 'cc', 'dd', 'ee']
        },
        {
            id:1,
            name:'bb',
            optionList:['aa11', 'bb11', 'cc11', 'dd11', 'ee11']
        },
        {
            id:2,
            name:'cc',
            optionList:['aa22', 'bb22', 'cc22', 'dd22', 'ee22']
        },
        {
            id:2,
            name:'ccc',
            optionList:['aa33', 'bb33', 'cc33', 'dd33', 'ee33']
        },
        
    ]


    onSearch(value: string): void {
  
        if(value!=''){
            this.listname=this.list.map(item=>item.name)
            this.optionList = this.listname
            console.log(1,value)
        }
    }

    onchange($event): void {
        this.search=this.list[$event].optionList
        console.log('选中的索引是',$event)
       
    }

   


    constructor(
        injector: Injector,
    ) {
        super(injector);
    }


    protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        throw new Error("Method not implemented.");
    }

    selectedValue = ['jack','lucy','disabled'];
    selected='jack'

    i = 0;
    demoValue = 110
    editId: string | null;


    listOfData: any[] = [
        {
            id: '0',
            name: '儿童票',
            age: '￥352',
            address: 334,
            aa: 448,
            bb: 5544,
            cc: 66
        },
        {
            id: '1',
            name: '儿童票5',
            age: '￥32',
            address: 3354,
            aa: 4488,
            bb: 554,
            cc: 77
        },
        {
            id: '2',
            name: '儿童票4',
            age: '￥326',
            address: 33,
            aa: 4477,
            bb: 5522,
            cc: 88
        },

    ];

    aa(e){
        console.log(this.listOfData[e].name);
        console.log(this.listOfData[e].cc);
    }

    /**
	* 新增或编辑DTO信息
	* @param id 当前DTO的Id
	*/
    createOrEdit(id?: number): void {
        console.log(123);

        this.modalHelper.static(CreateOrEditTicketComponent, { id: id })
            .subscribe(result => {
                if (result) {
                    // this.refresh();
                }
            });
    }

    deleteRow(id: string): void {
        this.listOfData = this.listOfData.filter(d => d.id !== id);
    }





    startEdit(id: string, event: MouseEvent): void {
        this.editId = id;
    }


    addRow(): void {

        this.listOfData = [
            ...this.listOfData,
            {
                id: this.i + 4,
                name: `${this.i}儿童票`,
                age: `${this.i}￥30`,
                address: `${this.i}22`,
                aa: `${this.i}33`,
                bb: `${this.i}44`,
                cc: `${this.i}11`
            }
        ];
        this.i++;
    }

    ngOnInit(): void {


    }


}