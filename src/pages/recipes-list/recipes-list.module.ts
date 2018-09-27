import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecipesListPage } from './recipes-list';

@NgModule({
  declarations: [
    RecipesListPage,
  ],
  imports: [
    IonicPageModule.forChild(RecipesListPage),
  ],
})
export class RecipesListPageModule {}
