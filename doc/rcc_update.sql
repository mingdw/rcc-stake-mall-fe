---1.商品目录分类表-----
CREATE TABLE `rcc_category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL COMMENT '名称',
    `parent_id` BIGINT COMMENT '父级id',
    `level` INT COMMENT '级别',
    `sort` INT COMMENT '排序',
    `icon` VARCHAR(255) COMMENT '图标',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default '' COMMENT '更新人',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---2.属性组-----
CREATE TABLE `rcc_attr_group` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `attr_group_name` VARCHAR(255) NOT NULL COMMENT '名称',
    `attr_group_code` VARCHAR(255) NOT NULL COMMENT '编码',
    `sort` INT COMMENT '排序',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default '' COMMENT '更新人',
    PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---3.属性----
CREATE TABLE `rcc_attr` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `attr_name` VARCHAR(255) NOT NULL COMMENT '名称',
    `attr_code` VARCHAR(255) NOT NULL COMMENT '编码',
    `attr_group_id` BIGINT NOT NULL default 0 COMMENT '属性组id',
    `icon` VARCHAR(255) COMMENT '图标',
    `attr_type` INT COMMENT '属性类型',
    `sort` INT COMMENT '排序',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default ''  COMMENT '更新人',
    PRIMARY KEY (`id`),
    KEY `idx_attr_group_id` (`attr_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---4.目录属性组关联表---
