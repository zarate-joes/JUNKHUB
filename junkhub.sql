-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2025 at 10:36 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `junkhub`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `admin_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `last_login` timestamp NULL DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`admin_id`, `first_name`, `last_name`, `email`, `password_hash`, `created_at`, `last_login`, `status`) VALUES
(1, 'Joebert', 'Zarate', 'admin.zarate.joebert06@gmail.com', '$2a$10$ESZSYM1QmoFZQuPRCzuNIeTKVGaOFWvaRI0U9a6QNWOJOCWRfOCDW', '2025-06-11 15:51:20', '2025-06-16 08:14:30', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `businesses`
--

CREATE TABLE `businesses` (
  `business_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `business_name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `address` text DEFAULT NULL,
  `logo_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('pending','approved','rejected','active','inactive') NOT NULL DEFAULT 'pending',
  `contact_phone` varchar(20) DEFAULT NULL,
  `contact_email` varchar(100) DEFAULT NULL,
  `barangay` varchar(100) DEFAULT NULL,
  `business_hours` text DEFAULT NULL,
  `special_requirements` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `businesses`
--

INSERT INTO `businesses` (`business_id`, `owner_id`, `business_name`, `description`, `address`, `logo_path`, `created_at`, `updated_at`, `status`, `contact_phone`, `contact_email`, `barangay`, `business_hours`, `special_requirements`) VALUES
(5, 6, 'Bords Shop', 'YOWWW', 'Agora', 'logo_5_1750061449.jpg', '2025-06-03 16:31:47', '2025-06-16 02:10:49', 'active', '', 'joebertzarate1@gmail.com', 'Barangay 2', '09:00-17:00', NULL),
(6, 7, '\'s Business', '', '', NULL, '2025-06-04 06:43:02', '2025-06-04 06:43:02', 'active', '', 'joebertzarate2@gmail.com', '', '9AM-5PM', NULL),
(10, 7, 'dsadadsadas', 'dsada', 'Buguac', '../uploads/business_logos/logo_7_1749023434.jpg', '2025-06-04 07:50:33', '2025-06-04 07:50:33', 'pending', '09617761123', 'zarate.joebert1@gmail.com', 'barangay3', 'weekends', 'n/a'),
(11, 14, '\'s Business', '', '', NULL, '2025-06-04 08:06:19', '2025-06-04 08:06:19', 'active', '', 'godwinacido2@gmail.com', '', '9AM-5PM', NULL),
(12, 11, '\'s Business', '', '', NULL, '2025-06-04 15:40:31', '2025-06-04 15:40:31', 'active', '', 'joebertzarate3@gmail.com', '', '9AM-5PM', NULL),
(13, 17, '\'s Business', '', '', NULL, '2025-06-09 07:06:02', '2025-06-09 07:06:02', 'active', '', 'yaviviw314@2mik.com', '', '9AM-5PM', NULL),
(14, 18, 'JUNKSHOP 2', 'DDD YOOYOYOYOY', 'Buguac 2', '../uploads/business_logos/logo_18_1749456064.jpg', '2025-06-09 08:01:04', '2025-06-10 10:01:45', 'pending', '09617761123', 'yibis76394@3dboxer.com', 'Barangay 2', '08:00-17:00', 'dasedadadad34323232'),
(15, 19, '\'s Business', '', '', NULL, '2025-06-09 15:28:29', '2025-06-09 15:28:29', 'active', '', 'yefoki7376@3dboxer.com', '', '9AM-5PM', NULL),
(16, 20, '\'s Business', '', '', NULL, '2025-06-12 16:14:10', '2025-06-12 16:14:10', 'active', '', 'xoxoj92808@2mik.com', '', '9AM-5PM', NULL),
(17, 25, 'Bravo', 'Desyounii', 'Cagayan De Oro', '../uploads/business_logos/logo_25_1749809003.jpg', '2025-06-13 10:02:09', '2025-06-13 10:04:24', 'approved', '09265434346', 'novex83739@2mik.com', 'barangay2', 'weekdays', 'WALA'),
(18, 26, 'The Readers Steiner', 'Will predict the market price', 'Seoul, Korea', '../uploads/business_logos/logo_26_1749809404.png', '2025-06-13 10:08:39', '2025-06-13 14:46:25', 'approved', '09123456789', 'kimdokjathegreatdemonking1@gmail.com', 'barangay2', 'weekends', 'N/A'),
(19, 27, 'GOGO Shop', 'GOGO SHOP TO THE GO!', 'Cagayan de Oro, C. M. Recto Avenue', '../uploads/business_logos/logo_27_1749826925.png', '2025-06-13 15:00:00', '2025-06-13 15:02:05', 'pending', '09265434346', 'goserev236@calorpg.com', 'barangay2', 'weekdays', 'N/A'),
(20, 28, 'Yog Yog Shop', 'Diri na sa Yog Yog Shop!', 'Agora USTP', '../uploads/business_logos/logo_28_1750061621.jpg', '2025-06-16 08:12:44', '2025-06-16 08:16:23', 'approved', '09617761110', 'yogada3735@calorpg.com', 'barangay2', 'weekdays', 'N/A');

