interface Validator {
  rules(data: object, rules: object): Validator;
  exec(): boolean;
  errors(err: object): object;

  isNumber(val: unknown): boolean;
  isInteger(val: number): boolean;
  minNumber(val: number, limit: number, gt: boolean): boolean;
  maxNumber(val: number, limit: number, lt: boolean): boolean;
  betweenNumber(val: number, min: number, max: number, gt: boolean, lt: boolean): boolean;

  isString(val: unknown): boolean;
  isIntegerOnString(val: string): boolean;
  isNumberOnString(val: string): boolean;
  isJapanese(val: string): boolean;
  isEmail(val: string): boolean;
  isUrl(val: string): boolean;
  minLength(val: string, limit: number, gt: boolean): boolean;
  maxLength(val: string, limit: number, lt: boolean): boolean;
  betweenLength(val: string, min: number, max: number, gt: boolean, lt: boolean): boolean;

  isBoolean(val: unknown): boolean;

  isArray(val: unknown): boolean;
  minArrayLength(val: array, limit: number, gt: boolean): boolean;
  maxArrayLength(val: array, limit: number, lt: boolean): boolean;
  betweenArrayLength(val: array, min: number, max: number, gt: boolean, lt: boolean): boolean;
  inArray(value: unknown, array: array, fromIndex: boolean): boolean|number

  isObject(val: unknown): boolean;
  hasKeyInObject(obj: object, key: string): boolean
  minObjectLength(val: object, limit: number, gt: boolean): boolean;
  maxObjectLength(val: object, limit: number, lt: boolean): boolean;
  betweenArrayLength(val: object, min: number, max: number, gt: boolean, lt: boolean): boolean;

  callback(callacked: function, args: array): Array
}
