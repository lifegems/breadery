"use strict";
var core_1 = require("@angular/core");
var router_1 = require("nativescript-angular/router");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var appSettings = require('application-settings');
var SetupScheduleComponent = (function () {
    function SetupScheduleComponent() {
        this.list = [
            { name: 'Select your schedule', route: 'SelectScheduleComponent' },
            { name: 'Choose your start date', route: 'SelectDateComponent' }
        ];
    }
    SetupScheduleComponent = __decorate([
        core_1.Component({
            selector: 'setup-schedule',
            templateUrl: "setup-schedule/setup-schedule.html",
            styleUrls: ["app.css", "setup-schedule/setup-schedule.css"],
            directives: [router_1.NS_ROUTER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], SetupScheduleComponent);
    return SetupScheduleComponent;
}());
exports.SetupScheduleComponent = SetupScheduleComponent;
var SelectScheduleComponent = (function () {
    function SelectScheduleComponent(params) {
        this.params = params;
        this.aSchedules = [
            { id: 1, title: 'Chronological by Event', status: true },
            { id: 2, title: 'Chronological by Time Written', status: false },
            { id: 3, title: 'Cover to Cover', status: false },
            { id: 4, title: 'Thematic', status: false }
        ];
        this.SelectedSchedule = this.aSchedules[0];
    }
    SelectScheduleComponent.prototype.getStatusIcon = function (item) {
        return (item.status) ? String.fromCharCode(0xf058) : String.fromCharCode(0xf10c);
    };
    SelectScheduleComponent.prototype.selectSchedule = function (item) {
        for (var i = 0; i < this.aSchedules.length; i++) {
            this.aSchedules[i].status = false;
        }
        item.status = true;
        this.SelectedSchedule = item;
    };
    SelectScheduleComponent.prototype.close = function () {
        this.params.closeCallback(this.SelectedSchedule);
    };
    SelectScheduleComponent = __decorate([
        core_1.Component({
            template: "\n   <StackLayout>\n      <Label class=\"title\" text=\"Select a Schedule\"></Label>\n      <ListView [items]='aSchedules' height=\"320\">\n         <template ngFor let-item [ngForOf]=\"aSchedules\" let-i=\"index\">\n            <DockLayout class=\"setting\" (tap)=\"selectSchedule(item)\">\n               <Label dock=\"left\" [text]=\"item.title\"></Label>\n               <Label dock=\"right\" class=\"icon\" [text]=\"getStatusIcon(item)\"></Label>\n               <Label text=\"\"></Label>\n            </DockLayout>\n         </template>\n      </ListView>\n      <Button text=\"Choose Schedule\" (tap)=\"close()\"></Button>\n   </StackLayout>\n   ",
            styleUrls: ["./app.css", "setup-schedule/setup-schedule.css"]
        }), 
        __metadata('design:paramtypes', [modal_dialog_1.ModalDialogParams])
    ], SelectScheduleComponent);
    return SelectScheduleComponent;
}());
exports.SelectScheduleComponent = SelectScheduleComponent;
var SelectDateComponent = (function () {
    function SelectDateComponent() {
        this.date = new Date();
        this.warning = false;
        this.disabled = false;
        this.getSavedDate();
    }
    SelectDateComponent.prototype.clearDate = function () {
        if (this.disabled) {
            return false;
        }
        if (confirm('Are you sure about this?')) {
            appSettings.remove('saveDate');
            this.getSavedDate();
        }
    };
    SelectDateComponent.prototype.getSavedDate = function () {
        var strDate = appSettings.getString('saveDate', "");
        var saveDate = new Date(strDate);
        this.date = saveDate;
        this.strSavedDateText = this.date;
        this.disabled = (strDate === "") ? true : false;
        this.warning = (strDate !== "") ? true : false;
    };
    SelectDateComponent.prototype.getBtnSaveDateText = function () {
        var saveDate = appSettings.getString('saveDate', "");
        return (saveDate === "") ? "Set as Start Date" : "Update Start Date";
    };
    SelectDateComponent.prototype.saveScheduleDate = function () {
        var saveDate = this.date.toString();
        appSettings.setString('saveDate', saveDate);
        this.getSavedDate();
    };
    SelectDateComponent = __decorate([
        core_1.Component({
            template: "\n   <ActionBar title=\"Select a Start Date\"></ActionBar>\n   <StackLayout>\n      <DatePicker [(ngModel)]=\"date\"></DatePicker>\n      <Button [text]=\"getBtnSaveDateText()\" (tap)=\"saveScheduleDate()\"></Button>\n      <Button [class.warning]=\"warning\" [class.disabled]=\"disabled\" text=\"Clear Start Date\" (tap)=\"clearDate()\"></Button>\n      \n      <Label [text]=\"strSavedDateText\"></Label>\n   </StackLayout>\n   ",
            styleUrls: ['setup-schedule/setup-schedule.css']
        }), 
        __metadata('design:paramtypes', [])
    ], SelectDateComponent);
    return SelectDateComponent;
}());
exports.SelectDateComponent = SelectDateComponent;
//# sourceMappingURL=setup-schedule.component.js.map