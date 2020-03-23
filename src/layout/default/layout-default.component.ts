import {
  Component,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef,
  AfterViewInit,
  OnInit,
  OnDestroy,
  ElementRef,
  Renderer2,
  Inject,
  Injector,
  NgZone,
  KeyValueDiffers
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  Router,
  NavigationEnd,
  RouteConfigLoadStart,
  NavigationError,
  NavigationCancel
} from '@angular/router';
import { NzMessageService, NzIconService } from 'ng-zorro-antd';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import { updateHostClass } from '@delon/util';
import { ScrollService, MenuService, SettingsService } from '@delon/theme';

// #region icons

import {
  MenuFoldOutline,
  MenuUnfoldOutline,
  SearchOutline,
  SettingOutline,
  FullscreenOutline,
  FullscreenExitOutline,
  BellOutline,
  LockOutline,
  PlusOutline,
  UserOutline,
  LogoutOutline,
  EllipsisOutline,
  GlobalOutline,
  ArrowDownOutline,
  // Optional
  GithubOutline,
  AppstoreOutline
} from '@ant-design/icons-angular/icons';

const ICONS = [
  MenuFoldOutline,
  MenuUnfoldOutline,
  SearchOutline,
  SettingOutline,
  FullscreenOutline,
  FullscreenExitOutline,
  BellOutline,
  LockOutline,
  PlusOutline,
  UserOutline,
  LogoutOutline,
  EllipsisOutline,
  GlobalOutline,
  ArrowDownOutline,
  // Optional
  GithubOutline,
  AppstoreOutline
];

// #endregion

import { environment } from '@env/environment';
import { AppComponentBase } from '@shared/component-base';

import { SignalRAspNetCoreHelper } from '@shared/helpers/SignalRAspNetCoreHelper';
import { AppMenus } from 'abpPro/AppMenus';

import { MenuServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'layout-default',
  templateUrl: './layout-default.component.html',
  preserveWhitespaces: false,
  host: {
    '[class.alain-pro]': 'true'
  }
})
export class LayoutDefaultComponent extends AppComponentBase
implements OnInit, AfterViewInit, OnDestroy {
  private notify$: Subscription;
  isFetching = false;
  constructor(
    injector: Injector,
    iconSrv: NzIconService,
    router: Router,
    scroll: ScrollService,
    public menuSrv: MenuService,
    public settings: SettingsService,
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private doc: any,
    private _zone: NgZone,
    private _menuService: MenuServiceProxy
  ) {
    super(injector);
    iconSrv.addIcon(...ICONS);
    // scroll to top in change page
    router.events.subscribe(evt => {
      if (!this.isFetching && evt instanceof RouteConfigLoadStart) {
        this.isFetching = true;
      }
      if (evt instanceof NavigationError || evt instanceof NavigationCancel) {
        this.isFetching = false;
        if (evt instanceof NavigationError) {
          this.message.error(`无法加载${evt.url}路由`);
        }
        return;
      }
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      setTimeout(() => {
        scroll.scrollToTop();
        this.isFetching = false;
      }, 100);
    });


    this._menuService.getMenuTree()
    .subscribe(res => {
      // console.log(this._menuService.getMenuTree)
      this.menuSrv.add(res);
    });


  }

  get collapsed(): boolean {
    return this.settings.layout.collapsed;
  }

  private setClass() {
    const { el, renderer, settings } = this;
    const layout = settings.layout;

    updateHostClass(
      el.nativeElement,
      renderer, {
        ['alain-pro']: true,
        // [`alain-pro__fixed`]: layout.fixed,
        [`alain-pro__boxed`]: layout.boxed,
        [`alain-pro__collapsed`]: layout.collapsed
      },
      true
    );

    this.doc.body.classList[layout.colorWeak ? 'add' : 'remove']('color-weak');
    this.doc.body.classList[layout.theme === undefined || layout.theme === "light" ? 'add' : 'remove']('alain-pro__light');
    this.doc.body.classList[layout.theme === "dark" ? 'add' : 'remove']('alain-pro__dark');
  }

  ngAfterViewInit(): void {}

  ngOnInit() {
    this.notify$ = this.settings.notify.subscribe(_ => this.setClass());
    this.setClass();

    // 初始化SignalR连接
    this.initiSignalR();
  }

  ngOnDestroy() {
    this.notify$.unsubscribe();
  }

  initiSignalR() {
    // 连接到signalR
    SignalRAspNetCoreHelper.initSignalR(() => {});
  }
}
