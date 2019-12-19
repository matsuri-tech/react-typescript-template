const fs = require("fs")
const { spawnSync } = require("child_process")

/**
 * Github Package Registoryを用いない場合は不要です。
 * `npm.pkg.github.com`の部分を書き換えれば、任意のprivate package registoryに対応できます。
 */

if (process.env.NETLIFY === "true") {
    if (!fs.existsSync(".npmrc") && process.env.GITHUB_TOKEN) {
        fs.writeFileSync(
            ".npmrc",
            /**
             * GITHUB_TOKENはNetlifyの管理画面から設定してください。
             */
            `//npm.pkg.github.com/:_authToken=${process.env.GITHUB_TOKEN}\n
            @matsuri-tech:registry=https://npm.pkg.github.com/\n`
        )
        fs.chmodSync(".npmrc", 0o600)
        spawnSync("yarn", { stdio: "inherit" })
    }
}
