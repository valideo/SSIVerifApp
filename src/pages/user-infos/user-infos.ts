import { HomePage } from './../home/home';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { NativeStorage } from '@ionic-native/native-storage';

@IonicPage()
@Component({
  selector: 'page-user-infos',
  templateUrl: 'user-infos.html',
})
export class UserInfosPage {

isDisabled : boolean = true;
isLoggedIn: boolean = false;  
isEditable: boolean = false;
pass : string = "val2407entin";
email : string = "valentin.bredy@hotmail.fr";
fname : string = "";
sname : string = "";
username: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public RestProvider: RestProvider, private nativeStorage: NativeStorage) {
  }

  ionViewDidEnter(){
   if(this.RestProvider.token != ""){
     this.isLoggedIn = true;
     this.loadData();
   }
   else{
     this.isLoggedIn = false;
   }
  }

  loadData(){
    this.RestProvider.apiLoadMe().then(data => {
      console.log(data);
      this.email = data['email'];
      this.username = data['username'];
      this.RestProvider.username = data['username'];
      this.fname = data['prenom'];
      this.sname = data['nom'];
    });
  }

  disconnect(){
    this.RestProvider.token = "";
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  login(){
    this.RestProvider.apiLogin(this.email, this.pass).then(data => {
      if(data['token'] != ""){
        this.loadData();
        this.nativeStorage.setItem('ssiUserCredentials', {email: this.email, pass: this.pass})
        .then(
          () => console.log('Stored item!'),
          error => console.error('Error storing item', error)
        );
        this.navCtrl.setRoot(HomePage);
      }
    });
  }

  validInfos() {
    this.RestProvider.apiUpdateMe(this.email, this.username, this.fname, this.sname).then(data => {
      this.isEditable = false;
      this.isDisabled = true;
    });
  }

  editInfos(){
    this.isDisabled = false;
    this.isEditable = true;
  }



}
