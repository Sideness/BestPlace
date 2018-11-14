import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import leaflet from 'leaflet';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

import { SearchPlacePage } from './searchPlace';
import { AddPicturePage } from '../addPicture/addPicture';
import { GridPicturesPage } from '../gridPictures/gridPictures';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild(Content)
  content:Content;
  @ViewChild('map') mapContainer: ElementRef;
  map: any;

  pushPage: any;

  private searchVisible: boolean = false;
  private myPositionMarker: any;
  private currentCoordinates: any;

  constructor(public navCtrl: NavController, 
              private geolocation: Geolocation, 
              public toastCtrl: ToastController, 
              private camera: Camera, 
              public loadingCtrl: LoadingController,
              public actionSheetCtrl: ActionSheetController) {
    this.pushPage = SearchPlacePage;
  }

  ionViewDidLoad() {
    this.loadmap().then(() => {
      this.getCurrentGeolocation();
    });
  }

  loadmap() {
    return new Promise((resolve) => {
      this.map = leaflet.map("map").fitWorld();
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18
      }).addTo(this.map);
      resolve();
    });
  }

  getCurrentGeolocation() {
    let toast = this.toastCtrl.create({
      message: 'Localisation en cours... Veuillez patienter.',
      duration: 3000,
      position: 'bottom'
    });

    toast.present(toast);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentCoordinates = resp;
      if (this.myPositionMarker !== undefined) {
        this.myPositionMarker.remove();
      }
      this.map.setView([resp.coords.latitude, resp.coords.longitude], 14);
      this.myPositionMarker = leaflet.featureGroup();
      let marker: any = leaflet.marker([resp.coords.latitude, resp.coords.longitude]).on('click', () => {
        this.presentActionSheet();
      });
      let marker2: any = leaflet.marker([resp.coords.latitude + 0.009, resp.coords.longitude + 0.009]).on('click', () => {
        this.presentActionSheet();
      });
      let marker3: any = leaflet.marker([resp.coords.latitude - 0.005, resp.coords.longitude - 0.009]).on('click', () => {
        this.presentActionSheet();
      });
      this.myPositionMarker.addLayer(marker);
      this.myPositionMarker.addLayer(marker2);
      this.myPositionMarker.addLayer(marker3);
      this.map.addLayer(this.myPositionMarker);
    });
  }

  openCamera() {
    this.presentLoading();
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     this.navCtrl.push(AddPicturePage, { image: base64Image, position: this.currentCoordinates });
    }, (err) => {
     // Handle error
    });
  }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Veuillez patienter",
      dismissOnPageChange: true
    });
    loader.present();
  }

  presentActionSheet() {
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Choisir une action pour ce lieu...',
      buttons: [
        {
          text: 'Voir les photos',
          handler: () => {
            this.navCtrl.push(GridPicturesPage);
          }
        },{
          text: 'Ajouter une photo',
          handler: () => {
            this.openCamera();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
