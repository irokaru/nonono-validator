'use strict';

import TestParams from './util/TestParams';
import TestTools  from './util/TestTools';

import Validator from '../Validator';

// -------------------------------------------------------

describe('rules', () => {
  test('[OK] is match setting rules', () => {
    const rules = {
      test: {
        name: 'test value',
        type: 'string',
      },
      hoge: {
        name: 'test test test',
        type: 'int',
      },
    };

    const v = (new Validator()).rules({}, rules);
    expect(rules).toEqual(v._rules);
  });

  test('[NG] throw Error when rules is not object', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      expect(() => {
        (new Validator()).rules({}, suite)
      }).toThrow('args are not object');
    }
  });

  test('[NG] throw error when rules length 0', () => {
    const suites = TestTools.arrayMerge([
      TestParams.OBJECT_EMPTY,
    ]);

    for (const suite of suites) {
      expect(() => {
        (new Validator()).rules({}, suite)
      }).toThrow('rules length is 1 or more');
    }
  });

  test('[NG] thrwo error then type not match', () => {
    const suites = [
      'hoge',
      'not match',
      'boo',
      'integ',
    ];

    for (const suite of suites) {
      expect(() => {
        (new Validator()).rules({}, {keyname: {type: suite}})
      }).toThrow(`not found type: ${suite}`);
    }
  });
});

describe('validate number and integer', () => {
  test('[OK] is number test', () => {
    const suitesTrue = TestTools.insertExpectInPatterns(true, TestTools.arrayMerge([
        TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT
      ]));

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suitesTrue, suitesFalse])) {
      const result = Validator.isNumber(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[OK] is integer test', () => {
    const suitesTrue = TestTools.insertExpectInPatterns(true, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA,
    ]));

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suitesTrue, suitesFalse])) {
      const result = Validator.isInteger(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[NG] min number value test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minNumber(suite, 0);
      expect(result).toBe(false);
    }
  });

  test('[NG] min number gt test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minNumber(100, 0, suite);
      expect(result).toBe(false);
    }
    expect(false).toBe(false);
  });

  test('[OK] min number test', () => {
    const suites = [
    //[expect, val, limit, gt]
      [false, 0, 1, true],
      [false, 0, 1, false],
      [true,  1, 1, true],
      [false, 1, 1, false],
      [true,  2, 1, true],
      [true,  2, 1, false],

      [false, 0.1, 1,   true],
      [false, 0.1, 1,   false],
      [true,  1,   0.1, true],
      [true,  1,   0.1, false],
  ];

    for (const suite of suites) {
      const result1 = Validator.minNumber(suite[1], suite[2], suite[3]);
      expect(result1).toBe(suite[0]);

      if (suite[3]) {
        const result2 = Validator.minNumber(suite[1], suite[2]);
        expect(result2).toBe(suite[0]);
      }
    }
  });

  test('[NG] max number value test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxNumber(suite, 0);
      expect(result).toBe(false);
    }
  });

  test('[NG] max number gt test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxNumber(100, 0, suite);
      expect(result).toBe(false);
    }
  });

  test('[OK] max number test', () => {
    const suites = [
    //[expect, val, limit, gt]
      [true,  0, 1, true],
      [true,  0, 1, false],
      [true,  1, 1, true],
      [false, 1, 1, false],
      [false, 2, 1, true],
      [false, 2, 1, false],

      [true,  0.1, 1,   true],
      [true,  0.1, 1,   false],
      [false, 1,   0.1, true],
      [false, 1,   0.1, false],
  ];

    for (const suite of suites) {
      const result1 = Validator.maxNumber(suite[1], suite[2], suite[3]);
      expect(result1).toBe(suite[0]);

      if (suite[3]) {
        const result2 = Validator.maxNumber(suite[1], suite[2]);
        expect(result2).toBe(suite[0]);
      }
    }
  });

  test('[OK] between number test', () => {
    const suitesTrue = [
      //[expect, val, min, max, gt, lt]
      [true,  1, 0, 2, true, true],
      [false, 1, 2, 0, true, true],
    ];

    const suitesMix = [
    //[expect, val, min, max, gt, lt]
      [true,  1, 0, 2, true, true],
      [false, 1, 2, 0, true, true],

      [true,  0, 0, 0, true,  true],
      [false, 0, 0, 0, true,  false],
      [false, 0, 0, 0, false, true],
      [false, 0, 0, 0, false, false],
    ];

    for (const suite of TestTools.arrayMerge([suitesTrue, suitesMix])) {
      const result1 = Validator.betweenNumber(suite[1], suite[2], suite[3], suite[4], suite[5]);
      expect(result1).toBe(suite[0]);

      if (suite[4] && suite[5]) {
        const result2 = Validator.betweenNumber(suite[1], suite[2], suite[3]);
        expect(result2).toBe(suite[0]);
      }
    }
  });
});

