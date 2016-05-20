"use strict";
var core_1 = require("@angular/core");
var router_deprecated_1 = require("@angular/router-deprecated");
var router_1 = require("nativescript-angular/router");
// my pages
var signin_component_1 = require("./signin/signin.component");
var todays_reading_component_1 = require("./todays-reading/todays-reading.component");
var schedule_lookup_component_1 = require("./schedule-lookup/schedule-lookup.component");
var setup_schedule_component_1 = require("./setup-schedule/setup-schedule.component");
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            directives: [router_deprecated_1.ROUTER_DIRECTIVES, router_1.NS_ROUTER_DIRECTIVES],
            template: "<page-router-outlet></page-router-outlet>"
        }),
        router_deprecated_1.RouteConfig([
            { path: '/signin', component: signin_component_1.SignInComponent, name: 'SignInComponent' },
            { path: '/todays-reading', component: todays_reading_component_1.TodaysReadingComponent, name: 'TodaysReadingComponent' },
            { path: '/setup-schedule', component: setup_schedule_component_1.SetupScheduleComponent, name: 'SetupScheduleComponent' },
            { path: '/select-schedule', component: setup_schedule_component_1.SelectScheduleComponent, name: 'SelectScheduleComponent' },
            { path: '/select-date', component: setup_schedule_component_1.SelectDateComponent, name: 'SelectDateComponent' },
            { path: '/schedule-lookup', component: schedule_lookup_component_1.ScheduleLookupComponent, name: 'ScheduleLookupComponent', useAsDefault: true }
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map