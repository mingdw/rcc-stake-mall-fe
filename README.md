# RCC Token Staking Mall System

*[中文文档](README_zh.md)*

## Project Description

A blockchain-based token staking mall system where users can stake tokens to earn rewards and exchange them for virtual goods in the marketplace, providing convenient, fast, and secure transactions.

> <font color=red>**Note**: This project is currently under development. Some features are still being implemented. Continuous updates are planned for the future. Your star on this repository is a great encouragement for our ongoing efforts. Welcome to join us in building this project together!</font>

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Build for Production](#build-for-production)
- [Project Structure](#project-structure)
- [Related Repositories](#related-repositories)
- [License](#license)

## Features

- Token staking and rewards management
- Virtual goods marketplace
- Secure blockchain integration
- User authentication and authorization
- Order management system
- Admin dashboard
- Multi-language support (Chinese/English)

## Screenshots

Here are some screenshots of the application:

### Home Page
![Home-1](/public/home_1.png)

![Home-2](/public/home_2.png)

![Home-3](/public/home_3.png)

![Home-4](/public/home_4.png)

### Login
![Login](/public/logo_in.png)

### Mall Homepage
![Mall Homepage](/public/mall_01.png)

### Admin Management
![后台管理-1](/public/admin_01.png)

![后台管理-2](/public/admin_02.png)

### Account Balance
![账户余额](/public/账户余额.png)

### Order Management
![订单管理](/public/订单管理.png)

### Transaction Records
![交易记录](/public/交易记录.png)

### Staking Management
![质押管理](/public/质押管理.png)

这只是部分项目截图

## Tech Stack

- **Frontend**: React 18, TypeScript
- **State Management**: React Context API
- **Styling**: SCSS Modules, Ant Design
- **Web3 Integration**: wagmi, viem, Rainbow Kit
- **Routing**: React Router v7
- **Internationalization**: i18next
- **Building Tools**: Vite
- **Charts**: ECharts, Ant Design Charts

## Getting Started

### Prerequisites

- Node.js (v16 or later recommended)
- npm or yarn
- MetaMask or other Web3 wallet extension

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/rcc-stake-mall-fe.git
cd rcc-stake-mall-fe

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
```

## Project Structure

```
rcc-stake-mall-fe
├── src/
│   ├── api/              # API services and endpoints
│   ├── assets/           # Static assets (images, styles, etc.)
│   ├── components/       # Reusable UI components
│   ├── config/           # Application configuration
│   ├── context/          # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Page layout components
│   ├── locales/          # i18n translation files
│   ├── utils/            # Utility functions
│   ├── view/             # Page components
│   ├── App.tsx           # Main application component
│   └── main.tsx         # Application entry point
├── public/               # Public static assets
└── ...configuration files
```

## Related Repositories

Backend repository: https://github.com/mingdw/rcc_stack_backed.git

Smart contract repository: https://github.com/mingdw/rcc_stack_contact.git

## License

[MIT](LICENSE)
