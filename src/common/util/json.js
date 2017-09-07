"use strict";

module.exports = {
  safeParse,
  safeStringify
};

function safeParse(string, defaultValue) {
  try {
    return JSON.parse(string);
  } catch(e) {
    return defaultValue;
  }
}

function safeStringify(obj, defaultValue) {
  try {
    return JSON.stringify(obj) || defaultValue;
  } catch(e) {
    return defaultValue;
  }
}
