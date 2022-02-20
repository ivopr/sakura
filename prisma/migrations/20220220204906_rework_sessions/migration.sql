/*
  Warnings:

  - You are about to drop the column `refresh_token` on the `sword_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `remember_me` on the `sword_sessions` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `sword_sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `sword_sessions` DROP COLUMN `refresh_token`,
    DROP COLUMN `remember_me`,
    DROP COLUMN `token`;
