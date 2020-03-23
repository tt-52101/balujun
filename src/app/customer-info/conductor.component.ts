import { Component, Injector, OnInit } from '@angular/core';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { CreateOrEditConductorComponent } from './create-or-edit-conductor/create-or-edit-conductor.component';

import { AppComponentBase } from '@shared/component-base/app-component-base';
@Component({
    templateUrl: './conductor.component.html',
    styleUrls: [],
    animations: [appModuleAnimation()],
})
export class Conductor extends AppComponentBase implements OnInit {
    constructor(
        injector: Injector,
    ) {
        super(injector);
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
    list = [
        {
            name: '窗口售票员',
            aa: '张三，李四，王五',
            bb: ['成人票998', '儿童票98', '外星票9.8'],
            cc: '是',
            dd: '编辑可售票型'
        }
    ]
    dataList = []
    ngOnInit(): void {
        console.log(this.scqueryData[1].value);

    }

    getlist() {
        console.log('点击查询');

    }
    /**
 * 新增或编辑DTO信息
 * @param id 当前DTO的Id
 */
    createOrEdit(id?: number): void {
        console.log(123);

        this.modalHelper.static(CreateOrEditConductorComponent, { id: id })
            .subscribe(result => {
                if (result) {
                    // this.refresh();
                }
            });
    }





}