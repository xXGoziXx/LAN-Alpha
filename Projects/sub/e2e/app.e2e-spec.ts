import { SubPage } from './app.po';

describe('sub App', function() {
  let page: SubPage;

  beforeEach(() => {
    page = new SubPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('league-active-notes works!');
  });
});
