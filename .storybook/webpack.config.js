const path = require("path")
const webpack = require("webpack")


const ariaProps = [
    "is",
    "inputMode",
    "aria-activedescendant",
    "aria-atomic",
    "aria-autocomplete",
    "aria-busy",
    "aria-checked",
    "aria-colcount",
    "aria-colindex",
    "aria-colspan",
    "aria-controls",
    "aria-current",
    "aria-describedby",
    "aria-details",
    "aria-disabled",
    "aria-dropeffect",
    "aria-errormessage",
    "aria-expanded",
    "aria-flowto",
    "aria-grabbed",
    "aria-haspopup",
    "aria-hidden",
    "aria-invalid",
    "aria-keyshortcuts",
    "aria-label",
    "aria-labelledby",
    "aria-level",
    "aria-live",
    "aria-modal",
    "aria-multiline",
    "aria-multiselectable",
    "aria-orientation",
    "aria-owns",
    "aria-placeholder",
    "aria-posinset",
    "aria-pressed",
    "aria-readonly",
    "aria-relevant",
    "aria-required",
    "aria-roledescription",
    "aria-rowcount",
    "aria-rowindex",
    "aria-rowspan",
    "aria-selected",
    "aria-setsize",
    "aria-sort",
    "aria-valuemax",
    "aria-valuemin",
    "aria-valuenow",
    "aria-valuetext"
  ]

module.exports = ({ config }) => {
    config.resolve = {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
            alias: {
                "@": path.resolve(__dirname, "../src")
            }
    }
    config.module.rules.push(
        {
            test: /\.(ts|tsx)$/,
            use: [
                {
                    loader: require.resolve("babel-loader"),
                    options: {
                        presets: [["react-app", { flow: false, typescript: true }]]
                    }
                },
                {
                    loader: require.resolve("react-docgen-typescript-loader"),
                    options: {
                        tsconfigPath: path.resolve(__dirname, "../tsconfig.json"),
                        skipPropsWithoutDoc: true,
                        skipPropsWithName: ariaProps,
                    }
                }
            ]
        }
    )
    config.plugins.push(new webpack.ProvidePlugin({
        React: "react"
    }))

    config.watchOptions = {
        poll: 2000,
        ignored: /node_modules/
    }
    config.resolve.extensions.push(".ts", ".tsx")
    return config
}