-- --------------------------------------------------------

--
-- Table structure for table `business_materials`
--

CREATE TABLE `business_materials` (
  `id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `material_type` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `business_materials`
--

INSERT INTO `business_materials` (`id`, `business_id`, `material_type`, `created_at`) VALUES
(10, 10, 'plastic', '2025-06-04 07:50:34'),
(11, 10, 'electronics', '2025-06-04 07:50:34'),
(12, 10, 'textiles', '2025-06-04 07:50:34'),
(17, 14, 'paper', '2025-06-10 16:01:45'),
(18, 14, 'metal', '2025-06-10 16:01:45'),
(23, 17, 'metal', '2025-06-13 10:03:23'),
(24, 17, 'electronics', '2025-06-13 10:03:23'),
(25, 18, 'metal', '2025-06-13 10:10:04'),
(26, 18, 'glass', '2025-06-13 10:10:04'),
(27, 18, 'electronics', '2025-06-13 10:10:04'),
(28, 19, 'paper', '2025-06-13 15:02:05'),
(29, 19, 'textiles', '2025-06-13 15:02:05'),
(33, 5, 'plastic', '2025-06-16 08:10:49'),
(34, 5, 'metal', '2025-06-16 08:10:49'),
(35, 5, 'glass', '2025-06-16 08:10:49'),
(36, 20, 'paper', '2025-06-16 08:13:41'),
(37, 20, 'electronics', '2025-06-16 08:13:41'),
(38, 20, 'organic', '2025-06-16 08:13:41');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `customer_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(20) NOT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `daily_statistics`
--

CREATE TABLE `daily_statistics` (
  `stat_id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `date` date NOT NULL,
  `total_sales` decimal(10,2) DEFAULT 0.00,
  `order_count` int(11) DEFAULT 0,
  `new_customers` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `message_id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `sender_name` varchar(100) NOT NULL,
  `sender_email` varchar(100) DEFAULT NULL,
  `sender_phone` varchar(20) DEFAULT NULL,
  `subject` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `message_type` enum('inquiry','complaint','feedback','other') DEFAULT 'inquiry',
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `message_replies`
--

CREATE TABLE `message_replies` (
  `reply_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `reply_content` text NOT NULL,
  `replied_by` int(11) NOT NULL,
  `responder_type` enum('owner','user') NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` int(11) NOT NULL,
  `recipient_id` int(11) NOT NULL,
  `recipient_type` enum('owner','user') NOT NULL,
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `is_read` tinyint(1) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `related_entity_type` varchar(50) DEFAULT NULL,
  `related_entity_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('new','accepted','completed','cancelled') DEFAULT 'new',
  `payment_method` enum('cash','gcash','card') DEFAULT 'cash',
  `payment_status` enum('pending','paid','failed') DEFAULT 'pending',
  `notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `order_item_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) NOT NULL,
  `subtotal` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `owners`
--

CREATE TABLE `owners` (
  `owner_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('pending','approved','rejected','active','inactive','suspended') NOT NULL DEFAULT 'pending',
  `business_id` int(11) DEFAULT NULL,
  `admin_notes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owners`
--

INSERT INTO `owners` (`owner_id`, `first_name`, `last_name`, `email`, `password_hash`, `phone`, `profile_image`, `created_at`, `updated_at`, `last_login`, `status`, `business_id`, `admin_notes`) VALUES
(1, 'Joebert', 'Zarate', 'joebertzarate7@gmail.com', '$2y$10$qEYWcz0lBktHl.Bd51Rtx.k4q1.vWzjfdRptY2x1Z2BuvAFdIZPIi', '09617761182', NULL, '2025-06-02 19:17:38', '2025-06-03 01:17:38', '2025-06-03 01:17:38', 'active', NULL, NULL),
(2, 'Joebert', 'Zarate', 'zarate.joebert06@gmail.com', '$2y$10$XaiwrRiU9KeQ2Tg8zohEdeRGSmYOe3gQWAuGS4Sne1TqTx1cjP4yS', '09617761182', NULL, '2025-06-02 19:25:41', '2025-06-03 01:25:41', '2025-06-03 01:25:41', 'active', NULL, NULL),
(3, 'Joebert', 'Zarate', 'zarate.joebert07@gmail.com', '$2y$10$YSw.N08sU2tidPCBoOzOKeud2ryyhZZ1qo5UhccZPZyM4RXc7PXxu', '09617761182', NULL, '2025-06-02 19:29:22', '2025-06-03 01:29:22', '2025-06-03 01:29:22', 'active', NULL, NULL),
(6, 'Jeffrey', 'Bobords', 'joebertzarate1@gmail.com', '$2y$10$8W8UbVErbW14LgaRqCn7tOPPhz1cCNt9DlokKyYolV2K5QPTXy/c.', '09617761182', NULL, '2025-06-03 10:07:22', '2025-06-16 02:10:49', '2025-06-16 08:09:15', 'active', NULL, NULL),
(7, 'Joebert', 'Zarate', 'joebertzarate2@gmail.com', '$2y$10$taJcAqsBHybjMXMI7xkU3eCap5In3J1K00drH0o8gacpCygt9iulq', '09617761182', NULL, '2025-06-04 08:39:26', '2025-06-04 07:50:34', '2025-06-04 06:39:26', 'active', 10, NULL),
(8, 'Godwin', 'Acido', 'godwinacido17@gmail.com', '$2y$10$PsQYQvTQEWjIZDbHC7d4OuWcwgY2hCSmDdyrRuuxUsdBkCekbc/Fu', '09265434346', NULL, '2025-06-04 08:55:11', '2025-06-04 06:55:11', '2025-06-04 06:55:11', 'active', NULL, NULL),
(9, 'Joebert', 'Zarate', 'zarate.joebert1@gmail.com', '$2y$10$Jmpi1ztVeRP3bT9uftOc7egiJGqw8jW9PK9WNgYH8yBYKBiReovUi', '09617761182', NULL, '2025-06-04 09:03:03', '2025-06-04 07:03:03', '2025-06-04 07:03:03', 'active', NULL, NULL),
(10, 'Chid', 'Galario', 'khriot09123@gmail.com', '$2y$10$ugDBHB3B4qSJmJD./yUA0O5DF09wi0uVFmJmA.4KO2jWjVDTP1lHq', '09705867487', NULL, '2025-06-04 07:33:32', '2025-06-04 07:33:33', '2025-06-04 07:33:33', 'active', NULL, NULL),
(11, 'Joebert', 'Zarate', 'joebertzarate3@gmail.com', '$2y$10$blUmkg2MLSMWuzMZ3EoA.e0jCm4XVMDxYkG5AdOyVL.8Sl7TYHD2.', '09617761181', NULL, '2025-06-04 07:37:45', '2025-06-04 07:37:46', '2025-06-04 07:37:46', 'active', NULL, NULL),
(12, 'Reggie', 'Smith', 'reggieabrera23@gmail.com', '$2y$10$xnVJELwO5x0i/DyhfVFrJOCjxCsqveOZgrgbupUL8xiZPx.b59KRm', '09555556666', NULL, '2025-06-04 07:40:10', '2025-06-04 07:40:11', '2025-06-04 07:40:11', 'active', NULL, NULL),
(13, 'Godwin', 'Acido', 'godwinacido25@gmail.com', '$2y$10$oLCVBN0cRuMcmT7YKiueP.hvIe1xreRuqgWy2AMRahymauybFEJIu', '09123456789', NULL, '2025-06-04 09:57:58', '2025-06-04 07:57:58', '2025-06-04 07:57:58', 'active', NULL, NULL),
(14, 'Godwin', 'Acido', 'godwinacido2@gmail.com', '$2y$10$0hrYQYUXlUiq9Sa.h4YWguJc1GFLTSFIh9DOwU./rHPmIsHyY6pMu', '09265434346', NULL, '2025-06-04 10:03:29', '2025-06-04 08:03:29', '2025-06-04 08:03:29', 'active', NULL, NULL),
(16, 'Joebert', 'Zarate', 'lesen31585@3dboxer.com', '$2y$10$9wR7IXPlOnj4Hh3yamt7fe64f0j4O92CvH.LRfm3mirewzdU59kVK', '09617761110', NULL, '2025-06-09 00:34:19', '2025-06-09 06:34:19', '2025-06-09 06:34:19', 'active', NULL, NULL),
(17, 'Joebert', 'Zarate', 'yaviviw314@2mik.com', '$2y$10$ZPF.YB38z9c.nkMzsElB5.0vhSA4pvitf5nV7ctgNngAIW7uZayXq', '09123456789', NULL, '2025-06-09 01:00:31', '2025-06-09 07:00:31', '2025-06-09 07:00:31', 'active', NULL, NULL),
(18, 'Joebert', 'Zarate', 'yibis76394@3dboxer.com', '$2y$10$IsZcYb0MF1Z4x.WAwjJ4iOMVpCBH0f30.h1edvN7ulkeoWM5w0TQ6', '09617761181', NULL, '2025-06-09 01:15:57', '2025-06-11 07:27:03', '2025-06-09 07:15:57', 'active', 14, NULL),
(19, 'Joebert', 'Zarate', 'yefoki7376@3dboxer.com', '$2y$10$y7R992YfQ9bzJrTltmgcWePUtVLhYYlzacygVWmgEQEIwlbE2qCnq', '09617761181', NULL, '2025-06-09 01:58:29', '2025-06-09 07:58:29', '2025-06-09 07:58:29', 'active', NULL, NULL),
(20, 'Xoxo', 'Zoro', 'xoxoj92808@2mik.com', '$2y$10$OVNEk66r7pQiGmGKzFZyxeQVbpTwofWVb0oMkJZ/oAxM1VKpuvfAK', '09617761132', NULL, '2025-06-12 10:07:34', '2025-06-13 07:13:27', '2025-06-13 07:13:27', 'approved', NULL, ''),
(21, 'Irin', 'Xon', 'xonirin906@2mik.com', '$2y$10$QJnviB9mR9hdn.KNdB3PCehDuKllZN0A6o6TrbaYmWXj0IT6NT8zm', '09265434346', NULL, '2025-06-13 01:10:18', '2025-06-13 07:18:30', '2025-06-13 07:18:30', 'approved', NULL, ''),
(22, 'Nel', 'Ola', 'nelola1422@2mik.com', '$2y$10$CJ7DzocMa8cN.amokV2KdOXxpu2DFYuGMaJg/.42K1yb5jy7IyhNG', '09265434346', NULL, '2025-06-13 01:48:31', '2025-06-13 07:51:13', '2025-06-13 07:48:32', 'approved', NULL, ''),
(23, 'Cilo', 'Wei', 'wecilo2292@3dboxer.com', '$2y$10$cqFiVABvH1X3gvrFVwCwQeMwJHH1B1ClnndigVxF3aUKfv4Efju2y', '09265434346', NULL, '2025-06-13 02:56:16', '2025-06-13 08:58:43', '2025-06-13 08:58:43', 'approved', NULL, ''),
(24, 'John Smith', 'Smith', 'hebop35871@2mik.com', '$2y$10$YuGaOf2.71SAm6ij9II9JOOkTzyYZIhB7HrhknyvgeI1/cUNR.Gay', '09123456789', NULL, '2025-06-13 03:38:24', '2025-06-13 10:04:16', '2025-06-13 09:38:24', 'rejected', NULL, 'Broke'),
(25, 'Johnny', 'Bravo', 'novex83739@2mik.com', '$2y$10$u9SkOkKTZLdwwEsbBo984./Bm2vd5iEiYiK4Q..CV3snb341d85OC', '09265434346', NULL, '2025-06-13 04:02:09', '2025-06-13 10:05:02', '2025-06-13 10:05:02', 'approved', 17, ''),
(26, 'Dokja', 'Kim', 'kimdokjathegreatdemonking1@gmail.com', '$2y$10$BrZ8C/F4F79/FUzGj2mprexkfAS2H.XgDJVuWlBl8TcdXY5izIiHa', '09123456789', NULL, '2025-06-13 04:08:39', '2025-06-13 14:46:25', '2025-06-13 10:08:39', 'approved', 18, ''),
(27, 'Serev', 'Go', 'goserev236@calorpg.com', '$2y$10$4gMQ6KcGiaY/561NTwRduO/UJs/0BAXYlUBkYzQfNMd48KTR1yNAa', '09265434346', NULL, '2025-06-13 09:00:00', '2025-06-13 15:00:00', '2025-06-13 15:00:00', 'pending', 19, NULL),
(28, 'Ada', 'Yog', 'yogada3735@calorpg.com', '$2y$10$FXz.WudVHT08TtfLXrJxIeWfsV6Fl6bhLW8lxbAXIh3cM1TkIjdie', '09617761110', NULL, '2025-06-16 02:12:44', '2025-06-16 08:17:18', '2025-06-16 08:17:18', 'approved', 20, '');

-- --------------------------------------------------------

--
-- Table structure for table `owner_verification`
--

CREATE TABLE `owner_verification` (
  `verification_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `id_type` varchar(50) NOT NULL,
  `id_number` varchar(50) NOT NULL,
  `id_front_image` varchar(255) NOT NULL,
  `id_back_image` varchar(255) NOT NULL,
  `verification_status` enum('pending','verified','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `owner_verification`
--

INSERT INTO `owner_verification` (`verification_id`, `owner_id`, `id_type`, `id_number`, `id_front_image`, `id_back_image`, `verification_status`, `created_at`, `updated_at`) VALUES
(2, 16, 'PRC', '1232313213131313', 'front_6846806b21bcc.png', 'back_6846806b22609.png', 'pending', '2025-06-09 06:34:19', '2025-06-09 06:34:19'),
(3, 17, 'Driver&#039;s License', '1232313213131313', 'front_6846868f6f4c7.jpg', 'back_6846868f6f6e6.jpg', 'pending', '2025-06-09 07:00:31', '2025-06-09 07:00:31'),
(4, 18, 'Voter&#039;s ID', '1232313213131313', 'front_68468a2d65c83.png', 'back_68468a2d65e81.png', 'pending', '2025-06-09 07:15:57', '2025-06-09 07:15:57'),
(5, 19, 'PRC', '1232313213131313', 'front_68469425ada26.png', 'back_68469425adc69.png', 'pending', '2025-06-09 07:58:29', '2025-06-09 07:58:29'),
(6, 20, 'PRC', '1232323333', 'front_684afb46ace1b.png', 'back_684afb46ad04f.jpg', 'pending', '2025-06-12 16:07:34', '2025-06-12 16:07:34'),
(7, 21, 'Passport', '1232323333', 'front_684bcedae59dd.jpg', 'back_684bcedae5b4e.jpg', 'pending', '2025-06-13 07:10:19', '2025-06-13 07:10:19'),
(8, 22, 'Voter&#039;s ID', 'dddd', 'front_684bd7cfee7c1.jpg', 'back_684bd7cfeea19.png', 'pending', '2025-06-13 07:48:32', '2025-06-13 07:48:32'),
(9, 23, 'Voter&#039;s ID', '1232313213131313', 'front_684be7b0bd338.png', 'back_684be7b0bd638.png', 'pending', '2025-06-13 08:56:16', '2025-06-13 08:56:16'),
(10, 24, 'Other', '1232313213131313', 'front_684bf190366e3.png', 'back_684bf190368d9.png', 'pending', '2025-06-13 09:38:24', '2025-06-13 09:38:24'),
(11, 25, 'PRC', '1232313213131313', 'front_684bf721a8c84.png', 'back_684bf721a8e53.png', 'pending', '2025-06-13 10:02:09', '2025-06-13 10:02:09'),
(12, 26, 'Voter&#039;s ID', 'dddd', 'front_684bf8a78af3c.jpg', 'back_684bf8a78b1cc.jpg', 'pending', '2025-06-13 10:08:39', '2025-06-13 10:08:39'),
(13, 27, 'PhilHealth', '123231', 'front_684c3cf0270a2.png', 'back_684c3cf027358.png', 'pending', '2025-06-13 15:00:00', '2025-06-13 15:00:00'),
(14, 28, 'SSS', '1232323333', 'front_684fd1fc72a3d.jpg', 'back_684fd1fc72fbe.jpg', 'pending', '2025-06-16 08:12:44', '2025-06-16 08:12:44');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(50) DEFAULT NULL,
  `category2` varchar(50) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `unit` varchar(20) NOT NULL DEFAULT 'piece',
  `image` varchar(255) DEFAULT NULL,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `business_id`, `name`, `description`, `category`, `category2`, `price`, `stock`, `unit`, `image`, `status`, `created_at`, `updated_at`) VALUES
(1, 5, 'Breadboard', 'WWW', 'Metal', 'For Bought', 10.00, 10, 'lb', NULL, 'active', '2025-06-03 16:33:17', '2025-06-03 17:38:29'),
(2, 5, 'Bobords', 'Bobords taga Balingoan', 'Other', 'For Sale', 150.00, 1, 'piece', 'prod_683f2c0ddc8d7.jpg', 'active', '2025-06-03 17:08:29', '2025-06-04 01:12:17'),
(3, 5, 'd', 'd', 'Paper', 'For Sale', 11.00, 11, 'kg', 'prod_683f7e4aa82e8.png', 'active', '2025-06-03 22:59:22', '2025-06-03 22:59:22'),
(4, 6, 'Bobords', 'YWYYWYWYW', 'Metal', 'For Bought', 10.00, 21, 'kg', 'prod_683feb23da060.jpg', 'active', '2025-06-04 06:43:47', '2025-06-04 06:43:47'),
(5, 11, 'Electronics', NULL, 'Metal', 'For Sale', 15.00, 10, 'piece', 'prod_683ffeea05e8b.jpg', 'active', '2025-06-04 08:08:09', '2025-06-04 08:08:09'),
(6, 14, 'Breadboard2', 'YOWOWOOWOW', 'Metal', 'For Bought', 155.00, 1, 'lb', 'prod_68485755eb5e4.jpg', 'active', '2025-06-10 16:03:33', '2025-06-10 16:03:33');

-- --------------------------------------------------------

--
-- Table structure for table `product_views`
--

CREATE TABLE `product_views` (
  `view_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `view_date` date NOT NULL,
  `view_count` int(11) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password_hash` varchar(300) NOT NULL,
  `created_at` date NOT NULL,
  `remember_token` varchar(255) NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_login` timestamp NOT NULL DEFAULT current_timestamp(),
  `status` enum('active','inactive','suspended') DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `first_name`, `last_name`, `phone`, `email`, `password_hash`, `created_at`, `remember_token`, `profile_image`, `updated_at`, `last_login`, `status`) VALUES
(5, 'Joebert', 'Zarate', '09617761182', 'joebertzarate7@gmail.com', '$2y$10$pUFtOkrgM3YVMJBbEZMV1uxC34WOuF6W9KBWM3kAEq2qrSJ.f0FJ6', '2025-06-03', '', NULL, '2025-06-03 15:34:37', '2025-06-03 15:34:37', 'active'),
(6, 'gg', 'gg', '8686868686868', 'joebertzarate1@gmail.com', '2', '2025-06-03', 'hhhhh', 'null', '2025-06-03 23:34:37', '2025-06-03 23:34:37', 'active'),
(7, 'Joebert', 'Zarate', '09617761110', 'joebertzarate2@gmail.com', '$2y$10$.46ZITg3lFz8LiuRs74q.uCQHdEU7oCwqQ4y3riPKs44lWVzwc0.a', '2025-06-04', '', NULL, '2025-06-04 06:32:45', '2025-06-04 06:32:45', 'active'),
(8, 'Godwin', 'Acido', '09265434346', 'godwinacido17@gmail.com', '$2y$10$1SqbkDKJ9DcQ/XaWZKRfce2Ij0MIuHqShyk92Zk7ki8WWLJzwPLcq', '2025-06-04', '', NULL, '2025-06-04 06:49:27', '2025-06-04 06:49:27', 'active'),
(9, 'Chidrick ', 'Galario ', '09271142218', 'unjkkg37@gmail.com', '$2y$10$KHTifrQVPUyzC/auOZVFr.YhAtlcEiDLqMA1AocM7jbSq5b0YEzni', '2025-06-04', '', NULL, '2025-06-04 09:51:43', '2025-06-04 09:51:43', 'active'),
(10, 'Chidrick ', 'Galario ', '09982948770', 'unjkkg@gmail.com', '$2y$10$RbRNhfRgQNmjTVS6OMkIfuUcI9K6gmUpZnxxbQLH/flSmqAcELW3e', '2025-06-04', '', NULL, '2025-06-04 09:52:43', '2025-06-04 09:52:43', 'active'),
(11, 'Joebert', 'Zarate', '09123456789', 'zarate.joebert01@gmail.com', '$2y$10$gJBQnXWxCCJ35bS8eenBRuJ7cWOmOP45k1Ihi7iDFEVWhsfKMzXoa', '2025-06-04', '', NULL, '2025-06-04 14:16:53', '2025-06-04 14:16:53', 'active'),
(12, 'Joebert', 'Zarate', '09617761110', 'zarate.joebert11@gmail.com', '$2y$10$q7qM1wuEPB.TUxM9GiIY7eyDcZnz9JDttdaOsML8epondYyDyqWcS', '2025-06-04', '', NULL, '2025-06-04 14:32:42', '2025-06-04 14:32:42', 'active'),
(13, 'Chid', 'Galario', '09352578290', 'galariochidrick@gmail.com', '$2y$10$5kBvT3JEGV2jm91FOoKMaeqespoOYNLKg1GD5Yo8IRzvPj.vERqOK', '2025-06-05', '', NULL, '2025-06-05 03:31:31', '2025-06-05 03:31:31', 'active'),
(14, 'Marc', 'Zuck', '09617761182', 'zuckmarge1@gmail.com', '$2y$10$qXDIISKJpKTrZpEUlt4bA.Bdb0r6QO.79/49GG/g/QBVpZvVro876', '2025-06-15', '', NULL, '2025-06-14 17:57:36', '2025-06-14 17:57:36', 'active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`admin_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `businesses`
--
ALTER TABLE `businesses`
  ADD PRIMARY KEY (`business_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `business_materials`
--
ALTER TABLE `business_materials`
  ADD PRIMARY KEY (`id`),
  ADD KEY `business_id` (`business_id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `daily_statistics`
--
ALTER TABLE `daily_statistics`
  ADD PRIMARY KEY (`stat_id`),
  ADD UNIQUE KEY `business_id` (`business_id`,`date`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`message_id`),
  ADD KEY `idx_message_read` (`is_read`),
  ADD KEY `idx_message_type` (`message_type`),
  ADD KEY `idx_message_business` (`business_id`);

--
-- Indexes for table `message_replies`
--
ALTER TABLE `message_replies`
  ADD PRIMARY KEY (`reply_id`),
  ADD KEY `message_id` (`message_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `idx_notification_recipient` (`recipient_id`,`recipient_type`),
  ADD KEY `idx_notification_read` (`is_read`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `idx_order_status` (`status`),
  ADD KEY `idx_order_date` (`order_date`),
  ADD KEY `idx_order_business` (`business_id`),
  ADD KEY `idx_order_customer` (`customer_id`),
  ADD KEY `idx_order_payment_status` (`payment_status`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`order_item_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `owners`
--
ALTER TABLE `owners`
  ADD PRIMARY KEY (`owner_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_owner_email` (`email`),
  ADD KEY `fk_owner_business` (`business_id`);

--
-- Indexes for table `owner_verification`
--
ALTER TABLE `owner_verification`
  ADD PRIMARY KEY (`verification_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`),
  ADD KEY `idx_product_name` (`name`),
  ADD KEY `idx_product_category` (`category`),
  ADD KEY `idx_product_status` (`status`),
  ADD KEY `idx_product_business` (`business_id`);

--
-- Indexes for table `product_views`
--
ALTER TABLE `product_views`
  ADD PRIMARY KEY (`view_id`),
  ADD UNIQUE KEY `product_id` (`product_id`,`view_date`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `idx_user_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admins`
--
ALTER TABLE `admins`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `businesses`
--
ALTER TABLE `businesses`
  MODIFY `business_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `business_materials`
--
ALTER TABLE `business_materials`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `daily_statistics`
--
ALTER TABLE `daily_statistics`
  MODIFY `stat_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message_replies`
--
ALTER TABLE `message_replies`
  MODIFY `reply_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `order_item_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `owners`
--
ALTER TABLE `owners`
  MODIFY `owner_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `owner_verification`
--
ALTER TABLE `owner_verification`
  MODIFY `verification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `product_views`
--
ALTER TABLE `product_views`
  MODIFY `view_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `businesses`
--
ALTER TABLE `businesses`
  ADD CONSTRAINT `businesses_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`owner_id`) ON DELETE CASCADE;

--
-- Constraints for table `business_materials`
--
ALTER TABLE `business_materials`
  ADD CONSTRAINT `business_materials_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`business_id`) ON DELETE CASCADE;

--
-- Constraints for table `daily_statistics`
--
ALTER TABLE `daily_statistics`
  ADD CONSTRAINT `daily_statistics_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`business_id`) ON DELETE CASCADE;

--
-- Constraints for table `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`business_id`) ON DELETE CASCADE;

--
-- Constraints for table `message_replies`
--
ALTER TABLE `message_replies`
  ADD CONSTRAINT `message_replies_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`message_id`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`business_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`customer_id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);

--
-- Constraints for table `owners`
--
ALTER TABLE `owners`
  ADD CONSTRAINT `fk_owner_business` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`business_id`);

--
-- Constraints for table `owner_verification`
--
ALTER TABLE `owner_verification`
  ADD CONSTRAINT `owner_verification_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`owner_id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`business_id`) REFERENCES `businesses` (`business_id`) ON DELETE CASCADE;

--
-- Constraints for table `product_views`
--
ALTER TABLE `product_views`
  ADD CONSTRAINT `product_views_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
