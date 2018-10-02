import {Component} from '@angular/core';
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams,
  PopoverController
} from 'ionic-angular';
import {EditRecipePage} from "../edit-recipe/edit-recipe";
import {Recipe} from "../../models/recipe";
import {RecipesService} from "../../services/recipes.service";
import {RecipePage} from "../recipe/recipe";
import {DatabaseOptionsPage} from "../database-options/database-options";
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-recipes-list',
  templateUrl: 'recipes-list.html',
})
export class RecipesListPage{

  recipes: Recipe[];
  constructor(public navCtrl: NavController, public navParams: NavParams, private rservice: RecipesService, private authservice: AuthService, private loadCtrl: LoadingController, private alertCtrl: AlertController, private popCtrl: PopoverController) {
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

  onShowOptions(event: MouseEvent) {
    const popover = this.popCtrl.create(DatabaseOptionsPage);
    const loading = this.loadCtrl.create({
      content: 'Working...'
    });
    popover.present({ev: event});
    popover.onDidDismiss(
      (data) => {
        if(!data) {
          return;
        }
        if (data.action == 'load') {
          loading.present();
          this.authservice.getActiveUser().getIdToken()
            .then((token: string) => {
                this.rservice.fetchList(token)
                  .subscribe(
                    (list: Recipe[]) => {
                      if (list) {
                        this.recipes = list;
                      }
                      console.log('List loaded');
                      loading.dismiss();
                    },
                    error => {
                      loading.dismiss();
                      this.handleError(error.message);
                    });
              }
            );

        } else if (data.action == 'save') {
          loading.present();
          this.authservice.getActiveUser().getIdToken()
            .then((token: string) => {
              this.rservice.storeList(token).subscribe(
                () => {
                  console.log('List saved');
                  loading.dismiss();
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.message);
                }
              )
            })
          ;
        }
      }
    )
  }

  handleError(error: string) {
    const alert = this.alertCtrl.create({
      title: 'Error!',
      message: error,
      buttons: ['Ok'],
    });
    alert.present();
  }


}
