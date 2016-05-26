"use strict";
var core_1 = require("@angular/core");
var settings_service_1 = require("./../lib/settings.service");
var http = require('http');
var SignInService = (function () {
    function SignInService() {
        var _this = this;
        this.rooturl = "https:/api.mlab.com/api/1/databases/lifegems/collections/Users";
        this.key = "?apiKey=CY73dQUZRrVfx3SWzj77PZ8QbCk-6ilZ";
        this.settings = new settings_service_1.SettingsService();
        this.getUsers().then(function (users) { return _this.aUsers = users; });
    }
    SignInService.prototype.addUser = function (strUser, strPassword) {
        var query = {
            email: strUser,
            password: strPassword
        };
        return http.request({
            url: this.rooturl + this.key,
            method: "POST",
            headers: { "Content-Type": "application/json" },
            content: JSON.stringify(query)
        }).then(function (d) {
            console.log(d);
            return d;
        });
    };
    SignInService.prototype.clearSavedUser = function () {
        this.settings.clearSettings();
    };
    SignInService.prototype.doesUserExist = function (strEmail, strPassword) {
        var blDoesUserExist = false;
        for (var i = 0; i < this.aUsers.length; i++) {
            if (this.aUsers[i].email === strEmail
                && this.aUsers[i].password === strPassword) {
                blDoesUserExist = true;
            }
        }
        return blDoesUserExist;
    };
    SignInService.prototype.getActionItemText = function () {
        return (this.isUserSignedIn()) ? "Sign Out" : "Sign In";
    };
    SignInService.prototype.getUsers = function () {
        return http.getJSON(this.rooturl + this.key).then(function (d) {
            return d;
        });
    };
    SignInService.prototype.saveUserLocally = function (strEmail, strPassword) {
        var blDoesUserExist = this.doesUserExist(strEmail, strPassword);
        if (blDoesUserExist) {
            this.settings.saveSetting('strEmail', strEmail);
            this.settings.saveSetting('strPassword', strPassword);
            this.settings.loadRemoteSettings(strEmail);
            return true;
        }
        else {
            return false;
        }
    };
    SignInService.prototype.isUserSignedIn = function () {
        return (this.getSavedEmail() !== "" || this.getSavedPassword() !== "");
    };
    SignInService.prototype.getSavedEmail = function () {
        return this.settings.getSetting('strEmail');
    };
    SignInService.prototype.getSavedPassword = function () {
        return this.settings.getSetting('strPassword');
    };
    SignInService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], SignInService);
    return SignInService;
}());
exports.SignInService = SignInService;
//# sourceMappingURL=signin.service.js.map