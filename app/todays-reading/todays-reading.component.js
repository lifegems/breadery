"use strict";
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var signin_service_1 = require("./../signin/signin.service");
var bible_service_1 = require("./../bible/bible.service");
var reading_service_1 = require("./../lib/reading.service");
var schedules_service_1 = require("./../schedules/schedules.service");
var setup_schedule_component_1 = require("./../setup-schedule/setup-schedule.component");
var ReadingParser = (function () {
    function ReadingParser() {
    }
    ReadingParser.prototype.getChapter = function (strReading) {
        return parseInt(strReading.substr(2, 3));
    };
    ReadingParser.prototype.getVerse = function (strReading) {
        var strVerse = "";
        var vs = strReading.substr(5, 3);
        if (vs !== "000") {
            var vsEnd = strReading.substr(8, 3);
            strVerse = ":" + parseInt(vs) + "-" + parseInt(vsEnd);
        }
        return strVerse;
    };
    return ReadingParser;
}());
exports.ReadingParser = ReadingParser;
var TodaysReadingComponent = (function () {
    function TodaysReadingComponent(signin, schedules, bible) {
        this.signin = signin;
        this.schedules = schedules;
        this.bible = bible;
        this.bPageTitle = "Reading of the day";
        this.aReading = [];
        this.intReadingDay = "001";
        this.strTodaysDate = new Date();
        this.aSchedules = this.schedules.getSchedules();
        this.aBibleBooks = this.bible.getBibleBooks();
        this.intReadingDay = this.getTodaysReading();
        this.loadReading();
    }
    TodaysReadingComponent.prototype.setSignInLabel = function () {
        return (this.signin.isUserSignedIn()) ? 'Sign Out' : 'Sign In';
    };
    TodaysReadingComponent.prototype.getTodaysReading = function () {
        var aReading = "001";
        var aProgress = this.schedules.getReadingProgress();
        var aSchedule = this.schedules.getScheduleByID("001");
        for (var i = 0; i < aSchedule.length; i++) {
            for (var j = 0; j < aSchedule[i].Reading.length; j++) {
                var readingIndex = aProgress.indexOf(aSchedule[i].Reading[j]);
                if (readingIndex === -1) {
                    return aSchedule[i].ID;
                }
            }
        }
        return aReading;
    };
    TodaysReadingComponent.prototype.showNextReading = function () {
        //this.intReadingDay++;
        this.loadReading();
    };
    TodaysReadingComponent.prototype.showPrevReading = function () {
        //this.intReadingDay = parseInt(this.intReadingDay) - 1;
        this.loadReading();
    };
    TodaysReadingComponent.prototype.markReadingAsComplete = function (item) {
        item.complete = !item.complete;
        if (item.complete) {
            this.schedules.saveScheduleProgress(item);
        }
        else {
            this.schedules.removeScheduleProgress(item);
        }
        this.intReadingDay = this.getTodaysReading();
        this.loadReading();
    };
    TodaysReadingComponent.prototype.getReadingStatusIcon = function (item) {
        return (item.complete) ? String.fromCharCode(0xf058) : String.fromCharCode(0xf10c);
    };
    TodaysReadingComponent.prototype.getBookName = function (strBookCode) {
        for (var i = 0; i < this.aBibleBooks.length; i++) {
            if (parseInt(this.aBibleBooks[i].ID) === parseInt(strBookCode)) {
                return this.aBibleBooks[i].Name;
            }
        }
    };
    TodaysReadingComponent.prototype.loadReading = function () {
        this.aReading = [];
        var reading = this.schedules.getReadingForDay(this.intReadingDay);
        var rp = new ReadingParser();
        for (var i = 0; i < reading.length; i++) {
            var RD = new reading_service_1.ReadingData(reading[i]);
            this.aReading.push({
                code: RD.getCode(),
                book: this.getBookName(RD.getBookCode()),
                chap: RD.getChapter(),
                verse: RD.getVerse(),
                complete: this.schedules.isReadingComplete(reading[i])
            });
        }
    };
    // page tab stuff
    TodaysReadingComponent.prototype.getPageTitle = function () {
        return this.bPageTitle;
    };
    TodaysReadingComponent.prototype.setPageTitle = function (strTitle) {
        this.bPageTitle = strTitle;
    };
    TodaysReadingComponent = __decorate([
        core_1.Component({
            templateUrl: "./todays-reading/todays-reading.html",
            directives: [router_1.NS_ROUTER_DIRECTIVES, setup_schedule_component_1.SetupScheduleComponent],
            styleUrls: ["app.css", "setup-schedule/setup-schedule.css"]
        }), 
        __metadata('design:paramtypes', [signin_service_1.SignInService, schedules_service_1.SchedulesService, bible_service_1.BibleService])
    ], TodaysReadingComponent);
    return TodaysReadingComponent;
}());
exports.TodaysReadingComponent = TodaysReadingComponent;
//# sourceMappingURL=todays-reading.component.js.map