import { MainPage } from './app.po';

describe('main App', function() {
  let page: MainPage;

  beforeEach(() => {
    page = new MainPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('league-active-notes works!');
  });
});
