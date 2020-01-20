[TOC]

# コミットガイドライン

参考：[angular/DEVELOPERS.md](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines)

## フォーマット

フォーマットの細かいルールなどについてはチームで話し合いwikiなりレポジトリ内に`commit_guideline.md`や`docs/developer.md`を置いて記述してください。

```html
<header required><type/>(<scope/>): <subject/></header>
<br/>
<body optional><reason /></body>
<br/>
<footer>
  	<closes />
  	<breaking-change />
</footer>
```

例

```commd
feat(Button): Add useMobile

To change the design not by screen width but by device type

Closes #12, #24, #99

BREAKING CHANGE: Button.onResize, which was removed (use useMobile prop instead)
```

> **メリット**
>
> 1. レビューをしやすくなる
> 2. 問題があった場合に原因を特定しやすい
> 3. コミットの仕方に悩まなくて済む
> 4. コミットを再利用しやすい（Issueの自動Close、CHANGELOGの生成など）
> 5. コミットの分割を適切に行えるようになる
>
> **デメリット**
>
> 1. 意識しすぎると作業効率が下がる可能性がある
>
> →意識しすぎないこと。例えば`<body/>`は`optional`であり絶対書かなければいけないというものではありません。規格をある程度統一し、コミットを種別ごとに分けて行うことに意味があります。

### プレフィックス `<type />`

これがコミットのフォーマットを統一する本質です。

- **feat**: 機能拡張
- **fix**: バグの修正、ただし`chore`や`docs`に該当するものの修正は含まない
- **docs**: ドキュメントのみの変更
- **style**: コードの挙動に影響しない変更（空白、書式設定、セミコロンの欠落など）
- **refactor**: バグを修正も機能も追加していないコードの変更
- **perf**: パフォーマンスを向上させるコード変更
- **test**: テストコードの追加や既存テストコードの修正
- **chore**: ビルドプロセスまたはドキュメント生成などの補助ツールやライブラリの変更

> 他、`wip`や`release`などを追加しているチームや、`feat`や`fix`のみのチームも存在します。

### スコープ `<scope/>`

スコープは他者がこのコミットはどの部分のことなのか分かりやすくしてあげようという優しさで出来ています。なので絶対的な指標はありませんし、よく分からなければ`*`でも問題ありません。開発を始める前にスコープをある程度チーム内で定義してあげると楽です。

例

```command
// 大きいスコープで管理する場合
feat($entity): ...
feat($repository): ...
feat($value object): ...
```

```command
// 小さいスコープで管理する場合
feat(components/Button): ... or feat(Button): ...
feat(utils/useDate): ... or feat(useDate): ...
feat(utils): ....
chore(package): ...
docs(readme): ...
```

### サブジェクト `<subject/>`

サブジェクトには（プレフィックスやスコープも含め）文字数制限があるため簡潔に書く必要があるため、開発前にチーム内でルールを作っておいた方がいいです。

例えば、次のようなルールを設けましょう。

1. 現在形で書く
2. 英語で書く場合はCapitalizeする
3. 最後にdotや句点を打たない
4. 以前との対比を含まない（対比が必要な場合は`<body />`に書く）
   - `fix(*): change A from B`など

### ボディ `<body/>`

サブジェクトを補間する内容を書きます。文字数に制限はありません。

### フッター `<footer/>`

- 破壊的な変更

```
BREAKING CHANGE: Button.onBreakChange, which was removed (use onChange instead)
```

- 関連するIssues

```
Closes #12, #24, #99
```
