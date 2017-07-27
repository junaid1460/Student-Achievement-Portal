import { FacultyPage } from './app.po';

describe('faculty App', () => {
  let page: FacultyPage;

  beforeEach(() => {
    page = new FacultyPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
