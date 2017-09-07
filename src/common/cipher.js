"use strict";

const assert = require("assert");
const config = require("config");
const AWS = require("./aws");
const KMS = new AWS.KMS();

const EncryptionContext = {
  System: `${config.System}-${config.Conponent}`,
  Stage: config.Stage
};

module.exports = {
  encrypt,
  decrypt
};

function* encrypt(plainStr) {
  const r = yield KMS.encrypt({
    KeyId: config.kms.dbCmk,
    Plaintext: Buffer.from(plainStr, "utf8"),
    EncryptionContext: EncryptionContext
  }).promise();

  assert(Buffer.isBuffer(r.CiphertextBlob));
  return r.CiphertextBlob;
}

function* decrypt(cipertextBlob) {
  assert(Buffer.isBuffer(cipertextBlob));
  const r = yield KMS.decrypt({
    CiphertextBlob: cipertextBlob,
    EncryptionContext: EncryptionContext
  }).promise();

  return r.Plaintext.toString();
}
