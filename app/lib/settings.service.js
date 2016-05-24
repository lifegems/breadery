"use strict";
var core_1 = require("@angular/core");
var appSettings = require('application-settings');
var SettingsService = (function () {
    function SettingsService() {
    }
    SettingsService.prototype.saveSetting = function (strSettingName, aSettingData) {
        appSettings.setString(strSettingName, aSettingData);
    };
    SettingsService.prototype.getSetting = function (strSettingName) {
        return appSettings.getString(strSettingName, "");
    };
    SettingsService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SettingsService);
    return SettingsService;
}());
exports.SettingsService = SettingsService;
//# sourceMappingURL=settings.service.js.map