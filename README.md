# React Typescript Template

<!-- TOC -->

- [React Typescript Template](#react-typescript-template)
    - [Branch protection rule](#branch-protection-rule)
    - [Dotenv, process.env](#dotenv-processenv)
        - [ProcessEnvの型](#processenv%E3%81%AE%E5%9E%8B)
    - [HTML](#html)
        - [OGPテンプレート](#ogp%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88)
        - [Faviconテンプレート](#favicon%E3%83%86%E3%83%B3%E3%83%97%E3%83%AC%E3%83%BC%E3%83%88)
        - [Googleフォントの最適化](#google%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E3%81%AE%E6%9C%80%E9%81%A9%E5%8C%96)
    - [Markdown](#markdown)
    - [Image](#image)
    - [構文の新規サポート](#%E6%A7%8B%E6%96%87%E3%81%AE%E6%96%B0%E8%A6%8F%E3%82%B5%E3%83%9D%E3%83%BC%E3%83%88)
    - [Netlify](#netlify)
        - [Netlifyの設定](#netlify%E3%81%AE%E8%A8%AD%E5%AE%9A)
        - [production buildとdevelopment buildのコマンドを分けたい場合](#production-build%E3%81%A8development-build%E3%81%AE%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%82%92%E5%88%86%E3%81%91%E3%81%9F%E3%81%84%E5%A0%B4%E5%90%88)
    - [commitlint, angular commit guideline](#commitlint-angular-commit-guideline)
    - [React HooksやReduxの使用について](#react-hooks%E3%82%84redux%E3%81%AE%E4%BD%BF%E7%94%A8%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6)
        - [Hooksの切り出し例](#hooks%E3%81%AE%E5%88%87%E3%82%8A%E5%87%BA%E3%81%97%E4%BE%8B)

<!-- /TOC -->

## Branch protection rule

1. 有効化したいリポジトリで"settings" → "branches" → "Add rule"
2. "Branch name pattern"にmasterと記入。
3. "Require pull request reviews before merging"をチェック。
4. "Dismiss stale pull request approvals when new commits are pushed"をチェック。
5. Github Actions/Circle CI/Vercel/Netlifyなどを使用していれば、"Require status checks to pass before merging"にもチェックし、必ず成功している必要があるものを選択。
6. Renovateを利用する場合は、"Restrict who can push to matching branches"にチェックを入れ、"People, teams or apps with push access"に"renovate"を追加。

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
