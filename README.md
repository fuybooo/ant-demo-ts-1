项目搭建步骤：
1.安装nodejs
2.安装yarn
3.使用脚手架工具：
    1.yarn create react-app antd-demo-ts --scripts-version=react-scripts-ts
4.进入生成的项目，安装antd
    1.yarn add antd
5.启动：yarn start

参考地址：https://ant.design/docs/react/use-in-typescript-cn

6.引入：yarn add react-app-rewired --dev
    1.
    /* package.json */
    "scripts": {
    -   "start": "react-scripts start",
    +   "start": "react-app-rewired start --scripts-version react-scripts-ts",
    -   "build": "react-scripts build",
    +   "build": "react-app-rewired build --scripts-version react-scripts-ts",
    -   "test": "react-scripts test --env=jsdom",
    +   "test": "react-app-rewired test --env=jsdom --scripts-version react-scripts-ts",
    }
7.使用 ts-import-plugin
    1.yarn add ts-import-plugin --dev
8.引入 react-app-rewire 的 less 插件，自定义主题
    1.yarn add react-app-rewire-less --dev
9.build：yarn build
10.安装server：yarn global add serve
11.启动serve -s build
    --在windows平台暂时不好使
12.安装lite-server
    1.yarn add lite-server --dev 本地安装
    2.全局安装 npm install -g lite-server
    3.编写运行配置文件
        1.bs-config.json
            {
              "port": 8000,
              "files": ["./src/**/*.{html,htm,css,js}"],
              "server": { "baseDir": "./build" }
            }
    4.编写运行脚本"rb": "lite-server"
    5.运行：npm run rb 即可运行编译完成的项目