import { browser, element, by } from 'protractor';

export class MainPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('league-active-notes-root h1')).getText();
  }
}
