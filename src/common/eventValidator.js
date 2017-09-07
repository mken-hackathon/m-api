"use strict";

const Validator = require("jsonschema").Validator;
const Error = require("./error");

class EventValidator {
  constructor(schemaDefinition) {
    this.validator = new Validator();
    if(Array.isArray(schemaDefinition.SubSchema)) {
      schemaDefinition.SubSchema.forEach(ss => this.validator.addSchema(ss));
    }
    if(!schemaDefinition.Schema)
      throw "Attribute [Schema] is required.";

    this.MainSchema = schemaDefinition.Schema;
  }

  validate(e) {
    const r = this.validator.validate(e, this.MainSchema, { propertyName: "event" });
    if (r.errors && r.errors.length > 0) {
      const errors = r.errors.map(e => `[${e.property}] ${e.message}`);
      throw new Error.BadRequestError(JSON.stringify(errors), errors);
    }
  }
}

module.exports = EventValidator;
