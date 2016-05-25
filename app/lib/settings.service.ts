import {Injectable} from "@angular/core";

let appSettings = require('application-settings');

@Injectable()
export class SettingsService {

   public saveSetting(strSettingName: string, aSettingData: any): void {
      let oldSettingData = this.getSetting(strSettingName);
      if (oldSettingData !== aSettingData) {
         appSettings.setString(strSettingName, aSettingData);
      }
   }
   
   public getSetting(strSettingName: string): string {
      return appSettings.getString(strSettingName, "");
   }
}