import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import {ShoppingListPage} from "../shopping-list/shopping-list";
import {RecipesListPage} from "../recipes-list/recipes-list";

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  slPage = ShoppingListPage;
  recipesPage = RecipesListPage;


}