describe('validate string', () => {
  test('[OK] is string test', () => {
    const suitesTrue = TestTools.insertExpectInPatterns(true, TestTools.arrayMerge([
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
    ]));

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suitesTrue, suitesFalse])) {
      const result = Validator.isString(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[OK] is integer on string test', () => {
    const suitesTrue = TestTools.insertExpectInPatterns(true, TestTools.arrayMerge([
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA,
    ]));

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suitesTrue, suitesFalse])) {
      const result = Validator.isIntegerOnString(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[OK] is number on string test', () => {
    const suitesTrue = TestTools.insertExpectInPatterns(true, TestTools.arrayMerge([
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT,
    ]));

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suitesTrue, suitesFalse])) {
      const result = Validator.isNumberOnString(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[OK] is japanese only pattern test', () => {
    const suites = [
      //[expect, value]
        [false, ''],
        [false, 'abc'],
        [false, 'aあbいc'],
        [false, 'aあb胃c'],

        [true, 'あいう'],
        [true, '亜胃兎'],
      ];

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suites, suitesFalse])) {
      const result = Validator.isJapanese(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[OK] is email pattern test', () => {
    const suites = [
    //[expect, value]
      [false, ''],
      [false, 'aaa'],
      [false, 'aaa@'],
      [false, 'aaa@にほんご.net'],
      [false, 'aaa@hogehoge$test.net'],

      [true, 'aaaaa@test.net'],
      [true, 'aaaaa@test.test.net'],
    ];

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suites, suitesFalse])) {
      const result = Validator.isEmail(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[OK] is url pattern test', () => {
    const suites = [
    //[expect, value]
      [false, ''],
      [false, 'aaa'],
      [false, 'http:/aaa'],
      [false, 'ftp://aaa.com'],

      [true, 'http://localhost'],
      [true, 'http://wodifes.net'],
      [true, 'http://wodifes.net?page=1'],
      [true, 'https://nononotyaya.net'],
      [true, 'https://nononotyaya.net#anchor'],
    ];

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suites, suitesFalse])) {
      const result = Validator.isUrl(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[NG] min length value test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minLength(suite, 1);
      expect(result).toBe(false);
    }
  });

  test('[NG] min length limit test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minLength('dummy', suite);
      expect(result).toBe(false);
    }
  });

  test('[NG] min length gt test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minLength('dummy', 10, suite);
      expect(result).toBe(false);
    }
  });

  test('[OK] min length test', () => {
    const suites = [
    //[expect, value, limit, gt]
      [false, 'tes',   4, true],
      [false, 'tes',   4, false],
      [true,  'test',  4, true],
      [false, 'test',  4, false],
      [true,  'testt', 4, true],
      [true,  'testt', 4, false],

      [true,  '', 0, true],
      [false, '', 0, false],

      [false, 'test', -1, true],
      [false, 'test', -1, false],
    ];

    for (const suite of suites) {
      const result = Validator.minLength(suite[1], suite[2], suite[3]);
      expect(result).toBe(suite[0]);

      if (suite[3]) {
        const result = Validator.minLength(suite[1], suite[2]);
        expect(result).toBe(suite[0]);
      }
    }
  });

  test('[NG] max length value test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxLength(suite, 1);
      expect(result).toBe(false);
    }
  });

  test('[NG] max length limit test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxLength('dummy', suite);
      expect(result).toBe(false);
    }
  });

  test('[NG] max length lt test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxLength('dummy', 10, suite);
      expect(result).toBe(false);
    }
  });

  test('[OK] max length test', () => {
    const suites = [
    //[expect, value, limit, gt]
      [true,  'tes',   4, true],
      [true,  'tes',   4, false],
      [true,  'test',  4, true],
      [false, 'test',  4, false],
      [false, 'testt', 4, true],
      [false, 'testt', 4, false],

      [true,  '', 0, true],
      [false, '', 0, false],

      [false, 'test', -1, true],
      [false, 'test', -1, false],
    ];

    for (const suite of suites) {
      const result1 = Validator.maxLength(suite[1], suite[2], suite[3]);
      expect(result1).toBe(suite[0]);

      if (suite[3]) {
        const result2 = Validator.maxLength(suite[1], suite[2]);
        expect(result2).toBe(suite[0]);
      }
    }
  });

  test('[OK] between length test', () => {
    const suitesTrue = [
    //[expect, value, min, max, gt, lt]
      [false, 'te',     3, 5, true, true],
      [true,  'tes',    3, 5, true, true],
      [true,  'test',   3, 5, true, true],
      [true,  'testt',  3, 5, true, true],
      [false, 'testte', 3, 5, true, true],
    ];

    const suitesFalse = [
    //[expect, value, min, max, gt, lt]
      [false, 'te',     3, 5, false, false],
      [false, 'tes',    3, 5, false, false],
      [true,  'test',   3, 5, false, false],
      [false, 'testt',  3, 5, false, false],
      [false, 'testte', 3, 5, false, false],
    ];

    for (const suite of suitesTrue.concat(suitesFalse)) {
      const result = Validator.betweenLength(suite[1], suite[2], suite[3], suite[4], suite[5]);
      expect(result).toBe(suite[0]);
    }

    for (const suite of suitesTrue) {
      const result = Validator.betweenLength(suite[1], suite[2], suite[3]);
      expect(result).toBe(suite[0]);
    }
  });
});

