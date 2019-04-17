import { TestBed } from '@angular/core/testing';

import { RusWordsService } from './rus-words.service';

describe('RusWordsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RusWordsService = TestBed.get(RusWordsService);
    expect(service).toBeTruthy();
  });
});
