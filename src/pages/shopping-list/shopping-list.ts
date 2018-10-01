import {Component} from '@angular/core';
import {IonicPage, PopoverController} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {ShoppingListService} from "../../services/shopping-list.service";
import {Ingredient} from "../../models/ingredient";
import {SlOptionsPage} from "./sloptions/sl-options";
import {AuthService} from "../../services/auth.service";


@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  ingredients: Ingredient[];

  constructor(private slService: ShoppingListService, private popCtrl: PopoverController, private authservice: AuthService) {
  }

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
    const popover = this.popCtrl.create(SlOptionsPage);
    popover.present({ev: event});
    popover.onDidDismiss(
      (data) => {
        if (data.action == 'load') {

        } else {
          this.authservice.getActiveUser().getIdToken()
            .then((token: string) => {
              this.slService.storeList(token).subscribe(
                ()=>console.log('Success'),
                error => console.log(error)
              )
            })
            ;
        }
      }
    )
  }


}
