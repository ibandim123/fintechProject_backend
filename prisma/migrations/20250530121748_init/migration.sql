/*
  Warnings:

  - Added the required column `clientId` to the `active_financement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `active_financement` DROP FOREIGN KEY `active_financement_id_fkey`;

-- AlterTable
ALTER TABLE `active_financement` ADD COLUMN `clientId` INTEGER NOT NULL,
    MODIFY `value` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `active_financement` ADD CONSTRAINT `active_financement_clientId_fkey` FOREIGN KEY (`clientId`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
