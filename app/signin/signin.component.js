"use strict";
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_deprecated_1 = require("@angular/router-deprecated");
var signin_service_1 = require("./../signin/signin.service");
var settings_service_1 = require("./../lib/settings.service");
var SignInComponent = (function () {
    function SignInComponent(router, signin, location, settings) {
        this.router = router;
        this.signin = signin;
        this.location = location;
        this.settings = settings;
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
    SignInComponent = __decorate([
        core_1.Component({
            templateUrl: "./signin/signin.html",
            styleUrls: ["./app.css", "signin/signin.css"],
            providers: [settings_service_1.SettingsService]
        }), 
        __metadata('design:paramtypes', [router_deprecated_1.Router, signin_service_1.SignInService, common_1.Location, settings_service_1.SettingsService])
    ], SignInComponent);
    return SignInComponent;
}());
exports.SignInComponent = SignInComponent;
//# sourceMappingURL=signin.component.js.map