describe('validate boolean', () => {
  test('is boolean test', () => {
    const suitesTrue = TestTools.insertExpectInPatterns(true, TestTools.arrayMerge([
      TestParams.BOOLEAN,
    ]));

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suitesTrue, suitesFalse])) {
      const result = Validator.isBoolean(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });
});

describe('validate array', () => {
  test('[OK] is array test', () => {
    const suitesTrue = TestTools.insertExpectInPatterns(true, TestTools.arrayMerge([
      TestParams.ARRAY, TestParams.ARRAY_EMPTY,
    ]));

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.OBJECT, TestParams.OBJECT_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suitesTrue, suitesFalse])) {
      const result = Validator.isArray(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[NG] min array length value test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.OBJECT, TestParams.OBJECT_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minArrayLength(suite, 10);
      expect(result).toBe(false);
    }
  });

  test('[NG] min array length limit test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minArrayLength([0, 1, 2], suite);
      expect(result).toBe(false);
    }
  });

  test('[NG] min array length gt test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minArrayLength([0, 1, 2], 10, suite);
      expect(result).toBe(false);
    }
  });

  test('[OK] min array length test', () => {
    const suites = [
    //[expect, value, limit, gt]
      [false, [0, 1],       3, true],
      [false, [0, 1],       3, false],
      [true,  [0, 1, 2],    3, true],
      [false, [0, 1, 2],    3, false],
      [true,  [0, 1, 2, 3], 3, true],
      [true,  [0, 1, 2, 3], 3, false],

      [true,  [], 0, true],
      [false, [], 0, false],

      [false, [1, 2, 3], -1, true],
      [false, [1, 2, 3], -1, false],
    ];

    for (const suite of suites) {
      const result1 = Validator.minArrayLength(suite[1], suite[2], suite[3]);
      expect(result1).toBe(suite[0]);

      if (suite[3]) {
        const result2 = Validator.minArrayLength(suite[1], suite[2]);
        expect(result2).toBe(suite[0]);
      }
    }
  });

  test('[NG] max array length value test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.OBJECT, TestParams.OBJECT_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ]);


    for (const suite of suites) {
      const result = Validator.maxArrayLength(suite, 10);
      expect(result).toBe(false);
    }
  });

  test('[NG] max array length limit test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxArrayLength([0, 1, 2], suite);
      expect(result).toBe(false);
    }
  });

  test('[NG] max array length lt test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxArrayLength([0, 1, 2], 10, suite);
      expect(result).toBe(false);
    }
  });

  test('[OK] max array length test', () => {
    const suites = [
    //[expect, value, limit, gt]
      [true,  [0, 1],       3, true],
      [true,  [0, 1],       3, false],
      [true,  [0, 1, 2],    3, true],
      [false, [0, 1, 2],    3, false],
      [false, [0, 1, 2, 3], 3, true],
      [false, [0, 1, 2, 3], 3, false],

      [true,  [], 0, true],
      [false, [], 0, false],

      [false, [1, 2, 3], -1, true],
      [false, [1, 2, 3], -1, false],
    ];

    for (const suite of suites) {
      const result1 = Validator.maxArrayLength(suite[1], suite[2], suite[3]);
      expect(result1).toBe(suite[0]);

      if (suite[3]) {
        const result2 = Validator.maxArrayLength(suite[1], suite[2]);
        expect(result2).toBe(suite[0]);
      }
    }
  });

  test('[OK] between array length test', () => {
    const max = 3;
    const min = 5;
    const thanPattern = [
      [true,  true], [true,  false],
      [false, true], [false, false],
    ];

    const suites = [
    //[expect, ...]
      [false, false, false, false],  // [0]
      [false, false, false, false],  // [0, 1]
      [true,  true,  false, false],  // [0, 1, 2]
      [true,  true,  true,  true],   // [0, 1, 2, 3]
      [true,  false, true,  false],  // [0, 1, 2, 3, 4]
      [false, false, false, false],  // [0, 1, 2, 3, 4, 5]
    ];

    let array = [];
    for (const suite of suites) {
      array.push(0);

      for (let i = 0; i < thanPattern.length; i++) {
        const result1 = Validator.betweenArrayLength(array, max, min, thanPattern[i][0], thanPattern[i][1]);
        expect(result1).toBe(suite[i]);

        if (thanPattern[i][0] && thanPattern[i][1]) {
          const result1 = Validator.betweenArrayLength(array, max, min);
          expect(result1).toBe(suite[i]);
        }
      }
    }
  });

  test('[NG] in array array test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.OBJECT, TestParams.OBJECT_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.inArray('hoge', suite);
      expect(result).toBe(false);
    }
  });

  test('[NG] in array fromIndex test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.inArray('hoge', ['hoge'], suite);
      expect(result).toBe(false);
    }
  });

  test('[OK] in array test', () => {
    const suites = [
    //[expect(number), expect(boolean), value, array]
      [1,  true,  1,      [0, 1, 2]],
      [-1, false, 1,      [0, 2, 3]],
      [0,  true,  'hoge', ['hoge', 'fuga', 'piyo']],
    ];

    for (const suite of suites) {
      const result1 = Validator.inArray(suite[2], suite[3], true);
      const result2 = Validator.inArray(suite[2], suite[3], false);
      expect(result1).toBe(suite[0]);
      expect(result2).toBe(suite[1]);
    }
  });
});

