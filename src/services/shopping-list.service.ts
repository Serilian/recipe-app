import {Ingredient} from "../models/ingredient";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "./auth.service";
import "rxjs/add/operator/do";

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];


  constructor(private http: HttpClient, private authservice: AuthService) {}

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

  storeList(token: string) {
    const userId = this.authservice.getActiveUser().uid;
     return this.http.put('https://ionic-recipe-book-e8a7e.firebaseio.com/' + userId +'/shopping-list.json?auth=' + token , this.ingredients);
  }

  fetchList(token: string) {
    const userId = this.authservice.getActiveUser().uid;
    return this.http.get('https://ionic-recipe-book-e8a7e.firebaseio.com/' + userId +'/shopping-list.json?auth=' + token)
      .do((data: Ingredient[])=> {
        this.ingredients = data;
      });
  }

}
