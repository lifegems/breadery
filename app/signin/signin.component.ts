import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router-deprecated";
import {SignInService} from "./../signin/signin.service";

@Component({
   templateUrl: "./signin/signin.html",
   styleUrls: ["./app.css", "signin/signin.css"]
})
export class SignInComponent {
   private bEmail;
   private bPassword;
   
   constructor(private router: Router, private signin: SignInService, private location: Location) {
      this.bEmail = this.signin.getSavedEmail();
      this.bPassword = this.signin.getSavedPassword();
   }
   
   eSignIn() {
      if (this.signin.saveUserLocally(this.bEmail, this.bPassword)) {
         this.location.back();
      } else {
         alert("ERROR: Invalid email or password!");
      }
   }
   
   eSignOut() {
      this.signin.clearSavedUser();
   }
   
   getPageName() {
      return (this.isUserSignedIn()) ? 'Sign Out' : 'Sign In';
   }
   
   isUserSignedIn() {
      return this.signin.isUserSignedIn();
   }
}