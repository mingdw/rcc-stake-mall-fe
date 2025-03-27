# RCC 代币质押商场系统

*[English Documentation](README.md)*

## 项目介绍

基于区块链技术的代币质押商城系统，用户可以通过质押代币来获取奖励，并且通过代币可以兑换商场里面的虚拟商品，交易方便快捷，安全可靠。

## 功能特点

- 代币质押与奖励管理
- 虚拟商品市场
- 安全的区块链集成
- 用户认证与授权
- 订单管理系统
- 管理员后台
- 多语言支持 (中文/英文)

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

## 后端仓库

项目后端代码地址：https://github.com/mingdw/rcc_stack_backed.git

## 开源协议

[MIT](LICENSE)
