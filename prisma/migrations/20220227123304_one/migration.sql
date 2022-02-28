/*
  Warnings:

  - You are about to drop the `sword_sessions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `account_ban_history` DROP FOREIGN KEY `account_ban_history_ibfk_1`;

-- DropForeignKey
ALTER TABLE `account_ban_history` DROP FOREIGN KEY `account_ban_history_ibfk_2`;

-- DropForeignKey
ALTER TABLE `account_bans` DROP FOREIGN KEY `account_bans_ibfk_1`;

-- DropForeignKey
ALTER TABLE `account_bans` DROP FOREIGN KEY `account_bans_ibfk_2`;

-- DropForeignKey
ALTER TABLE `account_storage` DROP FOREIGN KEY `account_storage_ibfk_1`;

-- DropForeignKey
ALTER TABLE `account_viplist` DROP FOREIGN KEY `account_viplist_ibfk_1`;

-- DropForeignKey
ALTER TABLE `account_viplist` DROP FOREIGN KEY `account_viplist_ibfk_2`;

-- DropForeignKey
ALTER TABLE `guild_invites` DROP FOREIGN KEY `guild_invites_ibfk_2`;

-- DropForeignKey
ALTER TABLE `guild_invites` DROP FOREIGN KEY `guild_invites_ibfk_1`;

-- DropForeignKey
ALTER TABLE `guild_membership` DROP FOREIGN KEY `guild_membership_ibfk_2`;

-- DropForeignKey
ALTER TABLE `guild_membership` DROP FOREIGN KEY `guild_membership_ibfk_1`;

-- DropForeignKey
ALTER TABLE `guild_membership` DROP FOREIGN KEY `guild_membership_ibfk_3`;

-- DropForeignKey
ALTER TABLE `guild_ranks` DROP FOREIGN KEY `guild_ranks_ibfk_1`;

-- DropForeignKey
ALTER TABLE `guilds` DROP FOREIGN KEY `guilds_ibfk_1`;

-- DropForeignKey
ALTER TABLE `guildwar_kills` DROP FOREIGN KEY `guildwar_kills_ibfk_1`;

-- DropForeignKey
ALTER TABLE `house_lists` DROP FOREIGN KEY `house_lists_ibfk_1`;

-- DropForeignKey
ALTER TABLE `ip_bans` DROP FOREIGN KEY `ip_bans_ibfk_1`;

-- DropForeignKey
ALTER TABLE `market_history` DROP FOREIGN KEY `market_history_ibfk_1`;

-- DropForeignKey
ALTER TABLE `market_offers` DROP FOREIGN KEY `market_offers_ibfk_1`;

-- DropForeignKey
ALTER TABLE `player_deaths` DROP FOREIGN KEY `player_deaths_ibfk_1`;

-- DropForeignKey
ALTER TABLE `player_depotitems` DROP FOREIGN KEY `player_depotitems_ibfk_1`;

-- DropForeignKey
ALTER TABLE `player_inboxitems` DROP FOREIGN KEY `player_inboxitems_ibfk_1`;

-- DropForeignKey
ALTER TABLE `player_items` DROP FOREIGN KEY `player_items_ibfk_1`;

-- DropForeignKey
ALTER TABLE `player_namelocks` DROP FOREIGN KEY `player_namelocks_ibfk_2`;

-- DropForeignKey
ALTER TABLE `player_namelocks` DROP FOREIGN KEY `player_namelocks_ibfk_1`;

-- DropForeignKey
ALTER TABLE `player_spells` DROP FOREIGN KEY `player_spells_ibfk_1`;

-- DropForeignKey
ALTER TABLE `player_storage` DROP FOREIGN KEY `player_storage_ibfk_1`;

-- DropForeignKey
ALTER TABLE `player_storeinboxitems` DROP FOREIGN KEY `player_storeinboxitems_ibfk_1`;

-- DropForeignKey
ALTER TABLE `players` DROP FOREIGN KEY `players_ibfk_1`;

-- DropForeignKey
ALTER TABLE `tile_store` DROP FOREIGN KEY `tile_store_ibfk_1`;

-- DropTable
DROP TABLE `sword_sessions`;
