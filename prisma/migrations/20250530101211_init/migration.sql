-- CreateTable
CREATE TABLE `client` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `active_financement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `financial_asset` VARCHAR(191) NOT NULL,
    `value` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `active_financement` ADD CONSTRAINT `active_financement_id_fkey` FOREIGN KEY (`id`) REFERENCES `client`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
