import { browser, by, element } from 'protractor';

export class ReduxPhonesPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.phones-header')).getText();
  }

  setInputText(text) {
    const el = element(by.css('.phone-input'));
    el.sendKeys(text);
  }

  pressAddButton() {
    const el = element(by.className('btn'));
    el.click();
  }

  getTableRows() {
    return element.all(by.css('.phone-row'));
  }
}
