import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Ingredient} from "../../models/ingredient";
import {DatabaseOptionsPage} from "../database-options/database-options";
import {AuthService} from "../../services/auth.service";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService, private popCtrl: PopoverController, private authservice: AuthService,
              private loadCtrl: LoadingController,
              private alertCtrl: AlertController){ }

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
                this.slService.fetchList(token)
                  .subscribe(
                    (list: Ingredient[]) => {
                      if (list) {
                        this.ingredients = list;
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
              this.slService.storeList(token).subscribe(
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
