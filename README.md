- [HTML](#html)
  - [OGPテンプレート](#ogp%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88)
  - [Faviconテンプレート](#favicon%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88)
  - [Googleフォントの最適化](#google%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E3%81%AE%E6%9C%80%E9%81%A9%E5%8C%96)
- [Image](#image)
- [CSS](#css)
  - [styled-components](#styled-components)
  - [reset.css](#resetcss)
- [React](#react)
  - [Alias](#alias)
     - [Aliasを追加する場合](#alias%E3%82%92%E8%BF%BD%E5%8A%A0%E3%81%99%E3%82%8B%E5%A0%B4%E5%90%88)
  - [Babel](#babel)
     - [ブラウザのカバー範囲](#%E3%83%96%E3%83%A9%E3%82%A6%E3%82%B6%E3%81%AE%E3%82%AB%E3%83%90%E3%83%BC%E7%AF%84%E5%9B%B2)
     - [対応している構文](#%E5%AF%BE%E5%BF%9C%E3%81%97%E3%81%A6%E3%81%84%E3%82%8B%E6%A7%8B%E6%96%87)
- [WIP: Webpackの設定](#wip-webpack%E3%81%AE%E8%A8%AD%E5%AE%9A)
- [WIP: テストツール（Jest + Enzyme）](#wip-%E3%83%86%E3%82%B9%E3%83%88%E3%83%84%E3%83%BC%E3%83%ABjest--enzyme)
- [WIP: フォーマッター](#wip-%E3%83%95%E3%82%A9%E3%83%BC%E3%83%9E%E3%83%83%E3%82%BF%E3%83%BC)

## HTML

`public/index.html`

### OGPテンプレート

- OGP
- Twitter
- Facebook

### Faviconテンプレート

[favicon generator](https://www.favicon-generator.org/)で生成されたファイルを使用することを想定しています

**手順**

1. [favicon generator](https://www.favicon-generator.org/)でfaviconを生成する
2. zipファイルを解凍したディレクトリをfaviconに名前を変更し、publicディレクトリに入れる

### Googleフォントの最適化

Noto Sana JPに最適化されています

別のGoogleフォントを使いたい場合は、書き換えが必要

## Image

`public/static/img/`以下の画像ファイルには次のようにアクセス出来ます。

```html
<img src="static/img/sample.jpg" alt="sample"/>
```

`src/`以下の画像ファイルには次のようにアクセス出来ます。

```typescript
import logo from "./logo.png"

export const Logo = () => {
  return (
  	<img src={logo} alt="logo"/> 
  )
}
```

> `typings/Image.d.ts`に記載されていない拡張子をimportをした場合、エラーが出ますが、`typings/Image.d.ts`へ追加すればほぼ問題ないはずです。それでもエラーが出る場合は、webpackの`url-loader`の部分を確認してください。

## CSS

このテンプレートでは、なるべくCSS in JSを使用することを想定しています。CSSやSCSS、PostCSSを主体的に使いたい場合はwebpackの書き換えを行う必要があるかもしれません。

### styled-components

問題なく扱えるはずです。

### reset.css

ress及びmodern-reset.cssを参考にmatsuri-ui用にカスタマイズしました。

## React

Typescriptを利用することを想定しています

### Alias

`@`で`src/`にアクセス出来ます

#### Aliasを追加する場合

aliasを追加する場合、以下の3つの書き換えが必要です。

また追加する場合はチームで必ず共有してからにしてください。

- [ ] webpack.config.je

- [ ] jest.config.js
- [ ] tsconfig.js

### Babel

eslintに記述されたecmaVersionの範疇を超える構文を扱えるようにするpluginを追加した場合は、eslintとbabel間で矛盾が発生します。eslintのparserにbabel-eslintを追加してください。

#### ブラウザのカバー範囲

\> 0.1% in JP, not IE < 11, not op_mini all

<https://browserl.ist/?q=%3E0.1%25+in+JP%2C+not+IE+%3C+11%2C+not+op_mini+all>

#### 対応している構文

- グローバル変数を使用して、各ファイルに共通のコード出力を1つにまとめることによって、重複するコード出力を減らす

- styled-componntnsのclassNamesに環境間で一貫されたハッシュを行う

- object rest spread `{...objects}`のサポート

- 動的インポート`import(path/)`のサポート

- classプロパティ`class A{ someProperty = "" }`のサポート

- async/awaitのサポート

## WIP: Webpackの設定

- [ ] split chunks

- [x] runtime chunk
- [x] aggressive merging
- [x] production mode 
- [x] split entrypoint
- [x] code splitting
- [x] dotenv 

## WIP: テストツール（Jest + Enzyme）

## WIP: フォーマッター

- editorconfig
- prettier
- eslint
- eslint-typescript
