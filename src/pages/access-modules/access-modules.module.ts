import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccessModulesPage } from './access-modules';

@NgModule({
  declarations: [
    AccessModulesPage,
  ],
  imports: [
    IonicPageModule.forChild(AccessModulesPage),
  ],
})
export class AccessModulesPageModule {}
