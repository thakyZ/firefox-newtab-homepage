/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global browser */

"use strict";

class UrlbarProvider {
  constructor(name) {
  }

  uninit() {
  }
}

class UrlbarView {
  static clearInput() {
    browser.experiments.urlbar.clearInput();
  }
}

class ProviderDynamic extends UrlbarProvider {
  constructor() { super(); }

  clearInput() {
    UrlbarView.clearInput();
  }
}

let testProvider;
(async function main() {
  testProvider = new ProviderDynamic();
  // To remove the provider, call testProvider.uninit().
})();