import {Injectable} from "@angular/core";

let http = require('http');
let appSettings = require('application-settings');

@Injectable()
export class SignInService {
   private rooturl = "https:/api.mlab.com/api/1/databases/lifegems/collections/Users";
   private key = "?apiKey=CY73dQUZRrVfx3SWzj77PZ8QbCk-6ilZ";
   private aUsers;
   
   constructor() {
      this.getUsers().then(
         users => this.aUsers = users
      );
   }
   
   addUser(strUser: string, strPassword: string) {
      let query = {
         email: strUser,
         password: strPassword
      };
      return http.request({
         url: this.rooturl + this.key,
         method: "POST",
         headers: { "Content-Type": "application/json" },
         content: JSON.stringify(query)
      }).then(function(d) {
         console.log(d);
         return d;
      });
   }
   
   clearSavedUser() {
      appSettings.clear();
   }
   
   doesUserExist(strEmail, strPassword) {
      let blDoesUserExist = false;
      for (let i = 0; i < this.aUsers.length; i++) {
         if (this.aUsers[i].email === strEmail
         && this.aUsers[i].password === strPassword) {
            blDoesUserExist = true;
         }
      }
      return blDoesUserExist;
   }
   
   getActionItemText() {
      return (this.isUserSignedIn()) ? "Sign Out" : "Sign In";
   }

   getUsers() {
      return http.getJSON(this.rooturl + this.key).then(function(d) {
         return d;
      });
   }
   
   saveUserLocally(strEmail, strPassword) {
      let blDoesUserExist = this.doesUserExist(strEmail, strPassword);
      if (blDoesUserExist) {
         appSettings.setString('strEmail', strEmail);
         appSettings.setString('strPassword', strPassword);
         return true;
      } else {
         return false;
      }
   }
   
   isUserSignedIn() {
      return (this.getSavedEmail() !== "" || this.getSavedPassword() !== "");
   }
   
   getSavedEmail() {
      return appSettings.getString('strEmail', "");
   }
   
   getSavedPassword() {
      return appSettings.getString('strPassword', "");
   }
}