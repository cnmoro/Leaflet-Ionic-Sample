import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import leaflet from 'leaflet';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  map: any;
  public center: leaflet.PointTuple;
  marker: any;

  constructor(public navCtrl: NavController, public platform: Platform) {
    this.center = [-25.441214, -49.266911];
    this.marker = new leaflet.Marker(this.center, {
      title: 'Teste'
    });
  }

  ionViewDidEnter() {
    this.leafletMap();
  }

  leafletMap() {
    this.map = leaflet.map('mapId', {
      center: this.center,
      zoom: 17
    });

    var position = leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attributionControl: false,
      attribution: '',
      zoomControl: false
    }).addTo(this.map);

    this.map.addLayer(this.marker);

    let link: string;
    if(this.platform.is('ios')){
      link = 'maps://?q=' + this.center, '_system';
    } else {
      let label = encodeURI('Teste');
      link = 'geo:0,0?q=' + this.center + '(' + label + ')', '_system';
    }

    this.marker.bindPopup("<p> Informação 1 deste marcador <p><p> Informação 2 deste marcador <p><a style='text-align: center' href=" + link + ">Ir Até Este Ponto</a>");
  }

  fabClick(event) {
    this.map.removeLayer(this.marker);
  }

  fabClickDois(event) {
    this.map.addLayer(this.marker);
  }

}