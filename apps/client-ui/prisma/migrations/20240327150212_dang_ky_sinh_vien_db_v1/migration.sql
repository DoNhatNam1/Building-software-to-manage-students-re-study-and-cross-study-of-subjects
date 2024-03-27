-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone_number` DOUBLE NULL,
    `address` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('Admin') NOT NULL DEFAULT 'Admin',

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_email_phone_number_key`(`email`, `phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubUser` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `phone_number` DOUBLE NULL,
    `address` VARCHAR(191) NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `role` ENUM('SinhVien') NOT NULL,

    UNIQUE INDEX `SubUser_email_key`(`email`),
    UNIQUE INDEX `SubUser_email_phone_number_key`(`email`, `phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbDiem` (
    `id` VARCHAR(191) NOT NULL,
    `MaMonHoc` VARCHAR(191) NOT NULL,
    `MaSinhVien` VARCHAR(191) NOT NULL,
    `MaHoaDon` VARCHAR(191) NULL,
    `DiemGiuaKi` INTEGER NOT NULL,
    `DiemCuoiKi` INTEGER NOT NULL,
    `NgayThi` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TblichHoc` (
    `id` VARCHAR(191) NOT NULL,
    `MaHocPhan` VARCHAR(191) NOT NULL,
    `MaPhongHoc` VARCHAR(191) NOT NULL,
    `ThoiGianHoc` DATETIME(3) NOT NULL,
    `StatusDeXemLichHoc` ENUM('Active', 'Close') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbPhongHoc` (
    `id` VARCHAR(191) NOT NULL,
    `TenPhongHoc` VARCHAR(255) NOT NULL,
    `Status` ENUM('On', 'Off') NOT NULL DEFAULT 'On',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbThoiGianDeDuyTriTrangDangKy` (
    `id` VARCHAR(191) NOT NULL,
    `ThoiGianBatDau` DATETIME(3) NOT NULL,
    `ThoiGianKetThuc` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbDangKyHocPhan` (
    `id` VARCHAR(191) NOT NULL,
    `MaSinhVien` VARCHAR(191) NOT NULL,
    `MaHocPhan` VARCHAR(191) NOT NULL,
    `LyDoHocLai` TEXT NULL,
    `NgayDangKy` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `DiemGiuaKi` INTEGER NULL,
    `DiemCuoiKi` INTEGER NULL,
    `NgayThi` DATETIME(3) NULL,
    `KieuDangKy` ENUM('HocLai', 'HocGhep') NOT NULL,

    INDEX `MaSinhVien`(`MaSinhVien`),
    INDEX `MaHocPhan`(`MaHocPhan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbGiangVien` (
    `id` VARCHAR(191) NOT NULL,
    `TenGiangVien` VARCHAR(255) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` DOUBLE NULL,

    UNIQUE INDEX `TbGiangVien_email_key`(`email`),
    UNIQUE INDEX `TbGiangVien_email_phone_number_key`(`email`, `phone_number`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbHocPhan` (
    `id` VARCHAR(191) NOT NULL,
    `MaGiangVien` VARCHAR(191) NOT NULL,
    `TenHocPhan` VARCHAR(255) NOT NULL,
    `SoTinChi` INTEGER NOT NULL,
    `GiaCa` DECIMAL(20, 2) NOT NULL,

    INDEX `MaGiangVien`(`MaGiangVien`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TbHoaDon` (
    `id` VARCHAR(191) NOT NULL,
    `MaDangKyHocPhan` VARCHAR(191) NOT NULL,
    `SoTienPhaiTra` DECIMAL(20, 2) NOT NULL,
    `SoTienDaTra` DECIMAL(20, 2) NOT NULL,
    `NgayBatDauThanhToan` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `PhuongThucThanhToan` ENUM('TienMat', 'ChuyenKhoan') NULL,
    `GhiChu` TEXT NULL,
    `NgayThanhToanGanDay` DATETIME(3) NOT NULL,

    INDEX `MaDangKyHocPhan`(`MaDangKyHocPhan`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Avatars` (
    `id` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Avatars_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SubAvatars` (
    `id` VARCHAR(191) NOT NULL,
    `public_id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `subUserId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SubAvatars_subUserId_key`(`subUserId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TbDangKyHocPhan` ADD CONSTRAINT `tbdangkyhocphan_masinhvien_foreign_key_idx` FOREIGN KEY (`MaSinhVien`) REFERENCES `SubUser`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbDangKyHocPhan` ADD CONSTRAINT `tbdangkyhocphan_mahocphan_foreign_key_idx` FOREIGN KEY (`MaHocPhan`) REFERENCES `TbHocPhan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbHocPhan` ADD CONSTRAINT `tbhocphan_magiangvien_foreign_key_idx` FOREIGN KEY (`MaGiangVien`) REFERENCES `TbGiangVien`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TbHoaDon` ADD CONSTRAINT `tbhoadon_madangkyhocphan_foreign_key_idx` FOREIGN KEY (`MaDangKyHocPhan`) REFERENCES `TbDangKyHocPhan`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Avatars` ADD CONSTRAINT `Avatars_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SubAvatars` ADD CONSTRAINT `SubAvatars_subUserId_fkey` FOREIGN KEY (`subUserId`) REFERENCES `SubUser`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
