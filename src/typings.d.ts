// # 3rd Party Library
// If the library doesn't have typings available at `@types/`,
// you can still use it by manually adding typings for it
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/abp.d.ts"/>
///<reference path="../node_modules/abp-web-resources/Abp/Framework/scripts/libs/abp.signalr.d.ts"/>
///<reference path="../node_modules/moment/moment.d.ts"/>
///<reference path="../node_modules/@types/moment-timezone/index.d.ts"/>
// import { MenuService, SettingsService, Menu, Layout, App, User, SettingsNotify } from '@delon/theme';
import { Observable } from 'rxjs';


// G2
declare global {
  export var G2: any;
  export var DataSet: any;
  export var Slider: any;

}

declare global {
  export var globalThis: any;
}

// declare module "@delon/theme" {
//   export interface SettingsService {
//     readonly layout: Layout;
//     readonly app: App;
//     readonly user: User;
//     readonly notify: Observable<SettingsNotify>;
//     setLayout(name: string | Layout, value?: any): boolean;
//     setApp(value: App): boolean;
//     setUser(value: User): boolean;
//   }
//   export interface Layout {
//     [key: string]: any;
//     /** Whether to fold menu */
//     collapsed: boolean;
//     /** Current language */
//     lang: string;
//     /** Color weak */
//     colorWeak: boolean;
//     theme: "light" | "dark";
//   }
// }
