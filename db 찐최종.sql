-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ssafytrip
-- ------------------------------------------------------
-- Server version	8.0.39

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `badge_id` int NOT NULL AUTO_INCREMENT,
  `badge_name` varchar(20) NOT NULL,
  `badge_img` varchar(100) NOT NULL,
  `badge_detail` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`badge_id`),
  UNIQUE KEY `badge_name` (`badge_name`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
INSERT INTO `badges` VALUES (3,'register','/assets/badges/badge9.png','회원가입을 축하합니다!!!'),(4,'like!','/assets/badges/badge8.png','첫번째 좋아요 획득을 축하해요~~!!!'),(16,'post!','/assets/badges/badge3.png','첫번째 글 작성을 축하해요~~!!!');
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items` (
  `item_id` int NOT NULL AUTO_INCREMENT,
  `item_name` varchar(20) NOT NULL,
  `price` int NOT NULL,
  `item_type` int NOT NULL,
  `item_img` varchar(255) DEFAULT NULL,
  `item_description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE KEY `item_name` (`item_name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (13,'Ethan',1000,1,'/assets/items/profile_man.png','코리안 트레버'),(14,'Sophia',1000,1,'/assets/items/profile_woman.png','여행 전문가'),(15,'Buddy',1000,1,'/assets/items/profile_animal.png','나는 자연인이다'),(16,'Serene Sunset Lake',1000,2,'/assets/items/background_1.png','따뜻한 노을'),(17,'Neon City',1000,2,'/assets/items/background_2.png','밤하늘 아래 네온'),(18,'Winter Wonderland',1000,2,'/assets/items/background_3.png','눈으로 뒤덮인 겨울 숲');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myplan_attractions`
--

DROP TABLE IF EXISTS `myplan_attractions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myplan_attractions` (
  `myplan_id` int NOT NULL,
  `attraction_id` int NOT NULL,
  `myplan_order` int NOT NULL,
  PRIMARY KEY (`myplan_id`,`attraction_id`),
  KEY `attraction_id` (`attraction_id`),
  CONSTRAINT `myplan_attractions_ibfk_1` FOREIGN KEY (`myplan_id`) REFERENCES `myplans` (`myplan_id`) ON DELETE CASCADE,
  CONSTRAINT `myplan_attractions_ibfk_2` FOREIGN KEY (`attraction_id`) REFERENCES `attractions` (`no`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myplan_attractions`
--

LOCK TABLES `myplan_attractions` WRITE;
/*!40000 ALTER TABLE `myplan_attractions` DISABLE KEYS */;
/*!40000 ALTER TABLE `myplan_attractions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `myplans`
--

DROP TABLE IF EXISTS `myplans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `myplans` (
  `myplan_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `myplan_title` varchar(20) NOT NULL,
  `myplan_detail` varchar(1000) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `distance` double DEFAULT '0',
  PRIMARY KEY (`myplan_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `myplans_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `myplans`
--

LOCK TABLES `myplans` WRITE;
/*!40000 ALTER TABLE `myplans` DISABLE KEYS */;
/*!40000 ALTER TABLE `myplans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_boards`
--

DROP TABLE IF EXISTS `plan_boards`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_boards` (
  `plan_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) NOT NULL,
  `myplan_id` int NOT NULL,
  `plan_title` varchar(20) NOT NULL,
  `plan_detail` varchar(1000) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `hit` int DEFAULT '0',
  PRIMARY KEY (`plan_id`),
  KEY `user_id` (`user_id`),
  KEY `myplan_id` (`myplan_id`),
  CONSTRAINT `plan_boards_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `plan_boards_ibfk_2` FOREIGN KEY (`myplan_id`) REFERENCES `myplans` (`myplan_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_boards`
--

LOCK TABLES `plan_boards` WRITE;
/*!40000 ALTER TABLE `plan_boards` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan_boards` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_comments`
--

DROP TABLE IF EXISTS `plan_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `plan_id` int NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `plan_id` (`plan_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `plan_comments_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `plan_boards` (`plan_id`) ON DELETE CASCADE,
  CONSTRAINT `plan_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_comments`
--

LOCK TABLES `plan_comments` WRITE;
/*!40000 ALTER TABLE `plan_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_hits`
--

DROP TABLE IF EXISTS `plan_hits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plan_hits` (
  `plan_id` int NOT NULL,
  `user_id` varchar(20) NOT NULL,
  PRIMARY KEY (`plan_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `plan_hits_ibfk_1` FOREIGN KEY (`plan_id`) REFERENCES `plan_boards` (`plan_id`) ON DELETE CASCADE,
  CONSTRAINT `plan_hits_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_hits`
--

LOCK TABLES `plan_hits` WRITE;
/*!40000 ALTER TABLE `plan_hits` DISABLE KEYS */;
/*!40000 ALTER TABLE `plan_hits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_comments`
--

DROP TABLE IF EXISTS `review_comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `review_id` int NOT NULL,
  `user_id` varchar(20) NOT NULL,
  `content` text NOT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`comment_id`),
  KEY `review_id` (`review_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `review_comments_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`) ON DELETE CASCADE,
  CONSTRAINT `review_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_comments`
--

LOCK TABLES `review_comments` WRITE;
/*!40000 ALTER TABLE `review_comments` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review_hits`
--

DROP TABLE IF EXISTS `review_hits`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review_hits` (
  `review_id` int NOT NULL,
  `user_id` varchar(20) NOT NULL,
  PRIMARY KEY (`review_id`,`user_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `review_hits_ibfk_1` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`review_id`) ON DELETE CASCADE,
  CONSTRAINT `review_hits_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review_hits`
--

LOCK TABLES `review_hits` WRITE;
/*!40000 ALTER TABLE `review_hits` DISABLE KEYS */;
/*!40000 ALTER TABLE `review_hits` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` varchar(20) DEFAULT NULL,
  `review_title` varchar(100) NOT NULL,
  `review_content` varchar(1000) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `hit` int DEFAULT '0',
  `image_path` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userbadges`
--

DROP TABLE IF EXISTS `userbadges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userbadges` (
  `user_id` varchar(20) NOT NULL,
  `badge_id` int NOT NULL,
  `has_seen_badge_update` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`badge_id`),
  KEY `badge_id` (`badge_id`),
  CONSTRAINT `userbadges_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `userbadges_ibfk_2` FOREIGN KEY (`badge_id`) REFERENCES `badges` (`badge_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userbadges`
--

LOCK TABLES `userbadges` WRITE;
/*!40000 ALTER TABLE `userbadges` DISABLE KEYS */;
/*!40000 ALTER TABLE `userbadges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useritems`
--

DROP TABLE IF EXISTS `useritems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `useritems` (
  `user_id` varchar(20) NOT NULL,
  `item_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`item_id`),
  KEY `item_id` (`item_id`),
  CONSTRAINT `useritems_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `useritems_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `items` (`item_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useritems`
--

LOCK TABLES `useritems` WRITE;
/*!40000 ALTER TABLE `useritems` DISABLE KEYS */;
/*!40000 ALTER TABLE `useritems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` varchar(20) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_img` varchar(100) DEFAULT '/assets/user_image1.png',
  `background_img` varchar(100) DEFAULT '/assets/bg_img1.jpg',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `mileage` int DEFAULT '0',
  `refresh_token` varchar(255) DEFAULT NULL,
  `rank_point` int DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `refresh_token` (`refresh_token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
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

-- Dump completed on 2024-11-26  3:37:00
