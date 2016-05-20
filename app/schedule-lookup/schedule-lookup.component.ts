import {Component} from "@angular/core";
import {BibleService} from "./../bible/bible.service";
import {SchedulesService} from "./../schedules/schedules.service";
import {ReadingData} from "./../lib/reading.service";

let appSettings = require('application-settings');
let utilModule  = require('utils/utils');

@Component({
   templateUrl: './schedule-lookup/schedule-lookup.html',
   styleUrls: ['app.css','schedule-lookup/schedule-lookup.css'],
   providers: [BibleService,SchedulesService]
})
export class ScheduleLookupComponent {
   private bSelectedDate = new Date();
   private dtToday = new Date();
   private aBibleBooks;
   private aSchedule;
   private aReading = [];
   private expand = true;
   private blIsDateExpanded = false;
   
   constructor(private bible: BibleService, private schedule: SchedulesService) {
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
      let strDate = appSettings.getString('saveDate', "");
      let saveDate = new Date(strDate);
      
      return saveDate;
   }
   
   saveStartDate(dtDate) {
      let saveDate = dtDate.toString();
      appSettings.setString('saveDate',saveDate);
   }
}