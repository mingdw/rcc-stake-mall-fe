# RCC Token Staking Mall System

*[中文文档](README_zh.md)*

## Project Description

A blockchain-based token staking mall system where users can stake tokens to earn rewards and exchange them for virtual goods in the marketplace, providing convenient, fast, and secure transactions.

## Features

- Token staking and rewards management
- Virtual goods marketplace
- Secure blockchain integration
- User authentication and authorization
- Order management system
- Admin dashboard
- Multi-language support (Chinese/English)

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
│   └── main.tsx          # Application entry point
├── public/               # Public static assets
└── ...configuration files
```

## Backend Repository

The backend code for this project is available at: 
https://github.com/mingdw/rcc_stack_backed.git

## License

[MIT](LICENSE)