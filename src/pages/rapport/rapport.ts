import { AccessModulesPage } from './../access-modules/access-modules';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { EditClientPage } from '../edit-client/edit-client';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-rapport',
  templateUrl: 'rapport.html',
})
export class RapportPage {

client : any = "";
site : any = "";
clients: any = [];
sites: any = [];
isClientsDisabled: boolean = false;
isSitesDisabled: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private restprovider : RestProvider) {
  }

  ionViewWillEnter(){
   this.loadClients();
   if(this.client != ""){
     this.loadSites(this.client);
   }
  }

  validInfos(){
    let clientModal = this.modalCtrl.create(EditClientPage, {goal : 'check', clientSelected : this.client, siteSelected : this.site});
    clientModal.onDidDismiss(() =>{
      this.navCtrl.push(AccessModulesPage,{clientSelected : this.client, siteSelected : this.site});
    })

   clientModal.present();
  }

  onClientChange(value: any){
    console.log("client " + value);
    if(value == 0){
      this.site = 0;
      this.isSitesDisabled = true;
    }else{
      this.loadSites(value);
      this.isSitesDisabled = false;
    }
  }

  onSiteChange(value: any){
    this.site = value;
    console.log("site: " +this.site)
  }

  goToCreateClient(){
    if(this.client != "" && this.client != 0){
      this.navCtrl.push(EditClientPage,{goal : 'createSite', clientSelected : this.client});
    }else{
      this.navCtrl.push(EditClientPage,{goal : 'createClient'});
    }
  }

  
  loadClients(){
      this.restprovider.apigetClients().then(data => {
        if(data["length"] != "0"){
          this.clients = data;
        }
        else{
          this.isClientsDisabled = true;
        }
      });
  }

  loadSites(idClient : number){
    this.restprovider.apigetSites(idClient).then(data => {
      console.log(data);
      if(data["length"] != "0"){
        this.sites = data;
      }
      else{
        this.sites = [];
      }
    });
  }

}
