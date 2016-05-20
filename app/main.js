"use strict";
// this import should be first in order to load some required settings (like globals and reflect-metadata)
var application_1 = require("nativescript-angular/application");
// router modules
var router_1 = require('nativescript-angular/router');
var bible_service_1 = require('./bible/bible.service');
var signin_service_1 = require('./signin/signin.service');
var schedules_service_1 = require('./schedules/schedules.service');
// my apps
var app_component_1 = require("./app.component");
application_1.nativeScriptBootstrap(app_component_1.AppComponent, [
    router_1.NS_ROUTER_PROVIDERS,
    bible_service_1.BibleService,
    signin_service_1.SignInService,
    schedules_service_1.SchedulesService
], { startPageActionBarHidden: false });
//# sourceMappingURL=main.js.map