class Validator {
  constructor() {
    this.$      = {};
    this._data  = {};
    this._rules = {};

    const types = {
    };

    const patterns = {

    };

    const validateMin = {

    };

    const validateMax = {

    };
  }

  // -------------------------------------------------------

  /**
   * バリデーションのルールを設定する
   * @param   {object} data
   * @param   {object} rules
   * @returns {Validator}
   */
  rules(data, rules) {
    this._data  = data;
    this._rules = rules;

    return this;
  }

  // -------------------------------------------------------

  /**
   * define static values in class
   * @param {object} values
   * @returns {void}
   */
  _defineStaticValues(values) {
    for (const [key, value] of Object.entries(values)) {
      Object.defineProperties(this, {
        [key]: {
          configurable: true,
          writable    : false,
          value       : value,
        }
      });
    }
  }

  // -------------------------------------------------------
}
