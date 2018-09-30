import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authservice: AuthService, public navCtrl: NavController, public navParams: NavParams, private loadCtrl: LoadingController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  onSignup(form: NgForm) {
    const loading = this.loadCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this.authservice.signup(form.value.email, form.value.password)
      .then(data => {
        console.log(data);
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        console.log(error);
        const alert = this.alertCtrl.create({
          title: 'Signup failed',
          message: error.message,
          buttons: ['Ok']
        });
        alert.present();
     })
  }

}
