const {override, addDecoratorsLegacy} = require("customize-cra");

module.exports = override(
  addDecoratorsLegacy() //配置装饰器
);
