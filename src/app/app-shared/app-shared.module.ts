import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImgShowComponent } from './components/img-show/img-show.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ImgShowComponent],
  entryComponents: [ImgShowComponent],
  exports: [ImgShowComponent]
})
export class AppSharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AppSharedModule,
      providers: []
    };
  }
}
