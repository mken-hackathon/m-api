"use strict";

module.exports = {
  Array: require("./array"),
  JSON: require("./json"),
  Yieldables: require("./yieldables"),
  delayExecute,
};

/**
 * Promise(generator funciton)を徐々に実行する
 * @param  {Promise} promiseFn [description]
 * @param  {Array} args     promiseFnに渡す引数となる値の配列
 * @return {Object}           {list, action}
 */
function delayExecute(promiseFn, args) {
  const sleep = ms => cb => setTimeout(cb, ms);
  const promises = args.map(arg => () => promiseFn(arg));
  const action = function *(size, delay) {
    delay = delay || 0;
    const fnList = [].concat(promises);

    let results;
    while(fnList.length > 0) {
      const actions = fnList.splice(0, size);
      // const actionsResults = yield Promise.all(actions.map(e => e()));
      const actionsResults = yield actions.map(e => e());
      if(!results) {
        results = actionsResults;
      } else {
        Array.prototype.push.apply(results, actionsResults);
      }
      yield sleep(delay * 1000);
    }
    return results;
  };

  return {list: promises, action};
}