describe('validate object', () => {
  test('[OK] is object test', () => {
    const suitesTrue = TestTools.insertExpectInPatterns(true, TestTools.arrayMerge([
      TestParams.OBJECT, TestParams.OBJECT_EMPTY,
    ]));

    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ]));

    for (const suite of TestTools.arrayMerge([suitesTrue, suitesFalse])) {
      const result = Validator.isObject(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[NG] has key in object object test', () => {
    const suites = [
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ];

    for (const suite of suites) {
      const result = Validator.hasKeyInObject(suite, 'hoge');
      expect(result).toBe(false);
    }
  });

  test('[NG] has key in object key test', () => {
    const suites = [
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ];

    for (const suite of suites) {
      const result = Validator.hasKeyInObject({}, suite);
      expect(result).toBe(false);
    }
  });

  test('[OK] has key in object test', () => {
    const suites = [
    //[expect, obj, key]
      [false, {},                          'fuga'],
      [false, {hoge: 1},                   'fuga'],
      [true,  {hoge: 1, fuga: 2},          'fuga'],
      [true,  {hoge: 1, fuga: 2, piyo: 3}, 'fuga'],
    ];

    for (const suite of suites) {
      const result = Validator.hasKeyInObject(suite[1], suite[2]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[NG] min object length value test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minObjectLength(suite, 10);
      expect(result).toBe(false);
    }
  });

  test('[NG] min object length limit test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minObjectLength({hoge: 1, fuga: 2}, suite);
      expect(result).toBe(false);
    }
  });

  test('[NG] min object length gt test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.minObjectLength({hoge: 1, fuga: 2}, 10, suite);
      expect(result).toBe(false);
    }
  });

  test('[OK] min object length test', () => {
    const obj2 = {hoge: 0, fuga: 1};
    const obj3 = {hoge: 0, fuga: 1, piyo: 2};
    const obj4 = {hoge: 0, fuga: 1, piyo: 2, bar: 3};

    const suites = [
    //[expect, value, limit, gt]
      [false, obj2, 3, true],
      [false, obj2, 3, false],
      [true,  obj3, 3, true],
      [false, obj3, 3, false],
      [true,  obj4, 3, true],
      [true,  obj4, 3, false],

      [true,  {}, 0, true],
      [false, {}, 0, false],

      [false, obj3, -1, true],
      [false, obj3, -1, false],
    ];

    for (const suite of suites) {
      const result1 = Validator.minObjectLength(suite[1], suite[2], suite[3]);
      expect(result1).toBe(suite[0]);

      if (suite[3]) {
        const result2 = Validator.minObjectLength(suite[1], suite[2]);
        expect(result2).toBe(suite[0]);
      }
    }
  });

  test('[NG] max object length value test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxObjectLength(suite, 10);
      expect(result).toBe(false);
    }
  });

  test('[NG] max object length limit test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxObjectLength({hoge:1, fuga: 2}, suite);
      expect(result).toBe(false);
    }
  });

  test('[NG] max object length lt test', () => {
    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY,
      TestParams.NULL,
    ]);

    for (const suite of suites) {
      const result = Validator.maxObjectLength({hoge:1, fuga: 2}, 10, suite);
      expect(result).toBe(false);
    }
  });

  test('[OK] max object length test', () => {
    const obj2 = {hoge: 0, fuga: 1};
    const obj3 = {hoge: 0, fuga: 1, piyo: 2};
    const obj4 = {hoge: 0, fuga: 1, piyo: 2, bar: 3};

    const suites = [
    //[expect, value, limit, gt]
      [true,  obj2, 3, true],
      [true,  obj2, 3, false],
      [true,  obj3, 3, true],
      [false, obj3, 3, false],
      [false, obj4, 3, true],
      [false, obj4, 3, false],

      [true,  {}, 0, true],
      [false, {}, 0, false],

      [false, obj3, -1, true],
      [false, obj3, -1, false],
    ];

    for (const suite of suites) {
      const result1 = Validator.maxObjectLength(suite[1], suite[2], suite[3]);
      expect(result1).toBe(suite[0]);

      if (suite[3]) {
        const result2 = Validator.maxObjectLength(suite[1], suite[2]);
        expect(result2).toBe(suite[0]);
      }
    }
  });

  test('[OK] between object length test', () => {
    const max = 3;
    const min = 5;
    const thanPattern = [
      [true,  true], [true,  false],
      [false, true], [false, false],
    ];

    const suites = [
    //[expect, ...]
      [false, false, false, false],  // [0]
      [false, false, false, false],  // [0, 1]
      [true,  true,  false, false],  // [0, 1, 2]
      [true,  true,  true,  true],   // [0, 1, 2, 3]
      [true,  false, true,  false],  // [0, 1, 2, 3, 4]
      [false, false, false, false],  // [0, 1, 2, 3, 4, 5]
    ];

    let obj = {};
    let index = 0;
    for (const suite of suites) {
      obj[`key${index}`] = index;

      for (let i = 0; i < thanPattern.length; i++) {
        const result1 = Validator.betweenObjectLength(obj, max, min, thanPattern[i][0], thanPattern[i][1]);
        expect(result1).toBe(suite[i]);

        if (thanPattern[i][0] && thanPattern[i][1]) {
          const result1 = Validator.betweenObjectLength(obj, max, min);
          expect(result1).toBe(suite[i]);
        }
      }

      index++;
    }
  });
});

