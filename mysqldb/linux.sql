-- MySQL dump 10.13  Distrib 8.0.22, for Linux (x86_64)
--
-- Host: localhost    Database: linux
-- ------------------------------------------------------
-- Server version	8.0.22-0ubuntu0.20.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admins` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `admins_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'admin2','admin@admi2n.com',NULL,'$2y$10$rWSYRJNNT/mkZxLdN3LbO.lz3XgfIRs/NSdQU41eTgI.5ctr3zhG.',NULL,'2020-08-02 18:54:56','2020-08-21 05:20:52'),(2,'admin','admin@admin.com',NULL,'$2y$10$b5XGbssd7u.MN3JNVXS8Iu6E/N7uzFBFhaQ5vQTCr6NihXVTq/BOS',NULL,'2020-08-02 18:55:10','2020-08-02 18:55:10'),(14,'Admin2','admin2@admin.com',NULL,'$2y$10$IvBVaYgQ.vudve2uEHmSTeSWJyghT/cg8QYymrAP.XDASo0xx4yDK',NULL,'2020-09-18 14:46:51','2020-09-18 14:46:51');
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `parent` bigint unsigned DEFAULT NULL,
  `category_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `icon` varchar(140) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_category_id_foreign` (`parent`),
  CONSTRAINT `categories_category_id_foreign` FOREIGN KEY (`parent`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (35,NULL,'Food','2020-09-13 18:21:03','2020-09-13 18:21:03','/images/icon/5f5e7f2fc3d16.png'),(36,35,'Salt','2020-09-13 18:21:49','2020-09-13 18:21:49','/images/icon/5f5e7f5d60ddd.png'),(37,35,'Oil','2020-09-19 01:05:52','2020-09-19 01:00:03','/images/icon/5f6575903bab1.png'),(38,36,'Snacks','2020-09-19 01:09:59','2020-09-19 01:09:59','/images/icon/5f65768749597.png'),(39,NULL,'TVS','2020-11-03 17:27:17','2020-11-03 17:27:17','/images/icon/5fa1af15cd799.png'),(41,NULL,'Mobile','2020-11-03 17:43:24','2020-11-03 17:43:24','/images/icon/5fa1b2dcaab44.png');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `colors`
--

DROP TABLE IF EXISTS `colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `colors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `color_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `colors`
--

LOCK TABLES `colors` WRITE;
/*!40000 ALTER TABLE `colors` DISABLE KEYS */;
INSERT INTO `colors` VALUES (1,'#501d22','Dark Red2','2020-08-02 20:34:17','2020-08-18 18:44:47'),(2,'#ff0101','Red','2020-08-04 17:08:02','2020-08-17 17:15:38'),(3,'#00875f','Green','2020-09-16 15:26:50','2020-09-16 15:26:50');
/*!40000 ALTER TABLE `colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favourites`
--

DROP TABLE IF EXISTS `favourites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favourites` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `favourites_product_id_foreign` (`product_id`),
  KEY `favourites_user_id_foreign` (`user_id`),
  CONSTRAINT `favourites_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `favourites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favourites`
--

LOCK TABLES `favourites` WRITE;
/*!40000 ALTER TABLE `favourites` DISABLE KEYS */;
INSERT INTO `favourites` VALUES (76,2,8,'2021-01-02 17:49:33','2021-01-02 17:49:33'),(84,6,8,'2021-01-03 13:19:45','2021-01-03 13:19:45');
/*!40000 ALTER TABLE `favourites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=108 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (4,'2020_07_20_192124_create_products_table',3),(81,'2014_10_12_000000_create_users_table',4),(82,'2014_10_12_100000_create_password_resets_table',4),(83,'2019_08_19_000000_create_failed_jobs_table',4),(84,'2020_07_23_105620_admin',4),(85,'2020_08_02_003953_colors',4),(86,'2020_08_02_010019_create_trademarks_table',4),(87,'2020_08_02_010544_create_stores_table',4),(88,'2020_08_02_010628_create_categories_table',4),(89,'2020_08_02_010724_create_products_table',4),(90,'2020_08_02_010738_create_products_colors_table',4),(91,'2020_08_02_011753_create_offers_table',4),(92,'2016_06_01_000001_create_oauth_auth_codes_table',5),(93,'2016_06_01_000002_create_oauth_access_tokens_table',5),(94,'2016_06_01_000003_create_oauth_refresh_tokens_table',5),(95,'2016_06_01_000004_create_oauth_clients_table',5),(96,'2016_06_01_000005_create_oauth_personal_access_clients_table',5),(97,'2020_09_13_200604_create_orders_table',6),(98,'2020_09_13_220034_create_products_orders_table',6),(99,'2020_10_13_171136_create_product_images_table',7),(100,'2020_10_14_200604_create_orders_table',8),(101,'2020_10_15_220034_create_products_orders_table',8),(102,'2020_10_16_120034_create_products_orders_table',9),(103,'2020_10_16_183323_create_store_orders_table',9),(104,'2020_10_16_184554_create_store_orders_orders_table',9),(105,'2020_10_16_200604_create_orders_table',9),(106,'2020_10_19_005920_create_favourites_table',10),(107,'2020_10_28_201055_create_ratings_table',11);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_access_tokens`
--

DROP TABLE IF EXISTS `oauth_access_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_access_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `client_id` bigint unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_access_tokens`
--

LOCK TABLES `oauth_access_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_access_tokens` DISABLE KEYS */;
INSERT INTO `oauth_access_tokens` VALUES ('10ee05d3f6a3dc171492000583a7757bd0ecd3eb9407933f9b7a268d88b6f3106743ad4d79e1b0e6',4,13,'AuthToken','[]',0,'2020-08-27 08:23:05','2020-08-27 08:23:05','2021-08-27 10:23:05'),('199fbfa98d6489bb57dffde6c3c241f16c2563753528cb17a44e40e05b45af7147c1a6d2cbc2d732',7,13,'Personal Access Token','[]',0,'2020-09-11 18:50:51','2020-09-11 18:50:51','2021-09-11 20:50:51'),('1ddca8d28a886b3cb9b984a16747a0002653aa46f673d4b79307126765605cc10010e396404d458d',3,13,'AuthToken','[]',0,'2020-08-27 10:29:53','2020-08-27 10:29:53','2021-08-27 12:29:53'),('20822202033271ffa60151d6d76826f647cabef7533e6d5da23a4744928b6cf61d86295c2e300c9c',3,13,'AuthToken','[]',0,'2020-08-27 11:10:58','2020-08-27 11:10:58','2021-08-27 13:10:58'),('21345271bdc05b4c13977878d44bb151447f8ae9d043f5da8f62c9e31b3d8b9b46babfe7e32ad392',3,13,'AuthToken','[]',0,'2020-09-02 14:25:23','2020-09-02 14:25:23','2021-09-02 16:25:23'),('2c0089acee701606495c76dd2e8deb9cc2dedb1203135cfdce2509683c005a2706f4f2c7861dbd50',3,13,'AuthToken','[]',0,'2020-08-27 10:20:31','2020-08-27 10:20:31','2021-08-27 12:20:31'),('3009a1b795bfc181efd75fa127e966e50555494263280003b2ad0d485fb4ff8381874b136c0d74e0',3,13,'AuthToken','[]',0,'2020-08-27 09:50:43','2020-08-27 09:50:43','2021-08-27 11:50:43'),('3890e4573aa6b4b1e1da6f4e1d38910dadfeb2907b35bdd8962db2a7eb54533cde27b1c0ac243cc6',7,13,'Personal Access Token','[]',0,'2020-09-11 19:20:15','2020-09-11 19:20:15','2021-09-11 21:20:15'),('3ec5ae78c47ef4994ddf51863a21a6546ceb9c38fafcebd8919564271aff97421fb0a44fe70edc9e',8,13,'Personal Access Token','[]',0,'2021-01-13 19:22:52','2021-01-13 19:22:52','2021-01-14 21:22:51'),('408a69bf4da5cb1a5839bc187e4db47e52027db9a10b55b7de45c3ab806bd9437c8f63721d0f0ddb',3,13,'AuthToken','[]',0,'2020-08-27 09:53:53','2020-08-27 09:53:53','2021-08-27 11:53:53'),('43105c15405e654641d2248b809df61ef58c0b1e66137f7cc0c53e49a79ba728767527b68b670294',3,13,'AuthToken','[]',0,'2020-09-02 14:19:34','2020-09-02 14:19:34','2021-09-02 16:19:34'),('4a6d30650cbee7a0dc57944c3303c3cab22b17f4724121148edf17fd424ab93eee58ea43e304d621',4,13,'AuthToken','[]',0,'2020-08-27 09:17:44','2020-08-27 09:17:44','2021-08-27 11:17:44'),('4b094a00e72855955ab58b2b7452b28127c9c89bc80bffafd27e033b832c2a013e607615dba78ef0',26,13,'Personal Access Token','[]',0,'2020-10-11 13:48:42','2020-10-11 13:48:42','2020-10-12 15:48:42'),('65d47b9d78f4923bead135467c9db2a81e0924e2683b1708b322716ed036cf728d4d8e49c126f117',3,13,'AuthToken','[]',0,'2020-08-27 10:10:48','2020-08-27 10:10:48','2021-08-27 12:10:48'),('690aa871463769daa57b67d5d0218b5ec681aa7bb310d863987ae577473d73789682ccd20c8c8a06',3,13,'AuthToken','[]',0,'2020-08-27 09:10:05','2020-08-27 09:10:05','2021-08-27 11:10:05'),('699b1c9fe10228b2835757fc3aab2d2be2bd94f7d7cd07854efaef026ded2ae708e2261b97af0376',3,13,'AuthToken','[]',0,'2020-08-27 09:06:39','2020-08-27 09:06:39','2021-08-27 11:06:39'),('6b28219332cb1bff02f916300ce26ce13af227252157f02750a2ba846220792d7cb80cee1ccb57f6',3,13,'AuthToken','[]',0,'2020-08-27 10:16:26','2020-08-27 10:16:26','2021-08-27 12:16:26'),('6dca1884fc06cca4e1113511e981d13e6e3ef0a1fc7910232f1b2fd4a64af808224bd7780a24b9e1',3,13,'AuthToken','[]',0,'2020-08-27 10:15:06','2020-08-27 10:15:06','2021-08-27 12:15:06'),('7cb1ae74d667808f6e8214188902f8f6a36e55e01f9f69adf8dd6c619935fa4f3774718a3e995559',3,13,'AuthToken','[]',0,'2020-08-27 09:10:25','2020-08-27 09:10:25','2021-08-27 11:10:25'),('7dbd709a32c1ebd92a1a57972af3d39be4c4cd8003c59c3c91b8e9dbce73e67dc86bbf6057c2932d',8,13,'Personal Access Token','[]',0,'2021-01-02 16:00:06','2021-01-02 16:00:06','2021-01-03 18:00:06'),('7dc98623e1f565d8ff28686457a72fd46232898ab2cfdcdcebeb79ab69c3d30fbe8c9ff06de5b13c',4,11,'AuthToken','[]',0,'2020-08-27 07:37:12','2020-08-27 07:37:12','2021-08-27 09:37:12'),('81cdd8f27bb4d27e739c643d0b93e4f4e1da95459e1e4232506db765c1213757ea8f56978e2824d4',8,13,'Personal Access Token','[]',0,'2021-01-14 19:24:34','2021-01-14 19:24:34','2021-01-15 21:24:33'),('8e01349a6035e7a1920aed033f0254e9aa4a5ca887a7606a0613565b6bedfdef8d5ec58588ff5e8c',7,13,'Personal Access Token','[]',0,'2020-09-11 14:47:03','2020-09-11 14:47:03','2021-09-11 16:47:03'),('92136de43059cdec1b9774e783f95f186828d4938afbdac250e08677fb17d9fd0f988aabd2c1485e',3,13,'AuthToken','[]',0,'2020-08-27 10:12:38','2020-08-27 10:12:38','2021-08-27 12:12:38'),('9800ce7955c81c0ce1b796c0797457ee923e22dc50fb72ca90ea570303690aeacb61abee6f87199e',3,13,'AuthToken','[]',0,'2020-08-27 10:23:41','2020-08-27 10:23:41','2021-08-27 12:23:41'),('981cd91abcf9dd39984e86179a9b98e022bc4b1c2e85ce3eee7495045d30697a7691bde8fd34beed',7,13,'Personal Access Token','[]',0,'2020-09-11 14:36:33','2020-09-11 14:36:33','2021-09-11 16:36:33'),('a19d2cb546b4cba29cf7eac7c393c2a42b849f3f9ba274571b2d02f896ad505c804633059f039de6',3,13,'AuthToken','[]',0,'2020-08-27 10:05:08','2020-08-27 10:05:08','2021-08-27 12:05:08'),('ae168f20bbab4564908e64d5865ced53afa31f91e426d5c2b9e0eddba521436bf17d1054eda86d8d',3,13,'AuthToken','[]',0,'2020-08-27 10:23:42','2020-08-27 10:23:42','2021-08-27 12:23:42'),('bba18154d745e242fbe445820426c07e0f672e1ca7e6ea8932382dcc6d646a0d93f4d97d27c737fa',7,13,'Personal Access Token','[]',0,'2020-09-11 19:06:02','2020-09-11 19:06:02','2021-09-11 21:06:02'),('bd94f46051a90f5b90495baf4752a1ef3da6d67a3727f7ce588e3b107cbd78da4f046127536302f2',4,11,'AuthToken','[]',0,'2020-08-27 07:41:16','2020-08-27 07:41:16','2021-08-27 09:41:16'),('bdd0269fae5e5097785333626ad63dc60d4741aa49df2b74d469614ed6e3cd0c6b61ce0867542089',3,13,'AuthToken','[]',0,'2020-08-27 10:03:47','2020-08-27 10:03:47','2021-08-27 12:03:47'),('bf172fb4fcd9d91284b4c69a956daf4324f9b5a6243a0a4247f51d884829b92f4bff88592ba6e518',3,13,'AuthToken','[]',0,'2020-08-27 10:23:44','2020-08-27 10:23:44','2021-08-27 12:23:44'),('c37c54b653ac3682affb6a2fe551281df532a53f085589ec7789d14c9f0036adfc24cacd2c2736b5',4,13,'AuthToken','[]',0,'2020-08-27 07:56:46','2020-08-27 07:56:46','2021-08-27 09:56:46'),('d5be6d1f5e93fea4093841e39035aebac9ba30858c52a983afb3ae6f21030fc94fae123c3d171c0a',3,13,'AuthToken','[]',0,'2020-09-02 14:07:33','2020-09-02 14:07:33','2021-09-02 16:07:33'),('ddd3b7c7ef44743698de190279fa5ac67434eee9e4b72ced123041d3a5b79dde4192beb874b33e94',3,13,'AuthToken','[]',0,'2020-08-27 09:41:42','2020-08-27 09:41:42','2021-08-27 11:41:42'),('e847d9a02261a5041702dfccd767415aba163f47421069c6cb816a56d60b254d1b1355051a01d8f9',3,13,'AuthToken','[]',0,'2020-08-28 07:57:21','2020-08-28 07:57:21','2021-08-28 09:57:21'),('f19b3b97f510b19bd29626ea34d8cb1feac33bbbf0a215224e5ad2dfa44d4a8e2d1ca13e56957172',3,13,'AuthToken','[]',0,'2020-08-27 09:58:22','2020-08-27 09:58:22','2021-08-27 11:58:22'),('f28a9630bf475981b16b603782a4ea8d397476a9a756eaa2b69dd281438aeccbd963ad9475e65648',7,13,'Personal Access Token','[]',0,'2020-09-13 12:13:13','2020-09-13 12:13:13','2021-09-13 14:13:13'),('f337ee869403aa0c61488199eae67c7a984c06d32c9b0c1ef44d77a84a1f466c1fca7967f42414f6',3,13,'AuthToken','[]',0,'2020-08-27 10:31:06','2020-08-27 10:31:06','2021-08-27 12:31:06');
/*!40000 ALTER TABLE `oauth_access_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_auth_codes`
--

DROP TABLE IF EXISTS `oauth_auth_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_auth_codes` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `client_id` bigint unsigned NOT NULL,
  `scopes` text COLLATE utf8mb4_unicode_ci,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_auth_codes`
--

LOCK TABLES `oauth_auth_codes` WRITE;
/*!40000 ALTER TABLE `oauth_auth_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_auth_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_clients`
--

DROP TABLE IF EXISTS `oauth_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `secret` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `provider` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `redirect` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `personal_access_client` tinyint(1) NOT NULL,
  `password_client` tinyint(1) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_user_id_index` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_clients`
--

LOCK TABLES `oauth_clients` WRITE;
/*!40000 ALTER TABLE `oauth_clients` DISABLE KEYS */;
INSERT INTO `oauth_clients` VALUES (1,NULL,'Laravel Personal Access Client','7Ye2JYwCf5Aw2tolLgT0b83P1F2vNdIkKYnCMUfH',NULL,'http://localhost',1,0,0,'2020-08-27 05:41:53','2020-08-27 05:41:53'),(2,NULL,'Laravel Password Grant Client','tcLx87LbpVEmfbM7DtA9bdIoHEsTqstmYsKXUE6N','users','http://localhost',0,1,0,'2020-08-27 05:41:53','2020-08-27 05:41:53'),(3,NULL,'Laravel Personal Access Client','gWq0IkxnrUO0nxVBEFbJA4Qj88fUKFaFr3SIbnas',NULL,'http://localhost',1,0,0,'2020-08-27 05:44:25','2020-08-27 05:44:25'),(4,NULL,'Laravel Password Grant Client','dmNE1XBGYguqFjGIfwJQsE4MuYlxUD1iE9BCsOVB','users','http://localhost',0,1,0,'2020-08-27 05:44:25','2020-08-27 05:44:25'),(5,NULL,'Laravel Personal Access Client','0DNJVyz8VD5qh6Ygb5EXyTPWaGv97W5Iv8mq5PQn',NULL,'http://localhost',1,0,0,'2020-08-27 05:44:32','2020-08-27 05:44:32'),(6,NULL,'Laravel Password Grant Client','6jjh5PmdVsrkBfA9k3yzdZmGONDs45ii8gSPTxTv','users','http://localhost',0,1,0,'2020-08-27 05:44:32','2020-08-27 05:44:32'),(7,NULL,'Laravel Personal Access Client','VwtNPec3R0R6PmJnF1ymcLTpxD93KADAgfw4dbuR',NULL,'http://localhost',1,0,0,'2020-08-27 05:44:34','2020-08-27 05:44:34'),(8,NULL,'Laravel Password Grant Client','KnIooywDvz1YITaNuK5h1bqATEldMCU6yQHPXRjg','users','http://localhost',0,1,0,'2020-08-27 05:44:34','2020-08-27 05:44:34'),(9,NULL,'Laravel Personal Access Client','D9zeWgm9LVGn8TH61S5AKCXDiMcIOGJ3lmucNVp2',NULL,'http://localhost',1,0,0,'2020-08-27 05:44:35','2020-08-27 05:44:35'),(10,NULL,'Laravel Password Grant Client','QiBCqqfn5m2yfOjODe2faqmBYTlLCko4CFqbHXEJ','users','http://localhost',0,1,0,'2020-08-27 05:44:35','2020-08-27 05:44:35'),(11,NULL,'Laravel Personal Access Client','IdHvU3e2Rrymx2ZE4k8iRPINoGQodFxyE6vmdZft',NULL,'http://localhost',1,0,0,'2020-08-27 06:00:55','2020-08-27 06:00:55'),(12,NULL,'Laravel Password Grant Client','aKTluSyvP5S9YzS1ugvUUdhbf1vapV9w8WqdV3Ew','users','http://localhost',0,1,0,'2020-08-27 06:00:55','2020-08-27 06:00:55'),(13,NULL,'Laravel Personal Access Client','xqQ0gafOLawFAYZkmGokc7ptWQVKUruSLKSTvKLw',NULL,'http://localhost',1,0,0,'2020-08-27 07:49:54','2020-08-27 07:49:54');
/*!40000 ALTER TABLE `oauth_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_personal_access_clients`
--

DROP TABLE IF EXISTS `oauth_personal_access_clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_personal_access_clients` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_personal_access_clients`
--

LOCK TABLES `oauth_personal_access_clients` WRITE;
/*!40000 ALTER TABLE `oauth_personal_access_clients` DISABLE KEYS */;
INSERT INTO `oauth_personal_access_clients` VALUES (1,1,'2020-08-27 05:41:53','2020-08-27 05:41:53'),(2,3,'2020-08-27 05:44:25','2020-08-27 05:44:25'),(3,5,'2020-08-27 05:44:32','2020-08-27 05:44:32'),(4,7,'2020-08-27 05:44:34','2020-08-27 05:44:34'),(5,9,'2020-08-27 05:44:35','2020-08-27 05:44:35'),(6,11,'2020-08-27 06:00:55','2020-08-27 06:00:55'),(7,13,'2020-08-27 07:49:54','2020-08-27 07:49:54');
/*!40000 ALTER TABLE `oauth_personal_access_clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `oauth_refresh_tokens`
--

DROP TABLE IF EXISTS `oauth_refresh_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `oauth_refresh_tokens` (
  `id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `access_token_id` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `oauth_refresh_tokens`
--

LOCK TABLES `oauth_refresh_tokens` WRITE;
/*!40000 ALTER TABLE `oauth_refresh_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `oauth_refresh_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `offers`
--

DROP TABLE IF EXISTS `offers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `offers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `discount` double(8,2) NOT NULL,
  `start_at` date NOT NULL,
  `end_at` date NOT NULL,
  `product_id` bigint unsigned NOT NULL,
  `amount` int NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `offers_product_id_foreign` (`product_id`),
  CONSTRAINT `offers_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `offers`
--

LOCK TABLES `offers` WRITE;
/*!40000 ALTER TABLE `offers` DISABLE KEYS */;
/*!40000 ALTER TABLE `offers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_user_id_foreign` (`user_id`),
  CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (71,8,'2020-10-30 22:04:49','2020-10-30 22:04:49'),(72,8,'2020-11-03 17:07:52','2020-11-03 17:07:52'),(73,8,'2020-11-03 17:32:28','2020-11-03 17:32:28'),(74,8,'2020-11-03 17:38:18','2020-11-03 17:38:18');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_images`
--

DROP TABLE IF EXISTS `product_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `img_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_images_product_id_foreign` (`product_id`),
  CONSTRAINT `product_images_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_images`
--

LOCK TABLES `product_images` WRITE;
/*!40000 ALTER TABLE `product_images` DISABLE KEYS */;
INSERT INTO `product_images` VALUES (1,11,'images1','/images/product/5fa543910b1aa.png','2020-10-14 01:05:38','2020-10-14 16:39:03'),(2,11,'images0','/images/product/5fa543912632c.jpeg','2020-10-14 14:09:18','2020-10-22 19:18:57'),(3,13,'images0','/images/product/5f8f8b2219d39.jpeg','2020-10-20 22:54:39','2020-10-20 23:13:06'),(4,7,'images0','/images/product/5fbc290c8dd9f.jpeg','2020-10-20 23:03:39','2020-11-23 19:26:36'),(5,7,'images1','/images/product/5fbc290cadbd8.jpeg','2020-10-20 23:08:33','2020-11-23 19:26:36'),(6,13,'images1','/images/product/5f8f8b221e9ee.jpeg','2020-10-20 23:13:06','2020-10-20 23:13:06'),(7,6,'images0','/images/product/5fbc2334ad4bb.jpeg','2020-10-22 18:40:08','2020-11-23 19:01:40'),(8,11,'images2','/images/product/5fa54391295dd.jpg','2020-10-22 19:28:31','2020-10-22 19:28:31'),(9,11,'images3','/images/product/5fa543912c768.jpeg','2020-10-22 19:29:27','2020-10-22 19:29:27'),(10,7,'images2','/images/product/5fbc290cbed44.jpeg','2020-11-23 19:26:36','2020-11-23 19:26:36');
/*!40000 ALTER TABLE `product_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `store_id` bigint unsigned NOT NULL,
  `price` double(8,2) NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` bigint unsigned NOT NULL,
  `trademark_id` bigint unsigned NOT NULL,
  `product_description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `amount` int NOT NULL DEFAULT '0',
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `color_id` bigint unsigned DEFAULT NULL,
  `image` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `rejection_reason` longtext COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  KEY `products_store_id_foreign` (`store_id`),
  KEY `products_category_id_foreign` (`category_id`),
  KEY `products_trademark_id_foreign` (`trademark_id`),
  KEY `color_id` (`color_id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`),
  CONSTRAINT `products_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_trademark_id_foreign` FOREIGN KEY (`trademark_id`) REFERENCES `trademarks` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (2,7,14000.00,'Iphone',37,3,'IphoneIphoneIphoneIphoneIphoneIphoneIphoneIphoneIphoneIphoneIphoneIphone','2020-09-22 15:44:00','2020-10-21 03:27:21',34,1,1,'/images/product/5f8cbfc5a7f4b.jpeg',NULL),(3,7,20000.00,'Samsung Galaxy S10',37,3,'Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10Samsung Galaxy S10','2020-09-23 00:54:12','2020-10-25 18:00:17',88,1,1,'/images/product/5f8cbd5c44655.jpeg',NULL),(4,7,3000.00,'Nokia 7',37,4,'[Nokia Camera:] 64mp \n[RAM:] 4GB\n[Storage:] 64GB\n[Color: White]','2020-10-09 13:32:30','2020-10-18 17:34:28',77,1,3,'/images/product/5f847a4e3d091.jpg',NULL),(6,7,3500.99,'Nokia 7',41,4,'Nokia Camera: 64mp\nRAM: 4GB\nStorage: 64GB\nColor: White','2020-10-12 15:58:44','2020-11-23 17:36:57',136,1,2,'/images/product/5fbc0f4148c25.jpeg',NULL),(7,7,5000.00,'Nokia 8',37,4,'Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8 Nokia 8','2020-10-14 00:28:40','2020-11-06 09:59:20',50,0,1,'',NULL),(8,7,5000.00,'Nokia 8',37,4,'Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8Nokia 8','2020-10-14 00:34:12','2021-01-14 19:31:05',50,0,1,'/images/product/5fff9a7532798.jpeg',NULL),(11,7,2000.00,'Nokia 8',37,4,'[nokia 8] nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8 nokia 8','2020-10-14 01:05:38','2021-01-14 20:23:50',1000,0,1,'',NULL),(12,7,20.00,'Pringles',38,5,'Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles','2020-10-20 22:37:12','2021-01-14 20:25:48',1166,1,1,'/images/product/5fa5b7158c769.jpeg',NULL),(13,7,20.00,'Pringles',38,5,'Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles','2020-10-20 22:54:39','2021-01-14 20:28:43',1164,0,3,'/images/product/5f8f8b22199a6.jpeg',NULL),(14,7,15.00,'Pringles',38,6,'Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles Pringles','2020-10-21 04:00:51','2021-01-14 20:29:04',400,1,2,'/images/product/5f8fcec0e22d5.jpeg',NULL),(15,7,25000.00,'Samsung Galaxy S11',37,3,'Samsung Galaxy S11Samsung Galaxy S11Samsung Galaxy S11Samsung Galaxy S11Samsung Galaxy S11Samsung Galaxy S11Samsung Galaxy S11','2020-10-22 22:15:35','2021-01-14 13:45:51',150,0,2,'/images/product/5f9220a71654a.jpeg','Not suitable image'),(16,7,24000.00,'Samsung Galaxy S12',38,3,'Samsung Galaxy S12  Samsung Galaxy S12  Samsung Galaxy S12  Samsung Galaxy S12  Samsung Galaxy S12  Samsung Galaxy S12  Samsung Galaxy S12  Samsung Galaxy S12  Samsung Galaxy S12  Samsung Galaxy S12','2020-10-22 22:54:30','2021-01-14 20:04:38',60,0,2,'/images/product/5f9229c668c94.jpeg','no image');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_colors`
--

DROP TABLE IF EXISTS `products_colors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_colors` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `product_id` bigint unsigned NOT NULL,
  `color_id` bigint unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_colors_product_id_foreign` (`product_id`),
  KEY `products_colors_color_id_foreign` (`color_id`),
  CONSTRAINT `products_colors_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `products_colors_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_colors`
--

LOCK TABLES `products_colors` WRITE;
/*!40000 ALTER TABLE `products_colors` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_colors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_orders`
--

DROP TABLE IF EXISTS `products_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products_orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `price` double(8,2) NOT NULL,
  `discount` double(8,2) NOT NULL DEFAULT '0.00',
  `product_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `quantity` int NOT NULL DEFAULT (1),
  `store_order_id` bigint unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_orders_product_id_foreign` (`product_id`),
  KEY `store_order_id` (`store_order_id`),
  CONSTRAINT `products_orders_ibfk_1` FOREIGN KEY (`store_order_id`) REFERENCES `store_orders` (`id`),
  CONSTRAINT `products_orders_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=104 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_orders`
--

LOCK TABLES `products_orders` WRITE;
/*!40000 ALTER TABLE `products_orders` DISABLE KEYS */;
INSERT INTO `products_orders` VALUES (99,20.00,0.00,13,'2020-10-30 22:04:49','2020-10-30 22:04:49',1,88),(100,20.00,0.00,13,'2020-11-03 17:07:52','2020-11-03 17:07:52',1,89),(101,3500.99,0.00,6,'2020-11-03 17:32:28','2020-11-03 17:32:28',1,90),(102,3500.99,0.00,6,'2020-11-03 17:38:18','2020-11-03 17:38:18',1,91),(103,120.00,0.00,13,'2020-11-03 17:38:18','2020-11-03 17:38:18',6,91);
/*!40000 ALTER TABLE `products_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `comment` longtext COLLATE utf8mb4_unicode_ci,
  `rating` enum('1','2','3','4','5') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT (0),
  `product_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ratings_user_id_foreign` (`user_id`),
  KEY `ratings_product_id_foreign` (`product_id`),
  CONSTRAINT `ratings_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `ratings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,'Very Good','5',12,8,NULL,NULL),(2,'Very very Good','3',12,8,'2020-10-29 21:29:34','2020-10-29 21:29:34'),(3,'Bad Quality','2',13,8,'2020-10-30 21:34:34','2020-10-30 21:34:34'),(6,'good','3',13,8,'2020-11-03 17:37:33','2020-11-03 17:37:33'),(7,'zbala','4',6,8,'2021-01-03 13:20:32','2021-01-03 13:20:32'),(9,'bad Product','1',6,8,'2021-01-03 14:51:17','2021-01-03 14:51:17'),(13,'Not Bad','3',6,8,'2021-01-03 15:03:33','2021-01-03 15:03:33'),(14,'bad','1',6,8,'2021-01-03 15:08:53','2021-01-03 15:08:53'),(15,'منتج سيئ','1',13,8,'2021-01-14 15:10:34','2021-01-14 15:10:34');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_orders`
--

DROP TABLE IF EXISTS `store_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total` double(8,2) NOT NULL,
  `discount` double(8,2) NOT NULL,
  `status` tinyint DEFAULT (0),
  `store_id` bigint unsigned NOT NULL,
  `user_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_orders_store_id_foreign` (`store_id`),
  KEY `store_orders_user_id_foreign` (`user_id`),
  CONSTRAINT `store_orders_store_id_foreign` FOREIGN KEY (`store_id`) REFERENCES `stores` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `store_orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_orders`
--

LOCK TABLES `store_orders` WRITE;
/*!40000 ALTER TABLE `store_orders` DISABLE KEYS */;
INSERT INTO `store_orders` VALUES (88,'Tanta',20.00,0.00,3,7,8,'2020-10-30 22:04:49','2021-01-13 19:58:59'),(89,'Tanta',20.00,0.00,3,7,8,'2020-11-03 17:07:52','2020-11-23 16:59:07'),(90,'Cairo',3500.99,0.00,2,7,8,'2020-11-03 17:32:28','2020-11-11 23:17:04'),(91,'Ta',3620.99,0.00,0,7,8,'2020-11-03 17:38:18','2020-11-03 17:38:18');
/*!40000 ALTER TABLE `store_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_orders_orders`
--

DROP TABLE IF EXISTS `store_orders_orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `store_orders_orders` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `order_id` bigint unsigned NOT NULL,
  `store_order_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `store_orders_orders_store_order_id_foreign` (`store_order_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `store_orders_orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `store_orders_orders_store_order_id_foreign` FOREIGN KEY (`store_order_id`) REFERENCES `store_orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_orders_orders`
--

LOCK TABLES `store_orders_orders` WRITE;
/*!40000 ALTER TABLE `store_orders_orders` DISABLE KEYS */;
INSERT INTO `store_orders_orders` VALUES (19,71,88,'2020-10-30 22:04:49','2020-10-30 22:04:49'),(59,72,89,'2020-11-03 17:07:52','2020-11-03 17:07:52'),(60,73,90,'2020-11-03 17:32:28','2020-11-03 17:32:28'),(61,74,91,'2020-11-03 17:38:18','2020-11-03 17:38:18');
/*!40000 ALTER TABLE `store_orders_orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `stores`
--

DROP TABLE IF EXISTS `stores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `stores` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `store_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `status` tinyint(1) DEFAULT (0),
  PRIMARY KEY (`id`),
  KEY `stores_user_id_foreign` (`user_id`),
  CONSTRAINT `stores_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `stores`
--

LOCK TABLES `stores` WRITE;
/*!40000 ALTER TABLE `stores` DISABLE KEYS */;
INSERT INTO `stores` VALUES (7,8,'Zara','Http://www.google.com/mhmjjmhmhmcnmncgngngnbfbnbbkjkjkjkjkjlkjkkjkkkjkkjhnhnvghhghgyhjhjjhhghgjhyjyhyhjhjhhjyjhjhjhhjyhjhj',110000000,'2020-09-14 21:38:22','2020-11-11 23:28:49',1),(8,25,'Zara','Http://www.google.com/mhmjjmhmhmcnmncgngngnbfbnbbkjkjkjkjkjlkjkkjkkkjkkjhnhnvghhghgyhjhjjhhghgjhyjyhyhjhjhhjyjhjhjhhjyhjhj',10000000000000,'2020-09-14 22:38:08','2020-11-11 22:51:50',1),(9,27,'Apple2','Http://www.google.com/mhmjjmhmhmcnmncgngngnbfbnbbkjkjkjkjkjlkjkkjkkkjkkjhnhnvghhghgyhjhjjhhghgjhyjyhyhjhjhhjyjhjhjhhjyhjhj',10000000000,'2020-11-03 17:59:31','2020-11-03 18:00:17',1),(11,8,'KFC','Http://www.google.com/mhmjjmhmhmcnmncgngngnbfbnbbkjkjkjkjkjlkjkkjkkkjkkjhnhnvghhghgyhjhjjhhghgjhyjyhyhjhjhhjyjhjhjhhjyhjhj',1000000000,'2020-11-03 22:04:15','2020-11-06 15:30:09',1);
/*!40000 ALTER TABLE `stores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trademarks`
--

DROP TABLE IF EXISTS `trademarks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trademarks` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trademarks`
--

LOCK TABLES `trademarks` WRITE;
/*!40000 ALTER TABLE `trademarks` DISABLE KEYS */;
INSERT INTO `trademarks` VALUES (2,'Apple',NULL,'2020-08-03 18:09:25','2020-08-03 18:09:25'),(3,'Samsung',NULL,'2020-09-16 15:22:10','2020-09-16 15:22:10'),(4,'Nokia',NULL,'2020-09-22 17:02:50','2020-09-22 17:02:50'),(5,'Zara',NULL,'2020-09-22 17:03:27','2020-09-22 17:03:27'),(6,'Addias',NULL,'2020-09-22 17:13:49','2020-09-22 17:13:49');
/*!40000 ALTER TABLE `trademarks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (8,'Admin5','admin@admin.com',NULL,'$2y$10$fPGYU51lnsojrwgEJBYnWenIF3Uh17dkk62yi4c6uh.nu7SODeyMm',NULL,'2020-09-13 13:28:43','2020-09-18 23:05:30'),(25,'admin5','admin5@admin.com',NULL,'$2y$10$IgVNbyJIpr5dFnHR24Joh.Cn8caP43NoyU96j9VMfQvoS4wGYI/e6',NULL,'2020-09-14 22:33:11','2020-09-14 22:33:11'),(26,'Wael','admin4@admin.com',NULL,'$2y$10$jMJcWUzlNdTJ2thJ3qT0eO6COM6GFQIdwFjqFnUSUC.ayoT/QGIhO',NULL,'2020-10-10 15:22:01','2020-10-10 15:34:43'),(27,'Fawzy','admin8@admin.com',NULL,'$2y$10$6ezdaN3lMz/j.ZJMWYJ1.OGLsuiGZuRziNhREeipwmWUQX2kVAWNK',NULL,'2020-11-03 17:55:47','2020-11-03 17:55:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-01-15 13:15:37
