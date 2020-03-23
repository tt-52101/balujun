import {
  TenantAvailabilityState,
  SettingScopes,
  UserNotificationState,
  UploadMediaFileType
} from '@shared/service-proxies/service-proxies';

export class AppTenantAvailabilityState {
  static Available: number = TenantAvailabilityState.Available;
  static InActive: number = TenantAvailabilityState.InActive;
  static NotFound: number = TenantAvailabilityState.NotFound;
}

export class AppTimezoneScope {
  static Application: number = SettingScopes.Application;
  static Tenant: number = SettingScopes.Tenant;
  static User: number = SettingScopes.User;
}

/**
 * 验证码类型
 */
export class AppCaptchaType {
  /**
   * 宿主租户注册
   */
  static readonly HostTenantRegister = 1;
  /**
   * 宿主用户登陆
   */
  static readonly HostUserLogin = 2;
  /**
   * 租户用户注册
   */
  static readonly TenantUserRegister = 3;
  /**
   * 租户用户登陆
   */
  static readonly TenantUserLogin = 4;
}

export class AppEditionExpireAction {
  static DeactiveTenant = 'DeactiveTenant';
  static AssignToAnotherEdition = 'AssignToAnotherEdition';
}

/**
 * 用户通知状态
 */
export class AppUserNotificationState {
  /**
   * 未读
   */
  static Unread: number = UserNotificationState.Unread;
  /**
   * 已读
   */
  static Read: number = UserNotificationState.Read;
}

/**
 * 微信素材类型
 */
export class WechatMaterialType {
  /**
   * 图片
   */
  static Image: number = UploadMediaFileType.Image;
  /**
   * 语音
   */
  static Voice: number = UploadMediaFileType.Voice;
  /**
   * 视频
   */
  static Video: number = UploadMediaFileType.Video;
  /**
   * 缩略图
   */
  static Thumb: number = UploadMediaFileType.Thumb;
  static News: number = UploadMediaFileType.News;
}
