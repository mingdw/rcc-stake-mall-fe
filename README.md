# 蓝宝石代币质押商场系统

蓝宝石代币质押商城系统是一个基于区块链技术的代币质押商城系统，用户可以通过质押代币来获取代币，并且通过代币可以兑换商场里面的虚拟商品，交易方便快捷，安全可靠。
后端地址：https://github.com/mingdw/rcc_stack_backed.git, 感谢支持 !!!




## 项目截图

![image](https://github.com/mingdw/rcc_stack_backed/blob/main/doc/images/1.png)
![image](https://github.com/mingdw/rcc_stack_backed/blob/main/doc/images/2.png)
![image](https://github.com/mingdw/rcc_stack_backed/blob/main/doc/images/3.png)
![image](https://github.com/mingdw/rcc_stack_backed/blob/main/doc/images/4.png)
![image](https://github.com/mingdw/rcc_stack_backed/blob/main/doc/images/5.png)



## 项目结构
rcc-stake-fe-react
├── README.md                    # 项目说明文档
├── doc                          # 项目文档目录
│   └── images                   # 文档相关图片资源
├── eslint.config.js             # ESLint配置文件，用于代码规范检查
├── index.html                   # 项目入口HTML文件
├── package-lock.json            # 依赖版本锁定文件
├── package.json                 # 项目依赖管理文件
├── public                       # 公共静态资源目录
│   └── vite.svg                 # Vite logo图标
├── src                          # 项目源代码目录
│   ├── App.tsx                  # 应用根组件
│   ├── api                      # API接口相关代码
│   │   ├── apiService.tsx       # API服务和数据接口定义
│   │   ├── axiosInstance.tsx    # Axios实例配置
│   │   └── mockDatas.tsx        # 模拟数据，用于开发和测试
│   ├── assets                   # 静态资源目录
│   │   ├── abis                 # 智能合约ABI定义
│   │   │   └── stake.ts         # 质押合约ABI
│   │   ├── css                  # 样式文件目录
│   │   │   ├── animate.min.css  # 动画效果样式
│   │   │   ├── bootstrap.min.css # Bootstrap框架样式
│   │   │   ├── materialdesignicons.min.css # Material Design图标样式
│   │   │   └── style.min.css    # 自定义全局样式
│   │   ├── fonts                # 字体文件目录
│   │   │   ├── iconfont.css     # 图标字体CSS
│   │   │   ├── iconfont.js      # 图标字体JS
│   │   │   ├── iconfont.json    # 图标字体配置
│   │   │   ├── iconfont.ttf     # 图标字体TTF文件
│   │   │   ├── iconfont.woff    # 图标字体WOFF文件
│   │   │   └── iconfont.woff2   # 图标字体WOFF2文件
│   │   ├── images               # 图片资源目录
│   │   │   ├── 404.png          # 404页面图片
│   │   │   ├── captcha.png      # 验证码图片
│   │   │   ├── gallery          # 图片库目录
│   │   │   ├── image.png        # 通用图片
│   │   │   ├── img-placeholder.png # 图片占位符
│   │   │   ├── loading-logo.png # 加载中logo
│   │   │   ├── login-bg-1.jpg   # 登录背景图1
│   │   │   ├── login-bg-2.jpg   # 登录背景图2
│   │   │   ├── login-bg-3.jpg   # 登录背景图3
│   │   │   ├── login-bg-4.jpg   # 登录背景图4
│   │   │   ├── logo-01.png      # Logo变体1
│   │   │   ├── logo-ico.png     # Logo图标
│   │   │   ├── logo-sidebar.png # 侧边栏Logo
│   │   │   ├── logo.png         # 主Logo
│   │   │   ├── qrcode_1726287934510.png # 二维码图片
│   │   │   ├── rcc-logo.png     # RCC Logo
│   │   │   ├── slide            # 轮播图片目录
│   │   │   └── users            # 用户头像目录
│   │   ├── js                   # JavaScript库文件目录
│   │   │   ├── Chart.min.js     # Chart.js图表库
│   │   │   ├── bootstrap-multitabs # Bootstrap多标签页插件
│   │   │   ├── bootstrap-notify.min.js # Bootstrap通知插件
│   │   │   ├── bootstrap.min.js # Bootstrap核心JS
│   │   │   ├── bootstrapvalidator # Bootstrap表单验证插件
│   │   │   ├── chosen.jquery.min.js # Chosen下拉选择插件
│   │   │   ├── jquery.bootstrap.wizard.min.js # Bootstrap向导插件
│   │   │   ├── jquery.cookie.min.js # jQuery Cookie插件
│   │   │   ├── jquery.min.js    # jQuery核心库
│   │   │   ├── jquery.sliderVerification.min.js # 滑动验证插件
│   │   │   ├── lyear-loading.js # 自定义加载动画
│   │   │   ├── main.min.js      # 主要自定义JS
│   │   │   ├── perfect-scrollbar.min.js # 自定义滚动条插件
│   │   │   └── popper.min.js    # Popper.js定位库
│   │   └── react.svg            # React logo
│   ├── axios                    # Axios相关配置目录
│   ├── components               # 可复用组件目录
│   │   ├── ApyChartCompoment.tsx # APY图表组件
│   │   ├── ApyChartComponent.module.scss # APY图表组件样式
│   │   ├── PrivateRoute.tsx     # 私有路由组件，用于权限控制
│   │   ├── ProductCard.module.scss # 商品卡片组件样式
│   │   └── ProductCard.tsx      # 商品卡片组件
│   ├── config                   # 配置文件目录
│   │   ├── valiable.tsx         # 全局变量配置
│   │   └── wagmi.ts             # Web3钱包连接配置
│   ├── context                  # React上下文目录
│   │   └── AuthContext.tsx      # 认证上下文，管理用户登录状态
│   ├── hooks                    # 自定义React钩子目录
│   │   └── useContract.ts       # 智能合约交互钩子
│   ├── layouts                  # 页面布局组件目录
│   │   ├── AdminLayout.module.scss # 管理后台布局样式
│   │   ├── AdminLayout.tsx      # 管理后台布局组件
│   │   ├── MainLayout.module.scss # 主站布局样式
│   │   └── MainLayout.tsx       # 主站布局组件
│   ├── locales                  # 国际化资源目录
│   │   ├── en-US.json           # 英文翻译
│   │   └── zh-CN.json           # 中文翻译
│   ├── main.tsx                 # 应用入口文件
│   ├── providers.tsx            # 全局Provider组件
│   ├── router                   # 路由配置目录
│   │   └── router.tsx           # 应用路由定义
│   ├── utils                    # 工具函数目录
│   │   ├── common.tsx           # 通用工具函数
│   │   ├── contractHelper.ts    # 智能合约交互辅助函数
│   │   ├── env.ts               # 环境变量处理
│   │   ├── index.ts             # 工具函数入口
│   │   └── viem.ts              # Viem库(以太坊交互)相关工具
│   ├── view                     # 页面视图目录
│   │   ├── 403.tsx              # 403权限错误页面
│   │   ├── 404.tsx              # 404页面未找到错误页面
│   │   ├── about                # 关于页面目录
│   │   │   ├── About.module.scss # 关于页面样式
│   │   │   └── AboutIndex.tsx   # 关于页面组件
│   │   ├── admin                # 管理后台页面目录
│   │   │   ├── AdminContentCard.tsx # 管理内容卡片组件
│   │   │   ├── borrow           # 借贷管理页面
│   │   │   ├── contract         # 合约管理页面
│   │   │   ├── profile          # 用户资料管理页面
│   │   │   └── suply            # 供应管理页面
│   │   ├── budding.tsx          # 建设中页面
│   │   ├── home                 # 首页目录
│   │   │   ├── Home.module.scss # 首页样式
│   │   │   └── HomeIndex.tsx    # 首页组件
│   │   ├── mall                 # 商城相关页面目录
│   │   │   ├── MallIndex.module.scss # 商城首页样式
│   │   │   ├── MallIndex.tsx    # 商城首页/商品列表组件
│   │   │   ├── OrderConfirm.module.scss # 订单确认页样式
│   │   │   ├── OrderConfirm.tsx # 订单确认页组件
│   │   │   ├── OrderSuccess.module.scss # 订单成功页样式
│   │   │   ├── OrderSuccess.tsx # 订单成功页组件
│   │   │   ├── ProductDetail.module.scss # 商品详情页样式
│   │   │   └── ProductDetail.tsx # 商品详情页组件
│   │   ├── suply                # 质押供应相关页面目录
│   │   │   ├── Suply.module.scss # 质押页面样式
│   │   │   ├── SuplyDetails.module.scss # 质押详情页样式
│   │   │   ├── SuplyDetails.tsx # 质押详情页组件
│   │   │   └── SuplyIndex.tsx   # 质押首页组件
│   │   └── transaction          # 交易记录页面目录
│   │       └── TransactionList.tsx # 交易记录列表组件
│   └── vite-env.d.ts            # Vite环境类型声明
├── tree.md                      # 项目目录结构文件
├── tsconfig.app.json            # 应用TypeScript配置
├── tsconfig.json                # 主TypeScript配置
├── tsconfig.node.json           # Node环境TypeScript配置
└── vite.config.ts               # Vite构建工具配置文件