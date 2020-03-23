import { Component, Injector, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { PagedListingComponentBase, PagedRequestDto } from '@shared/component-base/paged-listing-component-base';
import { CreateOrEditTicketComponent } from './create-or-edit-ticket/create-or-edit-ticket.component';

import { AppComponentBase } from '@shared/component-base/app-component-base';


@Component({
    templateUrl: './individual-ticket.component.html',
    styleUrls: ['./individual-ticket.component.less'],
    animations: [appModuleAnimation()],
})


export class IndividualTicket extends AppComponentBase implements OnInit {

    constructor(
		injector: Injector,
		// private _powerService: PowerServiceProxy
		) {
		super(injector);
    this.curmenupower=JSON.parse(localStorage.getItem('curmenupower'))
    this.isAllOperation=eval(localStorage.getItem('isAllOperation'))
  }

  isAllOperation=false
  curmenupower=[]

    protected fetchDataList(request: PagedRequestDto, pageNumber: number, finishedCallback: Function): void {
        throw new Error("Method not implemented.");
    }

    
    i = 0;
    demoValue=110
    editId: string | null;

    selectedValue = ['jack','lucy','disabled'];
    selected='jack'

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

    startEdit(id: string): void {
        this.editId = id;
 
    }

    aa(e){
        console.log(this.listOfData[e].name);
        console.log(this.listOfData[e].cc);
    }

    addRow(): void {

        this.listOfData = [
          ...this.listOfData,
          {
            id: this.i+4,
            name: `${this.i}儿童票`,
            age: `${this.i}￥30`,
            address: `${this.i}22`,
            aa:`${this.i}33`,
            bb:`${this.i}44`,
            cc:`${this.i}11`
          }
        ];
        this.i++;
      }

    ngOnInit(): void {
        // throw new Error("Method not implemented.");
    }








}