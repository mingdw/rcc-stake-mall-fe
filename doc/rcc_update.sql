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

-- 插入一级分类目录数据
INSERT INTO `rcc_category` (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('NFT专区', NULL, 1, 1, 'CrownOutlined', 'admin', 'admin');
INSERT INTO `rcc_category` (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('数字素材类', NULL, 1, 2, 'FileOutlined', 'admin', 'admin');
INSERT INTO `rcc_category` (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('学习资源类', NULL, 1, 3, 'ReadOutlined', 'admin', 'admin');
INSERT INTO `rcc_category` (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('生活娱乐类', NULL, 1, 4, 'PlayCircleOutlined', 'admin', 'admin');
INSERT INTO `rcc_category` (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('会员权益类', NULL, 1, 5, 'CrownOutlined', 'admin', 'admin');  
INSERT INTO `rcc_category` (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('软件服务类', NULL, 1, 6, 'AppstoreOutlined', 'admin', 'admin');

-- 插入二级分类
-- NFT专区的二级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('数字艺术品NFT', 2014, 2, 1, 'PictureOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('虚拟身份NFT', 2014, 2, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('游戏资产NFT', 2014, 2, 3, 'TrophyOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('收藏品NFT', 2014, 2, 4, 'GiftOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('虚拟房地产NFT', 2014, 2, 5, 'HomeOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('数字证书NFT', 2014, 2, 6, 'SafetyCertificateOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('金融资产NFT', 2014, 2, 7, 'DollarOutlined', 'admin', 'admin');

-- 数字素材类的二级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('文档模板', 2015, 2, 1, 'FileTextOutlined', 'admin', 'admin');   
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('图片素材', 2015, 2, 2, 'PictureOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('音乐素材', 2015, 2, 3, 'CustomerServiceOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('视频素材', 2015, 2, 4, 'VideoCameraOutlined', 'admin', 'admin');

-- 学习资源类的二级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('学术资料', 2016, 2, 1, 'BookOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('职业技能', 2016, 2, 2, 'ToolOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('语言学习', 2016, 2, 3, 'TranslationOutlined', 'admin', 'admin');

-- 生活娱乐类的二级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('影音娱乐', 2017, 2, 1, 'PlayCircleOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('游戏周边', 2017, 2, 2, 'GamepadOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('兴趣爱好', 2017, 2, 3, 'HeartOutlined', 'admin', 'admin');

-- 会员权益类的二级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('视频会员', 2018, 2, 1, 'VideoCameraOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('音乐会员', 2018, 2, 2, 'CustomerServiceOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('阅读会员', 2018, 2, 3, 'ReadOutlined', 'admin', 'admin');

-- 软件服务类的二级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('安装程序', 2019, 2, 1, 'DownloadOutlined', 'admin', 'admin');    
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('激活码', 2019, 2, 2, 'KeyOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('破解工具', 2019, 2, 3, 'ToolOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它服务', 2019, 2, 4, 'AppstoreOutlined', 'admin', 'admin');


-- 插入三级分类
-- NFT专区-数字艺术品NFT的三级分类  
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('潮流艺术画作NFT', 2020, 3, 1, 'PictureOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('先锋音乐作品NFT', 2020, 3, 2, 'CustomerServiceOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('视频艺术NFT', 2020, 3, 3, 'VideoCameraOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('文本类型NFT', 2020, 3, 4, 'ReadOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它类型NFT', 2020, 3, 5, 'AppstoreOutlined', 'admin', 'admin');

-- NFT专区-虚拟身份NFT的三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('独特头像NFT', 2021, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('虚拟形象NFT', 2021, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('虚拟宠物NFT', 2021, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('虚拟房产NFT', 2021, 3, 4, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('虚拟身份NFT', 2021, 3, 5, 'UserOutlined', 'admin', 'admin');

-- NFT专区-游戏资产NFT的三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('游戏道具NFT', 2022, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('游戏装备NFT', 2022, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('游戏角色NFT', 2022, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('游戏皮肤NFT', 2022, 3, 4, 'UserOutlined', 'admin', 'admin');

-- NFT专区-收藏品NFT的三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('体育赛事纪念NFT', 2023, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('艺术作品NFT', 2023, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('数字藏品NFT', 2023, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('数字艺术品NFT', 2023, 3, 4, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它收藏品NFT', 2023, 3, 5, 'UserOutlined', 'admin', 'admin');

-- NFT专区-虚拟房地产NFT的三级分类  
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('元宇宙地块NFT', 2024, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('虚拟建筑NFT', 2024, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('数字空间NFT', 2024, 3, 3, 'UserOutlined', 'admin', 'admin');

-- NFT专区-数字证书NFT的三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('教育认证NFT', 2025, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('职业资格NFT', 2025, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('荣誉证书NFT', 2025, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它证书NFT', 2025, 3, 4, 'UserOutlined', 'admin', 'admin');



--插入文档模板三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('world', 2027, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('excel', 2027, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('ppt', 2027, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('pdf', 2027, 3, 4, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它', 2027, 3, 5, 'UserOutlined', 'admin', 'admin');

--插入图片素材三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('壁纸', 2028, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('头像', 2028, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('海报', 2028, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('插画', 2028, 3, 4, 'UserOutlined', 'admin', 'admin');

--插入音乐素材三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('流行音乐', 2029, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('古典音乐', 2029, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('摇滚音乐', 2029, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('电子音乐', 2029, 3, 4, 'UserOutlined', 'admin', 'admin');

--插入视频素材三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('广告视频', 2030, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('公益视频', 2030, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('个人美化视频', 2030, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('商业视频', 2030, 3, 4, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它视频', 2030, 3, 5, 'UserOutlined', 'admin', 'admin');


--插入学术资料三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('论文', 2031, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('书籍', 2031, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('报告', 2031, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('真题', 2031, 3, 4, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('课件', 2031, 3, 5, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它', 2031, 3, 6, 'UserOutlined', 'admin', 'admin');

--插入职业技能三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('编程', 2032, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('设计', 2032, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('营销', 2032, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它', 2032, 3, 4, 'UserOutlined', 'admin', 'admin');

--插入语言学习三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('英语', 2033, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('日语', 2033, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('韩语', 2033, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它', 2033, 3, 4, 'UserOutlined', 'admin', 'admin');

--插入影音娱乐三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('电影', 2034, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('电视剧', 2034, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('综艺', 2034, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('动漫', 2034, 3, 4, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它', 2034, 3, 5, 'UserOutlined', 'admin', 'admin');

--插入游戏周边三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('虚拟物品', 2035, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('账号服务', 2035, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('辅助工具', 2035, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('游戏服务', 2035, 3, 4, 'UserOutlined', 'admin', 'admin');


--插入兴趣爱好三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('运动健身', 2036, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('摄影摄像', 2036, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('绘画设计', 2036, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它', 2036, 3, 4, 'UserOutlined', 'admin', 'admin');


--插入视频会员三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('腾讯视频', 2037, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('爱奇艺', 2037, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('优酷', 2037, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它', 2037, 3, 4, 'UserOutlined', 'admin', 'admin');

--插入音乐会员三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('QQ音乐', 2038, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('网易云音乐', 2038, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('酷狗音乐', 2038, 3, 3, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它', 2038, 3, 4, 'UserOutlined', 'admin', 'admin');

--插入阅读会员三级分类
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('得到', 2039, 3, 1, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('喜马拉雅', 2039, 3, 2, 'UserOutlined', 'admin', 'admin');
INSERT INTO rcc_category (`name`, `parent_id`, `level`, `sort`, `icon`, `creator`, `updator`) VALUES ('其它', 2039, 3, 3, 'UserOutlined', 'admin', 'admin');


