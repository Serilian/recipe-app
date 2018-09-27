import {Ingredient} from "../models/ingredient";

export class ShoppingListService {

  private ingredients: Ingredient[] = [];


  addIngredient(name: string, amount:number) {
    this.ingredients.push(new Ingredient(name, amount));
  }

  getIngredients() {
    return this.ingredients.slice()
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  removeItem(index: number) {
    this.ingredients.splice(index,1);
  }

}
