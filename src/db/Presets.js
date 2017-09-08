"use strict";

const uuid = require("uuid");
const Common = require("../common");
const DynamoDB = new Common.AWS.DynamoDB.DocumentClient();
const Tables = require("./tables");

module.exports = {
  put, get, getAll
};

function* put(bid, presetActs) {
  return yield DynamoDB.put({
    TableName: Tables.Presets,
    Item: {
      bid: bid,
      activities: presetActs
    }
  }).promise();
}

function* getAll() {
  const r = yield DynamoDB.scan({
    TableName: Tables.Presets
  }).promise();
  return r.Items;
}

function* get(bid) {
  const r = yield DynamoDB.get({
    TableName: Tables.Presets,
    Key: {
      bid: bid
    }
  }).promise();

  return r ? r.Item : undefined;
}