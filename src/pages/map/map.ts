import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import leaflet from 'leaflet';
import { ToastController } from 'ionic-angular';

import { SearchPlacePage } from './searchPlace';

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
    public toastCtrl: ToastController) {
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

}
