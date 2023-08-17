// import * as Sentry from '@sentry/react';
// import Raven from "raven-js";

function init() {
  // Raven.config(
  //   "https://091bc59aa8f9bf00f078ebc272423afd@o4505625999310848.ingest.sentry.io/4505626005078016",
  //   {
  //     release: 1 - 0 - 0,
  //     environment: "development-test",
  //   }
  // ).install();
}

function log(error) {
  // Raven.captureException(error);
}

export default {
  init,
  log,
};
