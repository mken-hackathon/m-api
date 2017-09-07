"use strict";

const Common = require("../../common");

/**
 * Httpレスポンスの型
 * [APIGatewayのLambda-Proxy](http://qiita.com/seiya_orz/items/2bd83204e212e35b2c6c)でお決まりの型
 *
 * @class HttpResponse
 */
class HttpResponse {
  constructor(p) {
    this.obj = p;
  }

  toResponseObj() {
    const resObj = this._toResponseObj();
    resObj.headers = Object.assign(
      resObj.headers || {},
      { "Access-Control-Allow-Origin": "*" }
    );
    return resObj;
  }

  _toResponseObj() {
    switch (typeof (this.obj)) {
      case "string":
        return {
          statusCode: 200,
          body: this.obj
        };
      case "number":
        return {
          statusCode: 200,
          body: JSON.stringify(this.obj)
        };
      case "object":
        if (Array.isArray(this.obj)) {
          return {
            statusCode: 200,
            body: JSON.stringify(this.obj)
          };
        }
        if (this.obj.body || this.obj.headers) {
          const ret = {
            statusCode: this.obj.statusCode || 200,
            body: Common.Util.JSON.safeStringify(this.obj.body, "")
          };
          if (this.obj.headers)
            ret.headers = this.obj.headers;
          return ret;
        } else {
          return {
            statusCode: 200,
            body: JSON.stringify(this.obj)
          };
        }
      default:
        throw "unknown type:" + typeof (this.obj);
    }
  }
}

module.exports = HttpResponse;
