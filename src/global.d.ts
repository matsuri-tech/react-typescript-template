/**
 * Images
 */
declare module "*.png"
declare module "*.jpg"
declare module "*.svg"

/**
 * Markdown
 */
declare module "*.md" {
    const content: string
    export default content
}

/**
 * ProcessEnv
 */
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: "development" | "production" | "test"
        [key: string]: string
        /**
         * process.envを利用するときは以下に追記する
         */
    }
}
