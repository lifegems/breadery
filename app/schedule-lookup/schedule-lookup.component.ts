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
   
   constructor(private bible: BibleService, private schedule: SchedulesService, private settings: SettingsService, private signin: SignInService) {
      this.bSelectedDate = this.getSavedStartDate();
      this.aBibleBooks = this.bible.getBibleBooks();
      this.aSchedule = this.schedule.getScheduleByID("001");
      
      this.getReading();
   }
   
   getReading() {
      let intDays = this.getDaysSinceDate(this.bSelectedDate);
      let intStart = (intDays >= 0 && intDays < 365) ? intDays : 0;
      let reading = this.schedule.getReadingForDay(intStart + 1);
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
      
      if (dtDiff > 364 || dtDiff < 0) {
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
}