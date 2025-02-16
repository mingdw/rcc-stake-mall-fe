import React from 'react';
import {
  CrownOutlined,
  PictureOutlined,
  TrophyOutlined,
  CustomerServiceOutlined,
  HighlightOutlined,
  UserOutlined,
  SkinOutlined,
  TeamOutlined,
  GiftOutlined,
  FileOutlined,
  FileTextOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FilePptOutlined,
  FilePdfOutlined,
  BookOutlined,
  CalculatorOutlined,
  ProfileOutlined,
  VideoCameraOutlined,
  ReadOutlined,
  PlayCircleOutlined,
  AppstoreOutlined,
  SketchOutlined,
  WindowsOutlined,
  SafetyCertificateOutlined,
  TranslationOutlined,
  FontSizeOutlined,
  AudioOutlined,
  SoundOutlined,
  LayoutOutlined,
  ToolOutlined,
  CameraOutlined,
  ScissorOutlined,
  CodeOutlined,
  AppleOutlined,
  PlaySquareOutlined
} from '@ant-design/icons';

// 规格接口
export interface Specification {
  id: number;
  key: string;
  label: string;
  value: string;
}

// 商品接口
export interface Product {
  id: number;
  name: string;
  price: number;
  images: string[];
  category: string;
  subCategory?: string;
  thirdCategory?: string;
  tags: string[];
  stock: number;
  sold: number;
  description: string;
  originalPrice?: number;
  specifications?: Specification[];
  detailImages?: string[];
}

