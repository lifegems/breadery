import {Component} from "@angular/core";
import {ModalDialogParams} from "nativescript-angular/modal-dialog";

@Component({
   template: `
   <Label text="Select Schedule"></Label>
   `
})
export class ScheduleSelector {

   constructor(private params: ModalDialogParams) {
      
   }
   
   public close(result: string) {
      this.params.closeCallback(result);
   }
}