import { Injector, ElementRef } from '@angular/core';
import { AppConsts } from 'abpPro/AppConsts';
import { AppSessionService } from '@shared/session/app-session.service';
import { FeatureCheckerService } from '@abp/features/feature-checker.service';
import { NotifyService } from '@abp/notify/notify.service';
import { SettingService } from '@abp/settings/setting.service';
import { MessageService } from '@abp/message/message.service';
import { AbpMultiTenancyService } from '@abp/multi-tenancy/abp-multi-tenancy.service';
import { ModalHelper, ALAIN_I18N_TOKEN, TitleService } from '@delon/theme';
import { LocalizationService } from '@shared/i18n/localization.service';
import { PermissionService } from '@shared/auth/permission.service';
import { AbpSessionService } from 'abp-ng2-module/dist/src/session/abp-session.service';
import { LoadingService } from '@shared/utils/global-loading/loading.service';

export abstract class AppComponentBase {
  localizationSourceName = AppConsts.localization.defaultLocalizationSourceName;

  localization: LocalizationService;
  permission: PermissionService;
  feature: FeatureCheckerService;
  notify: NotifyService;
  setting: SettingService;
  message: MessageService;
  multiTenancy: AbpMultiTenancyService;
  appSession: AppSessionService;
  elementRef: ElementRef;
  modalHelper: ModalHelper;
  titleSrvice: TitleService;
  abpSession: AbpSessionService;

  /**
   * 保存状态
   */
  saving = false;
  loadingService: LoadingService;

  constructor(injector: Injector) {
    this.localization = injector.get<LocalizationService>(ALAIN_I18N_TOKEN);
    this.permission = injector.get(PermissionService);
    this.feature = injector.get(FeatureCheckerService);
    this.notify = injector.get(NotifyService);
    this.setting = injector.get(SettingService);
    this.message = injector.get(MessageService);
    this.multiTenancy = injector.get(AbpMultiTenancyService);
    this.appSession = injector.get(AppSessionService);
    this.elementRef = injector.get(ElementRef);
    this.modalHelper = injector.get(ModalHelper);
    this.titleSrvice = injector.get(TitleService);
    this.abpSession = injector.get(AbpSessionService);
    this.loadingService = injector.get(LoadingService);
  }

  l(key: string, ...args: any[]): string {
    let localizedText = this.localization.localization(key, this.localizationSourceName);

    if (!localizedText) {
      localizedText = key;
    }

    if (!args || !args.length) {
      return localizedText;
    }

    return this.localization.formatString(localizedText, args);
  }

  isGranted(permissionName: string): boolean {
    return this.permission.isGranted(permissionName);
  }

}
