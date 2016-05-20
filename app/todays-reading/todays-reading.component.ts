import {Component} from "@angular/core";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {SignInService} from "./../signin/signin.service";
import {BibleService} from "./../bible/bible.service";
import {ReadingData} from "./../lib/reading.service";
import {SchedulesService} from "./../schedules/schedules.service";

import {SetupScheduleComponent} from "./../setup-schedule/setup-schedule.component";

export class ReadingParser {
   public getChapter(strReading) {
      return parseInt(strReading.substr(2,3));
   }
   
   public getVerse(strReading) {
      let strVerse = "";
      let vs = strReading.substr(5,3);
      
      if (vs !== "000") {
         let vsEnd = strReading.substr(8,3);
         strVerse = ":" + parseInt(vs) + "-" + parseInt(vsEnd);
      }
      return strVerse;
   }
}

@Component({
   templateUrl: "./todays-reading/todays-reading.html",
   directives: [NS_ROUTER_DIRECTIVES,SetupScheduleComponent],
   styleUrls: ["app.css", "setup-schedule/setup-schedule.css"]
})
export class TodaysReadingComponent {
   private bSignedIn;
   private bPageTitle = "Reading of the day";
   private aReading = [];
   private aSchedules;
   private aBibleBooks;
   private strTodaysDate;
   
   private intReadingDay = "001";
   
   constructor(private signin: SignInService, private schedules: SchedulesService, private bible: BibleService) {
      this.strTodaysDate = new Date();
      this.aSchedules = this.schedules.getSchedules();
      this.aBibleBooks = this.bible.getBibleBooks();
      
      this.intReadingDay = this.getTodaysReading();
      
      this.loadReading();
   }
   
   setSignInLabel() {
      return (this.signin.isUserSignedIn()) ? 'Sign Out' : 'Sign In';
   }
   
   getTodaysReading() {
      let aReading = "001";
      let aProgress = this.schedules.getReadingProgress();
      let aSchedule = this.schedules.getScheduleByID("001");
      for (let i = 0; i < aSchedule.length; i++) {
         for (let j = 0; j < aSchedule[i].Reading.length; j++) {
            let readingIndex = aProgress.indexOf(aSchedule[i].Reading[j]);
            if (readingIndex === -1) {
               return aSchedule[i].ID;
            }
         }
      }
      return aReading;
   }
   
   showNextReading() {
      //this.intReadingDay++;
      this.loadReading();
   }
   
   showPrevReading() {
      //this.intReadingDay = parseInt(this.intReadingDay) - 1;
      this.loadReading();
   }
   
   markReadingAsComplete(item) {
      item.complete = !item.complete;
      if (item.complete) {
         this.schedules.saveScheduleProgress(item);
      } else {
         this.schedules.removeScheduleProgress(item);
      }
      this.intReadingDay = this.getTodaysReading();
      this.loadReading();
   }
   
   getReadingStatusIcon(item) {
      return (item.complete) ? String.fromCharCode(0xf058) : String.fromCharCode(0xf10c);
   }
   
   getBookName(strBookCode) {
      for (let i = 0; i < this.aBibleBooks.length; i++) {
         if (parseInt(this.aBibleBooks[i].ID) === parseInt(strBookCode)) {
            return this.aBibleBooks[i].Name;
         }
      }
   }
   
   loadReading() {
      this.aReading = [];
      let reading = this.schedules.getReadingForDay(this.intReadingDay);
      let rp = new ReadingParser();
      for(let i = 0; i < reading.length; i++) {
         let RD = new ReadingData(reading[i]);
         this.aReading.push({
            code: RD.getCode(),
            book: this.getBookName(RD.getBookCode()),
            chap: RD.getChapter(),
            verse: RD.getVerse(),
            complete: this.schedules.isReadingComplete(reading[i])
         });
      }
   }
   
   // page tab stuff
   getPageTitle() {
      return this.bPageTitle;
   }
   
   setPageTitle(strTitle) {
      this.bPageTitle = strTitle;
   }
}