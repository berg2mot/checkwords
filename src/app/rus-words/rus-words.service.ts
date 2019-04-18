import { Injectable } from '@angular/core';
// import {Word} from '../learn-rus/word';
import {Promise} from 'q';

@Injectable({
  providedIn: 'root'
})
export class RusWordsService {

  getWords() {
    return fetch('/assets/words.json');
    // .then(response => response.json());
    // .then(data => );
  }

  saveSession(res) {
    console.log(res);
  }

  constructor() { }
}