CREATE TABLE `rcc_category_attr_group` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `category_id` BIGINT NOT NULL COMMENT '商品目录分类id',
    `attr_group_id` BIGINT NOT NULL COMMENT '属性组id',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default '' COMMENT '更新人',
    PRIMARY KEY (`id`),
    KEY `idx_category_id` (`category_id`),
    KEY `idx_attr_group_id` (`attr_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---5.商品spu----
CREATE TABLE `rcc_product_spu` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(255) NOT NULL COMMENT '编码',
    `name` VARCHAR(255) NOT NULL COMMENT '名称',
    `category_id` INT NOT NULL COMMENT '商品目录分类id',
    `brand` VARCHAR(255) NOT NULL COMMENT '品牌',
    `description` VARCHAR(255) COMMENT '描述',
    `status` INT NOT NULL COMMENT '状态',
    `images` VARCHAR(1000) COMMENT '图片',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default '' COMMENT '更新人',
    PRIMARY KEY (`id`),
    KEY `idx_category_id` (`category_id`),
    UNIQUE KEY `uk_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---6.商品spu详情----
CREATE TABLE `rcc_product_spu_detail` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `product_spu_id` BIGINT NOT NULL COMMENT '商品spu id',
    `detail` LONGBLOB COMMENT '详情',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default '' COMMENT '更新人',
    PRIMARY KEY (`id`),
    KEY `idx_product_spu_id` (`product_spu_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---7.商品spu属性组关联表----
CREATE TABLE `rcc_product_spu_attr_group` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `product_spu_id` BIGINT NOT NULL COMMENT '商品spu id',
    `attr_group_id` BIGINT NOT NULL COMMENT '属性组id',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default '' COMMENT '更新人',
    PRIMARY KEY (`id`),
    KEY `idx_product_spu_id` (`product_spu_id`),
    KEY `idx_attr_group_id` (`attr_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---8.商品spu属性关联表----
CREATE TABLE `rcc_product_spu_attr` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `product_spu_id` BIGINT NOT NULL COMMENT '商品spu id',
    `attr_id` BIGINT NOT NULL COMMENT '属性id',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default '' COMMENT '更新人',
    PRIMARY KEY (`id`),
    KEY `idx_product_spu_id` (`product_spu_id`),
    KEY `idx_attr_id` (`attr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---9.商品sku----
CREATE TABLE `rcc_product_sku` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `product_spu_id` BIGINT NOT NULL COMMENT '商品spu id',
    `sku_code` VARCHAR(255) NOT NULL COMMENT 'sku编码',
    `category_id` BIGINT NOT NULL COMMENT '商品目录分类id',
    `price` DECIMAL(10,2) NOT NULL COMMENT '价格',
    `stock` INT NOT NULL COMMENT '库存',
    `sale_count` INT NOT NULL COMMENT '销量',
    `status` INT NOT NULL COMMENT '状态',
    `images` VARCHAR(1000) COMMENT '图片',
    `title` VARCHAR(255) COMMENT '标题',
    `sub_title` VARCHAR(255) COMMENT '副标题',
    `description` VARCHAR(255) COMMENT '描述',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default '' COMMENT '更新人',
    PRIMARY KEY (`id`),
    KEY `idx_product_spu_id` (`product_spu_id`),
    KEY `idx_category_id` (`category_id`),
    UNIQUE KEY `uk_sku_code` (`sku_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---10.商品sku属性组关联表----
CREATE TABLE `rcc_product_sku_attr_group` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `product_sku_id` BIGINT NOT NULL COMMENT '商品sku id',
    `attr_group_id` BIGINT NOT NULL COMMENT '属性组id',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default '' COMMENT '更新人',
    PRIMARY KEY (`id`),
    KEY `idx_product_sku_id` (`product_sku_id`),
    KEY `idx_attr_group_id` (`attr_group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

---11.商品sku属性关联表----
CREATE TABLE `rcc_product_sku_attr` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `product_sku_id` BIGINT NOT NULL COMMENT '商品sku id',
    `attr_id` BIGINT NOT NULL COMMENT '属性id',
    `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    `is_deleted` INT DEFAULT 0 COMMENT '是否删除',
    `creator` VARCHAR(64) NOT NULL default '' COMMENT '创建人',
    `updator` VARCHAR(64) NOT NULL default ''  COMMENT '更新人',
    PRIMARY KEY (`id`),
    KEY `idx_product_sku_id` (`product_sku_id`),
    KEY `idx_attr_id` (`attr_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 插入一级分类
INSERT INTO `rcc_category` (`id`, `name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES
(1, 'NFT专区', NULL, 1, 1, 'CrownOutlined', 'admin', 'admin'),
(2, '数字素材类', NULL, 1, 2, 'FileOutlined', 'admin', 'admin'),
(3, '学习资源类', NULL, 1, 3, 'ReadOutlined', 'admin', 'admin'),
(4, '生活娱乐类', NULL, 1, 4, 'PlayCircleOutlined', 'admin', 'admin'),
(5, '会员权益类', NULL, 1, 5, 'CrownOutlined', 'admin', 'admin'),
(6, '软件服务类', NULL, 1, 6, 'AppstoreOutlined', 'admin', 'admin');

-- 插入二级分类
INSERT INTO `rcc_category` (`id`, `name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES
-- NFT专区的二级分类
(101, '数字艺术品NFT', 1, 2, 1, 'PictureOutlined', 'admin', 'admin'),
(102, '虚拟身份NFT', 1, 2, 2, 'UserOutlined', 'admin', 'admin'),
(103, '游戏资产NFT', 1, 2, 3, 'TrophyOutlined', 'admin', 'admin'),

-- 数字素材类的二级分类
(201, '文档模板', 2, 2, 1, 'FileTextOutlined', 'admin', 'admin'),
(202, '图片素材', 2, 2, 2, 'PictureOutlined', 'admin', 'admin'),
(203, '音效素材', 2, 2, 3, 'CustomerServiceOutlined', 'admin', 'admin'),

-- 学习资源类的二级分类
(301, '学术资料', 3, 2, 1, 'BookOutlined', 'admin', 'admin'),
(302, '职业考证', 3, 2, 2, 'SafetyCertificateOutlined', 'admin', 'admin'),
(303, '语言学习', 3, 2, 3, 'TranslationOutlined', 'admin', 'admin'),

-- 生活娱乐类的二级分类
(401, '影视音乐', 4, 2, 1, 'VideoCameraOutlined', 'admin', 'admin'),
(402, '游戏周边', 4, 2, 2, 'GiftOutlined', 'admin', 'admin'),
(403, '兴趣爱好', 4, 2, 3, 'CameraOutlined', 'admin', 'admin'),

-- 会员权益类的二级分类
(501, '视频平台会员', 5, 2, 1, 'PlayCircleOutlined', 'admin', 'admin'),
(502, '音乐平台会员', 5, 2, 2, 'CustomerServiceOutlined', 'admin', 'admin'),
(503, '阅读平台会员', 5, 2, 3, 'ReadOutlined', 'admin', 'admin'),

-- 软件服务类的二级分类
(601, '办公软件', 6, 2, 1, 'FileWordOutlined', 'admin', 'admin'),
(602, '设计软件', 6, 2, 2, 'SketchOutlined', 'admin', 'admin'),
(603, '系统工具', 6, 2, 3, 'WindowsOutlined', 'admin', 'admin');

-- 插入三级分类
INSERT INTO `rcc_category` (`id`, `name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES
-- NFT专区-数字艺术品NFT的三级分类
(1011, '潮流艺术画作NFT', 101, 3, 1, 'HighlightOutlined', 'admin', 'admin'),
(1012, '先锋音乐作品NFT', 101, 3, 2, 'CustomerServiceOutlined', 'admin', 'admin'),
(1013, '3D创意雕塑NFT', 101, 3, 3, 'GiftOutlined', 'admin', 'admin'),

-- NFT专区-虚拟身份NFT的三级分类
(1021, '独特头像NFT', 102, 3, 1, 'UserOutlined', 'admin', 'admin'),
(1022, '定制虚拟形象NFT', 102, 3, 2, 'SkinOutlined', 'admin', 'admin'),
(1023, '专属社交身份NFT', 102, 3, 3, 'TeamOutlined', 'admin', 'admin'),

-- 以此类推，继续插入其他三级分类...
-- 数字素材类-文档模板的三级分类
(2011, 'Word商务报告模板', 201, 3, 1, 'FileWordOutlined', 'admin', 'admin'),
(2012, 'Excel财务报表模板', 201, 3, 2, 'FileExcelOutlined', 'admin', 'admin'),
(2013, 'PPT项目展示模板', 201, 3, 3, 'FilePptOutlined', 'admin', 'admin');

-- 为了避免SQL文件过长，其他三级分类可以按需添加

-- 插入属性组数据
INSERT INTO `rcc_attr_group` (`id`, `attr_group_name`, `attr_group_code`, `sort`, `creator`, `updator`) VALUES
(1, '场景', 'scene', 1, 'admin', 'admin'),
(2, '风格', 'style', 2, 'admin', 'admin');

-- 插入属性数据
INSERT INTO `rcc_attr` (`id`, `attr_name`, `attr_code`, `attr_group_id`, `icon`, `sort`, `creator`, `updator`) VALUES
-- 场景属性
(101, '收藏展示', 'collect', 1, 'CrownOutlined', 1, 'admin', 'admin'),
(102, '社交分享', 'share', 1, 'UserOutlined', 2, 'admin', 'admin'),
(103, '游戏体验', 'game', 1, 'TrophyOutlined', 3, 'admin', 'admin'),
(104, '投资理财', 'invest', 1, 'TrophyOutlined', 4, 'admin', 'admin'),
(105, '艺术收藏', 'art', 1, 'TrophyOutlined', 5, 'admin', 'admin'),
(106, '工作总结', 'work-summary', 1, 'FileTextOutlined', 6, 'admin', 'admin'),
(107, '培训课件', 'training', 1, 'FileWordOutlined', 7, 'admin', 'admin'),
(108, '商业提案', 'business-proposal', 1, 'FilePptOutlined', 8, 'admin', 'admin'),
(109, '数据分析', 'data-analysis', 1, 'FileExcelOutlined', 9, 'admin', 'admin'),
(110, '项目汇报', 'project-report', 1, 'ProfileOutlined', 10, 'admin', 'admin'),
(111, '考试备考', 'exam', 1, 'BookOutlined', 11, 'admin', 'admin'),
(112, '技能提升', 'skill', 1, 'ToolOutlined', 12, 'admin', 'admin'),
(113, '职业发展', 'career', 1, 'ProfileOutlined', 13, 'admin', 'admin'),
(114, '学术研究', 'research', 1, 'ReadOutlined', 14, 'admin', 'admin'),
(115, '自我提升', 'self-improvement', 1, 'UserOutlined', 15, 'admin', 'admin'),
(116, '休闲娱乐', 'leisure', 1, 'PlayCircleOutlined', 16, 'admin', 'admin'),
(117, '兴趣培养', 'hobby', 1, 'CameraOutlined', 17, 'admin', 'admin'),
(118, '个人收藏', 'collection', 1, 'CrownOutlined', 18, 'admin', 'admin'),
(119, '日常娱乐', 'daily', 1, 'PlayCircleOutlined', 19, 'admin', 'admin'),
(120, '学习充电', 'study', 1, 'ReadOutlined', 20, 'admin', 'admin'),
(121, '工作效率', 'work', 1, 'ToolOutlined', 21, 'admin', 'admin'),
(122, '创作创造', 'create', 1, 'HighlightOutlined', 22, 'admin', 'admin'),
(123, '办公应用', 'office', 1, 'FileWordOutlined', 23, 'admin', 'admin'),
(124, '设计创作', 'design', 1, 'SketchOutlined', 24, 'admin', 'admin'),
(125, '开发编程', 'development', 1, 'CodeOutlined', 25, 'admin', 'admin'),
(126, '系统工具', 'system', 1, 'WindowsOutlined', 26, 'admin', 'admin'),

-- 风格属性
(201, '赛博朋克', 'cyberpunk', 2, 'CrownOutlined', 1, 'admin', 'admin'),
(202, '未来科技', 'future', 2, 'CrownOutlined', 2, 'admin', 'admin'),
(203, '像素复古', 'pixel', 2, 'CrownOutlined', 3, 'admin', 'admin'),
(204, '艺术写实', 'art', 2, 'CrownOutlined', 4, 'admin', 'admin'),
(205, '抽象创意', 'abstract', 2, 'CrownOutlined', 5, 'admin', 'admin'),
(206, '简约商务', 'business', 2, 'FileOutlined', 6, 'admin', 'admin'),
(207, '清新文艺', 'fresh', 2, 'FileTextOutlined', 7, 'admin', 'admin'),
(208, '科技感强', 'tech', 2, 'LayoutOutlined', 8, 'admin', 'admin'),
(209, '创意设计', 'creative', 2, 'PictureOutlined', 9, 'admin', 'admin'),
(210, '传统严谨', 'traditional', 2, 'ProfileOutlined', 10, 'admin', 'admin'),
(211, '系统全面', 'systematic', 2, 'AppstoreOutlined', 11, 'admin', 'admin'),
(212, '重点突出', 'focused', 2, 'HighlightOutlined', 12, 'admin', 'admin'),
(213, '实用性强', 'practical', 2, 'ToolOutlined', 13, 'admin', 'admin'),
(214, '深入浅出', 'easy', 2, 'ReadOutlined', 14, 'admin', 'admin'),
(215, '轻松欢快', 'happy', 2, 'PlayCircleOutlined', 15, 'admin', 'admin'),
(216, '文艺小众', 'artistic', 2, 'CustomerServiceOutlined', 16, 'admin', 'admin'),
(217, '热血动感', 'energetic', 2, 'TrophyOutlined', 17, 'admin', 'admin'),
(218, '温馨治愈', 'healing', 2, 'HeartOutlined', 18, 'admin', 'admin'),
(219, '基础服务', 'basic', 2, 'AppstoreOutlined', 19, 'admin', 'admin'),
(220, '进阶特权', 'advanced', 2, 'CrownOutlined', 20, 'admin', 'admin'),
(221, '尊享专属', 'premium', 2, 'SafetyCertificateOutlined', 21, 'admin', 'admin'),
(222, '定制服务', 'custom', 2, 'ToolOutlined', 22, 'admin', 'admin'),
(223, '专业版本', 'professional', 2, 'SafetyCertificateOutlined', 23, 'admin', 'admin'),
(224, '企业定制', 'enterprise', 2, 'AppstoreOutlined', 24, 'admin', 'admin'),
(225, '个人使用', 'personal', 2, 'UserOutlined', 25, 'admin', 'admin'),
(226, '教育版本', 'education', 2, 'ReadOutlined', 26, 'admin', 'admin');

-- 插入目录属性组关联数据
INSERT INTO `rcc_category_attr_group` (`id`, `category_id`, `attr_group_id`, `creator`, `updator`) VALUES
-- NFT专区
(1, 1, 1, 'admin', 'admin'),
(2, 1, 2, 'admin', 'admin'),
-- 数字素材类
(3, 2, 1, 'admin', 'admin'),
(4, 2, 2, 'admin', 'admin'),
-- 学习资源类
(5, 3, 1, 'admin', 'admin'),
(6, 3, 2, 'admin', 'admin'),
-- 生活娱乐类
(7, 4, 1, 'admin', 'admin'),
(8, 4, 2, 'admin', 'admin'),
-- 会员权益类
(9, 5, 1, 'admin', 'admin'),
(10, 5, 2, 'admin', 'admin'),
-- 软件服务类
(11, 6, 1, 'admin', 'admin'),
(12, 6, 2, 'admin', 'admin');
