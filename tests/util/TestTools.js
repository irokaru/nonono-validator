export default {
  /**
   * 配列を一つにまとめて返す
   * @param {array} arrays
   * @returns {array}
   */
  arrayMerge (arrays) {
    return [].concat(...arrays);
  },

  /**
   * 各検証値に期待値を追加して返す
   * @param {unknown} expect
   * @param {array} patterns
   * @returns {array}
   */
  insertExpectInPatterns(expect, patterns) {
    const result = [];

    for (const pattern of patterns) {
      result.push([expect, pattern]);
    }

    return result;
  }
};
