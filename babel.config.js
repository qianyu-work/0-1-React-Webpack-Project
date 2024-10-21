module.exports = (api) => {
  // 判断调用者是否针对 Web 环境
  const isWeb = api.caller((caller) => caller && caller.target === "isWeb");

  // 预设
  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: isWeb ? "usage" : undefined,
        corejs: isWeb ? 3 : false,
      },
    ],
    "@babel/preset-typescript",
    [
      "@babel/preset-react",
      {
        runtime: "automatic", // automatic自动导入 JSX 转换为的函数。classic不会自动导入任何内容。
      },
    ],
  ];

  /*
  * 插件
  * 使用“loadable/component”这个库，配置它所需的loadable/babel-plugin
  * */
  const plugins = [
    "@loadable/babel-plugin", "@babel/plugin-transform-runtime"
  ];

  // web环境下启用react-refresh/babel
  const env = {
    development: {
      plugins: isWeb ? ["react-refresh/babel"] : undefined,
    },
  }

  return {presets, plugins, env};
};
