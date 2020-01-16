# React Typescript Template


このテンプレートは以下のエコシステムに依存しています。分からないものがあれば、まず目を通してください。

- [npm](https://docs.npmjs.com/files/package.json) - package.jsonが分からない場合はこれを見てください。
- [Yarn](https://yarnpkg.com/ja/docs/getting-started)
- [React](https://reactjs.org/docs/getting-started.html)
- [Redux](https://redux.js.org/introduction/getting-started)
- [Typescript](http://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [styled-components](https://styled-components.com/docs/basics#getting-started)
- [Webpack](https://webpack.js.org/guides/getting-started/)
- [dotenv](https://github.com/motdotla/dotenv)
- [ESLint](https://eslint.org/docs/user-guide/getting-started)
- [VSCode](https://code.visualstudio.com/docs/getstarted/introvideos)

## React

### Global React

```tsx
// import * as React from "react" // 不要
const App =  () => {
  <div>Hello, World</div>
}
```

### Redux types

`useDispatch`及び`useSelector`の型定義を拡張しています。

`useDispatch<Dispatch>`はジェネリクスを指定しない場合、`/redux/actions`以下から型が推論されます。

`useSelector<Selected, State>`の`State`には、
自動で`/redux/reducers`の`rootReducer`から得られる`Store`の型が入ります。

また`useSelector`で用いられる`Store`の型は`react-redux`からインポートが可能です。

> 通常の`useSelector`と`Selected`と`State`の順番が逆であることに注意してください。

> また`useDispatch`と`useSelector`は`Store`が１つであることを前提としています。
> これは複数の`Store`が存在する場合、`Store`の型は一意に決まらないためです。

さらにreduxの型ヘルパーとして`StateType<Reducer>`と`ActionType<ActionCreators>`を用意しています。

## Dotenv, process.env

`.env`ファイル、`.env.production`ファイルを編集することで、`process.env`を拡張できます。
`.env.production`ファイルは`NODE_ENV`またはwebpackの`mode`が`production`であるときのみ読み込まれ、`.env`に記述された内容を上書きします。

### ProcessEnvの強い型定義

ProcessEnvに値を追加し補完を効かせたい場合は`src/global.d.ts`を直接編集してください。

```tsx
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test"
        [key: string]: string
        /**
         * process.envを利用するときは以下に追記する
         */
    }
}
```

## HTML

`public/index.html`

デフォルトでは検索エンジンに乗らないようになっています。公開するサービスを作成する場合は以下の行を決してください。

```html
<meta name="robots" content="noindex,nofollow" />
```

### OGPテンプレート

> 不要な場合は決してください。

一般的なOGP、Twitter OGP、Facebook OGPに対応しています。

`title`、`description`、`homepage`はpackage.jsonから設定できます。

ただしOGP画像は`public/index.html`を直接編集してください。

> OGP画像は絶対パスで指定する必要があります。

### Faviconテンプレート

[favicon generator](https://www.favicon-generator.org/)で生成されたファイルを使用することを想定しています

**手順**

1. [favicon generator](https://www.favicon-generator.org/)でfaviconを生成する
2. zipファイルを解凍したディレクトリをfaviconに名前を変更し、publicディレクトリに入れる

### Googleフォントの最適化

Noto Sana JPに最適化されています

別のGoogleフォントを使いたい場合は、`public/index.html`を見て良しなに書き換えてください。

Googleフォントを使用しない場合は無駄なコストになるので、コメントアウトするか消してください。

## Markdown

markdownファイルを単なる文字列としてimportすることができます。

```typescript
import note from "./readme.md"
import marked from "marked"

export default () => (
    <div dangerouslySetInnerHtml={marked(note)}/>
)
```

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

画像の`import`がエラーを返す場合は`src/global.d.ts`の次の箇所

```typescript
/**
 * Images
 */
declare module "*.png"
declare module "*.jpg"
declare module "*.svg"
```

を参考に足りない拡張子を追記してください。

### Alias

`@/`で`src/`にアクセス出来ます

#### Aliasを追加する場合

aliasを追加する場合、以下の3つの書き換えが必要です。

また追加する場合は`Alias`の項目に追記してください。

- [ ] webpack.config.je

- [ ] jest.config.js
- [ ] tsconfig.js

### Babel

eslintに記述されたecmaVersionの範疇を超える構文を扱えるようにするpluginを追加した場合は、eslintとbabel間で矛盾が発生します。eslintのparserにbabel-eslintを追加してください。

