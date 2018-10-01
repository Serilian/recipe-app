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
import {AuthService} from "../services/auth.service";
import {SlOptionsPage} from "../pages/shopping-list/sloptions/sl-options";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    SlOptionsPage,
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
    HttpClientModule,
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    SlOptionsPage,
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
    AuthService,
    ShoppingListService,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
