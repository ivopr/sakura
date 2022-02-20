-- CreateTable
CREATE TABLE `account_ban_history` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `account_id` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `banned_at` BIGINT NOT NULL,
    `expired_at` BIGINT NOT NULL,
    `banned_by` INTEGER NOT NULL,

    INDEX `account_id`(`account_id`),
    INDEX `banned_by`(`banned_by`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_bans` (
    `account_id` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `banned_at` BIGINT NOT NULL,
    `expires_at` BIGINT NOT NULL,
    `banned_by` INTEGER NOT NULL,

    INDEX `banned_by`(`banned_by`),
    PRIMARY KEY (`account_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_storage` (
    `account_id` INTEGER NOT NULL,
    `key` INTEGER UNSIGNED NOT NULL,
    `value` INTEGER NOT NULL,

    PRIMARY KEY (`account_id`, `key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `account_viplist` (
    `account_id` INTEGER NOT NULL,
    `player_id` INTEGER NOT NULL,
    `description` VARCHAR(128) NOT NULL DEFAULT '',
    `icon` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `notify` TINYINT NOT NULL DEFAULT 0,

    INDEX `player_id`(`player_id`),
    UNIQUE INDEX `account_player_index`(`account_id`, `player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `accounts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `password` CHAR(40) NOT NULL,
    `secret` CHAR(16) NULL,
    `type` INTEGER NOT NULL DEFAULT 1,
    `premium_ends_at` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `email` VARCHAR(255) NOT NULL DEFAULT '',
    `creation` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sword_sessions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `accountId` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `refresh_token` VARCHAR(191) NULL,
    `remember_me` INTEGER NOT NULL,
    `accessed_at` INTEGER NOT NULL,

    UNIQUE INDEX `sword_sessions_accountId_key`(`accountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_invites` (
    `player_id` INTEGER NOT NULL DEFAULT 0,
    `guild_id` INTEGER NOT NULL DEFAULT 0,

    INDEX `guild_id`(`guild_id`),
    PRIMARY KEY (`player_id`, `guild_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_membership` (
    `player_id` INTEGER NOT NULL,
    `guild_id` INTEGER NOT NULL,
    `rank_id` INTEGER NOT NULL,
    `nick` VARCHAR(15) NOT NULL DEFAULT '',

    INDEX `guild_id`(`guild_id`),
    INDEX `rank_id`(`rank_id`),
    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_ranks` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `level` INTEGER NOT NULL,

    INDEX `guild_id`(`guild_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guild_wars` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `guild1` INTEGER NOT NULL DEFAULT 0,
    `guild2` INTEGER NOT NULL DEFAULT 0,
    `name1` VARCHAR(255) NOT NULL,
    `name2` VARCHAR(255) NOT NULL,
    `status` TINYINT NOT NULL DEFAULT 0,
    `started` BIGINT NOT NULL DEFAULT 0,
    `ended` BIGINT NOT NULL DEFAULT 0,

    INDEX `guild1`(`guild1`),
    INDEX `guild2`(`guild2`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guilds` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `ownerid` INTEGER NOT NULL,
    `creationdata` INTEGER NOT NULL,
    `motd` VARCHAR(255) NOT NULL DEFAULT '',

    UNIQUE INDEX `name`(`name`),
    UNIQUE INDEX `ownerid`(`ownerid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `guildwar_kills` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `killer` VARCHAR(50) NOT NULL,
    `target` VARCHAR(50) NOT NULL,
    `killerguild` INTEGER NOT NULL DEFAULT 0,
    `targetguild` INTEGER NOT NULL DEFAULT 0,
    `warid` INTEGER NOT NULL DEFAULT 0,
    `time` BIGINT NOT NULL,

    INDEX `warid`(`warid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `house_lists` (
    `house_id` INTEGER NOT NULL,
    `listid` INTEGER NOT NULL,
    `list` TEXT NOT NULL,

    INDEX `house_id`(`house_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `houses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `owner` INTEGER NOT NULL,
    `paid` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `warnings` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(255) NOT NULL,
    `rent` INTEGER NOT NULL DEFAULT 0,
    `town_id` INTEGER NOT NULL DEFAULT 0,
    `bid` INTEGER NOT NULL DEFAULT 0,
    `bid_end` INTEGER NOT NULL DEFAULT 0,
    `last_bid` INTEGER NOT NULL DEFAULT 0,
    `highest_bidder` INTEGER NOT NULL DEFAULT 0,
    `size` INTEGER NOT NULL DEFAULT 0,
    `beds` INTEGER NOT NULL DEFAULT 0,

    INDEX `owner`(`owner`),
    INDEX `town_id`(`town_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ip_bans` (
    `ip` INTEGER UNSIGNED NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `banned_at` BIGINT NOT NULL,
    `expires_at` BIGINT NOT NULL,
    `banned_by` INTEGER NOT NULL,

    INDEX `banned_by`(`banned_by`),
    PRIMARY KEY (`ip`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `market_history` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `sale` TINYINT NOT NULL DEFAULT 0,
    `itemtype` SMALLINT UNSIGNED NOT NULL,
    `amount` SMALLINT UNSIGNED NOT NULL,
    `price` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `expires_at` BIGINT UNSIGNED NOT NULL,
    `inserted` BIGINT UNSIGNED NOT NULL,
    `state` TINYINT UNSIGNED NOT NULL,

    INDEX `player_id`(`player_id`, `sale`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `market_offers` (
    `id` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `player_id` INTEGER NOT NULL,
    `sale` TINYINT NOT NULL DEFAULT 0,
    `itemtype` SMALLINT UNSIGNED NOT NULL,
    `amount` SMALLINT UNSIGNED NOT NULL,
    `created` BIGINT UNSIGNED NOT NULL,
    `anonymous` TINYINT NOT NULL DEFAULT 0,
    `price` INTEGER UNSIGNED NOT NULL DEFAULT 0,

    INDEX `created`(`created`),
    INDEX `player_id`(`player_id`),
    INDEX `sale`(`sale`, `itemtype`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_deaths` (
    `player_id` INTEGER NOT NULL,
    `time` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 1,
    `killed_by` VARCHAR(255) NOT NULL,
    `is_player` TINYINT NOT NULL DEFAULT 1,
    `mostdamage_by` VARCHAR(100) NOT NULL,
    `mostdamage_is_player` TINYINT NOT NULL DEFAULT 0,
    `unjustified` TINYINT NOT NULL DEFAULT 0,
    `mostdamage_unjustified` TINYINT NOT NULL DEFAULT 0,

    INDEX `killed_by`(`killed_by`),
    INDEX `mostdamage_by`(`mostdamage_by`),
    INDEX `player_id`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_depotitems` (
    `player_id` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` SMALLINT UNSIGNED NOT NULL,
    `count` SMALLINT NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL,

    UNIQUE INDEX `player_id_2`(`player_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_inboxitems` (
    `player_id` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` SMALLINT UNSIGNED NOT NULL,
    `count` SMALLINT NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL,

    UNIQUE INDEX `player_id_2`(`player_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_items` (
    `player_id` INTEGER NOT NULL DEFAULT 0,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `sid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    `count` SMALLINT NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL,

    INDEX `player_id`(`player_id`),
    INDEX `sid`(`sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_namelocks` (
    `player_id` INTEGER NOT NULL,
    `reason` VARCHAR(255) NOT NULL,
    `namelocked_at` BIGINT NOT NULL,
    `namelocked_by` INTEGER NOT NULL,

    INDEX `namelocked_by`(`namelocked_by`),
    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_spells` (
    `player_id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,

    INDEX `player_id`(`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_storage` (
    `player_id` INTEGER NOT NULL DEFAULT 0,
    `key` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `value` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`player_id`, `key`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `player_storeinboxitems` (
    `player_id` INTEGER NOT NULL,
    `sid` INTEGER NOT NULL,
    `pid` INTEGER NOT NULL DEFAULT 0,
    `itemtype` SMALLINT UNSIGNED NOT NULL,
    `count` SMALLINT NOT NULL DEFAULT 0,
    `attributes` BLOB NOT NULL,

    UNIQUE INDEX `player_id_2`(`player_id`, `sid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `players` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `group_id` INTEGER NOT NULL DEFAULT 1,
    `account_id` INTEGER NOT NULL DEFAULT 0,
    `level` INTEGER NOT NULL DEFAULT 1,
    `vocation` INTEGER NOT NULL DEFAULT 0,
    `health` INTEGER NOT NULL DEFAULT 150,
    `healthmax` INTEGER NOT NULL DEFAULT 150,
    `experience` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `lookbody` INTEGER NOT NULL DEFAULT 0,
    `lookfeet` INTEGER NOT NULL DEFAULT 0,
    `lookhead` INTEGER NOT NULL DEFAULT 0,
    `looklegs` INTEGER NOT NULL DEFAULT 0,
    `looktype` INTEGER NOT NULL DEFAULT 136,
    `lookaddons` INTEGER NOT NULL DEFAULT 0,
    `direction` TINYINT UNSIGNED NOT NULL DEFAULT 2,
    `maglevel` INTEGER NOT NULL DEFAULT 0,
    `mana` INTEGER NOT NULL DEFAULT 0,
    `manamax` INTEGER NOT NULL DEFAULT 0,
    `manaspent` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `soul` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `town_id` INTEGER NOT NULL DEFAULT 1,
    `posx` INTEGER NOT NULL DEFAULT 0,
    `posy` INTEGER NOT NULL DEFAULT 0,
    `posz` INTEGER NOT NULL DEFAULT 0,
    `conditions` BLOB NOT NULL,
    `cap` INTEGER NOT NULL DEFAULT 400,
    `sex` INTEGER NOT NULL DEFAULT 0,
    `lastlogin` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `lastip` INTEGER UNSIGNED NOT NULL DEFAULT 0,
    `save` TINYINT NOT NULL DEFAULT 1,
    `skull` TINYINT NOT NULL DEFAULT 0,
    `skulltime` BIGINT NOT NULL DEFAULT 0,
    `lastlogout` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `blessings` TINYINT NOT NULL DEFAULT 0,
    `onlinetime` BIGINT NOT NULL DEFAULT 0,
    `deletion` BIGINT NOT NULL DEFAULT 0,
    `balance` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `offlinetraining_time` SMALLINT UNSIGNED NOT NULL DEFAULT 43200,
    `offlinetraining_skill` INTEGER NOT NULL DEFAULT -1,
    `stamina` SMALLINT UNSIGNED NOT NULL DEFAULT 2520,
    `skill_fist` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_fist_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_club` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_club_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_sword` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_sword_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_axe` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_axe_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_dist` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_dist_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_shielding` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_shielding_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,
    `skill_fishing` INTEGER UNSIGNED NOT NULL DEFAULT 10,
    `skill_fishing_tries` BIGINT UNSIGNED NOT NULL DEFAULT 0,

    UNIQUE INDEX `name`(`name`),
    INDEX `account_id`(`account_id`),
    INDEX `vocation`(`vocation`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `players_online` (
    `player_id` INTEGER NOT NULL,

    PRIMARY KEY (`player_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `server_config` (
    `config` VARCHAR(50) NOT NULL,
    `value` VARCHAR(256) NOT NULL DEFAULT '',

    PRIMARY KEY (`config`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tile_store` (
    `house_id` INTEGER NOT NULL,
    `data` LONGBLOB NOT NULL,

    INDEX `house_id`(`house_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `towns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `posx` INTEGER NOT NULL DEFAULT 0,
    `posy` INTEGER NOT NULL DEFAULT 0,
    `posz` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `name`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account_ban_history` ADD CONSTRAINT `account_ban_history_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_ban_history` ADD CONSTRAINT `account_ban_history_ibfk_2` FOREIGN KEY (`banned_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_bans` ADD CONSTRAINT `account_bans_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_bans` ADD CONSTRAINT `account_bans_ibfk_2` FOREIGN KEY (`banned_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `account_storage` ADD CONSTRAINT `account_storage_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `account_viplist` ADD CONSTRAINT `account_viplist_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `account_viplist` ADD CONSTRAINT `account_viplist_ibfk_2` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guild_invites` ADD CONSTRAINT `guild_invites_ibfk_2` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guild_invites` ADD CONSTRAINT `guild_invites_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guild_membership` ADD CONSTRAINT `guild_membership_ibfk_3` FOREIGN KEY (`rank_id`) REFERENCES `guild_ranks`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_membership` ADD CONSTRAINT `guild_membership_ibfk_2` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_membership` ADD CONSTRAINT `guild_membership_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `guild_ranks` ADD CONSTRAINT `guild_ranks_ibfk_1` FOREIGN KEY (`guild_id`) REFERENCES `guilds`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guilds` ADD CONSTRAINT `guilds_ibfk_1` FOREIGN KEY (`ownerid`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `guildwar_kills` ADD CONSTRAINT `guildwar_kills_ibfk_1` FOREIGN KEY (`warid`) REFERENCES `guild_wars`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `house_lists` ADD CONSTRAINT `house_lists_ibfk_1` FOREIGN KEY (`house_id`) REFERENCES `houses`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `ip_bans` ADD CONSTRAINT `ip_bans_ibfk_1` FOREIGN KEY (`banned_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `market_history` ADD CONSTRAINT `market_history_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `market_offers` ADD CONSTRAINT `market_offers_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `player_deaths` ADD CONSTRAINT `player_deaths_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `player_depotitems` ADD CONSTRAINT `player_depotitems_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `player_inboxitems` ADD CONSTRAINT `player_inboxitems_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `player_items` ADD CONSTRAINT `player_items_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `player_namelocks` ADD CONSTRAINT `player_namelocks_ibfk_2` FOREIGN KEY (`namelocked_by`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_namelocks` ADD CONSTRAINT `player_namelocks_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `player_spells` ADD CONSTRAINT `player_spells_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `player_storage` ADD CONSTRAINT `player_storage_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `player_storeinboxitems` ADD CONSTRAINT `player_storeinboxitems_ibfk_1` FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `players` ADD CONSTRAINT `players_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `accounts`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `tile_store` ADD CONSTRAINT `tile_store_ibfk_1` FOREIGN KEY (`house_id`) REFERENCES `houses`(`id`) ON DELETE CASCADE ON UPDATE RESTRICT;
