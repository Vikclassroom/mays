import { MaysAngularPage } from './app.po';

describe('mays-angular App', function() {
  let page: MaysAngularPage;

  beforeEach(() => {
    page = new MaysAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
