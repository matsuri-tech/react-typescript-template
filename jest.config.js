module.exports = {
    roots: ["<rootDir>/"],
    testRegex: "((\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: { "^@/(.+)": "<rootDir>/src/$1" },
    setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
    transform: { "\\.(js|ts|tsx)?$": "babel-jest" },
}
