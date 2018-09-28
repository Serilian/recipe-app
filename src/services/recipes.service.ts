import {Recipe} from "../models/recipe";
import {Ingredient} from "../models/ingredient";


export class RecipesService {
 private recipes: Recipe[] = [
   new Recipe('test', 'test test test','Easy', [])
 ];

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



}