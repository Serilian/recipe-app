import { Component } from '@angular/core';
import { IonicPage} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Ingredient} from "../../models/ingredient";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService) {}

  onAddItem(form: NgForm) {
    const item = form.value;
    this.slService.addIngredient(item.ingredientName, item.ingredientAmount);
    this.loadItems();
    form.reset();
  }

  ionViewWillEnter() {
    this.loadItems();
  }

  private loadItems() {
    this.ingredients = this.slService.getIngredients();
  }

  onDelete(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }


}
