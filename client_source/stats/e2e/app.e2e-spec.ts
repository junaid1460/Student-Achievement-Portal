import { StatsPage } from './app.po';

describe('stats App', () => {
  let page: StatsPage;

  beforeEach(() => {
    page = new StatsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
