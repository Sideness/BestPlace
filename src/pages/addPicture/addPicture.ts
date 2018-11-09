import { Component, } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-add-picture',
  templateUrl: 'addPicture.html'
})
export class AddPicturePage {

    private pictureTaken: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.pictureTaken = navParams.get('image');
  }

  ionViewDidEnter() {
    console.log(this.pictureTaken);
  }

}
