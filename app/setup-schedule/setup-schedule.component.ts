import { Component } from "@angular/core";
import { NS_ROUTER_DIRECTIVES } from "nativescript-angular/router";
let appSettings = require('application-settings');
 
 @Component({
   selector: 'setup-schedule',
   templateUrl: "setup-schedule/setup-schedule.html",
   styleUrls: ["app.css", "setup-schedule/setup-schedule.css"],
   directives: [NS_ROUTER_DIRECTIVES]
 })
 export class SetupScheduleComponent {
   list = [
      {name: 'Select your schedule', route: 'SelectScheduleComponent'},
      {name: 'Choose your start date', route: 'SelectDateComponent'}
   ];
 }
 
 @Component({
   template: `
   <ActionBar title="Select Schedule"></ActionBar>
   
   <StackLayout>
      <ListView [items]='aSchedules' height="320">
         <template ngFor let-item [ngForOf]="aSchedules" let-i="index">
            <DockLayout class="setting" (tap)="selectSchedule(item)">
               <Label dock="left" [text]="item.name"></Label>
               <Label dock="right" class="icon" [text]="getStatusIcon(item)"></Label>
               <Label text=""></Label>
            </DockLayout>
         </template>
      </ListView>
      <Button text="Save Schedule"></Button>
   </StackLayout>
   `,
   styleUrls: ["./app.css", "setup-schedule/setup-schedule.css"]
 })
 export class SelectScheduleComponent {
   aSchedules = [
      { name: 'Chronological by Event', status: true },
      { name: 'Chronological by Time Written', status: false },
      { name: 'Cover to Cover', status: false },
      { name: 'Thematic', status: false }
   ];
   
   getStatusIcon(item) {
      return (item.status) ? String.fromCharCode(0xf058) : String.fromCharCode(0xf10c);
   }
   
   selectSchedule(item) {
      for (let i = 0; i < this.aSchedules.length; i++) {
         this.aSchedules[i].status = false;
      }
      item.status = true;
   }
}
 
@Component({
   template: `
   <ActionBar title="Select a Start Date"></ActionBar>
   <StackLayout>
      <DatePicker [(ngModel)]="date"></DatePicker>
      <Button [text]="getBtnSaveDateText()" (tap)="saveScheduleDate()"></Button>
      <Button [class.warning]="warning" [class.disabled]="disabled" text="Clear Start Date" (tap)="clearDate()"></Button>
      
      <Label [text]="strSavedDateText"></Label>
   </StackLayout>
   `,
   styleUrls: ['setup-schedule/setup-schedule.css']
})
export class SelectDateComponent {
   private date = new Date();
   private strSavedDateText;
   private warning = false;
   private disabled = false;
   
   constructor() {
      this.getSavedDate();
   }
   
   clearDate() {
      if (this.disabled) {
         return false;
      }
      if (confirm('Are you sure about this?')) {
         appSettings.remove('saveDate');
         this.getSavedDate();
      }
   }
   
   getSavedDate() {
      let strDate = appSettings.getString('saveDate', "");
      let saveDate = new Date(strDate);
      this.date = saveDate;
      
      this.strSavedDateText = this.date;
      
      this.disabled = (strDate === "") ? true : false;
      this.warning  = (strDate !== "") ? true : false;
   }
   
   getBtnSaveDateText() {
      let saveDate = appSettings.getString('saveDate', "");
      return (saveDate === "") ? "Set as Start Date" : "Update Start Date";
   }
   
   saveScheduleDate() {
      let saveDate = this.date.toString();
      appSettings.setString('saveDate',saveDate);
      
      this.getSavedDate();
   }
}