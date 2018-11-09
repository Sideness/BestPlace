import { Component, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-add-picture',
  templateUrl: 'addPicture.html'
})
export class AddPicturePage {

  private pictureTaken: string;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public loadingCtrl: LoadingController) {
    this.pictureTaken = navParams.get('image');
  }

  ionViewDidEnter() {
    // event
  }

  getThumbnail() {
      return this.pictureTaken;
  }

  getDate() {
    return "16/10/2022";
  }

  sendPicture() {
    this.presentLoading().then(() => {
      this.navCtrl.pop();
    });
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Envoi en cours...",
      duration: 3000
    });
    return loader.present();
  }

}
