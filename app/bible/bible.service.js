"use strict";
var core_1 = require("@angular/core");
var http = require('http');
var BibleService = (function () {
    function BibleService() {
        this.rooturl = "https:/api.mlab.com/api/1/databases/lifegems/collections/BibleBooks";
        this.key = "?apiKey=CY73dQUZRrVfx3SWzj77PZ8QbCk-6ilZ";
        this.aBibleBooks = [
            {
                "ID": "01",
                "Name": "Genesis",
                "Abbr": "Ge",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 50
            },
            {
                "ID": "02",
                "Name": "Exodus",
                "Abbr": "Ex",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 40
            },
            {
                "ID": "03",
                "Name": "Leviticus",
                "Abbr": "Le",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 27
            },
            {
                "ID": "04",
                "Name": "Numbers",
                "Abbr": "Nu",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 36
            },
            {
                "ID": "05",
                "Name": "Deuteronomy",
                "Abbr": "De",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 34
            },
            {
                "ID": "06",
                "Name": "Joshua",
                "Abbr": "Jos",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 24
            },
            {
                "ID": "07",
                "Name": "Judges",
                "Abbr": "Jg",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 21
            },
            {
                "ID": "08",
                "Name": "Ruth",
                "Abbr": "Ru",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 4
            },
            {
                "ID": "09",
                "Name": "1 Samuel",
                "Abbr": "1Sa",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 31
            },
            {
                "ID": "10",
                "Name": "2 Samuel",
                "Abbr": "2Sa",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 24
            },
            {
                "ID": "11",
                "Name": "1 Kings",
                "Abbr": "1Ki",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 22
            },
            {
                "ID": "12",
                "Name": "2 Kings",
                "Abbr": "2Ki",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 25
            },
            {
                "ID": "13",
                "Name": "1 Chronicles",
                "Abbr": "1Ch",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 29
            },
            {
                "ID": "14",
                "Name": "2 Chronicles",
                "Abbr": "2Ch",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 36
            },
            {
                "ID": "15",
                "Name": "Ezra",
                "Abbr": "Ezr",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 10
            },
            {
                "ID": "16",
                "Name": "Nehemiah",
                "Abbr": "Ne",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 13
            },
            {
                "ID": "17",
                "Name": "Esther",
                "Abbr": "Es",
                "Color": "#746B84",
                "Type": "hebrew",
                "Chapters": 10
            },
            {
                "ID": "18",
                "Name": "Job",
                "Abbr": "Job",
                "Color": "#544C63",
                "Type": "hebrew",
                "Chapters": 42
            },
            {
                "ID": "19",
                "Name": "Psalms",
                "Abbr": "Ps",
                "Color": "#544C63",
                "Type": "hebrew",
                "Chapters": 150
            },
            {
                "ID": "20",
                "Name": "Proverbs",
                "Abbr": "Pr",
                "Color": "#544C63",
                "Type": "hebrew",
                "Chapters": 31
            },
            {
                "ID": "21",
                "Name": "Ecclesiastes",
                "Abbr": "Ec",
                "Color": "#544C63",
                "Type": "hebrew",
                "Chapters": 12
            },
            {
                "ID": "22",
                "Name": "Song of Solomon",
                "Abbr": "Ca",
                "Color": "#544C63",
                "Type": "hebrew",
                "Chapters": 8
            },
            {
                "ID": "23",
                "Name": "Isaiah",
                "Abbr": "Isa",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 66
            },
            {
                "ID": "24",
                "Name": "Jeremiah",
                "Abbr": "Jer",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 52
            },
            {
                "ID": "25",
                "Name": "Lamentations",
                "Abbr": "La",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 5
            },
            {
                "ID": "26",
                "Name": "Ezekiel",
                "Abbr": "Eze",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 48
            },
            {
                "ID": "27",
                "Name": "Daniel",
                "Abbr": "Da",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 12
            },
            {
                "ID": "28",
                "Name": "Hosea",
                "Abbr": "Ho",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 14
            },
            {
                "ID": "29",
                "Name": "Joel",
                "Abbr": "Joe",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 3
            },
            {
                "ID": "30",
                "Name": "Amos",
                "Abbr": "Am",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 9
            },
            {
                "ID": "31",
                "Name": "Obadiah",
                "Abbr": "Ob",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 1
            },
            {
                "ID": "32",
                "Name": "Jonah",
                "Abbr": "Jon",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 4
            },
            {
                "ID": "33",
                "Name": "Micah",
                "Abbr": "Mic",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 7
            },
            {
                "ID": "34",
                "Name": "Nahum",
                "Abbr": "Na",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 3
            },
            {
                "ID": "35",
                "Name": "Habakkuk",
                "Abbr": "Hab",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 3
            },
            {
                "ID": "36",
                "Name": "Zephaniah",
                "Abbr": "Zep",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 3
            },
            {
                "ID": "37",
                "Name": "Haggai",
                "Abbr": "Hag",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 2
            },
            {
                "ID": "38",
                "Name": "Zechariah",
                "Abbr": "Zec",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 14
            },
            {
                "ID": "39",
                "Name": "Malachi",
                "Abbr": "Mal",
                "Color": "#3B3547",
                "Type": "hebrew",
                "Chapters": 4
            },
            {
                "ID": "40",
                "Name": "Matthew",
                "Abbr": "Mt",
                "Color": "#3B3547",
                "Type": "greek",
                "Chapters": 28
            },
            {
                "ID": "41",
                "Name": "Mark",
                "Abbr": "Mr",
                "Color": "#3B3547",
                "Type": "greek",
                "Chapters": 16
            },
            {
                "ID": "42",
                "Name": "Luke",
                "Abbr": "Lu",
                "Color": "#3B3547",
                "Type": "greek",
                "Chapters": 24
            },
            {
                "ID": "43",
                "Name": "John",
                "Abbr": "Joh",
                "Color": "#3B3547",
                "Type": "greek",
                "Chapters": 21
            },
            {
                "ID": "44",
                "Name": "Acts",
                "Abbr": "Ac",
                "Color": "#746B84",
                "Type": "greek",
                "Chapters": 25
            },
            {
                "ID": "45",
                "Name": "Romans",
                "Abbr": "Ro",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 16
            },
            {
                "ID": "46",
                "Name": "1 Corinthians",
                "Abbr": "1Co",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 16
            },
            {
                "ID": "47",
                "Name": "2 Corinthians",
                "Abbr": "2Co",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 13
            },
            {
                "ID": "48",
                "Name": "Galatians",
                "Abbr": "Ga",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 6
            },
            {
                "ID": "49",
                "Name": "Ephesians",
                "Abbr": "Eph",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 6
            },
            {
                "ID": "50",
                "Name": "Philippians",
                "Abbr": "Php",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 4
            },
            {
                "ID": "51",
                "Name": "Colossians",
                "Abbr": "Col",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 4
            },
            {
                "ID": "52",
                "Name": "1 Thessalonians",
                "Abbr": "1Th",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 5
            },
            {
                "ID": "53",
                "Name": "2 Thessalonians",
                "Abbr": "2Th",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 3
            },
            {
                "ID": "54",
                "Name": "1 Timothy",
                "Abbr": "1Ti",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 6
            },
            {
                "ID": "55",
                "Name": "2 Timothy",
                "Abbr": "2Ti",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 4
            },
            {
                "ID": "56",
                "Name": "Titus",
                "Abbr": "Tit",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 3
            },
            {
                "ID": "57",
                "Name": "Philemon",
                "Abbr": "Phm",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 1
            },
            {
                "ID": "58",
                "Name": "Hebrews",
                "Abbr": "Heb",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 13
            },
            {
                "ID": "59",
                "Name": "James",
                "Abbr": "Jas",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 5
            },
            {
                "ID": "60",
                "Name": "1 Peter",
                "Abbr": "1Pe",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 5
            },
            {
                "ID": "61",
                "Name": "2 Peter",
                "Abbr": "2Pe",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 3
            },
            {
                "ID": "62",
                "Name": "1 John",
                "Abbr": "1Jo",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 5
            },
            {
                "ID": "63",
                "Name": "2 John",
                "Abbr": "2Jo",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 1
            },
            {
                "ID": "64",
                "Name": "3 John",
                "Abbr": "3Jo",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 1
            },
            {
                "ID": "65",
                "Name": "Jude",
                "Abbr": "Jude",
                "Color": "#544C63",
                "Type": "greek",
                "Chapters": 1
            },
            {
                "ID": "66",
                "Name": "Revelation",
                "Abbr": "Re",
                "Color": "#3B3547",
                "Type": "greek",
                "Chapters": 22
            }
        ];
    }
    BibleService.prototype.getBibleBooks = function () {
        return this.aBibleBooks;
    };
    BibleService.prototype.getBookByID = function (intID) {
        for (var i = 0; i < this.aBibleBooks.length; i++) {
            if (this.aBibleBooks[i].ID === intID) {
                return this.aBibleBooks[i];
            }
        }
    };
    BibleService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], BibleService);
    return BibleService;
}());
exports.BibleService = BibleService;
//# sourceMappingURL=bible.service.js.map