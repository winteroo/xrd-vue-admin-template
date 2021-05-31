# vue项目模板

> A Vue.js project

## 打包命令

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

## 注意

* 此项目开启了gizp压缩方法，请注意后端是否支持

* 统一采用scss编写样式，且统一将公共样式防止在src/style文件夹下

* 统一采用src/util/notify.js内的通知函数进行各种系统通知

* 默认采用eslint进行代码检查，并开启了vue插件最强检测

* 统一开启了样式检查stylelint，包含scss检查，当未加入到webpack打包中，多以即使样式报错也可以启动和打包成功

* 统一将图片和字体文件等静态文件放置在src/assets文件夹下，且不允许防止其他逻辑或是样式文件

* 切勿关闭eslint和stylelint，代码检查可以有效避免意外的bug发生，同时也能保证团队成员的代码风格一致，搭配vscode插件亦可提高开发效率

* 按需引入lodash

## 包说明

* axios: http请求库

* dayjs: 时间处理库

* element-ui: 统一的ui框架

* js-base64: base64处理库

* js-md5: js的md5加密库

* lodash: 常用方法库，注意按需引入

* nprogress: 顶部进度条库

* qs: 请求参数序列化库

* umy-ui: 大数据量表格优化库

* viewerjs: 图片预览库

* vue-count-to: 数字增长效果库

## 建议

建议使用async/await搭配try/catch的方式书写接口请求，可以使代码看起来更加优雅，而且能避免js报错导致程序无法继续运行的问题。（注意：在catch中打印错误，否则出错后很难定位错误点）
