import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import leaflet from 'leaflet';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { SearchPlacePage } from './searchPlace';
import { AddPicturePage } from '../addPicture/addPicture'

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

  constructor(public navCtrl: NavController, private geolocation: Geolocation, 
    public toastCtrl: ToastController, private camera: Camera) {
    this.pushPage = SearchPlacePage;
  }

  ionViewDidLoad() {
    this.loadmap().then(() => {
      this.getCurrentGeolocation();
    });
  }

  loadmap() {
    console.log('LOAD MAP');
    return new Promise((resolve) => {
      this.map = leaflet.map("map").fitWorld();
      leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attributions: 'www.tphangout.com',
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
      if (this.myPositionMarker !== undefined) {
        this.myPositionMarker.remove();
      }
      this.map.setView([resp.coords.latitude, resp.coords.longitude], 14);
      this.myPositionMarker = leaflet.featureGroup();
      let marker: any = leaflet.marker([resp.coords.latitude, resp.coords.longitude]).on('click', () => {
        alert('Marker clicked');
      });
      this.myPositionMarker.addLayer(marker);
      this.map.addLayer(this.myPositionMarker);
    });
  }

  openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;

     this.navCtrl.push(AddPicturePage, { image: base64Image });
    }, (err) => {
     // Handle error
    });
  }
}
