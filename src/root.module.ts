import { NgModule, Injector } from '@angular/core';
import {
  CommonModule,
  PlatformLocation,
  registerLocaleData
} from '@angular/common';

import { RootComponent } from 'root.component';
import { AppSessionService } from '@shared/session/app-session.service';
import { AppPreBootstrap } from 'AppPreBootstrap';
import { AppConsts } from 'abpPro/AppConsts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { HttpClientModule } from '@angular/common/http';
import {
  NgZorroAntdModule,
  NzIconService,
  NzMessageService,
  NzNotificationService,
  NzModalService
} from 'ng-zorro-antd';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { API_BASE_URL } from '@shared/service-proxies/service-proxies';
import { APP_INITIALIZER } from '@angular/core';
import { LOCALE_ID } from '@angular/core';
import { RootRoutingModule } from 'root-routing.module';
import { SharedModule } from '@shared/shared.module';

import {
  TitleService,
  ALAIN_I18N_TOKEN,
  DelonLocaleService
} from '@delon/theme';

import { NzI18nService } from 'ng-zorro-antd';

import { DelonModule } from './delon.module';
import { ICONS_AUTO } from './style-icons-auto';
import { ICONS } from './style-icons';

import { AbpModule } from '@abp/abp.module';
import * as _ from 'lodash';
import { LocalizationService } from '@shared/i18n/localization.service';
import { MessageExtension } from '@shared/helpers/message.extension';
import { AppAuthService } from '@shared/auth';

export function appInitializerFactory(injector: Injector) {
  // 导入图标
  const iconSrv = injector.get(NzIconService);
  iconSrv.addIcon(...ICONS_AUTO, ...ICONS);

  return () => {
    return new Promise<boolean>((resolve, reject) => {
      // 覆盖ABP默认通知和消息提示
      overrideAbpMessageAndNotify(injector);

      // 启动程序初始化，获取基本配置信息
      AppPreBootstrap.run(injector, () => {
        // 获取当前登陆信息
        const appSessionService = injector.get(AppSessionService);
        appSessionService.init().then(
          result => {
            // 注册语言
            if (shouldLoadLocale()) {
              registerNgZorroLocales(injector);
              registerNgAlianLocales(injector);
              registerLocales(resolve, reject);
            } else {
              resolve(result);
            }
          },
          err => {
            // 这里获取登陆信息报错了的话，退出登陆，并刷新浏览器
            injector.get(AppAuthService).logout(true);
            console.log('err')
            reject(err);
          }
        );
      });
    });
  };
}

export function getRemoteServiceBaseUrl(): string {
  return AppConsts.remoteServiceBaseUrl;
}

export function getCurrentLanguage(): string {
  return abp.localization.currentLanguage.name;
}

export function getBaseHref(platformLocation: PlatformLocation): string {
  var baseUrl = platformLocation.getBaseHrefFromDOM();
  if (baseUrl) {
    return baseUrl;
  }

  return '/';
}

/**
 * 覆盖abp自带的弹窗和通知
 * @param injector
 */
function overrideAbpMessageAndNotify(injector: Injector) {
  const nzMsgService = injector.get(NzMessageService);
  const nzNotifySerivce = injector.get(NzNotificationService);
  const nzModalService = injector.get(NzModalService);

  // 覆盖abp自带的通知和mssage
  // MessageExtension.overrideAbpMessageByMini(
  //   nzMsgService,
  //   nzModalService,
  // );

  //  覆盖abp.message替换为ng-zorro的模态框
  MessageExtension.overrideAbpMessageByNgModal(nzModalService);

  //  覆盖abp.notify替换为ng-zorro的notify
  MessageExtension.overrideAbpNotify(nzNotifySerivce);
}

function getDocumentOrigin() {
  if (!document.location.origin) {
    return (
      document.location.protocol +
      '//' +
      document.location.hostname +
      (document.location.port ? ':' + document.location.port : '')
    );
  }

  return document.location.origin;
}

/**
 * 注册ng-zorro的本地化
 * @param injector
 */
