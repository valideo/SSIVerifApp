import { UserInfosPage } from './../user-infos/user-infos';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { RapportPage } from '../rapport/rapport';
import { RestProvider } from '../../providers/rest/rest';
import { NativeStorage } from '@ionic-native/native-storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

isLoggedIn : boolean = false;
username : string = "";

  constructor(public navCtrl: NavController, public restprovider: RestProvider, private nativeStorage: NativeStorage, private platform : Platform) {
    
  }

  ionViewCanEnter(){
    this.platform.ready().then(() => {
      //Use plugin now
  
    console.log("canEnter");
    this.nativeStorage.getItem('ssiUserCredentials')
    .then(
      data => {
        console.log(data);
        this.restprovider.apiLogin(data['email'], data['pass']).then(data => {
          if(data['token'] != ""){
            this.restprovider.token = data['token'];
            this.restprovider.apiLoadMe().then(data => {
              this.username = data['username'];
              this.restprovider.username = data['username'];
            });
            this.isLoggedIn = true;
          }
        });
      },
      error => {
            console.log(error);
            this.isLoggedIn = false;
      }
    );
  });
  }

  goToRapport(){
    this.navCtrl.push(RapportPage);
  }

  goConnect(){
    this.navCtrl.push(UserInfosPage);
  }

}
