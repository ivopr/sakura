/*
  Warnings:

  - You are about to drop the column `accountId` on the `sword_sessions` table. All the data in the column will be lost.
  - Added the required column `account_id` to the `sword_sessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `sword_sessions` DROP COLUMN `accountId`,
    ADD COLUMN `account_id` INTEGER NOT NULL;
