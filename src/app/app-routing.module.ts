import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
// import { LearnRusComponent } from './learn-rus/learn-rus.component';
import {RusWordsComponent} from './rus-words/rus-words.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'rus',
    pathMatch: 'full'
  }, {
    path: 'about',
    component: AboutComponent
//  }, {
//    path: 'rus',
//    component: LearnRusComponent
  }, {
    path: 'rusWords',
    component: RusWordsComponent
  }, {
    path: '**',
    component: RusWordsComponent
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