describe('inner methods', () => {
  // test('[OK] is not null test', () => {
  //   const suitesTrue = TestTools.insertExpectInPatterns(true, TestTools.arrayMerge([
  //     TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
  //     TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
  //     TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.OBJECT, TestParams.OBJECT_EMPTY, TestParams.BOOLEAN,
  //   ]));

  //   const suitesFalse = TestTools.insertExpectInPatterns(false, [null, '']);

  //   for (const suite of TestTools.arrayMerge([suitesTrue, suitesFalse])) {
  //     const result = Validator.isNotNull(suite[1]);
  //     expect(result).toBe(suite[0]);
  //   }
  // });

  test('[OK] check nullable', () => {
    const suitesFalse = TestTools.insertExpectInPatterns(false, TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.ARRAY, TestParams.ARRAY_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ]));

    const suites = [
    //[expect, rule]
      [false, {key: 'hogehoge'}],
      [false, {}],

      [false, {nullable: 1}],
      [false, {nullable: 'hoge'}],

      [false, {nullable: false}],
      [true,  {nullable: true}],
    ];

    for (const suite of TestTools.arrayMerge([suites, suitesFalse])) {
      const result = Validator._checkNullable(suite[1]);
      expect(result).toBe(suite[0]);
    }
  });

  test('[OK] set error', () => {
    const suites = [
    //[expect, err, key, msg]
      [{hoge: ['']},                 {},           'hoge', ''],
      [{hoge: [''], fuga: ['hoge']}, {hoge: ['']}, 'fuga', 'hoge'],
      [{hoge: ['', 'hoge']},         {hoge: ['']}, 'hoge', 'hoge'],
    ];

    for (const suite of suites) {
      const result = Validator._setError(suite[1], suite[2], suite[3]);
      expect(result).toEqual(suite[0]);
    }
  });

  test('[NG] callback execute returns is not array', () => {
    const v = new Validator();

    const suites = TestTools.arrayMerge([
      TestParams.INT, TestParams.INT_COMMA, TestParams.FLOAT,
      TestParams.STRING_INT, TestParams.STRING_INT_COMMA, TestParams.STRING_FLOAT, TestParams.STRING_WORD,
      TestParams.OBJECT, TestParams.OBJECT_EMPTY, TestParams.BOOLEAN, TestParams.NULL,
    ]);

    for (const suite of suites) {
      const rule = {
        type: 'callback', callback: () => suite,
      };

      const result = v._callbackExec(rule, 'hoge', 'aaa', {});
      expect({hoge: ['function return type is not array']}).toEqual(result);
    }
  });

  test('[OK] callback execute', () => {
    const v = new Validator();

    const suites = [
    //[expect(err), rule, key, value, err]
      [{},                                    {type: 'callback', callback: () => []},           'hoge', 1, {}],
      [{hoge: ['hogehoge']},                  {type: 'callback', callback: () => ['hogehoge']}, 'hoge', 1, {}],
      [{hoge: ['not set callback function']}, {type: 'callback'},                               'hoge', 1, {}],
    ];

    for (const suite of suites) {
      const result = v._callbackExec(suite[1], suite[2], suite[3], suite[4]);
      expect(result).toEqual(suite[0]);
    }
  });

  test('[OK] get min error message', () => {
    const suites = [
    //[expect, expect(noname), value, limit, name]
      ['hogeは10文字以上にしてください', '10文字以上にしてください', 'aaa',    10, 'hoge'],
      ['fugaは10以上にしてください',     '10以上にしてください',     1,        10, 'fuga'],
      ['piyoは10要素以上にしてください', '10要素以上にしてください', [1],      10, 'piyo'],
      ['piyoは10要素以上にしてください', '10要素以上にしてください', {hoge:1}, 10, 'piyo'],
      ['hogeは真偽値です',               '真偽値です',               true,     10, 'hoge'],
      ['',                               '',                         null,     10, 'bar'],
    ];

    for (const suite of suites) {
      const result1 = Validator._getMinErrorMsg(suite[2], suite[3], suite[4]);
      expect(result1).toEqual(suite[0]);
      const result2 = Validator._getMinErrorMsg(suite[2], suite[3]);
      expect(result2).toEqual(suite[1]);
    }
  });

  test('[OK] get max error message', () => {
    const suites = [
    //[expect, expect(noname), value, limit, name]
      ['hogeは10文字以内にしてください', '10文字以内にしてください', 'aaa',    10, 'hoge'],
      ['fugaは10以下にしてください',     '10以下にしてください',    1,        10, 'fuga'],
      ['piyoは10要素以下にしてください', '10要素以下にしてください', [1],      10, 'piyo'],
      ['piyoは10要素以下にしてください', '10要素以下にしてください', {hoge:1}, 10, 'piyo'],
      ['hogeは真偽値です',               '真偽値です',               true,     10, 'hoge'],
      ['',                               '',                         null,     10, 'bar'],
    ];

    for (const suite of suites) {
      const result1 = Validator._getMaxErrorMsg(suite[2], suite[3], suite[4]);
      expect(result1).toEqual(suite[0]);
      const result2 = Validator._getMaxErrorMsg(suite[2], suite[3]);
      expect(result2).toEqual(suite[1]);
    }
  });
});

