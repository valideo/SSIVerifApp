import { PdfProvider } from './../../providers/pdf/pdf';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { EditClientPage } from '../edit-client/edit-client';
import { RestProvider } from '../../providers/rest/rest';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { File, IWriteOptions } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

@IonicPage()
@Component({
  selector: 'page-access-modules',
  templateUrl: 'access-modules.html',
})
export class AccessModulesPage {


  selectedClient : number = null;
  selectedSite : number = null;
  clientName : string = "";
  siteName : string = "";
  nContrat : string = "";


  constructor(public navCtrl: NavController, public navParams: NavParams, private pdfProvider : PdfProvider, private restprovider : RestProvider, private fileOpener:FileOpener, private socialSharing : SocialSharing, private plt : Platform, private file : File) {
    this.selectedClient = this.navParams.get("clientSelected");
    this.selectedSite = this.navParams.get("siteSelected");
    this.loadClientSiteData();
  }

  editClient(){
    this.navCtrl.push(EditClientPage, {goal : "check", clientSelected : this.selectedClient, siteSelected : this.selectedSite});
  }

  loadClientSiteData(){
    this.restprovider.apigetClient(this.selectedClient).then(data => {
      this.clientName = data["name"];
      this.restprovider.apigetSite(this.selectedSite).then(data => {
        this.siteName = data["name"];
        this.nContrat = data["nContrat"];
        this.initPdf();

      });
    });
  }

  initPdf(){
    this.pdfProvider.initPdf();
    this.pdfProvider.addTopInfos(this.clientName, this.siteName);
  }

  savePdf(){
    var PdfB64 = this.pdfProvider.PdfB64;

      if (this.plt.is('ios') || this.plt.is('android')) {
        this.socialSharing.shareViaEmail('Le rapport en PJ', 'Rapport test', ['valentin.bredy@hotmail.fr'], [''], [''],PdfB64,).then(() => {
          console.log('envoyé');
        }).catch((err) => {
          console.log(err);
        });
      }
      else if(this.plt.is('windows')){
        this.socialSharing.share('Le rapport en PJ', 'Rapport test', PdfB64 ).then(() => {
          console.log('envoyé');
        }).catch((err) => {
          console.log(err);
        });
      }
      else if(this.plt.is('core') || this.plt.is('mobileweb')){
       this.pdfProvider.doc.save('Rapport.pdf');
      }
      else{
        console.log('impossible');
      }
  }

 /* previewPdf(){
    const options: DocumentViewerOptions = {
      title: 'My PDF'
    }
    
   this.document.viewDocument(this.pdfProvider.doc.output('datauristring'), 'application/pdf', options);
   console.log(this.pdfProvider.doc.output('datauri'));
  }*/

  previewPdf() {
      let pdfOutput = this.pdfProvider.doc.output();
      // using ArrayBuffer will allow you to put image inside PDF
      let buffer = new ArrayBuffer(pdfOutput.length);
      let array = new Uint8Array(buffer);
      for (var i = 0; i < pdfOutput.length; i++) {
          array[i] = pdfOutput.charCodeAt(i);
      }
      //This is where the PDF file will stored , you can change it as you like
      // for more information please visit https://ionicframework.com/docs/native/file/
      const directory = this.file.dataDirectory ;
      const fileName = "preview.pdf";
      let options: IWriteOptions = { replace: true };
  
      this.file.checkFile(directory, fileName).then((success)=> {
        //Writing File to Device
        this.file.writeFile(directory,fileName,buffer, options)
        .then((success)=> {
          console.log("File created Succesfully" + JSON.stringify(success));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        })
        .catch((error)=> {
          console.log("Cannot Create File " +JSON.stringify(error));
        });
      })
      .catch((error)=> {
        //Writing File to Device
        this.file.writeFile(directory,fileName,buffer)
        .then((success)=> {
          console.log("File created Succesfully" + JSON.stringify(success));
          this.fileOpener.open(this.file.dataDirectory + fileName, 'application/pdf')
            .then(() => console.log('File is opened'))
            .catch(e => console.log('Error opening file', e));
        })
        .catch((error)=> {
          console.log("Cannot Create File " +JSON.stringify(error));
        });
      });
    }
}
