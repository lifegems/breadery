// this import should be first in order to load some required settings (like globals and reflect-metadata)
import {nativeScriptBootstrap} from "nativescript-angular/application";

// router modules
import { NS_ROUTER_PROVIDERS } from 'nativescript-angular/router';

import {BibleService} from './bible/bible.service';
import {SignInService} from './signin/signin.service';
import {SchedulesService} from './schedules/schedules.service';

// my apps
import { AppComponent } from "./app.component";

nativeScriptBootstrap(AppComponent, [
   NS_ROUTER_PROVIDERS,
   BibleService,
   SignInService,
   SchedulesService
], {startPageActionBarHidden: false});