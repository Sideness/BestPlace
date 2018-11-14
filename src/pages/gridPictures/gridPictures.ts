import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ViewPicturePage } from '../viewPicture/viewPicture';


@Component({
  selector: 'page-grid-pictures',
  templateUrl: 'gridPictures.html'
})
export class GridPicturesPage {

    private grid: any;
    private images: any = ['assets/imgs/puppies.jpg', 'assets/imgs/puppies2.jpg',
    'assets/imgs/puppies3.jpg', 'assets/imgs/puppies.jpg',
    'assets/imgs/puppies5.jpg'];

  constructor(public navCtrl: NavController) {
    this.grid = Array(Math.ceil(this.images.length/2));
  }

  ionViewDidLoad() {

    let rowNum = 0; //counter to iterate over the rows in the grid
    for (let i = 0; i < this.images.length; i+=2) { //iterate images
      this.grid[rowNum] = Array(2); //declare two elements per row
      if (this.images[i]) { //check file URI exists
        this.grid[rowNum][0] = this.images[i] //insert image
      }
      if (this.images[i+1]) { //repeat for the second image
        this.grid[rowNum][1] = this.images[i+1]
      }
      rowNum++; //go on to the next row
    }

  }

  openPictureView(image) {
    let pathToImage = 'assets/imgs/puppies' + image + '.jpg';
    this.navCtrl.push(ViewPicturePage, { pathToImage: pathToImage });
  }

}
