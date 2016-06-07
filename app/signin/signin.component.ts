import {Component} from "@angular/core";
import {Location} from "@angular/common";
import {Router} from "@angular/router-deprecated";
import {SignInService} from "./../signin/signin.service";
import {SettingsService} from "./../lib/settings.service";
import {ScheduleSelector} from "./../schedules/schedule-selector.component";
import {SelectScheduleComponent} from "./../setup-schedule/setup-schedule.component";
import {ModalDialogService, ModalDialogOptions, ModalDialogHost} from "nativescript-angular/modal-dialog";

@Component({
   templateUrl: "./signin/signin.html",
   styleUrls: ["./app.css", "signin/signin.css"],
   providers: [SettingsService, ModalDialogService],
   directives: [ModalDialogHost,ScheduleSelector]
})
export class SignInComponent {
   private bEmail;
   private bPassword;
   private SelectedSchedule = {id: 1, title: 'Not a Schedule'};
   
   constructor(private router: Router, private signin: SignInService, private location: Location, private settings: SettingsService, private modalService: ModalDialogService) {
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
   
   isUserSignedIn() {
      return this.signin.isUserSignedIn();
   }
   
   getSetting(strSettingName) {
      return new Date(this.settings.getSetting(strSettingName));
   }
   
   showScheduleSelector() {
      this.modalService.showModal(SelectScheduleComponent, {}).then(
         (Schedule) => { this.SelectedSchedule = Schedule; alert(Schedule) }
      );
   }
}