"use strict";
var core_1 = require("@angular/core");
var appSettings = require('application-settings');
var http = require('http');
var SettingsService = (function () {
    function SettingsService() {
        this.rooturl = "https:/api.mlab.com/api/1/databases/lifegems/collections/Settings";
        this.key = "?apiKey=CY73dQUZRrVfx3SWzj77PZ8QbCk-6ilZ";
    }
    SettingsService.prototype.saveSetting = function (strSettingName, aSettingData) {
        var oldSettingData = this.getSetting(strSettingName);
        if (oldSettingData !== aSettingData) {
            appSettings.setString(strSettingName, aSettingData);
        }
    };
    SettingsService.prototype.clearSettings = function () {
        appSettings.remove('intSettingsID');
        appSettings.remove('strEmail');
        appSettings.remove('strPassword');
        appSettings.remove('saveDate');
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
        http.getJSON(url).then(function (aSettings) {
            for (var i = 0; i < aSettings.length; i++) {
                if (settings.getSetting('intSettingsID') === "" && aSettings[i].user === strEmail) {
                    settings.saveSetting('intSettingsID', aSettings[i]['_id']);
                    settings.saveSetting('saveDate', aSettings[i]['settings']['saveDate']);
                    return true;
                }
                else if (settings.getSetting('intSettingsID') !== "" && aSettings[i].user === strEmail) {
                    var query = {
                        "_id": settings.getSetting('intSettingsID'),
                        "user": strEmail,
                        "settings": {
                            "saveDate": settings.getSetting('saveDate')
                        }
                    };
                    http.request({
                        url: settings.rooturl + "/" + settings.getSetting('intSettingsID') + settings.key,
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        content: JSON.stringify(query)
                    }).then(function (d) {
                        console.log(d);
                        return d;
                    });
                    return true;
                }
                else {
                    return false;
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