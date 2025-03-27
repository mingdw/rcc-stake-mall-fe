# RCC 代币质押商场系统

*[English Documentation](README.md)*

## 项目介绍

基于区块链技术的代币质押商城系统，用户可以通过质押代币来获取奖励，并且通过代币可以兑换商场里面的虚拟商品，交易方便快捷，安全可靠。

## 目录

- [功能特点](#功能特点)
- [项目截图](#项目截图)
- [技术栈](#技术栈)
- [快速开始](#快速开始)
  - [前置需求](#前置需求)
  - [安装步骤](#安装步骤)
  - [生产环境构建](#生产环境构建)
- [项目结构](#项目结构)
- [后端仓库](#后端仓库)
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

### 商品市场
![商品市场](/public/images/marketplace.png)

### 质押页面
![质押界面](/public/images/staking.png)

### 商品详情
![商品详情](/public/images/product-detail.png)

### 订单管理
![订单管理](/public/images/order.png)

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
