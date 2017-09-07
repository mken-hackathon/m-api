"use strict";

/**
 * 並列度を設定してPromise, generatorを実行するやつ
 */
class Executor {
  constructor(yieldables) {
    this.yieldables = yieldables;
  }

  /**
   * Chunk単位に分けて実行する
   * @param units 一度に実行する単位
   * @param sleepMsec スリープするミリ秒
   * @returns Chunk単位の実行結果
   */
  *execInUnits(units, sleepMsec) {
    const chunks = devideToChunk(this.yieldables, units);
    const result = [];
    for(let i in chunks) {
      if(result.length > 0 && sleepMsec) {
        yield sleep(sleepMsec);
      }
      result.push(yield chunks[i]);
    }
    return result;
  }
}

//units個単位に分ける
function devideToChunk(arr, units) {
  return arr.reduce((sum, current) => {
    const lastChunk = sum[sum.length - 1];
    if (lastChunk.length < units) {
      lastChunk.push(current);
    } else {
      const newChunk = [current];
      sum.push(newChunk);
    }
    return sum;
  }, [[]]);
}

function sleep(ms) {
  return function (cb) {
    setTimeout(cb, ms);
  };
}

module.exports = {
  Executor
};
