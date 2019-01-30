import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddTipsComponent } from './add-tips/add-tips.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { environment } from '../environments/environment';

const appRoutes: Routes = [
  {
    path: 'Home',
    component: HomeComponent,
    data: { page: 'index' },
  },
  {
    path: 'AddTips',
    component: AddTipsComponent,
    data: { page: 'addTips' },
  },
  {
    path: 'DeathTips',
    component: DeathTipsComponent,
    data: { page: 'death' },
  },
  {
    path: 'Overview',
    component: OverviewComponent,
    data: { page: 'match' },
  },
  {
    path: 'About',
    component: AboutComponent,
    data: { page: 'about' },
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];
@NgModule({
  declarations: [AppComponent, HomeComponent, AddTipsComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireModule.initializeApp(
      environment.firebase,
      'league-active-notes'
    ),
    AngularFirestoreModule,
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
