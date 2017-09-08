const {handlers, HttpResponse} = require("./lambda");

module.exports.post = handlers(function* (ev) {
  return new HttpResponse({
    statusCode: 200,
    body: { message: "OK" }
  })
});