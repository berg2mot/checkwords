import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RusWordsComponent } from './rus-words.component';

describe('RusWordsComponent', () => {
  let component: RusWordsComponent;
  let fixture: ComponentFixture<RusWordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RusWordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RusWordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