describe('validate callback', () => {
  test('[OK] use callback function test', () => {
    // 文字列がaaaかどうかを判定する
    const func = (val) => {
      if (!Validator.isString(val)) {
        return false;
      }
      return val.match(/^aaa$/) !== null;
    };

    const suites = [
    //[expect, value]
      [false, 'aaaa'],
      [true,  'aaa'],
    ];

    for (const suite of suites) {
      const result = Validator.callback(func, [suite[1]]);
      expect(result).toBe(suite[0]);
    }
  });
});

describe('integration', () => {
  test('exec and errors test', () => {
    // callback用バリデーション. Validatorインスタンスかどうかを返す
    const func = (val, name) => {
      const ret = [];
      if (!(val instanceof Validator)) {
        ret.push(`${name}はValidatorインスタンスではありません`);
      }
      return ret;
    };

    const suites = [
    //[expect(exec), expect(errors), data, rules]
      [false, {num: ['numがありません']},           {hoge: ''},  {num: {type: 'number'}}],
      [false, {num: ['numberがありません']},        {hoge: ''},  {num: {name: 'number', type: 'number'}}],
      [false, {str: ['strの型が不正です']},         {str: [10]}, {str: {type: 'string'}}],
      [false, {str: ['mojiの型が不正です']},        {str: [10]}, {str: {name: 'moji', type: 'string'}}],

      [false, {num: ['numは10以上にしてください']}, {num: 9},   {num: {type: 'number', min: 10}}],
      [true,  {},                                   {num: 10},  {num: {type: 'number', min: 10}}],
      [true,  {},                                   {num: 10},  {num: {type: 'int', min: 10}}],
      [true,  {},                                   {num: 10},  {num: {type: 'integer', min: 10}}],
      [true,  {},                                   {},         {num: {type: 'integer', min: 10, nullable: true}}],

      [false, {num: ['numは10以下にしてください']}, {num: 11},   {num: {type: 'number', max: 10}}],
      [true,  {},                                   {num: 10},  {num: {type: 'number', max: 10}}],
      [true,  {},                                   {num: 10},  {num: {type: 'int', max: 10}}],
      [true,  {},                                   {num: 10},  {num: {type: 'integer', max: 10}}],
      [true,  {},                                   {},         {num: {type: 'integer', max: 10, nullable: true}}],

      [false, {str: ['正しい形式で入力してください']}, {str: 'hoge'},                  {str: {type: 'string', pattern: 'japanese'}}],
      [false, {str: ['正しい形式で入力してください']}, {str: 'hoge'},                  {str: {type: 'string', pattern: 'email'}}],
      [false, {str: ['正しい形式で入力してください']}, {str: 'hoge'},                  {str: {type: 'string', pattern: 'url'}}],
      [true,  {},                                      {str: 'あああ'},                {str: {type: 'string', min: 2, max: 5, pattern: 'japanese'}}],
      [true,  {},                                      {str: 'nononotyaya@gmail.com'}, {str: {type: 'string', min: 10, max: 30, pattern: 'email'}}],
      [true,  {},                                      {str: 'https://wodifes.net'},   {str: {type: 'string', min: 10, max: 20, pattern: 'url'}}],

      [true,  {},                                            {arg: '11.000'}, {arg: {type: 'numstring', min: 5, max: 10}}],
      [true,  {},                                            {arg: '110000'}, {arg: {type: 'intstring', min: 5, max: 10}}],

      [false, {arg: ['argは真偽値です', 'argは真偽値です']}, {arg: true},     {arg: {type: 'bool',    min: 5, max: 10}}],
      [false, {arg: ['argは真偽値です', 'argは真偽値です']}, {arg: true},     {arg: {type: 'boolean', min: 5, max: 10}}],

      [true, {}, {arg: ['a', 'b', 'c']},    {arg: {type: 'array', min: 2, max: 4}}],
      [true, {}, {arg: {a: 1, b: 2, c: 3}}, {arg: {type: 'object', min: 2, max: 4}}],

      [true,  {},                                              {v: (new Validator())}, {v: {type: 'callback', callback: func}}],
      [false, {v: ['vはValidatorインスタンスではありません']}, {v: 'hoge'},            {v: {type: 'callback', callback: func}}],
      [false, {v: ['not set callback function']},              {v: 'hoge'},            {v: {type: 'callback'}}],
    ];

    for (const suite of suites) {
      const v = (new Validator()).rules(suite[2], suite[3]);
      expect(v instanceof Validator).toBe(true);
      expect(v.exec()).toBe(suite[0]);
      expect(v.errors()).toEqual(suite[1]);
    }
  });
});
