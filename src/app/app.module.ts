import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import {EditRecipePage} from "../pages/edit-recipe/edit-recipe";
import {RecipePage} from "../pages/recipe/recipe";
import {RecipesListPage} from "../pages/recipes-list/recipes-list";
import {ShoppingListPage} from "../pages/shopping-list/shopping-list";
import {TabsPage} from "../pages/tabs/tabs";
import {ShoppingListService} from "../services/shopping-list.service";
import {RecipesService} from "../services/recipes.service";
import {SigninPage} from "../pages/signin/signin";
import {SignupPage} from "../pages/signup/signup";

@NgModule({
  declarations: [
    SigninPage,
    SignupPage,
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesListPage,
    ShoppingListPage,
    TabsPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SigninPage,
    SignupPage,
    MyApp,
    EditRecipePage,
    RecipePage,
    RecipesListPage,
    ShoppingListPage,
    TabsPage
  ],
  providers: [
    RecipesService,
    ShoppingListService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
