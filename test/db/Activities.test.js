"use strict";
const assert = require("power-assert");
const Db = require("../../src/db");

describe("DB.Activities", () => {
  it("putする", function*() {
    yield Db.Activities.puts([
      {action: "腹筋", amount: "50回"},
      {action: "腕立て", amount: "30回"},
    ]);

    const acts =  yield Db.Activities.gets();
    console.log(acts)
  });

});

