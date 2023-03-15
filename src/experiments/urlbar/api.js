/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

/* global ExtensionAPI, ExtensionCommon */

"use strict";

const { XPCOMUtils } = ChromeUtils.import(
  "resource://gre/modules/XPCOMUtils.jsm"
);

XPCOMUtils.defineLazyModuleGetters(this, {
  BrowserWindowTracker: "resource:///modules/BrowserWindowTracker.jsm",
  Preferences: "resource://gre/modules/Preferences.jsm"
});

XPCOMUtils.defineLazyGetter(
  this,
  "defaultPreferences",
  () => new Preferences({ defaultBranch: true })
);

let { EventManager } = ExtensionCommon;

this.experiments_urlbar = class extends ExtensionAPI {
  getAPI(context) {
    return {
      experiments: {
        urlbar: {
          clearInput() {
            let window = BrowserWindowTracker.getTopWindow();
            window.gURLBar.value = "";
            window.gURLBar.setPageProxyState("invalid");
          }
        }
      }
    };
  }
};