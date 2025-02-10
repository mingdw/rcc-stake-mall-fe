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
        scenes: ['工作总结', '培训课件', '简历制作', '商业提案', '数据分析', '项目汇报'],
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
  


// 模拟更多的商品数据
export const products = [
    // NFT专区商品
    {
      id: 1,
      name: "稀有数字头像#001",
      price: 1000,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2Fnft.jpeg",
      category: "nft",
      subCategory: "virtual-identity",
      thirdCategory: "unique-avatar",
      tags: ["稀有头像", "NFT", "收藏展示"],
      stock: 10,
      sold: 5,
      description: "这是一款稀有的数字头像，具有独特的艺术风格。",
      originalPrice: 1200
    },
    {
      id: 2,
      name: "限定版头像#002",
      price: 800,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F0965724108dcc1f441fd075a70fe181e.jpeg",
      category: "nft",
      subCategory: "virtual-identity",
      thirdCategory: "custom-avatar",
      tags: ["限定头像", "NFT", "社交分享"],
      stock: 5,
      sold: 2,
      description: "这是一款限定的头像，具有很高的收藏价值。 通过该头像，你可以展示你的个性和品味。",
      originalPrice: 1000
    },
    {
      id: 3,
      name: "数字艺术画作#001",
      price: 2000,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F073ec1135b56090699ca2d0ca02a9077.jpg",
      category: "nft",
      subCategory: "digital-art",
      thirdCategory: "trendy-art",
      tags: ["数字画作", "NFT", "艺术收藏"],
      stock: 8,
      sold: 3,
      description: "这是一幅数字艺术画作，具有很高的艺术价值。",
      originalPrice: 2200
    },
    {
      id: 4,
      name: "动态艺术品#001",
      price: 1500,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2Fd435e9af0c48e080a4544b59269ff76f.gif",
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
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F24d32ae87bf57e10c27b6ebc499d4542.jpg",
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
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F17ba0e0f202cc98548dd10476a75a135.jpeg",
      category: "digital-resources",
      subCategory: "document-templates",
      thirdCategory: "word-templates",
      tags: ["文档模板", "工作总结", "简约商务"],
      stock: 5,
      sold: 2,
      description: "这是一款Microsoft Office的订阅服务，具有很高的办公效率。"
    },
    {
      id: 7,
      name: "Adobe Creative Cloud",
      price: 599,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F814a54b8649bf2a803bfe57105005f35.png",
      category: "digital-resources",
      subCategory: "document-templates",
      thirdCategory: "excel-templates",
      tags: ["设计软件", "创意设计", "科技感强"],
      stock: 3,
      sold: 1,
      description: "这是一款Adobe Creative Cloud的订阅服务，具有很高的设计效率。"
    },
    {
      id: 8,
      name: "云存储服务 100GB",
      price: 99,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F3fe11ac10720ed6595cd1d6a55177219.jpeg",
      category: "digital-resources",
      subCategory: "image-resources",
      thirdCategory: "hd-wallpapers",
      tags: ["云存储", "服务"],
      stock: 10,
      sold: 5,
      description: "这是一项云存储服务，具有很高的存储效率。"
    },
    {
      id: 9,
      name: "自动云备份服务",
      price: 199,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F0a4dbaf3307d8e471c83fcbb2dde2e00.jpeg",
      category: "digital-resources",
      subCategory: "sound-effects",
      thirdCategory: "festival-sounds",
      tags: ["云备份", "服务"],
      stock: 5,
      sold: 2,
      description: "这是一项自动云备份服务，具有很高的数据备份效率。"
    },
    // 生活娱乐类
    {
      id: 10,
      name: "优酷年度会员",
      price: 198,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F52c92ba61a8bb8006db8efc416fa4e86.png",
      category: "entertainment",
      subCategory: "media",
      thirdCategory: "popular-movies",
      tags: ["优酷会员", "视频"],
      stock: 10,
      sold: 5,
      description: "这是一项优酷会员服务，具有很高的视频观看体验。"
    },
    {
      id: 11,
      name: "爱奇艺黄金会员",
      price: 188,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F107a9dd38558877f351b84fe921327d5.png",
      category: "entertainment",
      subCategory: "media",
      thirdCategory: "art-films",
      tags: ["爱奇艺会员", "视频"],
      stock: 5,
      sold: 2,
      description: "这是一项爱奇艺黄金会员服务，具有很高的视频观看体验。"
    },
    {
      id: 12,
      name: "QQ音乐豪华绿钻",
      price: 168,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F64189e1ca6d94ece43b56840d48538a6.jpeg",
      category: "entertainment",
      subCategory: "game-peripherals",
      thirdCategory: "game-gifts",
      tags: ["QQ音乐会员", "音乐"],
      stock: 10,
      sold: 5,
      description: "这是一项QQ音乐豪华绿钻服务，具有很高的音乐享受体验。"
    },
    {
      id: 13,
      name: "网易云音乐黑胶VIP",
      price: 158,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F682d21aa36cbc92a0c43620607e2df61.jpeg",
      category: "entertainment",
      subCategory: "hobbies",
      thirdCategory: "photography",
      tags: ["网易云音乐会员", "音乐"],
      stock: 8,
      sold: 3,
      description: "这是一项网易云音乐黑胶VIP服务，具有很高的音乐享受体验。"
    },
    // 学习资源类
    {
      id: 14,
      name: "英雄联盟点券充值服务",
      price: 100,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F180108d0360bb77b5e7b99fc3c8320ad.jpg",
      category: "learning-resources",
      subCategory: "academic",
      thirdCategory: "university-courses",
      tags: ["英雄联盟点券", "游戏"],
      stock: 10,
      sold: 5,
      description: "这是一项英雄联盟点券充值服务，具有很高的游戏体验。"
    },
    {
      id: 15,
      name: "Steam充值卡",
      price: 200,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F2db6a98e3fbbdbcb7daed8395fdf17de.jpg",
      category: "learning-resources",
      subCategory: "certification",
      thirdCategory: "civil-service",
      tags: ["Steam点券", "游戏"],
      stock: 5,
      sold: 2,
      description: "这是一项Steam充值卡服务，具有很高的游戏体验。"
    },
    {
      id: 16,
      name: "LOL限定皮肤",
      price: 88,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products%2F2db6a98e3fbbdbcb7daed8395fdf17de.jpg",
      category: "learning-resources",
      subCategory: "language",
      thirdCategory: "ielts-toefl",
      tags: ["游戏皮肤", "游戏"],
      stock: 10,
      sold: 5,
      description: "这是一款LOL限定皮肤，具有很高的游戏体验。"
    },
    // 会员权益类
    {
      id: 17,
      name: "王者荣耀限定皮肤",
      price: 168,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/0e1b6c3393ebb46069aba381768002bf.jpeg",
      category: "membership",
      subCategory: "video-membership",
      thirdCategory: "iqiyi",
      tags: ["游戏皮肤", "游戏"],
      stock: 5,
      sold: 2,
      description: "这是一款王者荣耀限定皮肤，具有很高的游戏体验。"
    },
    {
      id: 18,
      name: "英雄联盟手办",
      price: 299,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/bb1cdbb7af03ada69e892fc80502e9a0.jpeg",
      category: "membership",
      subCategory: "music-membership",
      thirdCategory: "netease",
      tags: ["手办模型", "游戏"],
      stock: 10,
      sold: 5,
      description: "这是一款英雄联盟手办，具有很高的游戏体验。"
    },
    {
      id: 19,
      name: "王者荣耀主题T恤",
      price: 128,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/5ee2d11d4764d94cbf0b339c58b1439a.jpeg",
      category: "membership",
      subCategory: "reading-membership",
      thirdCategory: "zhangyue",
      tags: ["主题服装", "游戏"],
      stock: 8,
      sold: 3,
      description: "这是一款王者荣耀主题T恤，具有很高的游戏体验。"
    },
    // 软件服务类
    {
      id: 20,
      name: "王者荣耀限定皮肤",
      price: 168,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/0e1b6c3393ebb46069aba381768002bf.jpeg",
      category: "software",
      subCategory: "office-software",
      thirdCategory: "ms-office",
      tags: ["游戏皮肤", "游戏"],
      stock: 5,
      sold: 2,
      description: "这是一款王者荣耀限定皮肤，具有很高的游戏体验。"
    },
    {
      id: 21,
      name: "英雄联盟手办",
      price: 299,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/bb1cdbb7af03ada69e892fc80502e9a0.jpeg",
      category: "software",
      subCategory: "design-software",
      thirdCategory: "adobe",
      tags: ["手办模型", "游戏"],
      stock: 10,
      sold: 5,
      description: "这是一款英雄联盟手办，具有很高的游戏体验。"
    },
    {
      id: 22,
      name: "王者荣耀主题T恤",
      price: 128,
      image: "https://rcc01-1251895040.cos.ap-guangzhou.myqcloud.com/products/5ee2d11d4764d94cbf0b339c58b1439a.jpeg",
      category: "software",
      subCategory: "system-tools",
      thirdCategory: "windows",
      tags: ["主题服装", "游戏"],
      stock: 8,
      sold: 3,
      description: "这是一款王者荣耀主题T恤，具有很高的游戏体验。"
    },
    // Word模板 - 商务文档
    {
      id: 23,
      name: '高端商业计划书Word模板',
      price: 29,
      originalPrice: 39,
      image: '/images/business-plan-word.png',
      category: 'digital-resources',
      subCategory: 'document-templates',
      thirdCategory: 'word-templates',
      tags: ['Word模板', '商业计划书'],
      stock: 200,
      sold: 800,
      description: '专业的商业计划书Word模板，包含完整的框架和案例'
    },
    // Excel模板 - 财务报表
    {
      id: 24,
      name: '财务分析Excel模板套装',
      price: 49,
      originalPrice: 69,
      image: '/images/finance-excel.png',
      category: 'digital-resources',
      subCategory: 'document-templates',
      thirdCategory: 'excel-templates',
      tags: ['Excel模板', '财务分析'],
      stock: 150,
      sold: 600,
      description: '专业的财务分析Excel模板，包含多种财务报表和分析工具'
    },
    // PPT模板 - 商务汇报
    {
      id: 25,
      name: '商务汇报PPT模板合集',
      price: 39,
      originalPrice: 59,
      image: '/images/business-ppt.png',
      category: 'digital-resources',
      subCategory: 'document-templates',
      thirdCategory: 'ppt-templates',
      tags: ['PPT模板', '商务汇报'],
      stock: 300,
      sold: 1200,
      description: '精美的商务汇报PPT模板，包含多种风格和布局'
    },
    // PDF模板 - 合同模板
    {
      id: 26,
      name: '标准合同PDF模板包',
      price: 19,
      originalPrice: 29,
      image: '/images/contract-pdf.png',
      category: 'digital-resources',
      subCategory: 'document-templates',
      thirdCategory: 'word-templates',
      tags: ['PDF模板', '合同模板'],
      stock: 250,
      sold: 900,
      description: '常用合同PDF模板，包含多种标准合同格式'
    }
  ];
  
