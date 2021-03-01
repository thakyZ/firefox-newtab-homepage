'use strict';

/* global URI_REGEX, defaults, utils, browser */
const NEW_TAB_PAGE = 'html/newtab.html';

/**
 * @exports newtab
 */
const newtab = {
  /**
   * This method is used to navigate to the set new tab page.
   *
   * @returns {void}
   */
  async init () {
    const homepage = await browser.browserSettings.homepageOverride.get({});
    const firstHomepage = homepage.value.split('|')[0];

    if (!URI_REGEX.test(firstHomepage)) {
      newtab.openNewTabPage('', false);
    }
    newtab.openNewTabPage(firstHomepage);
  },

  /**
   * This method is used to set the focus either on the address bar or on the web page.
   *
   * @param {string} url - url to open
   *
   * @returns {void}
   */
  async openNewTabPage (url) {
    await browser.tabs.getCurrent((tab) => {
      const tabId = tab.id;
      // we explicitly set the tab id of the current tab to support the edge case of opening a new tab in the
      // background, for support of add-ons like Gesturefy; we set loadReplace to true to disable the back button
      var updating = browser.tabs.update(tabId, { url : url, loadReplace : false });
      updating.then((_tab) => {
        browser.experiments.urlbar.clearInput();
      })
    });

    // delete spammy new tab page entry from history
    browser.history.deleteUrl({ url : browser.extension.getURL(NEW_TAB_PAGE) });
  }
};

newtab.init();
