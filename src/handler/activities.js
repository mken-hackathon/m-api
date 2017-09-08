"use strict";

const {handlers, HttpResponse} = require("./lambda");
const Common = require("../common");
const Db = require("../db");

module.exports.get = handlers(function* (ev) {
  const r = yield Db.Activities.gets();
  return new HttpResponse({
    statusCode: 200,
    body: { 
      message: "OK" ,
      activities: r
    }
  })
});