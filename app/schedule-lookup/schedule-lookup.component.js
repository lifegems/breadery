"use strict";
var core_1 = require("@angular/core");
var bible_service_1 = require("./../bible/bible.service");
var schedules_service_1 = require("./../schedules/schedules.service");
var reading_service_1 = require("./../lib/reading.service");
var appSettings = require('application-settings');
var utilModule = require('utils/utils');
var ScheduleLookupComponent = (function () {
    function ScheduleLookupComponent(bible, schedule) {
        this.bible = bible;
        this.schedule = schedule;
        this.bSelectedDate = new Date();
        this.dtToday = new Date();
        this.aReading = [];
        this.expand = true;
        this.blIsDateExpanded = false;
        this.bSelectedDate = this.getSavedStartDate();
        this.aBibleBooks = this.bible.getBibleBooks();
        this.aSchedule = this.schedule.getScheduleByID("001");
        this.getReading();
    }
    ScheduleLookupComponent.prototype.getReading = function () {
        var intDays = this.getDaysSinceDate(this.bSelectedDate);
        var intStart = (intDays >= 0 && intDays < 365) ? intDays : 0;
        var reading = this.schedule.getReadingForDay(intStart + 1);
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
        if (dtDiff > 364 || dtDiff < 0) {
            strDisplay = "Choose a closer date";
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
        var strDate = appSettings.getString('saveDate', "");
        var saveDate = new Date(strDate);
        return saveDate;
    };
    ScheduleLookupComponent.prototype.saveStartDate = function (dtDate) {
        var saveDate = dtDate.toString();
        appSettings.setString('saveDate', saveDate);
    };
    ScheduleLookupComponent = __decorate([
        core_1.Component({
            templateUrl: './schedule-lookup/schedule-lookup.html',
            styleUrls: ['app.css', 'schedule-lookup/schedule-lookup.css'],
            providers: [bible_service_1.BibleService, schedules_service_1.SchedulesService]
        }), 
        __metadata('design:paramtypes', [bible_service_1.BibleService, schedules_service_1.SchedulesService])
    ], ScheduleLookupComponent);
    return ScheduleLookupComponent;
}());
exports.ScheduleLookupComponent = ScheduleLookupComponent;
//# sourceMappingURL=schedule-lookup.component.js.map