export const categories = [
    {
      key: 'nft',
      icon: <CrownOutlined />,
      title: 'NFT专区',
      tags: {
        scenes: ['收藏展示', '社交分享', '游戏体验', '投资理财', '艺术收藏'],
        styles: ['赛博朋克', '未来科技', '像素复古', '艺术写实', '抽象创意']
      },
      children: [
        {
          key: 'digital-art',
          icon: <PictureOutlined />,
          title: '数字艺术品NFT',
          tags: {
            scenes: ['艺术收藏', '展厅陈列', '社交展示'],
            styles: ['抽象艺术', '写实主义', '超现实']
          },
          children: [
            { key: 'trendy-art', title: '潮流艺术画作NFT', icon: <HighlightOutlined /> },
            { key: 'music-art', title: '先锋音乐作品NFT', icon: <CustomerServiceOutlined /> },
            { key: '3d-art', title: '3D创意雕塑NFT', icon: <GiftOutlined /> }
          ]
        },
        {
          key: 'virtual-identity',
          icon: <UserOutlined />,
          title: '虚拟身份NFT',
          children: [
            { key: 'unique-avatar', title: '独特头像NFT', icon: <UserOutlined /> },
            { key: 'custom-avatar', title: '定制虚拟形象NFT', icon: <SkinOutlined /> },
            { key: 'social-identity', title: '专属社交身份NFT', icon: <TeamOutlined /> }
          ]
        },
        {
          key: 'game-assets',
          icon: <TrophyOutlined />,
          title: '游戏资产NFT',
          children: [
            { key: 'rare-items', title: '珍稀游戏道具NFT', icon: <GiftOutlined /> },
            { key: 'limited-characters', title: '限定游戏角色NFT', icon: <UserOutlined /> },
            { key: 'unique-scenes', title: '独特游戏场景NFT', icon: <PictureOutlined /> }
          ]
        }
      ]
    },
    {
      key: 'digital-resources',
      icon: <FileOutlined />,
      title: '数字素材类',
      tags: {
        scenes: ['工作总结', '培训课件', '商业提案', '数据分析', '项目汇报'],
        styles: ['简约商务', '清新文艺', '科技感强', '创意设计', '传统严谨']
      },
      children: [
        {
          key: 'document-templates',
          icon: <FileTextOutlined />,
          title: '文档模板',
          tags: {
            scenes: ['工作汇报', '项目总结', '教学课件', '个人简历'],
            styles: ['商务简约', '创意设计', '学术严谨']
          },
          children: [
            { key: 'word-templates', title: 'Word商务报告模板', icon: <FileWordOutlined /> },
            { key: 'excel-templates', title: 'Excel财务报表模板', icon: <FileExcelOutlined /> },
            { key: 'ppt-templates', title: 'PPT项目展示模板', icon: <FilePptOutlined /> }
          ]
        },
        {
          key: 'image-resources',
          icon: <PictureOutlined />,
          title: '图片素材',
          tags: {
            scenes: ['广告设计', '社媒运营', '个人美化', '商业展示'],
            styles: ['小清新', '商务风', '科技感', '复古风']
          },
          children: [
            { key: 'hd-wallpapers', title: '高清风景壁纸', icon: <PictureOutlined /> },
            { key: 'cartoon-avatars', title: '可爱卡通头像', icon: <FileOutlined /> },
            { key: 'business-posters', title: '商业海报配图', icon: <LayoutOutlined /> }
          ]
        },
        {
          key: 'sound-effects',
          icon: <CustomerServiceOutlined />,
          title: '音效素材',
          tags: {
            scenes: ['视频制作', '游戏开发', '多媒体演示', '广告配音'],
            styles: ['欢快活泼', '神秘恐怖', '温馨感人', '震撼大气']
          },
          children: [
            { key: 'festival-sounds', title: '欢快节日音效', icon: <CustomerServiceOutlined /> },
            { key: 'horror-sounds', title: '恐怖氛围音效', icon: <AudioOutlined /> },
            { key: 'speech-bgm', title: '励志演讲背景音乐', icon: <SoundOutlined /> }
          ]
        }
      ]
    },
    {
      key: 'learning-resources',
      icon: <ReadOutlined />,
      title: '学习资源类',
      tags: {
        scenes: ['考试备考', '技能提升', '职业发展', '学术研究', '自我提升'],
        styles: ['系统全面', '重点突出', '实用性强', '深入浅出']
      },
      children: [
        {
          key: 'academic',
          icon: <BookOutlined />,
          title: '学术资料',
          children: [
            { key: 'university-courses', title: '高校专业课件', icon: <FileTextOutlined /> },
            { key: 'thesis', title: '硕博论文文献', icon: <FilePdfOutlined /> },
            { key: 'conference', title: '学术会议纪要', icon: <ProfileOutlined /> }
          ]
        },
        {
          key: 'certification',
          icon: <SafetyCertificateOutlined />,
          title: '职业考证',
          children: [
            { key: 'civil-service', title: '公务员考试真题集', icon: <FileTextOutlined /> },
            { key: 'teacher-cert', title: '教师资格证培训视频', icon: <VideoCameraOutlined /> },
            { key: 'cpa', title: '注册会计师模拟题', icon: <CalculatorOutlined /> }
          ]
        },
        {
          key: 'language',
          icon: <TranslationOutlined />,
          title: '语言学习',
          children: [
            { key: 'ielts-toefl', title: '雅思托福单词库', icon: <ReadOutlined /> },
            { key: 'japanese', title: '日语五十音课程', icon: <FontSizeOutlined /> },
            { key: 'business-english', title: '英语商务口语教程', icon: <AudioOutlined /> }
          ]
        }
      ]
    },
    {
      key: 'entertainment',
      icon: <PlayCircleOutlined />,
      title: '生活娱乐类',
      tags: {
        scenes: ['休闲娱乐', '兴趣培养', '社交分享', '个人收藏'],
        styles: ['轻松欢快', '文艺小众', '热血动感', '温馨治愈']
      },
      children: [
        {
          key: 'media',
          icon: <VideoCameraOutlined />,
          title: '影视音乐',
          children: [
            { key: 'popular-movies', title: '热门电影资源', icon: <PlaySquareOutlined /> },
            { key: 'art-films', title: '小众文艺片', icon: <VideoCameraOutlined /> },
            { key: 'music-albums', title: '华语流行专辑', icon: <CustomerServiceOutlined /> }
          ]
        },
        {
          key: 'game-peripherals',
          icon: <GiftOutlined />,
          title: '游戏周边',
          children: [
            { key: 'game-gifts', title: '热门手游礼包码', icon: <GiftOutlined /> },
            { key: 'game-figures', title: '游戏角色手办模型（虚拟）', icon: <TrophyOutlined /> },
            { key: 'game-equipment', title: '游戏主播同款外设（虚拟）', icon: <ToolOutlined /> }
          ]
        },
        {
          key: 'hobbies',
          icon: <CameraOutlined />,
          title: '兴趣爱好',
          children: [
            { key: 'photography', title: '摄影构图教程', icon: <CameraOutlined /> },
            { key: 'handicraft', title: '手工编织图案', icon: <ScissorOutlined /> },
            { key: 'fishing', title: '钓鱼技巧视频', icon: <VideoCameraOutlined /> }
          ]
        }
      ]
    },
    {
      key: 'membership',
      icon: <CrownOutlined />,
      title: '会员权益类',
      tags: {
        scenes: ['日常娱乐', '学习充电', '工作效率', '创作创造'],
        styles: ['基础服务', '进阶特权', '尊享专属', '定制服务']
      },
      children: [
        {
          key: 'video-membership',
          icon: <PlayCircleOutlined />,
          title: '视频平台会员',
          children: [
            { key: 'iqiyi', title: '爱奇艺年卡', icon: <PlayCircleOutlined /> },
            { key: 'tencent', title: '腾讯视频季卡', icon: <PlayCircleOutlined /> },
            { key: 'youku', title: '优酷月卡', icon: <PlayCircleOutlined /> }
          ]
        },
        {
          key: 'music-membership',
          icon: <CustomerServiceOutlined />,
          title: '音乐平台会员',
          children: [
            { key: 'netease', title: '网易云黑胶会员', icon: <CustomerServiceOutlined /> },
            { key: 'qq-music', title: 'QQ音乐绿钻会员', icon: <CustomerServiceOutlined /> },
            { key: 'kugou', title: '酷狗豪华VIP', icon: <CustomerServiceOutlined /> }
          ]
        },
        {
          key: 'reading-membership',
          icon: <ReadOutlined />,
          title: '阅读平台会员',
          children: [
            { key: 'zhangyue', title: '掌阅会员', icon: <ReadOutlined /> },
            { key: 'qidian', title: '起点中文网会员', icon: <ReadOutlined /> },
            { key: 'kindle', title: 'Kindle Unlimited会员', icon: <ReadOutlined /> }
          ]
        }
      ]
    },
    {
      key: 'software',
      icon: <AppstoreOutlined />,
      title: '软件服务类',
      tags: {
        scenes: ['办公应用', '设计创作', '开发编程', '系统工具'],
        styles: ['专业版本', '企业定制', '个人使用', '教育版本']
      },
      children: [
        {
          key: 'office-software',
          icon: <FileWordOutlined />,
          title: '办公软件',
          children: [
            { key: 'ms-office', title: '正版Office激活码', icon: <FileWordOutlined /> },
            { key: 'wps', title: 'WPS高级会员', icon: <FileWordOutlined /> },
            { key: 'yozo', title: '永中Office专业版', icon: <FileWordOutlined /> }
          ]
        },
        {
          key: 'design-software',
          icon: <SketchOutlined />,
          title: '设计软件',
          children: [
            { key: 'adobe', title: 'Adobe全家桶序列号', icon: <SketchOutlined /> },
            { key: 'sketch', title: 'Sketch软件授权', icon: <SketchOutlined /> },
            { key: 'corel', title: 'CorelDRAW激活码', icon: <SketchOutlined /> }
          ]
        },
        {
          key: 'system-tools',
          icon: <WindowsOutlined />,
          title: '系统工具',
          children: [
            { key: 'windows', title: 'Windows正版激活密钥', icon: <WindowsOutlined /> },
            { key: 'mac', title: 'Mac系统优化软件', icon: <AppleOutlined /> },
            { key: 'linux', title: 'Linux服务器运维工具', icon: <CodeOutlined /> }
          ]
        }
      ]
    }
  ];
  


