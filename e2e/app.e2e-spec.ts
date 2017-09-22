import { ReduxPhonesPage } from './app.po';

describe('redux-phones App', () => {
  let page: ReduxPhonesPage;

  beforeEach(() => {
    page = new ReduxPhonesPage();
  });

  it('should print page header', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Phones');
  });

  it('should list initial phones', () => {
    page.navigateTo();
    expect(page.getTableRows().count()).toEqual(0);
  });

  it('should add a new phone to the list', () => {
    page.navigateTo();
    page.setInputText(1232456);
    page.pressAddButton();
    expect(page.getTableRows().count()).toEqual(1);
  });
});
