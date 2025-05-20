/*
  Warnings:

  - You are about to drop the column `dayOfWeek` on the `Reminder` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Reminder` DROP COLUMN `dayOfWeek`;

-- CreateTable
CREATE TABLE `ReminderDay` (
    `id` VARCHAR(191) NOT NULL,
    `reminderId` VARCHAR(191) NOT NULL,
    `dayOfWeek` INTEGER NOT NULL,

    UNIQUE INDEX `ReminderDay_reminderId_dayOfWeek_key`(`reminderId`, `dayOfWeek`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReminderDay` ADD CONSTRAINT `ReminderDay_reminderId_fkey` FOREIGN KEY (`reminderId`) REFERENCES `Reminder`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
