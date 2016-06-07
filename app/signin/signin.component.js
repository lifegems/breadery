"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_deprecated_1 = require("@angular/router-deprecated");
var signin_service_1 = require("./../signin/signin.service");
var settings_service_1 = require("./../lib/settings.service");
var schedule_selector_component_1 = require("./../schedules/schedule-selector.component");
var setup_schedule_component_1 = require("./../setup-schedule/setup-schedule.component");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var SignInComponent = (function () {
    function SignInComponent(router, signin, location, settings, modalService) {
        this.router = router;
        this.signin = signin;
        this.location = location;
        this.settings = settings;
        this.modalService = modalService;
        this.SelectedSchedule = { id: 1, title: 'Not a Schedule' };
        this.bEmail = this.signin.getSavedEmail();
        this.bPassword = this.signin.getSavedPassword();
    }
    SignInComponent.prototype.eSignIn = function () {
        if (this.signin.saveUserLocally(this.bEmail, this.bPassword)) {
            this.location.back();
        }
        else {
            alert("ERROR: Invalid email or password!");
        }
    };
    SignInComponent.prototype.eSignOut = function () {
        this.signin.clearSavedUser();
    };
    SignInComponent.prototype.isUserSignedIn = function () {
        return this.signin.isUserSignedIn();
    };
    SignInComponent.prototype.getSetting = function (strSettingName) {
        return new Date(this.settings.getSetting(strSettingName));
    };
    SignInComponent.prototype.showScheduleSelector = function () {
        var _this = this;
        this.modalService.showModal(setup_schedule_component_1.SelectScheduleComponent, {}).then(function (Schedule) { _this.SelectedSchedule = Schedule; alert(Schedule); });
    };
    SignInComponent = __decorate([
        core_1.Component({
            templateUrl: "./signin/signin.html",
            styleUrls: ["./app.css", "signin/signin.css"],
            providers: [settings_service_1.SettingsService, modal_dialog_1.ModalDialogService],
            directives: [modal_dialog_1.ModalDialogHost, schedule_selector_component_1.ScheduleSelector]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, signin_service_1.SignInService, common_1.Location, settings_service_1.SettingsService, modal_dialog_1.ModalDialogService])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=signin.component.js.map