import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './about/about.component';
// import { LearnRusComponent } from './learn-rus/learn-rus.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';
// import { CheckWordFullComponent } from './learn-rus/check-word-full/check-word-full.component';
import { RusWordsComponent } from './rus-words/rus-words.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
   // LearnRusComponent,
   // CheckWordFullComponent,
    RusWordsComponent
  ],
  imports: [
    NgbModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
