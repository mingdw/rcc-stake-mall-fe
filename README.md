# RCC Token Staking Mall System

*[中文文档](README_zh.md)*

## Project Description

A blockchain-based token staking mall system where users can stake tokens to earn rewards and exchange them for virtual goods in the marketplace, providing convenient, fast, and secure transactions.

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Build for Production](#build-for-production)
- [Project Structure](#project-structure)
- [Backend Repository](#backend-repository)
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

### Dashboard
![Dashboard](/public/images/dashboard.png)

### Marketplace
![Marketplace](/public/images/marketplace.png)

### Staking Page
![Staking Interface](/public/images/staking.png)

### Product Detail
![Product Detail](/public/images/product-detail.png)

### Order Management
![Order Management](/public/images/order.png)

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