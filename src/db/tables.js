"use strict";
const STAGE = process.env.NODE_ENV || "DEV";
const PREFIX = `Team2-Mken.${STAGE}`;
const Log = require("../common").Log;
Log.info(`TablePrefix = [${PREFIX}]`);

module.exports = {
  Presets: `${PREFIX}.Presets`,
  Activities: `${PREFIX}.Activities`,
};