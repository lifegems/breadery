import { Component } from "@angular/core";
import { ROUTER_DIRECTIVES,RouteConfig } from "@angular/router-deprecated";
import { NS_ROUTER_DIRECTIVES } from "nativescript-angular/router";

// my pages
import {SignInComponent} from "./signin/signin.component";
import {TodaysReadingComponent} from "./todays-reading/todays-reading.component";
import {ScheduleLookupComponent} from "./schedule-lookup/schedule-lookup.component";
import {SetupScheduleComponent,SelectScheduleComponent,SelectDateComponent} from "./setup-schedule/setup-schedule.component";

@Component({
    selector: "my-app",
    directives: [ROUTER_DIRECTIVES,NS_ROUTER_DIRECTIVES],
    template: `<page-router-outlet></page-router-outlet>`
})
@RouteConfig([
   { path: '/signin', component: SignInComponent, name: 'SignInComponent' },
   { path: '/todays-reading', component: TodaysReadingComponent, name: 'TodaysReadingComponent' },
   { path: '/setup-schedule', component: SetupScheduleComponent, name: 'SetupScheduleComponent' },
   { path: '/select-schedule', component: SelectScheduleComponent, name: 'SelectScheduleComponent' },
   { path: '/select-date', component: SelectDateComponent, name: 'SelectDateComponent' },
   { path: '/schedule-lookup', component: ScheduleLookupComponent, name: 'ScheduleLookupComponent', useAsDefault: true }
])
export class AppComponent { }