// 商品数据
export const products: Product[] = [
    // NFT专区商品
    {
      id: 1,
      name: "稀有数字头像#001",
      price: 1000,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft1-1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft1-2.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft1-3.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft1-4.jpg"
      ],
      detailImages: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft1-detail1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft1-detail2.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft1-detail3.jpg"
      ],
      category: "nft",
      subCategory: "virtual-identity",
      thirdCategory: "unique-avatar",
      tags: ["收藏展示", "社交分享", "赛博朋克", "热销"],
      stock: 10,
      sold: 5,
      description: "这是一款稀有的数字头像，具有独特的艺术风格。采用赛博朋克风格设计，完美展现未来科技感。",
      originalPrice: 1200,
      specifications: [
        {
          id: 1,
          key: "artist",
          label: "艺术家",
          value: "数字艺术工作室"
        },
        {
          id: 2,
          key: "createTime",
          label: "创作时间",
          value: "2024-01-01"
        },
        {
          id: 3,
          key: "workId",
          label: "作品编号",
          value: "#001"
        },
        {
          id: 4,
          key: "blockchain",
          label: "区块链",
          value: "以太坊"
        },
        {
          id: 5,
          key: "size",
          label: "作品尺寸",
          value: "3000x3000px"
        },
        {
          id: 6,
          key: "format",
          label: "文件格式",
          value: "PNG"
        },
        {
          id: 7,
          key: "copyright",
          label: "版权说明",
          value: "该NFT作品版权归发行方所有"
        },
        {
          id: 8,
          key: "blockchainAddress",
          label: "区块链地址",
          value: "0x1234...5678"
        }
      ]
    },
    {
      id: 2,
      name: "限定版头像#002",
      price: 800,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft2-1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft2-2.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/nft2-3.jpg"
      ],
      category: "nft",
      subCategory: "virtual-identity",
      thirdCategory: "custom-avatar",
      tags: ["社交分享", "未来科技", "抽象创意"],
      stock: 5,
      sold: 2,
      description: "这是一款限定的头像，具有很高的收藏价值。采用抽象创意风格，展现独特艺术魅力。",
      originalPrice: 1000,
      specifications: [
        {
          id: 1,
          key: "artist",
          label: "艺术家",
          value: "Meta数字艺术"
        },
        {
          id: 2,
          key: "createTime",
          label: "创作时间",
          value: "2024-01-15"
        },
        {
          id: 3,
          key: "workId",
          label: "作品编号",
          value: "#002"
        },
        {
          id: 4,
          key: "blockchain",
          label: "区块链",
          value: "以太坊"
        },
        {
          id: 5,
          key: "size",
          label: "作品尺寸",
          value: "4000x4000px"
        },
        {
          id: 6,
          key: "format",
          label: "文件格式",
          value: "PNG"
        },
        {
          id: 7,
          key: "copyright",
          label: "版权说明",
          value: "该NFT作品版权归发行方所有"
        },
        {
          id: 8,
          key: "blockchainAddress",
          label: "区块链地址",
          value: "0x2345...6789"
        }
      ]
    },
    {
      id: 3,
      name: "数字艺术画作#001",
      price: 2000,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/art1-1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/art1-2.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/art1-3.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/art1-4.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/art1-5.jpg"
      ],
      category: "nft",
      subCategory: "digital-art",
      thirdCategory: "trendy-art",
      tags: ["数字画作", "NFT", "艺术收藏"],
      stock: 8,
      sold: 3,
      description: "这是一幅数字艺术画作，具有很高的艺术价值。",
      originalPrice: 2200,
      specifications: [
        {
          id: 1,
          key: "artist",
          label: "艺术家",
          value: "CryptoArt工作室"
        },
        {
          id: 2,
          key: "createTime",
          label: "创作时间",
          value: "2023-12-01"
        },
        {
          id: 3,
          key: "workId",
          label: "作品编号",
          value: "ART#001"
        },
        {
          id: 4,
          key: "blockchain",
          label: "区块链",
          value: "以太坊"
        },
        {
          id: 5,
          key: "size",
          label: "作品尺寸",
          value: "3000x4000px"
        },
        {
          id: 6,
          key: "format",
          label: "文件格式",
          value: "PNG/SVG"
        },
        {
          id: 7,
          key: "copyright",
          label: "版权说明",
          value: "永久版权授权"
        },
        {
          id: 8,
          key: "blockchainAddress",
          label: "区块链地址",
          value: "0x3456...7890"
        }
      ]
    },
    {
      id: 4,
      name: "动态艺术品#001",
      price: 1500,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2Fd435e9af0c48e080a4544b59269ff76f.gif"],
      category: "nft",
      subCategory: "digital-art",
      thirdCategory: "music-art",
      tags: ["动态艺术", "NFT"],
      stock: 7,
      sold: 2,
      description: "这是一件动态艺术品，具有很高的艺术价值。",
      originalPrice: 1700
    },
    {
      id: 5,
      name: "收藏版卡片#001",
      price: 500,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F24d32ae87bf57e10c27b6ebc499d4542.jpg"],
      category: "nft",
      subCategory: "game-assets",
      thirdCategory: "rare-items",
      tags: ["收藏卡片", "NFT"],
      stock: 10,
      sold: 5,
      description: "这是一张收藏版的卡片，具有很高的收藏价值。",
      originalPrice: 600
    },
    // 数字素材类
    {
      id: 6,
      name: "Office 365订阅",
      price: 299,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/office1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/office2.jpg"
      ],
      category: "digital-resources",
      subCategory: "document-templates",
      thirdCategory: "word-templates",
      tags: ["办公软件", "文档处理", "商务"],
      stock: 999,
      sold: 588,
      description: "Microsoft Office 365完整订阅版，包含Word、Excel、PowerPoint等全套办公软件。",
      originalPrice: 399,
      specifications: [
        {
          id: 1,
          key: "version",
          label: "产品版本",
          value: "Microsoft 365 企业版"
        },
        {
          id: 2,
          key: "duration",
          label: "授权期限",
          value: "12个月"
        },
        {
          id: 3,
          key: "platform",
          label: "适用设备",
          value: "Windows/Mac"
        },
        {
          id: 4,
          key: "devices",
          label: "账号数量",
          value: "5个设备"
        },
        {
          id: 5,
          key: "storage",
          label: "存储空间",
          value: "1TB OneDrive"
        },
        {
          id: 6,
          key: "support",
          label: "技术支持",
          value: "7*24小时"
        },
        {
          id: 7,
          key: "autoRenew",
          label: "自动续费",
          value: "支持"
        },
        {
          id: 8,
          key: "activation",
          label: "激活方式",
          value: "账号激活"
        }
      ]
    },
    {
      id: 7,
      name: "Adobe Creative Cloud",
      price: 599,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F814a54b8649bf2a803bfe57105005f35.png"],
      category: "digital-resources",
      subCategory: "document-templates",
      thirdCategory: "excel-templates",
      tags: ["设计软件", "创意设计", "科技感强"],
      stock: 3,
      sold: 1,
      description: "这是一款Adobe Creative Cloud的订阅服务，具有很高的设计效率。",
      specifications: [
        {
          id: 1,
          key: "version",
          label: "产品版本",
          value: "Adobe CC 2024"
        },
        {
          id: 2,
          key: "duration",
          label: "授权期限",
          value: "12个月"
        },
        {
          id: 3,
          key: "platform",
          label: "适用设备",
          value: "Windows/Mac"
        },
        {
          id: 4,
          key: "software",
          label: "包含软件",
          value: "PS/AI/PR/AE等"
        },
        {
          id: 5,
          key: "storage",
          label: "云存储",
          value: "100GB"
        },
        {
          id: 6,
          key: "support",
          label: "技术支持",
          value: "在线支持"
        },
        {
          id: 7,
          key: "autoRenew",
          label: "自动续费",
          value: "支持"
        },
        {
          id: 8,
          key: "activation",
          label: "激活方式",
          value: "Adobe ID授权"
        }
      ]
    },
    {
      id: 8,
      name: "云存储服务 100GB",
      price: 99,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F3fe11ac10720ed6595cd1d6a55177219.jpeg"],
      category: "digital-resources",
      subCategory: "image-resources",
      thirdCategory: "hd-wallpapers",
      tags: ["云存储", "服务"],
      stock: 10,
      sold: 5,
      description: "这是一项云存储服务，具有很高的存储效率。",
      specifications: [
        {
          id: 1,
          key: "storage",
          label: "存储容量",
          value: "100GB"
        },
        {
          id: 2,
          key: "duration",
          label: "服务期限",
          value: "12个月"
        },
        {
          id: 3,
          key: "speed",
          label: "传输速度",
          value: "不限速"
        },
        {
          id: 4,
          key: "sharing",
          label: "分享功能",
          value: "支持"
        },
        {
          id: 5,
          key: "sync",
          label: "多端同步",
          value: "支持"
        },
        {
          id: 6,
          key: "security",
          label: "安全加密",
          value: "端到端加密"
        },
        {
          id: 7,
          key: "backup",
          label: "自动备份",
          value: "支持"
        },
        {
          id: 8,
          key: "platform",
          label: "支持平台",
          value: "全平台"
        }
      ]
    },
    {
      id: 9,
      name: "自动云备份服务",
      price: 199,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F0a4dbaf3307d8e471c83fcbb2dde2e00.jpeg"],
      category: "digital-resources",
      subCategory: "sound-effects",
      thirdCategory: "festival-sounds",
      tags: ["云备份", "服务"],
      stock: 5,
      sold: 2,
      description: "这是一项自动云备份服务，具有很高的数据备份效率。",
      specifications: [
        {
          id: 1,
          key: "backupType",
          label: "备份类型",
          value: "全量+增量"
        },
        {
          id: 2,
          key: "frequency",
          label: "备份频率",
          value: "每日自动"
        },
        {
          id: 3,
          key: "retention",
          label: "保留时间",
          value: "30天"
        },
        {
          id: 4,
          key: "storage",
          label: "存储空间",
          value: "500GB"
        },
        {
          id: 5,
          key: "encryption",
          label: "加密方式",
          value: "AES-256"
        },
        {
          id: 6,
          key: "recovery",
          label: "恢复方式",
          value: "随时恢复"
        },
        {
          id: 7,
          key: "platform",
          label: "支持平台",
          value: "全平台"
        },
        {
          id: 8,
          key: "support",
          label: "技术支持",
          value: "7*24小时"
        }
      ]
    },
    // 生活娱乐类
    {
      id: 10,
      name: "视频会员年卡",
      price: 199,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "membership",
      subCategory: "video-membership",
      thirdCategory: "iqiyi",
      tags: ["视频会员", "年卡", "超值"],
      stock: 999,
      sold: 500,
      description: "视频平台年度会员，享受海量视频内容。",
      originalPrice: 299,
      specifications: [
        {
          id: 1,
          key: "memberType",
          label: "会员类型",
          value: "黄金会员"
        },
        {
          id: 2,
          key: "validity",
          label: "有效期",
          value: "365天"
        },
        {
          id: 3,
          key: "resolution",
          label: "观看清晰度",
          value: "4K超清"
        },
        {
          id: 4,
          key: "devices",
          label: "支持设备数",
          value: "4台设备"
        },
        {
          id: 5,
          key: "download",
          label: "下载权限",
          value: "支持"
        },
        {
          id: 6,
          key: "adFree",
          label: "广告特权",
          value: "无广告"
        },
        {
          id: 7,
          key: "playback",
          label: "离线播放",
          value: "支持"
        },
        {
          id: 8,
          key: "activation",
          label: "激活方式",
          value: "扫码激活"
        }
      ]
    },
    {
      id: 11,
      name: "音乐会员季卡",
      price: 88,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "membership",
      subCategory: "music-membership",
      thirdCategory: "netease",
      tags: ["音乐会员", "季卡", "特惠"],
      stock: 888,
      sold: 300,
      description: "音乐平台季度会员，畅享无损音质。",
      originalPrice: 108,
      specifications: [
        {
          id: 1,
          key: "memberType",
          label: "会员类型",
          value: "黑胶VIP"
        },
        {
          id: 2,
          key: "validity",
          label: "有效期",
          value: "90天"
        },
        {
          id: 3,
          key: "quality",
          label: "音质",
          value: "Hi-Res无损"
        },
        {
          id: 4,
          key: "download",
          label: "下载特权",
          value: "无限下载"
        },
        {
          id: 5,
          key: "mv",
          label: "MV画质",
          value: "1080P"
        },
        {
          id: 6,
          key: "adFree",
          label: "广告特权",
          value: "无广告"
        },
        {
          id: 7,
          key: "lyrics",
          label: "歌词特权",
          value: "逐字歌词"
        },
        {
          id: 8,
          key: "activation",
          label: "激活方式",
          value: "扫码激活"
        }
      ]
    },
    {
      id: 12,
      name: "阅读会员月卡",
      price: 30,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "membership",
      subCategory: "reading-membership",
      thirdCategory: "kindle",
      tags: ["阅读会员", "月卡", "优惠"],
      stock: 777,
      sold: 200,
      description: "电子书阅读平台月度会员，海量图书免费读。",
      originalPrice: 40,
      specifications: [
        {
          id: 1,
          key: "memberType",
          label: "会员类型",
          value: "白金会员"
        },
        {
          id: 2,
          key: "validity",
          label: "有效期",
          value: "30天"
        },
        {
          id: 3,
          key: "books",
          label: "免费图书",
          value: "100万+"
        },
        {
          id: 4,
          key: "devices",
          label: "支持设备",
          value: "全平台"
        },
        {
          id: 5,
          key: "download",
          label: "离线下载",
          value: "支持"
        },
        {
          id: 6,
          key: "sync",
          label: "同步功能",
          value: "云同步"
        },
        {
          id: 7,
          key: "notes",
          label: "笔记功能",
          value: "支持"
        },
        {
          id: 8,
          key: "activation",
          label: "激活方式",
          value: "账号激活"
        }
      ]
    },
    {
      id: 13,
      name: "Windows 11专业版",
      price: 899,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "software",
      subCategory: "system-tools",
      thirdCategory: "windows",
      tags: ["操作系统", "正版软件"],
      stock: 50,
      sold: 20,
      description: "Windows 11专业版正版激活码，支持在线激活。",
      originalPrice: 999,
      specifications: [
        {
          id: 1,
          key: "version",
          label: "系统版本",
          value: "Windows 11 Pro"
        },
        {
          id: 2,
          key: "bits",
          label: "系统位数",
          value: "32/64位"
        },
        {
          id: 3,
          key: "language",
          label: "系统语言",
          value: "多语言"
        },
        {
          id: 4,
          key: "activation",
          label: "激活方式",
          value: "在线激活"
        },
        {
          id: 5,
          key: "validity",
          label: "使用期限",
          value: "永久"
        },
        {
          id: 6,
          key: "upgrade",
          label: "升级权限",
          value: "支持"
        },
        {
          id: 7,
          key: "support",
          label: "技术支持",
          value: "终身"
        },
        {
          id: 8,
          key: "transfer",
          label: "转移权限",
          value: "支持"
        }
      ]
    },
    {
      id: 14,
      name: "高校专业课程资料",
      price: 100,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "learning-resources",
      subCategory: "academic",
      thirdCategory: "university-courses",
      tags: ["考试备考", "学术研究", "系统全面"],
      stock: 10,
      sold: 5,
      description: "系统完整的专业课程学习资料，助力考试备考。",
      specifications: [
        {
          id: 1,
          key: "type",
          label: "资料类型",
          value: "视频+文档"
        },
        {
          id: 2,
          key: "major",
          label: "适用专业",
          value: "计算机科学"
        },
        {
          id: 3,
          key: "courseCount",
          label: "课程数量",
          value: "12门核心课程"
        },
        {
          id: 4,
          key: "format",
          label: "资料格式",
          value: "PDF/MP4"
        },
        {
          id: 5,
          key: "updateCycle",
          label: "更新周期",
          value: "季度更新"
        },
        {
          id: 6,
          key: "validity",
          label: "使用期限",
          value: "永久有效"
        },
        {
          id: 7,
          key: "downloads",
          label: "下载次数",
          value: "不限"
        },
        {
          id: 8,
          key: "support",
          label: "售后服务",
          value: "一对一答疑"
        }
      ]
    },
    {
      id: 15,
      name: "公务员考试真题",
      price: 79,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "learning-resources",
      subCategory: "certification",
      thirdCategory: "civil-service",
      tags: ["考试备考", "公务员", "真题"],
      stock: 100,
      sold: 50,
      description: "最新公务员考试真题及解析，助力考试备考。",
      specifications: [
        {
          id: 1,
          key: "type",
          label: "资料类型",
          value: "真题+解析"
        },
        {
          id: 2,
          key: "year",
          label: "年份",
          value: "2023"
        },
        {
          id: 3,
          key: "subject",
          label: "科目",
          value: "行测+申论"
        },
        {
          id: 4,
          key: "format",
          label: "资料格式",
          value: "PDF"
        },
        {
          id: 5,
          key: "pages",
          label: "页数",
          value: "500+"
        },
        {
          id: 6,
          key: "validity",
          label: "使用期限",
          value: "永久有效"
        },
        {
          id: 7,
          key: "updates",
          label: "更新服务",
          value: "考前更新"
        },
        {
          id: 8,
          key: "support",
          label: "答疑服务",
          value: "在线答疑"
        }
      ]
    },
    {
      id: 16,
      name: "雅思考试资料包",
      price: 299,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "learning-resources",
      subCategory: "language",
      thirdCategory: "ielts-toefl",
      tags: ["语言学习", "雅思考试", "备考资料"],
      stock: 50,
      sold: 30,
      description: "完整的雅思考试备考资料，包含听说读写全套训练。",
      specifications: [
        {
          id: 1,
          key: "type",
          label: "资料类型",
          value: "视频+文档+音频"
        },
        {
          id: 2,
          key: "level",
          label: "适用水平",
          value: "4-8分"
        },
        {
          id: 3,
          key: "content",
          label: "内容包含",
          value: "听说读写全科"
        },
        {
          id: 4,
          key: "duration",
          label: "课程时长",
          value: "100小时+"
        },
        {
          id: 5,
          key: "materials",
          label: "配套资料",
          value: "练习题+模拟题"
        },
        {
          id: 6,
          key: "validity",
          label: "使用期限",
          value: "12个月"
        },
        {
          id: 7,
          key: "updates",
          label: "更新服务",
          value: "定期更新"
        },
        {
          id: 8,
          key: "support",
          label: "学习指导",
          value: "一对一辅导"
        }
      ]
    },
    {
      id: 17,
      name: "摄影构图教程",
      price: 129,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "entertainment",
      subCategory: "hobbies",
      thirdCategory: "photography",
      tags: ["摄影技巧", "构图教程", "兴趣培养"],
      stock: 200,
      sold: 150,
      description: "专业摄影构图技巧教程，从入门到精通。",
      specifications: [
        {
          id: 1,
          key: "type",
          label: "课程类型",
          value: "视频教程"
        },
        {
          id: 2,
          key: "level",
          label: "适用级别",
          value: "初级到高级"
        },
        {
          id: 3,
          key: "duration",
          label: "课程时长",
          value: "20小时"
        },
        {
          id: 4,
          key: "chapters",
          label: "章节数量",
          value: "30节"
        },
        {
          id: 5,
          key: "equipment",
          label: "器材要求",
          value: "无特殊要求"
        },
        {
          id: 6,
          key: "practice",
          label: "实践作业",
          value: "含实战练习"
        },
        {
          id: 7,
          key: "certificate",
          label: "结业证书",
          value: "支持"
        },
        {
          id: 8,
          key: "support",
          label: "技术指导",
          value: "专业点评"
        }
      ]
    },
    {
      id: 18,
      name: "游戏主播装备",
      price: 1999,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "entertainment",
      subCategory: "game-peripherals",
      thirdCategory: "game-equipment",
      tags: ["游戏外设", "主播装备", "专业级"],
      stock: 20,
      sold: 15,
      description: "专业游戏主播推荐装备套装，提升直播效果。",
      specifications: [
        {
          id: 1,
          key: "type",
          label: "套装类型",
          value: "主播全套装备"
        },
        {
          id: 2,
          key: "includes",
          label: "包含设备",
          value: "麦克风+摄像头+灯光"
        },
        {
          id: 3,
          key: "quality",
          label: "设备等级",
          value: "专业级"
        },
        {
          id: 4,
          key: "compatibility",
          label: "兼容平台",
          value: "全平台"
        },
        {
          id: 5,
          key: "warranty",
          label: "保修期限",
          value: "12个月"
        },
        {
          id: 6,
          key: "brand",
          label: "品牌",
          value: "知名品牌"
        },
        {
          id: 7,
          key: "installation",
          label: "安装服务",
          value: "提供指导"
        },
        {
          id: 8,
          key: "support",
          label: "技术支持",
          value: "7*24小时"
        }
      ]
    }
  ,
    {
      id: 19,
      name: "视频会员年卡",
      price: 199,
      images: ["https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg"],
      category: "membership",
      subCategory: "video-membership",
      thirdCategory: "iqiyi",
      tags: ["视频会员", "年卡", "超值"],
      stock: 999,
      sold: 500,
      description: "视频平台年度会员，享受海量视频内容。",
      originalPrice: 299,
      specifications: [
        {
          id: 1,
          key: "memberType",
          label: "会员类型",
          value: "黄金会员"
        },
        {
          id: 2,
          key: "validity",
          label: "有效期",
          value: "365天"
        },
        {
          id: 3,
          key: "resolution",
          label: "观看清晰度",
          value: "4K超清"
        },
        {
          id: 4,
          key: "devices",
          label: "支持设备数",
          value: "4台设备"
        },
        {
          id: 5,
          key: "download",
          label: "下载权限",
          value: "支持"
        },
        {
          id: 6,
          key: "adFree",
          label: "广告特权",
          value: "无广告"
        },
        {
          id: 7,
          key: "playback",
          label: "离线播放",
          value: "支持"
        },
        {
          id: 8,
          key: "activation",
          label: "激活方式",
          value: "扫码激活"
        }
      ]
    },
    {
      id: 20,
      name: "音乐会员季卡",
      price: 88,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/music-vip1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/music-vip2.jpg"
      ],
      category: "membership",
      subCategory: "music-membership",
      thirdCategory: "netease",
      tags: ["音乐会员", "季卡", "特惠"],
      stock: 888,
      sold: 300,
      description: "音乐平台季度会员，畅享无损音质。",
      originalPrice: 108,
      specifications: [
        {
          id: 1,
          key: "memberType",
          label: "会员类型",
          value: "黑胶VIP"
        },
        {
          id: 2,
          key: "validity",
          label: "有效期",
          value: "90天"
        },
        {
          id: 3,
          key: "quality",
          label: "音质",
          value: "Hi-Res无损"
        },
        {
          id: 4,
          key: "download",
          label: "下载特权",
          value: "无限下载"
        },
        {
          id: 5,
          key: "mv",
          label: "MV画质",
          value: "1080P"
        },
        {
          id: 6,
          key: "adFree",
          label: "广告特权",
          value: "无广告"
        },
        {
          id: 7,
          key: "lyrics",
          label: "歌词特权",
          value: "逐字歌词"
        },
        {
          id: 8,
          key: "activation",
          label: "激活方式",
          value: "扫码激活"
        }
      ]
    },
    {
      id: 21,
      name: "阅读会员月卡",
      price: 30,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/read-vip1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/read-vip2.jpg"
      ],
      category: "membership",
      subCategory: "reading-membership",
      thirdCategory: "kindle",
      tags: ["阅读会员", "月卡", "优惠"],
      stock: 777,
      sold: 200,
      description: "电子书阅读平台月度会员，海量图书免费读。",
      originalPrice: 40,
      specifications: [
        {
          id: 1,
          key: "memberType",
          label: "会员类型",
          value: "白金会员"
        },
        {
          id: 2,
          key: "validity",
          label: "有效期",
          value: "30天"
        },
        {
          id: 3,
          key: "books",
          label: "免费图书",
          value: "100万+"
        },
        {
          id: 4,
          key: "devices",
          label: "支持设备",
          value: "全平台"
        },
        {
          id: 5,
          key: "download",
          label: "离线下载",
          value: "支持"
        },
        {
          id: 6,
          key: "sync",
          label: "同步功能",
          value: "云同步"
        },
        {
          id: 7,
          key: "notes",
          label: "笔记功能",
          value: "支持"
        },
        {
          id: 8,
          key: "activation",
          label: "激活方式",
          value: "账号激活"
        }
      ]
    },
  
   
   
    {
      id: 22,
      name: "高端商业计划书模板",
      price: 29,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/template1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/template2.jpg"
      ],
      category: "digital-resources",
      subCategory: "document-templates",
      thirdCategory: "word-templates",
      tags: ["Word模板", "商业计划书", "热销"],
      stock: 200,
      sold: 800,
      description: "专业的商业计划书Word模板，包含完整的框架和案例",
      originalPrice: 39,
      specifications: [
        {
          id: 1,
          key: "format",
          label: "模板格式",
          value: "Word 2016-2024"
        },
        {
          id: 2,
          key: "size",
          label: "文件大小",
          value: "15MB"
        },
        {
          id: 3,
          key: "pages",
          label: "页面数量",
          value: "50+"
        },
        {
          id: 4,
          key: "templates",
          label: "模板数量",
          value: "10套"
        },
        {
          id: 5,
          key: "license",
          label: "使用授权",
          value: "可商用"
        },
        {
          id: 6,
          key: "update",
          label: "更新服务",
          value: "终身更新"
        },
        {
          id: 7,
          key: "style",
          label: "设计风格",
          value: "简约商务"
        },
        {
          id: 8,
          key: "scene",
          label: "适用场景",
          value: "创业融资/商业策划"
        }
      ]
    },
    {
      id: 23,
      name: "PPT高端模板合集",
      price: 39,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/ppt1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/ppt2.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/ppt3.jpg"
      ],
      category: "digital-resources",
      subCategory: "document-templates",
      thirdCategory: "ppt-templates",
      tags: ["PPT模板", "商务演示", "精品"],
      stock: 1000,
      sold: 680,
      description: "精选高端PPT模板，包含商务、教育、营销等多个主题",
      originalPrice: 59,
      specifications: [
        {
          id: 1,
          key: "format",
          label: "模板格式",
          value: "PPT/PPTX"
        },
        {
          id: 2,
          key: "quantity",
          label: "模板数量",
          value: "100+"
        },
        {
          id: 3,
          key: "compatibility",
          label: "兼容版本",
          value: "Office 2010-2024"
        },
        {
          id: 4,
          key: "theme",
          label: "主题类型",
          value: "商务/教育/营销"
        },
        {
          id: 5,
          key: "elements",
          label: "元素类型",
          value: "图表/图标/动画"
        },
        {
          id: 6,
          key: "license",
          label: "使用授权",
          value: "可商用"
        },
        {
          id: 7,
          key: "update",
          label: "更新服务",
          value: "季度更新"
        },
        {
          id: 8,
          key: "support",
          label: "技术支持",
          value: "提供指导"
        }
      ]
    },
    {
      id: 24,
      name: "摄影后期滤镜包",
      price: 69,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/filter1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/filter2.jpg"
      ],
      category: "digital-resources",
      subCategory: "design-resources",
      thirdCategory: "photo-filters",
      tags: ["摄影滤镜", "后期处理", "专业"],
      stock: 500,
      sold: 320,
      description: "专业摄影后期滤镜，适用于人像、风景等多种场景",
      originalPrice: 99,
      specifications: [
        {
          id: 1,
          key: "software",
          label: "适用软件",
          value: "LR/PS/手机"
        },
        {
          id: 2,
          key: "quantity",
          label: "滤镜数量",
          value: "50+"
        },
        {
          id: 3,
          key: "style",
          label: "滤镜风格",
          value: "人像/风景/街拍"
        },
        {
          id: 4,
          key: "format",
          label: "文件格式",
          value: "DNG/XMP"
        },
        {
          id: 5,
          key: "compatibility",
          label: "版本兼容",
          value: "全版本"
        },
        {
          id: 6,
          key: "tutorial",
          label: "使用教程",
          value: "视频教程"
        },
        {
          id: 7,
          key: "update",
          label: "更新服务",
          value: "终身更新"
        },
        {
          id: 8,
          key: "support",
          label: "技术支持",
          value: "一对一指导"
        }
      ]
    },
    {
      id: 25,
      name: "3D建模素材库",
      price: 199,
      images: [
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/3d1.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/3d2.jpg",
        "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/3d3.jpg"
      ],
      category: "digital-resources",
      subCategory: "design-resources",
      thirdCategory: "3d-models",
      tags: ["3D模型", "建模素材", "场景道具"],
      stock: 300,
      sold: 150,
      description: "高质量3D模型素材库，包含场景、道具、人物等多种模型",
      originalPrice: 299,
      specifications: [
        {
          id: 1,
          key: "format",
          label: "文件格式",
          value: "FBX/OBJ/MAX"
        },
        {
          id: 2,
          key: "quantity",
          label: "模型数量",
          value: "1000+"
        },
        {
          id: 3,
          key: "category",
          label: "模型分类",
          value: "场景/道具/人物"
        },
        {
          id: 4,
          key: "quality",
          label: "模型质量",
          value: "高精度"
        },
        {
          id: 5,
          key: "texture",
          label: "贴图格式",
          value: "PBR材质"
        },
        {
          id: 6,
          key: "compatibility",
          label: "软件兼容",
          value: "3DMax/Maya/C4D"
        },
        {
          id: 7,
          key: "license",
          label: "使用授权",
          value: "可商用"
        },
        {
          id: 8,
          key: "download",
          label: "下载方式",
          value: "分类下载"
        }
      ]
    }
  ];
  
