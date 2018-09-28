import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";

@IonicPage()
@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html',
})
export class RecipesListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

}
