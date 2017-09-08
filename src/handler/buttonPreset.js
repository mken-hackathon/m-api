"use strict";

const {handlers, HttpResponse} = require("./lambda");
const Common = require("../common");
const Db = require("../db");
const EV = new Common.EventValidator({
  Schema: {
    id: "/Event",
    type: "object",
    required: ["pathParameters","body"],
    properties: {
      pathParameters: {
        type: "object",
        required: ["bid"],
        properties: {
          bid: {
            type: "string"
          }
        }
      },
      body: {
        type: "object",
        required: ["activities"],
        activities: {
          type: "array",
          items: {
            type: "object",
            required: ["action", "amount"],
            properties: {
              action: { type: "string" },
              amount: { type: "string"}
            }
          }

        }
      }
    }
  }
});

module.exports.put = handlers(function* (ev) {
  ev.body = JSON.parse(ev.body);
  EV.validate(ev);
  const bid = ev.pathParameters.bid;
  yield Db.Presets.put(bid, ev.body.activities);

  return new HttpResponse({
    statusCode: 200,
    body: { 
      message: "OK",
      activities: ev.body.activities
    }
  })
});

module.exports.findAll = handlers(function* (ev) {
  const r = yield Db.Presets.getAll();
  const buttons = r.map(e => {
    return {
      bid: e.bid,
      btnname: e.btnname
    }
  });
  return new HttpResponse({
    statusCode: 200,
    body: {
      message: "OK",
      buttons: buttons
    }
  })
});

module.exports.findOne = handlers(function* (ev) {
  const bid = ev.pathParameters.bid;
  const r = yield Db.Presets.get(bid);

  return new HttpResponse({
    statusCode: 200,
    body: { 
      message: "OK",
      button: r
    }
  })  
});

module.exports.setName = handlers(function* (ev) {
  ev.body = JSON.parse(ev.body);
  const bid = ev.pathParameters.bid;
  yield Db.Presets.setButtonName(bid, ev.body.btnname);

  return new HttpResponse({
    statusCode: 200,
    body: { 
      message: "OK",
      button: {
        bid,
        btnname: ev.body.btnname
      }
    }
  })  
});