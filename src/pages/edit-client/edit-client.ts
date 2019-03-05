import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@IonicPage()
@Component({
  selector: 'page-edit-client',
  templateUrl: 'edit-client.html',
})
export class EditClientPage {

  pageName : string = "";
  siteName : string = "";
  clientName : string = "";
  nContrat : string = "";
  adresse : string = "";
  zip : string = "";
  city : string = "";
  categorie : string = "";
  type : string = "";
  nomResp : string = "";
  telResp : string = "";
  emailResp : string = "";
  foncResp : string = "";
  validButton : string = "Valider les informations";
  isClientDisabled : boolean = true;
  isSiteDisabled : boolean = true;
  selectedClient : number = null;
  selectedSite : number = null;
  goal : string = "";  //createClient - createSite - check - edit

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public restprovider : RestProvider) {
    this.goal = this.navParams.get('goal');
    console.log(this.goal);
    if(this.goal == "createClient"){
      this.initCreateClient();
    }else if(this.goal == "createSite"){
      this.selectedClient = this.navParams.get('clientSelected');
      this.initCreateSite();
    }else if(this.goal == "check"){
      this.selectedClient = this.navParams.get('clientSelected');
      this.selectedSite = this.navParams.get('siteSelected');
      this.initCheck();
    }

  }



  initCreateClient(){
    this.pageName ="Nouveau client"
    this.isClientDisabled = false;
  }

  initCheck(){
    this.loadSiteData();
    this.loadClientData();
    this.pageName = "Vérification";
  }

  initCreateSite(){
    this.goal = "createSite";
    this.pageName ="Nouveau site";
    this.isSiteDisabled = false;
    this.isClientDisabled = true;
    console.log(this.selectedClient);
    this.loadClientData();
  }

  loadClientData(){
    this.restprovider.apigetClient(this.selectedClient).then(data => {
      this.clientName = data["name"];
    },
    error => console.error('Error storing item', error));
  }

  loadSiteData(){
    this.restprovider.apigetSite(this.selectedSite).then(data => {
      this.siteName = data["name"];
      this.nContrat = data["nContrat"];
      this.adresse = data["address"];
      this.zip = data["zipCode"];
      this.city = data["city"];
      this.categorie = data["category"];
      this.type = data["type"];
      this.nomResp = data["respName"];
      this.telResp = data["respTel"];
      this.foncResp = data["respFonc"];
      this.emailResp = data["respEmail"];
    },
    error => console.error('Error storing item', error));
  }

  validInfos() {
    if(this.goal == "createClient"){
      if(this.clientName != ""){
      this.restprovider.apiCreateClient(this.clientName).then(data => {
        this.selectedClient = data["clientId"];
        this.initCreateSite();
      },
      error => console.error('Error storing item', error));
      }
    }else if(this.goal == "check"){
      this.dismiss();
    }else if(this.goal == "createSite"){
      console.log("create site");
      this.restprovider.apiCreateSite(this.siteName,this.selectedClient,this.adresse,this.city,this.zip,this.categorie,this.type,this.nomResp,this.foncResp,this.telResp,this.emailResp,this.nContrat,).then(data => {
      },
      error => console.error('Error storing item', error));
    }
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  editInfos(){
    this.isClientDisabled = false;
    this.isSiteDisabled = false;
  }

}
