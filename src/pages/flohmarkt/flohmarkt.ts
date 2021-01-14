import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the FlohmarktPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-flohmarkt',
  templateUrl: 'flohmarkt.html',
})
export class FlohmarktPage {

  data : any = [
    {
      title: 'Mitfahrt',
      description: 'Mitfahrt Claushtal-Berlin',
      dateStart:'25-janvier-2021',
      link:'',
      time: '10h',
      location:'Adolph-Roemer-Straße',
      dateEnd:'25-janvier-2021',
      price : '13',
      urlImage:'../../assets/imgs/mitfahrt.jpg',
      autor: 'Awal',
      delivry: '0',
      categorie:'Offre'
    },
    {
      title: 'Untermiete',
      description: 'je mets ma zimmer en untermiete a partir du 1er fevrier. ib bei Interesse',
      dateStart:'01-fevrier-2021',
      link:'',
      time: '~',
      location:'Marie-Hedwig-Straße 13',
      dateEnd:'01-fevrier-2021',
      price : 'Miete 320 (inlk) nebenkosten',
      urlImage:'../../assets/imgs/untermiete.jpg',
      autor: 'Mira',
      delivry: '0',
      categorie:'Offre'
    },
    {
      title: 'Anmeldung',
      description: 'besoin de Anmeldung a clau contre remuneration ',
      dateStart:'Sofort',
      link:'',
      time: '~',
      location:'Clausthal',
      dateEnd:'~',
      price : 'negociable',
      urlImage:'../../assets/imgs/anmeldung.jpg',
      autor: 'Rida',
      delivry: '0',
      categorie:'Demande'
    },
    {
      title: ' Ferien VW',
      description: 'voici le lien du VW de fevrier',
      dateStart:'20-fevrier-2021',
      link:'https://www.volkswagen-karriere.de/de/schueler/ferienjobs.html',
      time: '~',
      location:'Hannover',
      dateEnd:'20-fevrier-2021',
      price : '~',
      urlImage:'../../assets/imgs/ferien.jpg',
      autor: 'Jelit',
      delivry: '0',
      categorie:'Job'
    }

  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FlohmarktPage');
  }

  close(){
    this.navCtrl.pop();
  }
}
