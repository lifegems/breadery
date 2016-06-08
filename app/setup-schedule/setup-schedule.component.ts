import { Component } from "@angular/core";
import { NS_ROUTER_DIRECTIVES } from "nativescript-angular/router";
import {ModalDialogParams} from "nativescript-angular/modal-dialog";
import {SchedulesService} from "./../schedules/schedules.service";

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
   <GridLayout rows="*, 2*, 6*, *">
      <GridLayout columns="*,3*,*" row="0">
         <Button col="0" text="Cancel" (tap)="close('Cancel')"></Button>
         <Label col="1" class="title" text="Select a Schedule"></Label>
      </GridLayout>
      <StackLayout row="1" class="highlightbox--blue">
         <Label [text]="SelectedSchedule.title"></Label>
         <TextView editable="false" class="bgd--blue" [text]="SelectedSchedule.desc"></TextView>
      </StackLayout>
      <ListView row="2" [items]='aSchedules' height="320">
         <template ngFor let-item [ngForOf]="aSchedules" let-i="index">
            <DockLayout class="setting" (tap)="selectSchedule(item)">
               <Label dock="left" [text]="item.title"></Label>
               <Label dock="right" class="icon" [text]="getStatusIcon(item)"></Label>
               <Label text=""></Label>
            </DockLayout>
         </template>
      </ListView>
      <Button row="3" text="Choose Schedule" (tap)="close('OK')"></Button>
   </GridLayout>
   `,
   providers: [SchedulesService],
   styleUrls: ["./app.css", "setup-schedule/setup-schedule.css"]
 })
 export class SelectScheduleComponent {
   private aSchedules = [];
   private SelectedSchedule;
   
   constructor(private params: ModalDialogParams, private schedules: SchedulesService) {
      this.aSchedules = this.schedules.getSchedules();
      this.SelectedSchedule = this.schedules.getScheduleInfoByID(params.context.intScheduleID);
      this.SelectedSchedule.status = true;
   }
   
   getStatusIcon(item) {
      return (item.status) ? String.fromCharCode(0xf058) : String.fromCharCode(0xf10c);
   }
   
   selectSchedule(item) {
      for (let i = 0; i < this.aSchedules.length; i++) {
         this.aSchedules[i].status = false;
      }
      item.status = true;
      this.SelectedSchedule = item;
   }
   
   public close(result) {
      if (result == "OK") {
         this.params.closeCallback(this.SelectedSchedule);
      } else {
         this.params.closeCallback('Cancel');
      }
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