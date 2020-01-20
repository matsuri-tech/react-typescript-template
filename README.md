- [React Typescript Template](#react-typescript-template)
  - [React](#react)
    - [Global React](#global-react)
    - [Redux types](#redux-types)
  - [Dotenv, process.env](#dotenv-processenv)
    - [ProcessEnvの型](#processenv%e3%81%ae%e5%9e%8b)
  - [HTML](#html)
    - [OGPテンプレート](#ogp%e3%83%86%e3%83%b3%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88)
    - [Faviconテンプレート](#favicon%e3%83%86%e3%83%b3%e3%83%97%e3%83%ac%e3%83%bc%e3%83%88)
    - [Googleフォントの最適化](#google%e3%83%95%e3%82%a9%e3%83%b3%e3%83%88%e3%81%ae%e6%9c%80%e9%81%a9%e5%8c%96)
  - [Markdown](#markdown)
  - [Image](#image)
  - [Alias, Aliasの追加](#alias-alias%e3%81%ae%e8%bf%bd%e5%8a%a0)
  - [構文の新規サポート](#%e6%a7%8b%e6%96%87%e3%81%ae%e6%96%b0%e8%a6%8f%e3%82%b5%e3%83%9d%e3%83%bc%e3%83%88)
  - [Netlify](#netlify)
    - [Netlifyの設定](#netlify%e3%81%ae%e8%a8%ad%e5%ae%9a)
    - [Github Package Registoryを用いる場合](#github-package-registory%e3%82%92%e7%94%a8%e3%81%84%e3%82%8b%e5%a0%b4%e5%90%88)
    - [production buildとdevelopment buildのコマンドを分けたい場合](#production-build%e3%81%a8development-build%e3%81%ae%e3%82%b3%e3%83%9e%e3%83%b3%e3%83%89%e3%82%92%e5%88%86%e3%81%91%e3%81%9f%e3%81%84%e5%a0%b4%e5%90%88)
  - [commitlint, angular commit guideline](#commitlint-angular-commit-guideline)
  - [React HooksやReduxの使用について](#react-hooks%e3%82%84redux%e3%81%ae%e4%bd%bf%e7%94%a8%e3%81%ab%e3%81%a4%e3%81%84%e3%81%a6)
    - [Hooksの切り出し例](#hooks%e3%81%ae%e5%88%87%e3%82%8a%e5%87%ba%e3%81%97%e4%be%8b)

# React Typescript Template

各エコシスムのチュートリアルドキュメント

- [npm](https://docs.npmjs.com/files/package.json) - package.jsonが分からない場合はこれを見てください。
- [Yarn](https://yarnpkg.com/ja/docs/getting-started)
- [React](https://reactjs.org/docs/getting-started.html)
- [Redux](https://redux.js.org/introduction/getting-started)
- [Typescript](http://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [styled-components](https://styled-components.com/docs/basics#getting-started)
- [Webpack](https://webpack.js.org/guides/getting-started/)
- [dotenv](https://github.com/motdotla/dotenv)
- [ESLint](https://eslint.org/docs/user-guide/getting-started)
- [VSCode](https://code.visualstudio.com/docs/getstarted/introvideos) - VSCodeで記述されることを前提にしています。
- [Netlify](https://docs.netlify.com/site-deploys/overview/#deploy-contexts)
  - [Netlify.toml](https://docs.netlify.com/configure-builds/file-based-configuration/#sample-file)

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

### ProcessEnvの型

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

## Alias, Aliasの追加

`@/`で`src/`にアクセス出来ます

aliasを追加する場合、以下の3つの書き換えが必要です。

また追加する場合は`Alias`の項目に追記してください。

- [ ] webpack.config.je

- [ ] jest.config.js
- [ ] tsconfig.js

## 構文の新規サポート

eslintに記述されたecmaVersionの範疇を超える構文を扱えるようにするpluginを追加した場合は、eslintとbabel間で矛盾が発生します。eslintのparserにbabel-eslintを追加してください。

## Netlify

### Netlifyの設定

1. [Netlify](https://app.netlify.com/teams/matsuritech-i-bimrs/sites)にアクセス
2. `New site from Git`
3. `Github`
4. `Configure Netlify on Github`
5. `matsuri-tech`
6. `Repository access`の`Select repositories`からリポジトリを選択
7. `Save`
8. ポップアップを閉じ、自身のユーザー名が表示されているセレクトフォームをクリックし、matsuri-techを選択
9. 検索フォームにリポジトリ名を入力し、選択
10. `Basic build settings`の`Build command`に`yarn build`、`Publish directory`に`dist`と入力
11. `Deploy site`
12. `Site setting`
13. `Site information`の`Change site name`を押し、`Site name`をサービス名に変更

### Github Package Registoryを用いる場合

[scripts/netlify-preinstall.js](https://github.com/matsuri-tech/react-typescript-template/blob/master/scripts/netlify-preinstall.js)を見てください。

Github Package Registoryを用いない場合は決してかまいません。その場合はpackage.jsonのscripts→preinstallも削除してください。

### production buildとdevelopment buildのコマンドを分けたい場合

[netlify.toml.template](https://github.com/matsuri-tech/react-typescript-template/blob/master/netlify.toml.template)を参考にしてください。

使用する場合は、このファイル名の末尾`.template`を削除してください。

## commitlint, angular commit guideline

commitlintはprecommitで発火します。

コミットのルールについては[COMMIT_GUIDELINE](https://github.com/matsuri-tech/react-typescript-template/blob/master/COMMIT_GUIDELINE.md)を見てください。

## React HooksやReduxの使用について

1. View単位でロジックをCustom HooksやReduxのActionに切り出す
2. 共通するロジックをさらに切り出す


### Hooksの切り出し例

```tsx
// src/pages/Home.tsx
const Home = () => {
  const [/*...*/] = useState()
  useEffect(() => {
    //...
  },[/*...*/])
  return (
    <div>{/*...*/}</div>
  )
}
```

ロジックをCustom Hooksに切り出す

```tsx
// src/pages/Home/useHome.tsx
const useHome = () => {
  const [/*...*/] = useState()
  useEffect(() => {
    //...
  },[/*...*/])
  return /*...*/
}

// src/pages/Home/index.tsx (またはHome.tsx)
const Home = () => {
  const /*...*/ = useHome()
  return (
    <div>{/*...*/}</div>
  )
}

```

複数のCustom Hooks内で共通するロジックを切り出す

```tsx
// src/hooks/useCustomHooks
const useCustomHooks = () => {
  /*...*/
}

// src/pages/About/useAbout.tsx
const useAbout = () => {
  const /*...*/ = useState()
  useCustomHooks()
  return /*...*/
}

// src/pages/Home/useHome.tsx
const useHome = () => {
  const /*...*/ = useState()
  useCustomHooks()
  return /*...*/
}

// src/pages/Home/index.tsx
const Home = () => {
  const /*...*/ = useHome()
  return (
    <div>{/*...*/}</div>
  )
}

```