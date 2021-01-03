export = Validator;

declare class Validator {
  constructor();

  /**
   * 読み込み限定の変数が格納される
   */
  $: object;

  /**
   * バリデーション対象のデータ
   */
  _data: object;

  /**
   * バリデーションのルール
   */
  _rules: object;

  /**
   * バリデーションのルールを設定する
   * @param data バリデーション対象のデータ
   * @param rules バリデーションのルール
   */
  rules(data: object, rules: object): Validator;

  /**
   * バリデーションの結果を返す(正しいデータであればtrueが返る)
   */
  exec(): boolean;

  /**
   * バリデーションのエラーを返す
   * @param err 既存エラー内容
   */
  errors(err: object): object;

  // -------------------------------------------------------

  /**
   * 数字かどうかを判定する
   * @param val 対象値
   */
  static isNumber(val: unknown): boolean;

  /**
   * 整数かどうかを判定する
   * @param val 対象値
   */
  static isInteger(val: number): boolean;

  /**
   * 数値が指定値以上か(超過か)どうかを判定する
   * @param val 対象値
   * @param limit 下限値
   * @param gt 以上|超過
   */
  static minNumber(val: number, limit: number, gt?: boolean): boolean;

  /**
   * 数値が指定値以下か(未満か)どうかを判定する
   * @param val 対象値
   * @param limit 上限値
   * @param lt 以下|未満
   */
  static maxNumber(val: number, limit: number, lt?: boolean): boolean;

  /**
   * 数値が指定値の範囲内かどうかを判定する
   * @param val 対象値
   * @param min 下限値
   * @param max 上限値
   * @param gt 以上|超過
   * @param lt 以下|未満
   */
  static betweenNumber(val: number, min: number, max: number, gt?: boolean, lt?: boolean): boolean;

  // -------------------------------------------------------

  /**
   * 文字列かどうかを確認する
   * @param val 対象値
   */
  static isString(val: unknown): boolean;

  /**
   * 文字列が整数かどうかを判定する
   * @param val 対象値
   */
  static isIntegerOnString(val: string): boolean;

  /**
   * 文字列が数字かどうかを判定する
   * @param val 対象値
   */
  static isNumberOnString(val: string): boolean;

  /**
   * Eメールかどうかを判定する
   * @param val 対象値
   */
  static isJapanese(val: string): boolean;

  /**
   * URLかどうかを判定する
   * @param val 対象値
   */
  static isEmail(val: string): boolean;

  /**
   * 文字列がURLのフォーマットに即しているかを確認する
   * @param val 対象値
   */
  static isUrl(val: string): boolean;

  /**
   * 文字数が指定値以上か(超過か)どうかを判定する
   * @param val 対象値
   * @param limit 下限値
   * @param gt 以上|超過
   */
  static minLength(val: string, limit: number, gt?: boolean): boolean;

  /**
   * 文字数が指定値以下か(未満か)どうかを判定する
   * @param val 対象値
   * @param limit 上限値
   * @param lt 以下|未満
   */
  static maxLength(val: string, limit: number, lt?: boolean): boolean;

  /**
   * 文字数が指定値の範囲内かどうかを判定する
   * @param val 対象値
   * @param min 下限値
   * @param max 上限値
   * @param gt 以上|超過
   * @param lt 以下|超過
   */
  static betweenLength(val: string, min: number, max: number, gt?: boolean, lt?: boolean): boolean;

  // -------------------------------------------------------

  /**
   * 真偽値かどうかを判定する
   * @param val 対象値
   */
  static isBoolean(val: unknown): boolean;

  // -------------------------------------------------------

  /**
   * 配列かどうかを判定する
   * @param val 対象値
   */
  static isArray(val: unknown): boolean;

  /**
   * 配列の要素数が指定値以上か(超過か)どうかを判定する
   * @param val 対象値
   * @param limit 下限値
   * @param gt 以上|超過
   */
  static minArrayLength(val: array, limit: number, gt?: boolean): boolean;

  /**
   * 配列の要素数が指定値以下か(未満か)どうかを判定する
   * @param val 対象値
   * @param limit 上限値
   * @param lt 以下|未満
   */
  static maxArrayLength(val: array, limit: number, lt?: boolean): boolean;

  /**
   * 配列の要素数が指定値の範囲内かどうかを判定する
   * @param val 対象値
   * @param min 下限値
   * @param max 上限値
   * @param gt 以上|超過
   * @param lt 以下|未満
   */
  static betweenArrayLength(val: array, min: number, max: number, gt?: boolean, lt?: boolean): boolean;

  /**
   * 配列内に指定した要素が存在するかを判定する
   * @param value 対象値
   * @param array 配列
   * @param fromIndex 要素番号|真理値
   */
  static inArray(value: unknown, array: array, fromIndex?: boolean): boolean|number

  // -------------------------------------------------------

  /**
   * オブジェクトかどうかを判定する
   * @param val 対象値
   */
  static isObject(val: unknown): boolean;

  /**
   * オブジェクトの中にキーが有るかどうかを判定する
   * @param obj 対象オブジェクト
   * @param key キー名
   */
  static hasKeyInObject(obj: object, key: string): boolean

  /**
   * オブジェクトの要素数が指定値以上か(超過か)どうかを判定する
   * @param val 対象値
   * @param limit 下限値
   * @param gt 以上|超過
   */
  static minObjectLength(val: object, limit: number, gt?: boolean): boolean;

  /**
   * オブジェクトの要素数が指定値以下か(未満か)どうかを判定する
   * @param val 対象値
   * @param limit 上限値
   * @param lt 以下|未満
   */
  static maxObjectLength(val: object, limit: number, lt?: boolean): boolean;

  /**
   * オブジェクトの要素数が指定値の範囲内かどうかを判定する
   * @param val 対象オブジェクト
   * @param min 下限値
   * @param max 上限値
   * @param gt 以上|超過
   * @param lt 以下|未満
   */
  static betweenArrayLength(val: object, min: number, max: number, gt?: boolean, lt?: boolean): boolean;

  // -------------------------------------------------------

  static callback(callacked: function, args: array): Array
}