function registerNgZorroLocales(injector: Injector) {
  if (shouldLoadLocale()) {
    let ngZorroLcale = convertAbpLocaleToNgZorroLocale(
      abp.localization.currentLanguage.name
    );
    import(`ng-zorro-antd/esm5/i18n/languages/${ngZorroLcale}.js`).then(
      module => {
        let nzI18nService = injector.get(NzI18nService);
        nzI18nService.setLocale(module.default);
      }
    );
  }
}

/**
 * 注册ng-alain的本地化
 * @param injector
 */
function registerNgAlianLocales(injector: Injector) {
  if (shouldLoadLocale()) {
    let ngAlianLocale = convertAbpLocaleToNgAlianLocale(
      abp.localization.currentLanguage.name
    );
    import(`@delon/theme/esm5/src/locale/languages/${ngAlianLocale}.js`).then(
      module => {
        let delonLocaleService = injector.get(DelonLocaleService);
        delonLocaleService.setLocale(module.default);
      }
    );
  }
}

/**
 * 注册angular本地化
 * @param resolve
 * @param reject
 */
function registerLocales(
  resolve: (value?: boolean | Promise<boolean>) => void,
  reject: any
) {
  if (shouldLoadLocale()) {
    let angularLocale = convertAbpLocaleToAngularLocale(
      abp.localization.currentLanguage.name
    );
    import(`@angular/common/locales/${angularLocale}.js`).then(module => {
      registerLocaleData(module.default);
      resolve(true);
    }, reject);
  } else {
    resolve(true);
  }
}

export function shouldLoadLocale(): boolean {
  return (
    abp.localization.currentLanguage.name &&
    abp.localization.currentLanguage.name !== 'en-US'
  );
}

/**
 * 后端多语言编码转 Angular 前端多语言编码
 * @param locale
 */
export function convertAbpLocaleToAngularLocale(locale: string): string {
  let defaultLocale = 'zh';
  if (!AppConsts.localeMappings) {
    return defaultLocale;
  }

  let localeMapings = _.filter(AppConsts.localeMappings, { from: locale });
  if (localeMapings && localeMapings.length) {
    return localeMapings[0]['to'];
  }

  return defaultLocale;
}

/**
 * 后端多语言编码转 Ng-Zorro 前端多语言编码
 * @param locale
 */
export function convertAbpLocaleToNgZorroLocale(locale: string): string {
  let defaultLocale = 'zh_CN';
  if (!AppConsts.ngZorroLocaleMappings) {
    return defaultLocale;
  }

  let localeMapings = _.filter(AppConsts.ngZorroLocaleMappings, {
    from: locale
  });
  if (localeMapings && localeMapings.length) {
    return localeMapings[0]['to'];
  }

  return defaultLocale;
}

/**
 * 后端多语言编码转 Ng-Alian 前端多语言编码
 * @param locale
 */
export function convertAbpLocaleToNgAlianLocale(locale: string): string {
  let defaultLocale = 'zh-CN';
  if (!AppConsts.ngAlainLocaleMappings) {
    return defaultLocale;
  }

  let localeMapings = _.filter(AppConsts.ngAlainLocaleMappings, {
    from: locale
  });
  if (localeMapings && localeMapings.length) {
    return localeMapings[0]['to'];
  }

  return defaultLocale;
}

const I18NSERVICE_PROVIDES = [
  // { provide: ALAIN_I18N_TOKEN, useClass: I18NService, multi: false }
  { provide: ALAIN_I18N_TOKEN, useClass: LocalizationService, multi: false }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    BrowserModule,
    AbpModule,
    // 引入DelonMdule
    DelonModule.forRoot(),
    ServiceProxyModule,
    RootRoutingModule,
    HttpClientModule,
    /** 导入 ng-zorro-antd 模块 **/
    NgZorroAntdModule,
    /** 必须导入 ng-zorro 才能导入此项 */
    SharedModule.forRoot()
  ],
  declarations: [RootComponent],
  providers: [
    { provide: API_BASE_URL, useFactory: getRemoteServiceBaseUrl },
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [Injector, PlatformLocation],
      multi: true
    },
    { provide: LOCALE_ID, useFactory: getCurrentLanguage },
    I18NSERVICE_PROVIDES
  ],
  bootstrap: [RootComponent]
})
export class RootModule {}
