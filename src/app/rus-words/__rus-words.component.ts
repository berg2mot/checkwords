import { Component, OnInit } from '@angular/core';
// import {WordsService} from '../learn-rus/words.service';
// import {Word} from '../learn-rus/word';
import {Status} from '../share/status.enum';
import {RusWord} from './rus-word';
import {RusWordsService} from './rus-words.service';

@Component({
  selector: 'app-rus-words',
  templateUrl: './rus-words.component.html',
  styleUrls: ['./rus-words.component.css']
})
export class RusWordsComponent implements OnInit {

  taskWord: RusWord;
  status = Status;
  learnStatus: Status;

  words: RusWord[] = [];
  allErrorCount: number = 0;
  allSuccessCount: number = 0;
  resultPercent: number = 0;

  constructor(private httpService: RusWordsService) {
    console.log('constructor');
    this.httpService.getWords()
      .then(response => response.json())
      .then(data => {
        this.words = data.wordList;
        this.words.forEach(item => {
          item.errorCount = 0;
          item.successCount = 0;
        });
      });

    this.status = Status;
    this.learnStatus = Status.start;
  }

  ngOnInit() {
    console.log('learn-rus.component ngOnInit');
    // this.httpService.getWords().subscribe(data => this.words = data);
    // console.log('getWords:', this.httpService.getWords());
    // this.taskWord = this.getRandomWord();

  }

  getRandomVal(max: number): number {
    return Math.floor(Math.random() * max);
  }

  getRandomWord(): RusWord {
    let i = this.getRandomVal(this.words.length); // Math.floor(Math.random() * this.words.length);
    console.log('RandomWord_i:', i);
    console.log('RandomWord:', this.words[i]);
    while (this.taskWord && this.taskWord.word === this.words[i].word) {
      i = this.getRandomVal(this.words.length);
      console.log('RandomWord_i:', i);
      console.log('RandomWord:', this.words[i]);
    }
    return this.words[i];
  }

  onNextEvent() {
    console.log('onNextEvent!');
    // this.taskWord = this.getRandomWord();
    // this.taskWord.variants.push(this.taskWord.word);
    this.nextWord();
  }

  getVariants(tmpl: string): string[] {
    // варианты значений строк для вставки в шаблон слова
    const wordPatternList = tmpl.match(/\(.*?\)/ig).map(x => x.replace(/[\(\)]/g, '')).map(x => x.split('/'));
    console.log('wordPatternList:', wordPatternList);
    let numPattern = 0;
    // let tmplWord = tmpl.replace(/\(.*?\)/g, x => '(' + i++ + ')');
    const tmplWord = tmpl.replace(/\(.*?\)/g, x => '(' + numPattern++ + ')');
    console.log('tmplWord:', tmplWord);
    // numPattern = 0;
    // let variantList = [];
    // let variantWord = '';
    let patternList = wordPatternList[0];
    for (let i = 1; i < wordPatternList.length; i++) {
      patternList = this.joinArrays(patternList, wordPatternList[i]);
      console.log('patternList:', patternList);
    }

    patternList.forEach(p => {
      let wrd = tmplWord;
      for (let i = 0; i < wordPatternList.length; i++) {
        wrd = wrd.replace(/\(.*?\)/, p[i]);
      }
      if (!this.taskWord.variants) {
        this.taskWord.variants = [];
      }
      this.taskWord.variants.push(wrd);
      console.log(wrd);
    });

    /*wordPatternList.forEach(patternList => {
      numPattern = 0;
      patternList.forEach(pattern => {
        variantWord = tmplWord.replace('(${numPattern++})', pattern);
        console.log('variantWord:', variantWord);
      });
      variantList.push();
    });*/

    return [];
  }

  /*reqWordReplace(tmpl: string, num: number, ptrnList: string[]): string {
    tmpl.replace('(${num})', ptrnList[num]);
  }*/

  joinArrays(arr1: any[], arr2: string[]): string[] {
    let strArr: String[] = [];
    const resArr = [];
    arr1.forEach(v1 => {
      arr2.forEach(v2 => {
        strArr = [];
        if (Array.isArray(v1)) {
          console.log(v1);
          strArr = v1.slice();
          strArr.push(v2);
          // v1.push(v2);
          // strArr = v1;
        } else {
          strArr.push(v1, v2);
        }
        console.log('strArr:'); console.log(strArr);
        resArr.push(strArr);
      });
    });
    return resArr;
  }

  nextWord() {
    this.taskWord = this.getRandomWord();
    // this.taskWord.variants.push(this.taskWord.word);
    console.log(this.taskWord.variants);
    if (!this.taskWord.variants) {
      this.getVariants(this.taskWord.variantsTemplate);
    }
    this.taskWord.variants.sort(
      function (a,b) {
        const rnd = Math.random();
        console.log(rnd);
        if (rnd < 0.5) { return -1; }
        return 1;
      }
    );
    console.log(this.taskWord.variants);
    const savedThis = this;
    setTimeout(function() {
      savedThis.learnStatus = Status.next;
      console.log('Timeout1000!');
      console.log(savedThis.taskWord.variants);
    }, 1000);
  }

  onStartEvent() {
    console.log('onStartEvent!');
    this.learnStatus = Status.next;
    this.nextWord();
  }

  onCheckWord(e) {
    // console.log('onCheckWord!');
    // let val;
    // if (e.currentTarget) {
    const val = e.currentTarget.value;
    // } else {
    //  val = e;
    // }
    console.log(val);
    if (val.trim() === this.taskWord.word.trim()) {
      console.log('WOW!');
      this.taskWord.successCount++;
      this.allSuccessCount++;
      this.onNextEvent();
    } else {
      console.log('FOO!');
      this.taskWord.errorCount++;
      this.allErrorCount++;
    }
    this.resultPercent = this.getResultPercent();
    // console.log(this);
  }

  getResultPercent(): number {
    let result = this.allSuccessCount * 100 / (this.allErrorCount + this.allSuccessCount);
    result = Math.round(result);
    return result;
  }

}
