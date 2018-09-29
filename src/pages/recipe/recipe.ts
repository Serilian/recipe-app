import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Recipe} from "../../models/recipe";
import {RecipesService} from "../../services/recipes.service";
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {ShoppingListService} from "../../services/shopping-list.service";

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  recipe: Recipe;
  index: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private rservice: RecipesService,
              private sservice: ShoppingListService) {
  }

  ionViewWillLoad() {
    this.index = this.navParams.get('index');
    this.recipe = this.rservice.getRecipes()[this.index];
  }

  onEditRecipe() {
    this.navCtrl.push(EditRecipePage, {mode: 'Edit', recipe: this.recipe, index: this.index});
  }

  onAddIngredients() {
    this.sservice.addItems(this.recipe.ingredients);
  }

  onDeleteRecipe() {
    this.rservice.removeRecipe(this.index);
    this.navCtrl.pop();
  }

}
