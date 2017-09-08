"use strict";

const {handlers, HttpResponse} = require("./lambda");
const Common = require("../common");
const Db = require("../db");
const EV = new Common.EventValidator({
  Schema: {
    id: "/Event",
    type: "object",
    required: ["pathParameters"],
    properties: {
      pathParameters: {
        type: "object",
        required: ["bid"],
        properties: {
          bid: {
            type: "string"
          }
        }
      }
    }
  }
});


module.exports.post = handlers(function* (ev) {
  EV.validate(ev);

  const bid = ev.pathParameters.bid;
  const preset = yield Db.Presets.get(bid);
  if(!preset) {
    throw new Common.Error.NotFoundError("button not found");
  }
  yield Db.Activities.puts(preset.activities);
  return new HttpResponse({
    statusCode: 200,
    body: { 
      message: "OK",
      put: preset.activities
    }
  })
});