import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import leaflet from 'leaflet';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild(Content)
  content:Content;
  @ViewChild('map') mapContainer: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }

  ionViewDidEnter() {
    this.loadmap();
  }

  loadmap() {
    this.map = leaflet.map("map").fitWorld();
    leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributions: 'www.tphangout.com',
      maxZoom: 18
    }).addTo(this.map);
    this.geolocation.getCurrentPosition().then((resp) => {
      this.map.setView([resp.coords.latitude, resp.coords.longitude], 14);
      let markerGroup = leaflet.featureGroup();
      let marker: any = leaflet.marker([resp.coords.latitude, resp.coords.longitude]).on('click', () => {
        alert('Marker clicked');
      })
      markerGroup.addLayer(marker);
      this.map.addLayer(markerGroup);
      });
    /* let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      if (data.coords !== undefined) {
        this.map.setView([data.coords.latitude, data.coords.longitude], 14);
      }
    }); */
  }

  onSearchButtonClicked(event) {
    let yOffset = document.getElementById('searchZone').offsetTop;
    this.content.scrollTo(0, yOffset, 500)
  }

}
