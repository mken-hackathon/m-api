"use strict";
const assert = require("power-assert");
const Db = require("../../src/db");

describe("DB.Activities", () => {
  it("putする", function*() {
    yield Db.Presets.put("test:button:000001", [
      { action: "スクワット", amount: "30回" },
      { action: "ヨガ", amount: "20分" },
    ]);
  });

  it("getする", function*() {
    const r = yield Db.Presets.get("test:button:000001");
    console.log(r);
  });

  it("getAllする", function*() {
    const r = yield Db.Presets.getAll();
    console.log(r);
  });

});

