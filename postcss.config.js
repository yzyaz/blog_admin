// 通过config.js文件对postcss配置, 默认开启, 若关闭需只使用cli中默认的需要给环境变量 YZY_DEFAULT_POSTCSS_CONFIG=true
const fs = require('fs');
const path = require('path');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = (relativePath) => path.resolve(appDirectory, relativePath);
// Check if Tailwind config exists
const useTailwind = fs.existsSync(
  path.join(resolveApp('.'), 'tailwind.config.js')
);

const defaultPlugin = !useTailwind
  ? [
      'postcss-flexbugs-fixes',
      [
        'postcss-preset-env',
        {
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        },
      ],
      // Adds PostCSS Normalize as the reset css with default options,
      // so that it honors browserslist config in package.json
      // which in turn let's users customize the target behavior as per their needs.
      'postcss-normalize',
    ]
  : [
      'tailwindcss',
      'postcss-flexbugs-fixes',
      [
        'postcss-preset-env',
        {
          autoprefixer: {
            flexbox: 'no-2009',
          },
          stage: 3,
        },
      ],
    ];

module.exports = {
  plugins: defaultPlugin.concat([
    // 示列, px转vm
    // ['postcss-px-to-viewport', {}],
  ]),
};
