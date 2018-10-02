import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";
import {AuthService} from "./auth.service";
import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import "rxjs/add/operator/map";

@Injectable()
export class RecipesService {
  private recipes: Recipe[] = [
    new Recipe('test', 'test test test', 'Easy', [{name: 'milk', amount: 2}])
  ];

  constructor(private authservice: AuthService, private http: HttpClient) {

  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
    console.log(this.recipes);
  }

  updateRecipe(index: number,
               title: string,
               description: string,
               difficulty: string,
               ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients)
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authservice.getActiveUser().uid;
    return this.http.put('https://ionic-recipe-book-e8a7e.firebaseio.com/' + userId + '/recipe-list.json?auth=' + token, this.recipes);
  }

  fetchList(token: string) {
    const userId = this.authservice.getActiveUser().uid;
    return this.http.get('https://ionic-recipe-book-e8a7e.firebaseio.com/' + userId + '/recipe-list.json?auth=' + token)
      .map((data: Recipe[]) => {
        const recipes: Recipe[] = data ? data : [];
        for (let item of recipes) {
          if (!item.hasOwnProperty('ingredients')) {
            item.ingredients = [];
          }
        }
        return recipes;
      })
      .do((data: Recipe[]) => {
        if (data) {
          this.recipes = data;
        }
        this.recipes = [];
      });
  }

}
