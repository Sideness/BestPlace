import { Component, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-add-picture',
  templateUrl: 'addPicture.html'
})
export class AddPicturePage {

  private pictureTaken: string;
  private chosenLocation: any;
  private friendsIdentified: any;
  private description: string;

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
    return new Date().toDateString();
  }

  getChosenLocation() {
    if(this.chosenLocation === undefined) {
      return "Choisir le lieu...";
    }
    return this.chosenLocation;
  }

  getFriendsIdentified() {
    if(this.friendsIdentified === undefined) {
      return "Identifier des amis...";
    }
    // Return list of friends...
  }

  getDescription() {
    if(this.description === undefined) {
      return "Description...";
    }
    return this.description;
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
