const {handlers, HttpResponse} = require("./lambda");

module.exports.put = handlers(function* (ev) {
  return new HttpResponse({
    statusCode: 200,
    body: { message: "OK" }
  })
});