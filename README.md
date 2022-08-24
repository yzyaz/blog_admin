# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## 自定义包含内容

### css配置:
可使用less。
且默认开启postcss.config.js配置方便配置(若需要关闭只使用默认的配置可设置环境变量YZY_DEFAULT_POSTCSS_CONFIG=true)

### css架构itcss:
在assets>style中的css架构
+ base: 基本样式的调整,如 a p
+ object: 全局的一些样式类名 和一些 一个属性的一个类, 如fz4, fz16
+ theme: 主题相关变量和公共变量等
+ tools: 一些less的方法 函数等(这里通过less-loader的配置会自动引入项目, 无需手动引入)


### 请求axios:
+ 在api>createCancel.ts中配置了取消连续请求并引入配置(增加接口时把[config]的params: { cancle: true }打开即可开启), 
+ 在api>createError.ts中配置了自定义错误(未引入, 根据自己项目的需要配置引入)


### 全局管理rematch:
默认采用rematch全局管理, 见models目录, 使用见pages>Account>index.tsx

### wdry
默认加入了@welldone-software/why-did-you-render来进行页面多余渲染的检测

### GitHub Actions
在.github>node.yml中配置了部署至GitHub Pages和自己服务器的脚本, 打开注释即可, 具体配置见文档: https://yzyaz.yuque.com/docs/share/ed27925f-1396-490b-9106-2ebea37be9df?# 《GitHub actions与部署至GitHub pages和部署至》

### 路由
使用react-router-config进行路由管理

### 提交规范
使用husky, 对提交时进行规范检查, 包含: 
+ commitlint: 检查提交规范, 不规范则退出, 规范如下:

  ```text
   <type>(<scope>): <subject>
    │       │             │
    │       │             └─⫸ 描述：指的是对代码变更的简短总结
    │       │
    │       └─⫸ 作用域: animations|bazel|benchpress|common|compiler|...
    │
    └─⫸ 提交类型：build|ci|docs|feat|fix|perf|refactor|test...（必须, 类型见.czrc文件）
  ```

  可手敲, 也可使用这两个命令进行规范提交

  ```sh
  yarn commit
  #or
  yarn commit
  ```
  
+ eslint: 检查错误, 超过0个提示则退出
+ stylelint: 检查错误, 有报错则退出
+ prettier: 使用prettier进行格式化


### commit记录生成
```sh
yarn release
#or
yarn release
```
