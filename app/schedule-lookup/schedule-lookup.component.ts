import {Component} from "@angular/core";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {SignInComponent} from "./../signin/signin.component";
import {SignInService} from "./../signin/signin.service";
import {BibleService} from "./../bible/bible.service";
import {SchedulesService} from "./../schedules/schedules.service";
import {ReadingData} from "./../lib/reading.service";
import {SettingsService} from "./../lib/settings.service";

let utilModule  = require('utils/utils');

@Component({
   templateUrl: './schedule-lookup/schedule-lookup.html',
   styleUrls: ['app.css','schedule-lookup/schedule-lookup.css'],
   directives: [SignInComponent,NS_ROUTER_DIRECTIVES],
   providers: [BibleService,SchedulesService,SettingsService,SignInService]
})
export class ScheduleLookupComponent {
   private bSelectedDate = new Date();
   private dtToday = new Date();
   private aBibleBooks;
   private aSchedule;
   private aReading = [];
   private expand = true;
   private blIsDateExpanded = false;
   private isSpinning = false;
   
   constructor(private bible: BibleService, private schedule: SchedulesService, private settings: SettingsService, private signin: SignInService) {
      let vm = this;
      this.settings.removeSetting('intSettingsID');
      this.syncDataWithCloud().then(function(d) {
         vm.bSelectedDate = vm.getSavedStartDate();
         vm.aBibleBooks = vm.bible.getBibleBooks();
         let intSchedID = (this.settings.getSetting('intScheduleID') !== "") ? this.settings.getSetting('intScheduleID') : "001";
         vm.aSchedule = vm.schedule.getScheduleByID(intSchedID);

         vm.getReading();
      });
   }
   
   getReading() {
      let intDays = this.getDaysSinceDate(this.bSelectedDate);
      let intStart = (intDays >= 0 && intDays < 365) ? intDays : 0;
      let intSchedID = (this.settings.getSetting('intScheduleID') !== "") ? this.settings.getSetting('intScheduleID') : "001";
      let reading = this.schedule.getReadingForDay(intSchedID, intStart + 1);
      let aReading = [];
      
      for (let i = 0; i < reading.length; i++) {
         let RD = new ReadingData(reading[i]);
         aReading.push({
            title: RD.getFormattedName(),
            url: RD.getWOLurl()
         });
      }
      return aReading;
   }
   
   goToURL(strURL) {
      utilModule.openUrl(strURL);
   }
   
   getDaysSinceDate(dtDate: Date) {
      let oneDay = 24*60*60*1000;
      let dtToday = new Date();
      
      return Math.round((dtToday.getTime()-dtDate.getTime())/oneDay);
   }
   
   getStatusDisplay() {
      this.saveStartDate(this.bSelectedDate);
      
      let strDisplay = "";
      let dtDiff = this.getDaysSinceDate(this.bSelectedDate);
      let intMaxDays = (this.aSchedule) ? this.aSchedule.length : 0;
      if (dtDiff >= intMaxDays || dtDiff < 0) {
         strDisplay = "Choose a closer date";
      } else if (isNaN(dtDiff)) {
         strDisplay = "Select a start date";
      } else {
         strDisplay = "Day " + (dtDiff + 1);
      }
   
      return strDisplay;
   }
   
   getExpandIcon() {
      return (this.blIsDateExpanded) ? String.fromCharCode(0xf078) : String.fromCharCode(0xf077);
   }
   
   expandDate() {
      this.blIsDateExpanded = !this.blIsDateExpanded;
   }
   
   getSavedStartDate() {
      let strDate = this.settings.getSetting('saveDate');
      let saveDate = new Date(strDate);
      
      return saveDate;
   }
   
   saveStartDate(dtDate) {
      let savedDate = this.settings.getSetting('saveDate');
      if (savedDate !== dtDate.toString()) {
         let newSavedDate = dtDate.toString();
         this.settings.saveSetting('saveDate',newSavedDate);
      }
   }
   
   syncDataWithCloud() {
      let settings = this;
      settings.isSpinning = true;
      return this.settings.loadRemoteSettings(this.signin.getSavedEmail()).then(function() {
         settings.isSpinning = false;
      });
   }
}