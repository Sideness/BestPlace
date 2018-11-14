import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-view-picture',
  templateUrl: 'viewPicture.html'
})
export class ViewPicturePage {

    private pathToImage: string;

    constructor(public navCtrl: NavController, public navParams: NavParams ) {
        this.pathToImage = navParams.get('pathToImage');
    }

}
