import {Injectable} from "@angular/core";

let appSettings = require('application-settings');
let http = require('http');

@Injectable()
export class SettingsService {
   private rooturl = "https:/api.mlab.com/api/1/databases/lifegems/collections/Settings";
   private key = "?apiKey=CY73dQUZRrVfx3SWzj77PZ8QbCk-6ilZ";
   private aSettingKeys = [
      "intSettingsID",
      "strEmail",
      "strPassword",
      "intScheduleID",
      "saveDate"
   ];

   public saveSetting(strSettingName: string, aSettingData: any): void {
      let oldSettingData = this.getSetting(strSettingName);
      if (oldSettingData !== aSettingData) {
         appSettings.setString(strSettingName, aSettingData);
      }
   }
   
   public clearSettings() {
      for (let i = 0; i < this.aSettingKeys.length; i++) {
         appSettings.remove(this.aSettingKeys[i]);
      }
   }
   
   public removeSetting(strSettingName: string): void {
      if (appSettings.hasKey(strSettingName)) {
         appSettings.remove(strSettingName);
      }
   }
   
   public getSetting(strSettingName: string): string {
      return appSettings.getString(strSettingName, "");
   }
   
   public loadRemoteSettings(strEmail: string) {
      let settings = this;
      let url = "https://api.mlab.com/api/1/databases/lifegems/collections/Settings?apiKey=CY73dQUZRrVfx3SWzj77PZ8QbCk-6ilZ";
      return http.getJSON(url).then(function(aSettings){
         for (let i = 0; i < aSettings.length; i++) {
            if (settings.getSetting('intSettingsID') === "" && aSettings[i].user === strEmail) {
               settings.saveSetting('intSettingsID', aSettings[i]['_id']);
               settings.saveSetting('saveDate', aSettings[i]['settings']['saveDate']);
               return aSettings[i];
            } else if (settings.getSetting('intSettingsID') !== "" && aSettings[i].user === strEmail) {
               let query = {
                  "_id": settings.getSetting('intSettingsID'),
                  "user": strEmail,
                  "settings": {
                     "saveDate": settings.getSetting('saveDate')
                  }
               };
               return http.request({
                  url: settings.rooturl + "/" + settings.getSetting('intSettingsID') + settings.key ,
                  method: "PUT",
                  headers: { "Content-Type": "application/json" },
                  content: JSON.stringify(query)
               }).then(function(d) {
                  console.log(d);
               });
            }
         }
      });
   }
};