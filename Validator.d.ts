export = Validator;

declare class Validator {
  constructor();

  $: object;
  _data: object;
  _rules: object;

  rules(data: object, rules: object): Validator;
  exec(): boolean;
  errors(err: object): object;

  // -------------------------------------------------------

  static isNumber(val: unknown): boolean;
  static isInteger(val: number): boolean;
  static minNumber(val: number, limit: number, gt: boolean): boolean;
  static maxNumber(val: number, limit: number, lt: boolean): boolean;
  static betweenNumber(val: number, min: number, max: number, gt: boolean, lt: boolean): boolean;

  // -------------------------------------------------------

  static isString(val: unknown): boolean;
  static isIntegerOnString(val: string): boolean;
  static isNumberOnString(val: string): boolean;
  static isJapanese(val: string): boolean;
  static isEmail(val: string): boolean;
  static isUrl(val: string): boolean;
  static minLength(val: string, limit: number, gt: boolean): boolean;
  static maxLength(val: string, limit: number, lt: boolean): boolean;
  static betweenLength(val: string, min: number, max: number, gt: boolean, lt: boolean): boolean;

  // -------------------------------------------------------

  static isBoolean(val: unknown): boolean;

  // -------------------------------------------------------

  static isArray(val: unknown): boolean;
  static minArrayLength(val: array, limit: number, gt: boolean): boolean;
  static maxArrayLength(val: array, limit: number, lt: boolean): boolean;
  static betweenArrayLength(val: array, min: number, max: number, gt: boolean, lt: boolean): boolean;
  static inArray(value: unknown, array: array, fromIndex: boolean): boolean|number

  // -------------------------------------------------------

  static isObject(val: unknown): boolean;
  static hasKeyInObject(obj: object, key: string): boolean
  static minObjectLength(val: object, limit: number, gt: boolean): boolean;
  static maxObjectLength(val: object, limit: number, lt: boolean): boolean;
  static betweenArrayLength(val: object, min: number, max: number, gt: boolean, lt: boolean): boolean;

  // -------------------------------------------------------

  static callback(callacked: function, args: array): Array
}
