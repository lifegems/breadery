import {Injectable} from "@angular/core";
import {BibleService} from "./../bible/bible.service";

@Injectable()
export class ReadingData {
   private code: string;
   private bible: BibleService;
   private aBibleBooks;
   
   constructor(strReading: string) {
      this.bible = new BibleService();
      this.code = strReading;
      this.aBibleBooks = this.bible.getBibleBooks();
   }
   
   getCode(): string {
      return this.code;
   }
   
   getBookCode(): string {
      return this.code.substr(0,2);
   }
   
   getBookName(): string {
      let intBookID = this.getBookCode();
      return this.bible.getBookByID(intBookID).Name;
   }
   
   getChapter(): number {
      return parseInt(this.getChapterCode());
   }
   
   getChapterCode(): string {
      return this.code.substr(2,3);
   }
   
   getFormattedName() {
      return this.getBookName() + " " + this.getChapter() + this.getVerse();
   }
   
   getWOLurl() {
      let strBaseUrl = "http://m.wol.jw.org/en/wol/b/r1/lp-e/nwt/E/2013/";
      let strBookCode = parseInt(this.getBookCode()).toString();
      let strChapter = this.getChapter().toString();
      return strBaseUrl + strBookCode + "/" + strChapter;
   }
   
   getVerse(): string {
      let strReading = this.getVerseCode();
      let strVerse = "";
      
      let vs = strReading.substr(0,3);
      if (vs !== "000") {
         let vsEnd = strReading.substr(3,3);
         strVerse = ":" + parseInt(vs) + "-" + parseInt(vsEnd);
      }
      return strVerse;
   }
   
   getVerseCode(): string {
      return this.code.substr(5);
   }
}