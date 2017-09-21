import { ReduxPhonesPage } from './app.po';

describe('redux-phones App', () => {
  let page: ReduxPhonesPage;

  beforeEach(() => {
    page = new ReduxPhonesPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
