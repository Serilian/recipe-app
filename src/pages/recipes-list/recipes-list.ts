import {Component} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {Recipe} from "../../models/recipe";
import {RecipesService} from "../../services/recipes.service";
import {RecipePage} from "../recipe/recipe";

@IonicPage()
@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html',
})
export class RecipesListPage{

  recipes: Recipe[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private rservice: RecipesService) {
  }

  onNewRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'New'});
  }

  ionViewWillEnter() {
    this.recipes = this.rservice.getRecipes();
  }

  onLoadRecipe(index: number) {
    this.navCtrl.push(RecipePage, {index: index});
  }

}
