"use strict";
var core_1 = require("@angular/core");
var modal_dialog_1 = require("nativescript-angular/modal-dialog");
var ScheduleSelector = (function () {
    function ScheduleSelector(params) {
        this.params = params;
    }
    ScheduleSelector.prototype.close = function (result) {
        this.params.closeCallback(result);
    };
    ScheduleSelector = __decorate([
        core_1.Component({
            template: "\n   <Label text=\"Select Schedule\"></Label>\n   "
        }), 
        __metadata('design:paramtypes', [modal_dialog_1.ModalDialogParams])
    ], ScheduleSelector);
    return ScheduleSelector;
}());
exports.ScheduleSelector = ScheduleSelector;
//# sourceMappingURL=schedule-selector.component.js.map