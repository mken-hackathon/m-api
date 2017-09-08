"use strict";

const uuid = require("uuid");
const Common = require("../common");
const DynamoDB = new Common.AWS.DynamoDB.DocumentClient();
const Tables = require("./tables");

module.exports = {
  puts,
  gets
};

function* puts(acts) {
  const reqItems = {
    RequestItems: {
      [Tables.Activities] : acts.map(act => {
        return {
          PutRequest: {
            Item: {
              actid: uuid.v1(),
              timestamp: new Date().getTime(),
              action: act.action,
              amount: act.amount
            }
          }
        }
      })    
    }
  };
  return yield DynamoDB.batchWrite(reqItems).promise();
}

function* gets() {
  const r = yield DynamoDB.scan({
    TableName: Tables.Activities
  }).promise();

  return r.Items.sort((a, b) => a.timestamp - b.timestamp);
}