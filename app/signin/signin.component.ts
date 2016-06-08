import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router-deprecated";
import {SignInService} from "./../signin/signin.service";
import {SettingsService} from "./../lib/settings.service";
import {SchedulesService} from "./../schedules/schedules.service";
import {SelectScheduleComponent} from "./../setup-schedule/setup-schedule.component";
import {ModalDialogService, ModalDialogOptions, ModalDialogHost} from "nativescript-angular/modal-dialog";

let dialogs = require('ui/dialogs');

@Component({
   templateUrl: "./signin/signin.html",
   styleUrls: ["./app.css", "signin/signin.css"],
   providers: [SettingsService, ModalDialogService],
   directives: [ModalDialogHost]
})
export class SignInComponent {
   private bEmail;
   private bPassword;
   private SelectedSchedule;
   
   constructor(
      private router: Router, 
      private signin: SignInService, 
      private location: Location, 
      private settings: SettingsService,
      private schedules: SchedulesService,
      private modalService: ModalDialogService
   ) {
      this.bEmail = this.signin.getSavedEmail();
      this.bPassword = this.signin.getSavedPassword();
      
      if (this.settings.getSetting('intScheduleID') == "") {
         this.SelectedSchedule = {
            "id": "000",
            "title": "Choose Schedule",
            "desc": "",
            "Schedule": []
         };
      } else {
         this.SelectedSchedule = this.schedules.getScheduleInfoByID(this.settings.getSetting('intScheduleID'));
      }
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
   
   isUserSignedIn() {
      return this.signin.isUserSignedIn();
   }
   
   getSetting(strSettingName) {
      return this.settings.getSetting(strSettingName);
   }
   
   getSettingAsDate(strSettingName) {
      return new Date(this.getSetting(strSettingName));
   }
   
   showScheduleSelector() {
      this.modalService.showModal(SelectScheduleComponent, {
         context: {intScheduleID: this.SelectedSchedule.id}
      }).then(
         (result) => { 
            if (result !== "Cancel") {
               this.SelectedSchedule = result;
            }
         }
      );
   }
   
   saveSettings() {
      this.settings.saveSetting('intScheduleID', this.SelectedSchedule.id);
      this.settings.saveSetting('saveDate', JSON.stringify(new Date()));
      dialogs.alert("Settings Saved Successfully").then(
         () => {this.location.back();}
      );
   }  
}