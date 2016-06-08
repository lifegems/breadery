"use strict";
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var signin_component_1 = require("./../signin/signin.component");
var signin_service_1 = require("./../signin/signin.service");
var bible_service_1 = require("./../bible/bible.service");
var schedules_service_1 = require("./../schedules/schedules.service");
var reading_service_1 = require("./../lib/reading.service");
var settings_service_1 = require("./../lib/settings.service");
var utilModule = require('utils/utils');
var ScheduleLookupComponent = (function () {
    function ScheduleLookupComponent(bible, schedule, settings, signin) {
        this.bible = bible;
        this.schedule = schedule;
        this.settings = settings;
        this.signin = signin;
        this.bSelectedDate = new Date();
        this.dtToday = new Date();
        this.aReading = [];
        this.expand = true;
        this.blIsDateExpanded = false;
        this.isSpinning = false;
        var vm = this;
        this.settings.removeSetting('intSettingsID');
        this.syncDataWithCloud().then(function (d) {
            vm.bSelectedDate = vm.getSavedStartDate();
            vm.aBibleBooks = vm.bible.getBibleBooks();
            var intSchedID = (this.settings.getSetting('intScheduleID') !== "") ? this.settings.getSetting('intScheduleID') : "001";
            vm.aSchedule = vm.schedule.getScheduleByID(intSchedID);
            vm.getReading();
        });
    }
    ScheduleLookupComponent.prototype.getReading = function () {
        var intDays = this.getDaysSinceDate(this.bSelectedDate);
        var intStart = (intDays >= 0 && intDays < 365) ? intDays : 0;
        var intSchedID = (this.settings.getSetting('intScheduleID') !== "") ? this.settings.getSetting('intScheduleID') : "001";
        var reading = this.schedule.getReadingForDay(intSchedID, intStart + 1);
        var aReading = [];
        for (var i = 0; i < reading.length; i++) {
            var RD = new reading_service_1.ReadingData(reading[i]);
            aReading.push({
                title: RD.getFormattedName(),
                url: RD.getWOLurl()
            });
        }
        return aReading;
    };
    ScheduleLookupComponent.prototype.goToURL = function (strURL) {
        utilModule.openUrl(strURL);
    };
    ScheduleLookupComponent.prototype.getDaysSinceDate = function (dtDate) {
        var oneDay = 24 * 60 * 60 * 1000;
        var dtToday = new Date();
        return Math.round((dtToday.getTime() - dtDate.getTime()) / oneDay);
    };
    ScheduleLookupComponent.prototype.getStatusDisplay = function () {
        this.saveStartDate(this.bSelectedDate);
        var strDisplay = "";
        var dtDiff = this.getDaysSinceDate(this.bSelectedDate);
        var intMaxDays = (this.aSchedule) ? this.aSchedule.length : 0;
        if (dtDiff >= intMaxDays || dtDiff < 0) {
            strDisplay = "Choose a closer date";
        }
        else if (isNaN(dtDiff)) {
            strDisplay = "Select a start date";
        }
        else {
            strDisplay = "Day " + (dtDiff + 1);
        }
        return strDisplay;
    };
    ScheduleLookupComponent.prototype.getExpandIcon = function () {
        return (this.blIsDateExpanded) ? String.fromCharCode(0xf078) : String.fromCharCode(0xf077);
    };
    ScheduleLookupComponent.prototype.expandDate = function () {
        this.blIsDateExpanded = !this.blIsDateExpanded;
    };
    ScheduleLookupComponent.prototype.getSavedStartDate = function () {
        var strDate = this.settings.getSetting('saveDate');
        var saveDate = new Date(strDate);
        return saveDate;
    };
    ScheduleLookupComponent.prototype.saveStartDate = function (dtDate) {
        var savedDate = this.settings.getSetting('saveDate');
        if (savedDate !== dtDate.toString()) {
            var newSavedDate = dtDate.toString();
            this.settings.saveSetting('saveDate', newSavedDate);
        }
    };
    ScheduleLookupComponent.prototype.syncDataWithCloud = function () {
        var settings = this;
        settings.isSpinning = true;
        return this.settings.loadRemoteSettings(this.signin.getSavedEmail()).then(function () {
            settings.isSpinning = false;
        });
    };
    ScheduleLookupComponent = __decorate([
        core_1.Component({
            templateUrl: './schedule-lookup/schedule-lookup.html',
            styleUrls: ['app.css', 'schedule-lookup/schedule-lookup.css'],
            directives: [signin_component_1.SignInComponent, router_1.NS_ROUTER_DIRECTIVES],
            providers: [bible_service_1.BibleService, schedules_service_1.SchedulesService, settings_service_1.SettingsService, signin_service_1.SignInService]
        }), 
        __metadata('design:paramtypes', [bible_service_1.BibleService, schedules_service_1.SchedulesService, settings_service_1.SettingsService, signin_service_1.SignInService])
    ], ScheduleLookupComponent);
    return ScheduleLookupComponent;
}());
exports.ScheduleLookupComponent = ScheduleLookupComponent;
//# sourceMappingURL=schedule-lookup.component.js.map