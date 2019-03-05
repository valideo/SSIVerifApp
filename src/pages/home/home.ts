import { UserInfosPage } from './../user-infos/user-infos';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RapportPage } from '../rapport/rapport';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

isLoggedIn : boolean = false;
username : string = "";

  constructor(public navCtrl: NavController, public restprovider: RestProvider) {

  }

  ionViewCanEnter(){
    console.log(this.restprovider.token);
   if(this.restprovider.token != ""){
    this.username = this.restprovider.username;
    this.isLoggedIn = true;
   }
    else
      this.isLoggedIn = false;
  }

  goToRapport(){
    this.navCtrl.push(RapportPage);
  }

  goConnect(){
    this.navCtrl.push(UserInfosPage);
  }

}
