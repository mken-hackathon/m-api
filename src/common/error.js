"use strict";

const CODES = {
  "NOT_FOUND": 404,
  "BAD_REQUEST": 400,
  "FORBIDDEN": 403,
  "UNAUTHORIZED": 401,
};

/**
 * HTTPエラー応答をするための基底クラス
 *
 * @class ResponseError
 * @extends {Error}
 */
class ResponseError extends Error {
  constructor(code, msg, detail) {
    super(`${code}: ${msg}`);
    this.errotType = code;
    this.detail = detail;
    this.statusCode = CODES[code] || 500;
  }

  toResponseObj() {
    return {
      statusCode: this.statusCode,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        error_type: this.errotType,
        error_message: this.message,
        detail: this.detail
      })
    };
  }
}

/**
 * 指定されたリソースが無い系のエラー
 * 404にマッピングする
 */
class NotFoundError extends ResponseError {
  constructor(msg, detail) {
    super("NOT_FOUND", msg, detail);
  }
}

/**
 * 入力内容が間違っている系のエラー
 * 400にマッピングする
 */
class BadRequestError extends ResponseError {
  constructor(msg, detail) {
    super("BAD_REQUEST", msg, detail);
  }
}

/**
 * リソース操作要求を許可しない系のエラー
 * 403にマッピングする
 */
class ForbiddenError extends ResponseError {
  constructor(msg, detail) {
    super("FORBIDDEN", msg, detail);
  }
}

class UnAuthorizedError extends ResponseError {
  constructor(msg, detail) {
    super("UNAUTHORIZED", msg, detail);
  }
}

class OtherError extends ResponseError {
  constructor(msg, detail) {
    super("OTHER_ERROR", msg, detail);
  }
}

module.exports = {
  ResponseError,
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  UnAuthorizedError,
  OtherError
};
