import { StudentPage } from './app.po';

describe('student App', () => {
  let page: StudentPage;

  beforeEach(() => {
    page = new StudentPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
