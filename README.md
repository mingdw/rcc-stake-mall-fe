# RCC Stake Fe React

## 1. 页面路由设计

- 首页
    - 首页
        - 平台资金规模统计
        - 支持的质押资产
        - 平台大事件
    - 质押池
    - 代币商场
    - 帮助中心

## 2. 代币商场商品分类设计
- NFT专区 （应用领域：艺术创作、音乐作品、游戏道具、虚拟资产、体育收藏、域名; 内容形式：图片、视频、音频、3D模型、文本类型、其它）
      - 数字艺术品（技术形式：区块链数字艺术品、人工智能生成艺术品、传统数字艺术形式；应用场景：收藏型数字艺术品、装饰型数字艺术品、功能性数字艺术品、文化传播型数字艺术品）
        - 潮流艺术画作NFT （风格:赛博朋克、波普艺术、新艺术运动风、简约、黑白；主题：未来都市、复古情怀、人物、汽车）
        - 先锋音乐作品NFT （风格：电子乐、嘻哈；时长：短曲（1-3分钟）、中长曲（3-8分钟）；发布平台：知名 NFT 音乐平台（Mint Songs、OneOf）、传统音乐流媒体 NFT 专区（Spotify 部分支持、腾讯音乐娱乐集团探索中）、独立音乐发布平台（Bandcamp 支持 NFT 发行）、歌手 / 音乐人：新兴独立音乐人、小众地下说唱团体、电子音乐制作人））
        - 视频艺术NFT （主题：动画短片、实验影像、纪录短片、剧情短视频、音乐视频；风格：激情、舒缓、环绕、立体）
        - 文本类型NFT （类型：诗歌、小说、散文、戏剧脚本、艺术评论；风格：爱情、科幻、历史、社会批判、哲学思考、成长励志）
        - 其它类型NFT
      - 虚拟身份（技术形式：区块链数字艺术品、人工智能生成艺术品、传统数字艺术形式；应用场景：收藏型数字艺术品、装饰型数字艺术品、功能性数字艺术品、文化传播型数字艺术品）
        - 独特头像NFT （风格：卡通风格、写实风格、像素风格、抽象风格、古风风格；稀有度：普通、稀有、史诗、传说；主题：动物主题、幻想生物主题、科幻主题、神话主题、职业主题）
        - 定制虚拟形象NFT （体型：高挑、矮小、健壮、瘦弱；肤色：白色、黑色、黄色、其他；发型：长发、短发、卷发、光头；服饰：日常服装、古装、运动装、科幻装备；配饰：帽子、眼镜、项链、手链、武器）
        - 专属社交身份NFT （社交平台：推特专属身份、抖音专属身份、微信专属身份、小红书专属身份；身份类型：认证创作者身份、社区管理员身份、特定圈子成员身份、付费会员身份）
      - 游戏资产 （）
        - 游戏道具NFT （游戏类型：角色扮演（RPG）、策略游戏（SLG）、射击游戏（FPS/TPS）、模拟经营（SIM）；稀有度：普通、精良、稀有、史诗、传说）
        - 游戏装备NFT （装备部位：头部（头盔、帽子）、躯干（铠甲、上衣）、手部（手套、护手）、脚部（靴子、战靴）、武器（剑、枪、法杖、弓）、饰品（项链、戒指、手镯、耳环））
        - 游戏角色NFT （职业：战士（高生命值、近战输出）、法师（高魔法伤害、远程攻击）、刺客（高爆发、高机动性）、牧师（治疗队友、辅助增益）、猎人（远程物理攻击、擅长控制）、坦克（高防御力、吸引仇恨））
      - 收藏品（）
        - 体育赛事纪念NFT （体育项目：足球、篮球、网球、田径、游泳、拳击、赛车、羽毛球、乒乓球；类型：奥运会、世界杯、职业联赛（NBA、英超、西甲、欧冠等）、洲际锦标赛、国际大奖赛；主题：比赛关键进球、夺冠瞬间、破纪录时刻、传奇运动员高光时刻、经典比赛全场回放片段）
        - 历史文化收藏NFT （历史时期：古代（古埃及、古希腊、古罗马、中国古代王朝等）、中世纪、近代、现代；文化主题：艺术（古代绘画、雕塑数字化复刻）、科技（古代发明创造介绍）、宗教（宗教文物、古籍）、民俗（传统节日、民间技艺））
        - 名人周边NFT （名人领域：娱乐明星、体育明星、文化名人（作家、画家、学者）、商界精英；周边类型：签名（数字签名图片、视频）、照片（独家拍摄、幕后照片）、视频祝福、私人物品数字化（明星用过的道具、服装的数字模型）、语音留言）
        - 限量版徽章NFT （主题：节日（春节、圣诞节、情人节等节日主题）、动漫（热门动漫角色、场景）、游戏（知名游戏角色、地图）、品牌（知名品牌 logo、标志性元素）、活动（音乐节、展会、运动会））
      - 虚拟房地产（）
        - 元宇宙地块NFT （平台：Decentraland、The Sandbox、Somnium Space、Cryptovoxels；规划用途：商业开发（建造商场、酒店、写字楼）、住宅建设（别墅、公寓）、公共设施（公园、图书馆、医院）、娱乐场所（游乐场、电影院、酒吧））
        - 虚拟建筑NFT （建筑用途：住宅、商业（店铺、写字楼）、公共设施（博物馆、医院）、娱乐（剧院、酒吧）；风格：中式（故宫风格宫殿、江南水乡民居）、欧式（哥特式教堂、巴洛克风格建筑）、现代（简约玻璃幕墙建筑、异形建筑）、未来主义（科幻感十足的摩天大楼）、复古风格（民国建筑、维多利亚时代建筑））
        - 数字空间NFT （类型：办公空间、社交空间、展览空间、娱乐空间、学习空间；）
      - 数字证书（）
        - 教育认证NFT （教育层次：小学、中学、大学（本科、硕士、博士）、职业培训（编程培训、烹饪培训、美容美发培训）、语言培训（英语、日语、法语培训）；认证类型：学历证书、技能证书（教师资格证、会计证、电工证数字化）、荣誉证书（奖学金证书、优秀学生证书）、结业证书；颁发机构：公立学校、私立学校、知名培训机构、行业协会）
        - 会员资格NFT （平台：视频平台会员（爱奇艺、腾讯视频、Netflix）、音乐平台会员（网易云音乐、QQ 音乐、Spotify）、电商平台会员（淘宝 88VIP、京东 PLUS 会员）、知识付费平台会员（得到、喜马拉雅会员）、游戏平台会员（Steam 会员、腾讯游戏心悦会员）；会员权益：观看特权（跳过广告、观看独家内容）、下载特权（无损音乐下载、高清视频下载）、折扣优惠（购物折扣、课程折扣）、优先购买权（抢购限量商品、优先报名活动）、专属客服、专属皮肤或道具（游戏平台）；有效期：月度、季度、年度、长期（如终身会员））
        - 活动门票NFT （类型：演唱会、音乐节、体育赛事、展会（艺术展、科技展）、研讨会（学术研讨会、商业论坛）、戏剧演出；座位等级：VIP（前排、专属通道、贵宾休息室）、前排、普通、站票、特殊视角（如舞台侧面独特视角））
        - 数字版权NFT （类型：文字版权（小说、论文、诗歌）、音乐版权（原创歌曲、伴奏）、影视版权（电影、电视剧、短视频）、软件版权（手机 APP、电脑软件）、美术作品版权（绘画、雕塑、设计作品）、摄影作品版权；授权方式：独家授权、非独家授权、限时授权、地域限制授权（特定国家或地区授权）：版权交易模式：一次性买断、版税分成（如音乐版权按播放量分成）、授权合作开发衍生作品（如小说改编影视版权分成）
      - 金融资产（）
        - 数字债券NFT （类型：政府债券（国债、地方政府债券）、企业债券（普通企业债、可转债）、市政债券（城市基础设施建设债券）；期限：短期（1 年以内）、中期（1 - 5 年）、长期（5 年以上）；利率类型：固定利率、浮动利率、零息债券）
        - 资产凭证NFT （类型：不动产（房屋、土地）、动产（汽车、珠宝）、知识产权（专利、商标、著作权）、金融资产（股票、基金份额）；凭证用途：抵押（用于获取贷款）、交易（在区块链资产交易平台买卖）、融资（作为融资抵押物或权益证明））
        - 股权通证NFT （类型：初创企业、成熟企业、上市公司、独角兽企业；股权比例：小额股权（低于 1%）、大额股权（5% - 20%）、控股股权（超过 50%）；股权流动性：可自由转让、限制转让（锁定期限制、特定条件下转让）、优先购买权约定；分红模式：按季度分红、按年度分红、盈利达到一定标准分红）
  
  