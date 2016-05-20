"use strict";
var core_1 = require("@angular/core");
var bible_service_1 = require("./../bible/bible.service");
var ReadingData = (function () {
    function ReadingData(strReading) {
        this.bible = new bible_service_1.BibleService();
        this.code = strReading;
        this.aBibleBooks = this.bible.getBibleBooks();
    }
    ReadingData.prototype.getCode = function () {
        return this.code;
    };
    ReadingData.prototype.getBookCode = function () {
        return this.code.substr(0, 2);
    };
    ReadingData.prototype.getBookName = function () {
        var intBookID = this.getBookCode();
        return this.bible.getBookByID(intBookID).Name;
    };
    ReadingData.prototype.getChapter = function () {
        return parseInt(this.getChapterCode());
    };
    ReadingData.prototype.getChapterCode = function () {
        return this.code.substr(2, 3);
    };
    ReadingData.prototype.getFormattedName = function () {
        return this.getBookName() + " " + this.getChapter() + this.getVerse();
    };
    ReadingData.prototype.getWOLurl = function () {
        var strBaseUrl = "http://m.wol.jw.org/en/wol/b/r1/lp-e/nwt/E/2013/";
        var strBookCode = parseInt(this.getBookCode()).toString();
        var strChapter = this.getChapter().toString();
        return strBaseUrl + strBookCode + "/" + strChapter;
    };
    ReadingData.prototype.getVerse = function () {
        var strReading = this.getVerseCode();
        var strVerse = "";
        var vs = strReading.substr(0, 3);
        if (vs !== "000") {
            var vsEnd = strReading.substr(3, 3);
            strVerse = ":" + parseInt(vs) + "-" + parseInt(vsEnd);
        }
        return strVerse;
    };
    ReadingData.prototype.getVerseCode = function () {
        return this.code.substr(5);
    };
    ReadingData = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [String])
    ], ReadingData);
    return ReadingData;
}());
exports.ReadingData = ReadingData;
//# sourceMappingURL=reading.service.js.map