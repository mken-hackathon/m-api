"use strict";

module.exports = {
  chunk
};

/**
 * 配列を指定したサイズごとに区切る
 * chunk([1, 2, 3, 4, 5], 2) => [[1, 2], [3, 4], [5]]
 * @param  {Array} array    [description]
 * @param  {Number} size  [description]
 * @return {Array[Array]} [description]
 */
function chunk(array, size) {
  const chunk = [];
  while (array.length > 0) {
    chunk.push(array.splice(0, size));
  }
  return chunk;
}
