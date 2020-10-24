# nonono-validator

日本語でバリデーションできるやつ。

## インストール

```bash
# npm
npm install --save irokaru/nonono-validator

# yarn
yarn add -D irokaru/nonono-validator
```

## 使い方

```javascript
import Validator from 'nonono-validator';

const v = new Validator();

// バリデーションされるデータ
const data = {
  num: 10,
  str: 'hogehoge',
};

// バリデーションのルール
const rules = {
  num: {
    // numは数字という名前で数値型で0以上10以下である
    type: 'number', name: '数字', min: 0, max: 10,
  },
  str: {
    // strは文字列という名前で文字列型で10文字以上12文字以下である
    type: 'string', name: '文字列', min: 10, max: 12,
  },
};

v.rules(data, rules);

if (v.exec()) {
  console.log('正しいデータです');
} else {
  console.log('誤ったデータです');
}

console.log('エラー内容', v.errors());

```

## ルール

### type

入力値の型をチェックします。

| 名前 | 型 |
| ---- | ---- |
| number | 数字 |
| int | 整数 |
| integer | 整数 |
| string | 文字列 |
| numstring | 文字列数字 |
| intstring | 文字列整数 |
| bool | ブーリアン型 |
| boolean | ブーリアン型 |
| array | 配列 |
| object | オブジェクト |
| callback | 自作バリデーション |

### name

キーの代替名を設定します。エラーの結果に反映されます。

### min

入力値の下限値をチェックします。

### max

入力値の上限値をチェックします。

### pattern

文字列のパターンをチェックします。

| 名前 | パターン |
| ---- | ---- |
| japanese | 日本語のみ |
| email | Eメール |
| url | URL |

### nullable

値が入っていなくてもよくなります。

```javascript
const rules = {
  hoge: {
    nullable: true,
  }
};
```
### callback

コールバックを利用して自作バリデーションの設定ができます。

```javascript
const rules = {
  test: {
    type: 'callback', callback: testValidator,
  },
};

const testValidator = (val) => {
  const err = [];
  if (!Validator.isObject(val) || toString.call(val) !== '[object File]') {
    err.push(`Fileクラスのインスタンスではありません`);
  }
  return err;
};
```
