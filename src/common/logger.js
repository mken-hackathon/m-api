"use strict";

const debugModule = require("debug");
const PREFIX = "MKEN";

module.exports = {
  info: debugModule(`${PREFIX}:INFO`),
  warn: debugModule(`${PREFIX}:WARN`),
  error: debugModule(`${PREFIX}:ERROR`),
  fatal: debugModule(`${PREFIX}:FATAL`),
  debug: debugModule(`${PREFIX}:DEBUG`),
  createDebug: function(prefix) {
    return debugModule(`${PREFIX}:DEBUG:${prefix}`);
  }
};
