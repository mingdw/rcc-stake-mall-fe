# RCC 代币质押商场系统

*[English Documentation](README.md)*

## 项目介绍

基于区块链技术的代币质押商城系统，用户可以通过质押代币来获取奖励，并且通过代币可以兑换商场里面的虚拟商品，交易方便快捷，安全可靠。

> **注意**：本项目目前正在开发中，部分功能尚未完善，后期持续更新中，敬请期待。开源不易，您的小小的一颗星是对我不断地鼓励，欢迎大家一起建设。

## 目录

- [功能特点](#功能特点)
- [项目截图](#项目截图)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
  - [前置需求](#前置需求)
  - [安装步骤](#安装步骤)
  - [生产环境构建](#生产环境构建)
- [项目结构](#项目结构)
- [关联仓库地址](#关联仓库地址)
- [开源协议](#开源协议)

## 功能特点

- 代币质押与奖励管理
- 虚拟商品市场
- 安全的区块链集成
- 用户认证与授权
- 订单管理系统
- 管理员后台
- 多语言支持 (中文/英文)

## 项目截图

以下是应用程序的部分截图：

### 首页
![首页-1](/public/home_1.png)

![首页-2](/public/home_2.png)

![首页-3](/public/home_3.png)

![首页-4](/public/home_4.png)

### 登录
![登录](/public/logo_in.png)


### 商城首页
![商场首页](/public/mall_01.png)

### 后台管理
![后台管理-1](/public/admin_01.png)

![后台管理-2](/public/admin_02.png)

### 账户余额
![账户余额](/public/账户余额.png)

### 订单管理
![订单管理](/public/订单管理.png)

### 交易记录
![交易记录](/public/交易记录.png)

### 质押管理
![质押管理](/public/质押管理.png)

这只是部分项目截图

## 技术栈

- **前端框架**: React 18, TypeScript
- **状态管理**: React Context API
- **样式**: SCSS Modules, Ant Design
- **Web3 集成**: wagmi, viem, Rainbow Kit
- **路由**: React Router v7
- **国际化**: i18next
- **构建工具**: Vite
- **图表**: ECharts, Ant Design Charts

## 快速开始

### 前置需求

- Node.js (推荐 v16 或更高版本)
- npm 或 yarn
- MetaMask 或其他 Web3 钱包扩展

### 安装步骤

```bash
# 克隆仓库
git clone https://github.com/your-username/rcc-stake-mall-fe.git
cd rcc-stake-mall-fe

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 生产环境构建

```bash
npm run build
```

## 项目结构

```
rcc-stake-mall-fe
├── src/
│   ├── api/              # API 服务和端点
│   ├── assets/           # 静态资源 (图片, 样式等)
│   ├── components/       # 可复用 UI 组件
│   ├── config/           # 应用配置
│   ├── context/          # React 上下文提供者
│   ├── hooks/            # 自定义 React 钩子
│   ├── layouts/          # 页面布局组件
│   ├── locales/          # i18n 翻译文件
│   ├── utils/            # 工具函数
│   ├── view/             # 页面组件
│   ├── App.tsx           # 主应用组件
│   └── main.tsx          # 应用入口点
├── public/               # 公共静态资源
└── ...配置文件
```

## 关联仓库地址

项目后端代码地址：https://github.com/mingdw/rcc_stack_backed.git

合约代码地址：https://github.com/mingdw/rcc_stack_contact.git


## 开源协议

[MIT](LICENSE)

