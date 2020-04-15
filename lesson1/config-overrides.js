const {override, fixBabelImports, addLessLoader} = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    // antd按需加载
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "red",
      "@border-color-base": "green",
      "@link-color": "orange"
    }
  })
);
