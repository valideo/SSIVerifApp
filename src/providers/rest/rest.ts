import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class RestProvider {


apiBaseUrl = "http://192.168.1.3:8080/api/";
token : string = "";
username: string = "";

  constructor(public http: HttpClient) {
  }

  //Users

  apiLogin(email : string, password: string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {headers: headers}
    let postData = {"email": email,"password": password}
    return new Promise((resolve, reject) => {
      this.http.post(this.apiBaseUrl+"users/login/", postData, options).subscribe(data => {
        this.token = data['token'];
        console.log(data['token']);
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  apiLoadMe() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token,
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"users/me/", options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  apiUpdateMe(email:string, username:string, fname:string, sname:string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token,
    });
    let postData = {"email": email,"username": username, "prenom":fname, "nom":sname}
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.put(this.apiBaseUrl+"users/me/",postData, options).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  //Clients

  apigetClients() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token,
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"clients/", options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  apigetClient(clientId : number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token,
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"client/"+clientId, options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  apiCreateClient(name : string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {headers: headers}
    let postData = {"name": name}
    return new Promise((resolve, reject) => {
      this.http.post(this.apiBaseUrl+"client/new/", postData, options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }


  //Sites

  apigetSites(idClient : number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token,
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"sites/"+idClient, options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  apigetSite(siteId : number) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+this.token,
    });
    let options = {headers: headers}
    return new Promise((resolve, reject) => {
      this.http.get(this.apiBaseUrl+"site/"+siteId, options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

  apiCreateSite(name : string, idClient : number, address : string, city : string, zip : string, category : string, type : string , respName : string, respFonc : string, respTel : string, respEmail : string, nContrat : string) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    let options = {headers: headers}
    let postData = {"name": name, "idClient": idClient, "address":address,"city":city,"zipCode":zip, "category":category,"type":type,"respName":respName,"respFonc":respFonc,"respTel":respTel,"respEmail":respEmail,"nContrat":nContrat}
    return new Promise((resolve, reject) => {
      this.http.post(this.apiBaseUrl+"site/new/", postData, options).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
        reject(err);
      });
    });
  }

}
