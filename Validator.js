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
   * 数字かどうかを判定する
   * @param {unknown} val
   * @returns {boolean}
   */
  static isNumber(val) {
    return typeof val === 'number' && isFinite(val);
  }

  /**
   * 整数かどうかを判定する
   * @param {unknown} val
   * @returns {boolean}
   */
  static isInteger(val) {
    return typeof val === 'number' && Number.isInteger(val);
  }

  /**
   * 数値が指定値以上か(超過か)どうかを判定する
   * @param {number} val
   * @param {number} limit
   * @param {boolean} gt
   * @returns {boolean}
   */
  static minNumber(val, limit, gt=true) {
    if (!Validator.isNumber(val) || !Validator.isNumber(limit) || !Validator.isBoolean(gt)) {
      return false;
    }
    return gt ? (val >= limit) : (val > limit);
  }

  /**
   * 数値が指定値以下か(未満か)どうかを判定する
   * @param {number} val
   * @param {number} limit
   * @param {boolean} lt
   * @returns {boolean}
   */
  static maxNumber(val, limit, lt=true) {
    if (!Validator.isNumber(val) || !Validator.isNumber(limit) || !Validator.isBoolean(lt)) {
      return false;
    }
    return lt ? (val <= limit) : (val < limit);
  }

  /**
   * 数値が指定値の範囲内かどうかを判定する
   * @param {number} val
   * @param {number} min
   * @param {number} max
   * @param {boolean} gt
   * @param {boolean} lt
   * @returns {boolean}
   */
  static betweenNumber(val, min, max, gt=true, lt=true) {
    return Validator.minNumber(val, min, gt) && Validator.maxNumber(val, max, lt);
  }

  // ------------------------------------------------------------

  /**
   * 文字列かどうかを判定する
   * @param {unknown} val
   * @returns {boolean}
   */
  static isString(val) {
    return typeof val === 'string';
  }

  /**
   * 文字列が整数かどうかを判定する
   * @param {string} val
   * @returns {boolean}
   */
  static isIntegerOnString(val) {
    if (!Validator.isString(val)) {
      return false;
    }
    return val.match(/^-?[0-9]*$|^-?[0-9]*\.0*$/) !== null;
  }

  /**
   * 文字列が数字かどうかを判定する
   * @param {string} val
   * @returns {boolean}
   */
  static isNumberOnString(val) {
    if (!Validator.isString(val)) {
      return false;
    }
    const num = Number(val);
    return typeof num === 'number' && Number.isFinite(num);
  }

  /**
   * 日本語のみで構成された文字列かどうかを判定する
   * @param {string} val
   * @returns {boolean}
   */
  static isJapanese(val) {
    if (!Validator.isString(val)) {
      return false;
    }
    return val.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/) !== null;
  }

  /**
   * Eメールかどうかを判定する
   * @param {string} val
   * @returns {boolean}
   */
  static isEmail(val) {
    if (!Validator.isString(val)) {
      return false;
    }
    return val.match(/^[A-Za-z0-9]+[\w.-]*@[A-Za-z0-9]+[\w.-]+\.[\w.-]+$/) !== null;
  }

  /**
   * URLかどうかを判定する
   * @param {string} val
   * @returns {boolean}
   */
  static isUrl(val) {
    if (!Validator.isString(val)) {
      return false;
    }
    return val.match(/^https?(:\/\/[-_.!~*¥'()a-zA-Z0-9;¥/?:¥@&=+¥$,%#]+)$/) !== null;
  }

  /**
   * 文字数が指定値以上か(超過か)どうかを判定する
   * @param {string} val
   * @param {number} limit
   * @param {boolean} gt
   * @returns {boolean}
   */
  static minLength(val, limit, gt=true) {
    if (!Validator.isString(val) || !Validator.isInteger(limit) || limit < 0 || !Validator.isBoolean(gt)) {
      return false;
    }
    return gt ? (val.length >= limit) : (val.length > limit);
  }

  /**
   * 文字数が指定値以下か(未満か)どうかを判定する
   * @param {string} val
   * @param {number} limit
   * @param {boolean} lt
   * @returns {boolean}
   */
  static maxLength(val, limit, lt=true) {
    if (!Validator.isString(val) || !Validator.isInteger(limit) || limit < 0 || !Validator.isBoolean(lt)) {
      return false;
    }
    return lt ? (val.length <= limit) : (val.length < limit);
  }

  /**
   * 文字数が指定値の範囲内かどうかを判定する
   * @param {string} val
   * @param {number} min
   * @param {number} max
   * @param {boolean} gt
   * @param {boolean} lt
   * @returns {boolean}
   */
  static betweenLength(val, min, max, gt=true, lt=true) {
    return Validator.minLength(val, min, gt) && Validator.maxLength(val, max, lt);
  }

  // ------------------------------------------------------------

  /**
   * 真偽値かどうかを判定する
   * @param {unknown} val
   * @returns {boolean}
   */
  static isBoolean(val) {
    return val === true || val === false || toString.call(val) === "[object Boolean]";
  }

  // ------------------------------------------------------------

  /**
   * 配列かどうかを判定する
   * @param {unknown} val
   * @returns {boolean}
   */
  static isArray(val)
  {
    return Array.isArray(val);
  }

  /**
   * 配列の要素数が指定値以上か(超過か)どうかを判定する
   * @param {array} val
   * @param {number} limit
   * @param {boolean} gt
   * @returns {boolean}
   */
  static minArrayLength(val, limit, gt=true) {
    if (!Validator.isArray(val) ||
        !Validator.isInteger(limit) || limit < 0 || !Validator.isBoolean(gt)) {
      return false;
    }

    return gt ? (val.length >= limit) : (val.length > limit);
  }

  /**
   * 配列の要素数が指定値以下か(未満か)どうかを判定する
   * @param {array} val
   * @param {number} limit
   * @param {boolean} lt
   * @returns {boolean}
   */
  static maxArrayLength(val, limit, lt=true) {
    if (!Validator.isArray(val) ||
        !Validator.isInteger(limit) || limit < 0 || !Validator.isBoolean(lt)) {
      return false;
    }

    return lt ? (val.length <= limit) : (val.length < limit);
  }

  /**
   * 配列の要素数が指定値の範囲内かどうかを判定する
   * @param {array} val
   * @param {number} min
   * @param {number} max
   * @param {boolean} gt
   * @param {boolean} lt
   * @returns {boolean}
   */
  static betweenArrayLength(val, min, max, gt=true, lt=true) {
    return Validator.minArrayLength(val, min, gt) && Validator.maxArrayLength(val, max, lt);
  }

  /**
   * 配列内に指定した要素が存在するかを判定する
   * @param {unknown} value
   * @param {array}   array
   * @param {boolean} fromIndex
   * @returns {boolean|number}
   */
  static inArray(value, array, fromIndex=false) {
    if (!Validator.isArray(array) || !Validator.isBoolean(fromIndex)) {
      return false
    }
    const ret = [].indexOf.call(array, value);
    return fromIndex ? ret : (ret !== -1);
  }

  // ------------------------------------------------------------

  /**
   * オブジェクトかどうかを判定する
   * @param {unknown} val
   * @returns {boolean}
   */
  static isObject(val) {
    return typeof val === 'object' && val !== null && !Validator.isArray(val);
  }

  /**
   * オブジェクトの中にキーが有るかどうかを判定する
   * @param {object} obj
   * @param {string} key
   * @returns {boolean}
   */
  static hasKeyInObject(obj, key) {
    if (!Validator.isObject(obj) || !Validator.isString(key)) {
      return false;
    }
    return obj.hasOwnProperty(key);
  }

    /**
   * オブジェクトの要素数が指定値以上か(超過か)どうかを判定する
   * @param {object} val
   * @param {number} limit
   * @param {boolean} gt
   * @returns {boolean}
   */
  static minObjectLength(val, limit, gt=true) {
    if (!Validator.isObject(val) ||
        !Validator.isInteger(limit) || limit < 0 || !Validator.isBoolean(gt)) {
      return false;
    }

    return gt ? (Object.keys(val).length >= limit) : (Object.keys(val).length > limit);
  }

  /**
   * オブジェクトの要素数が指定値以下か(未満か)どうかを判定する
   * @param {object} val
   * @param {number} limit
   * @param {boolean} lt
   * @returns {boolean}
   */
  static maxObjectLength(val, limit, lt=true) {
    if (!Validator.isObject(val) ||
        !Validator.isInteger(limit) || limit < 0 || !Validator.isBoolean(lt)) {
      return false;
    }

    return lt ? (Object.keys(val).length <= limit) : (Object.keys(val).length < limit);
  }

  /**
   * オブジェクトの要素数が指定値の範囲内かどうかを判定する
   * @param {object} val
   * @param {number} min
   * @param {number} max
   * @param {boolean} gt
   * @param {boolean} lt
   * @returns {boolean}
   */
  static betweenObjectLength(val, min, max, gt=true, lt=true) {
    return Validator.minObjectLength(val, min, gt) && Validator.maxObjectLength(val, max, lt);
  }

  // ------------------------------------------------------------

  /**
   * 独自指定したバリデーションを利用して判定する
   * バリデーションの結果はエラー内容の配列であること
   * @param {function} callbacked
   * @param {array} args
   * @returns {array}
   */
  static callback(callbacked, args) {
    return callbacked(...args);
  }

  // ------------------------------------------------------------

  /**
   * nullableが有効かどうかを返す
   * @param {object} rule
   * @returns {boolean}
   */
  static _checkNullable(rule) {
    if (!Validator.isObject(rule) || !Validator.hasKeyInObject(rule, 'nullable') ||
        !Validator.isBoolean(rule.nullable)) {
      return false;
    }
    return rule.nullable;
  }

  /**
   * エラーの内容を追加する
   * @param {object} err
   * @param {string} key
   * @param {string} msg
   * @returns {object}
   */
  static _setError(err, key, msg) {
    if (!Validator.hasKeyInObject(err, key)) {
      err = Validator._resetErrorAsKey(err, key, true);
    }
    err[key].push(msg);
    return err;
  }

  /**
   * エラー用オブジェクトの中身をキーを基にリセットする
   * @param {object} err
   * @param {string} key
   * @param {boolean} force
   * @returns {object}
   */
  static _resetErrorAsKey(err, key, force = false) {
    if (Validator.hasKeyInObject(err, key) || force) {
      err[key] = [];
    }
    return err;
  }


  /**
   * コールバック用バリデーションを実行する
   * @param {object} rule
   * @param {string} key
   * @param {unknown} value
   * @param {object} err
   * @returns {object}
   */
  _callbackExec(rule, key, value, err) {
    const name = rule.name || '';
    const type = rule.type;
    const func = rule.callback || null;

    if (func === null) {
      err = Validator._setError(err, key, 'not set callback function');
      return err;
    }

    const callbackErrors = this.$._validateType[type](func, [value, name||key]);

    if (!Validator.isArray(callbackErrors)) {
      err = Validator._setError(err, key, 'function return type is not array');
      return err;
    }

    if (Validator.minArrayLength(callbackErrors, 1)) {
      for (const error of callbackErrors) {
        err = Validator._setError(err, key, error);
      }
    }

    return err;
  }

  // ------------------------------------------------------------

  /**
   * min用エラー文を生成する
   * @param {unknown} value
   * @param {number} limit
   * @param {string} name
   * @returns {string}
   */
  static _getMinErrorMsg(value, limit, name='') {
    if (Validator.isString(value)) {
      return name ? `${name}は${limit}文字以上にしてください` : `${limit}文字以上にしてください`;
    } else if (Validator.isNumber(value)) {
      return name ? `${name}は${limit}以上にしてください` : `${limit}以上にしてください`;
    } else if (Validator.isArray(value) || Validator.isObject(value)) {
      return name ? `${name}は${limit}要素以上にしてください` : `${limit}要素以上にしてください`;
    } else if (Validator.isBoolean(value)) {
      return name ? `${name}は真偽値です` : `真偽値です`;
    }

    return '';
  }

  /**
   * max用エラー文を生成する
   * @param {unknown} value
   * @param {number} limit
   * @param {string} name
   * @returns {string}
   */
  static _getMaxErrorMsg(value, limit, name='') {
    if (Validator.isString(value)) {
      return name ? `${name}は${limit}文字以内にしてください` : `${limit}文字以内にしてください`;
    } else if (Validator.isNumber(value)) {
      return name ? `${name}は${limit}以下にしてください` : `${limit}以下にしてください`;
    } else if (Validator.isArray(value) || Validator.isObject(value)) {
      return name ? `${name}は${limit}要素以下にしてください` : `${limit}要素以下にしてください`;
    } else if (Validator.isBoolean(value)) {
      return name ? `${name}は真偽値です` : `真偽値です`;
    }

    return '';
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
