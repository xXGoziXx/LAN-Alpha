import {
  ActivatedRoute,
  NavigationEnd,
  Route,
  Router,
  RouterState
} from '@angular/router';
import { Component, Input } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'lan-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'main';
}
