"use strict";
var core_1 = require("@angular/core");
var appSettings = require('application-settings');
var http = require('http');
var SettingsService = (function () {
    function SettingsService() {
        this.rooturl = "https:/api.mlab.com/api/1/databases/lifegems/collections/Settings";
        this.key = "?apiKey=CY73dQUZRrVfx3SWzj77PZ8QbCk-6ilZ";
        this.aSettingKeys = [
            "intSettingsID",
            "strEmail",
            "strPassword",
            "intScheduleID",
            "saveDate"
        ];
    }
    SettingsService.prototype.saveSetting = function (strSettingName, aSettingData) {
        var oldSettingData = this.getSetting(strSettingName);
        if (oldSettingData !== aSettingData) {
            appSettings.setString(strSettingName, aSettingData);
        }
    };
    SettingsService.prototype.clearSettings = function () {
        for (var i = 0; i < this.aSettingKeys.length; i++) {
            appSettings.remove(this.aSettingKeys[i]);
        }
    };
    SettingsService.prototype.removeSetting = function (strSettingName) {
        if (appSettings.hasKey(strSettingName)) {
            appSettings.remove(strSettingName);
        }
    };
    SettingsService.prototype.getSetting = function (strSettingName) {
        return appSettings.getString(strSettingName, "");
    };
    SettingsService.prototype.loadRemoteSettings = function (strEmail) {
        var settings = this;
        var url = "https://api.mlab.com/api/1/databases/lifegems/collections/Settings?apiKey=CY73dQUZRrVfx3SWzj77PZ8QbCk-6ilZ";
        return http.getJSON(url).then(function (aSettings) {
            for (var i = 0; i < aSettings.length; i++) {
                if (settings.getSetting('intSettingsID') === "" && aSettings[i].user === strEmail) {
                    settings.saveSetting('intSettingsID', aSettings[i]['_id']);
                    settings.saveSetting('saveDate', aSettings[i]['settings']['saveDate']);
                    settings.saveSetting('intScheduleID', aSettings[i]['settings']['intScheduleID']);
                    return aSettings[i];
                }
                else if (settings.getSetting('intSettingsID') !== "" && aSettings[i].user === strEmail) {
                    var query = {
                        "_id": settings.getSetting('intSettingsID'),
                        "user": strEmail,
                        "settings": {
                            "saveDate": settings.getSetting('saveDate'),
                            "intScheduleID": settings.getSetting('intScheduleID')
                        }
                    };
                    return http.request({
                        url: settings.rooturl + "/" + settings.getSetting('intSettingsID') + settings.key,
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify(query)
                    }).then(function (d) {
                        console.log(d);
                    });
                }
            }
        });
    };
    SettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
;
//# sourceMappingURL=settings.service.js.map