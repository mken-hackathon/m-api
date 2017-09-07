"use strict";

const co = require("co");
const Logger = require("../../common/logger");
const Error = require("../../common/error");
const HttpResponse = require("./httpResponse");
/**
 * LambdaのHandlerとなるファンクションを生成する
 * @param {handlersObject} ハンドラーの本体を持つJSONオブジェクト {get: (ev)* => {...}, put: (ev)* => {...}, ....}
 * @returns (ev, ctx ,cb) => {}  な関数
 */
function handlers(generatorFn) {
  return function(ev, ctx, cb) {
    ctx.callbackWaitsForEmptyEventLoop = false;
    co(function*() {
      Logger.info(`${ev.httpMethod} ${ev.path}`);
      Logger.debug(ev);
      return yield generatorFn(ev);
    })
      .then(resut => {
        if (result instanceof HttpResponse) {
          cb(null, result.toResponseObj());
        } else {
          cb(null, new HttpResponse(result).toResponseObj());
        }
      })
      .catch(err => {
        Logger.error(err);
        if (err instanceof Error.ResponseError) {
          cb(null, err.toResponseObj());
        } else {
          const otherErr = new Error.OtherError(err.message);
          cb(null, otherErr.toResponseObj());
        }
      });
  };
}

module.exports = {
  handlers,
  HttpResponse //ここでexportする必要が無い気がするが今は互換のために残す
};
