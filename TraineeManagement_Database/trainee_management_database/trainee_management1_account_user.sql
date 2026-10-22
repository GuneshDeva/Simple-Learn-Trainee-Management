-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: trainee_management1
-- ------------------------------------------------------
-- Server version	8.0.32

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
-- Table structure for table `account_user`
--

DROP TABLE IF EXISTS `account_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_user` (
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone_number` bigint NOT NULL,
  `role` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `branch_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_user_branch_id_96a66b75_fk_branch_branch_id` (`branch_id`),
  CONSTRAINT `account_user_branch_id_96a66b75_fk_branch_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branch` (`branch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_user`
--

LOCK TABLES `account_user` WRITE;
/*!40000 ALTER TABLE `account_user` DISABLE KEYS */;
INSERT INTO `account_user` VALUES (NULL,0,'Shannu','',0,1,'2023-07-15 10:43:08.414627',1,'shannu@gmail.com','pbkdf2_sha256$600000$jsfzNaMAjOTamJ0BpX9KFQ$mi7mKupCRvU+yf+8CEd90iuYWQ5sSenJgeavFXt7DTg=',9966885577,'User','',1),(NULL,0,'Deva','raj',0,1,'2023-07-15 11:11:24.402483',2,'deva@gmail.com','pbkdf2_sha256$600000$jatDgb5VulObnfBsShPQCk$sxQ30x5i6Rbd4BS6iKGfT/Jb9E+xY97ME6IBj64CvRY=',9966338855,'User','',1),(NULL,0,'Uma','Mahesh',0,1,'2023-07-15 11:12:57.669380',3,'uma@gmail.com','pbkdf2_sha256$600000$HKD5rrm67CLUKUEdUc6Cgd$Ul34c/k157NvLE3hqHwho2noZOJ9m/cKdSUsn9oXKr8=',9966338877,'Admin','',NULL),(NULL,0,'Deva','raj',0,1,'2023-08-01 09:46:08.553745',4,'devghhjjka@gmail.com','pbkdf2_sha256$600000$CsEpPdfMLIJDdohOmhYdqW$pKbEkdNIKMfCciGqc39crQhKwIL3gqWiGyUkvWKSBw0=',9898989898,'User','',1),(NULL,0,'Brijesh','Dunaboyina',0,1,'2023-08-01 09:48:09.719458',5,'brijesh@gmail.com','pbkdf2_sha256$600000$RtOfU2T84qGBDQJYFQdeDq$MVu0DyZjJmu8DURIgV6IuZm7YHyQLtTivzglcBieiRg=',9988568877,'User','',1),(NULL,0,'sharath','ls',0,1,'2023-08-01 11:31:25.820156',6,'sharathls4u@gmail.com','pbkdf2_sha256$600000$RHS3p5X9Uzfu5pBmeK62Ur$Kik5Ye5wCDF3r+9IZwSjIo/KGCtE3mPmHdZTdQXHFYI=',9898989898,'Admin','',NULL),(NULL,0,'Pramod','ls',0,1,'2023-08-01 11:34:18.869522',7,'pramod12@gmail.com','pbkdf2_sha256$600000$K7dA9i4ESkcPMhjeeFm0zO$WIGUjYY5wmRN9eaKfoNMFJ0CBQYth9qhr1K6L7gd2pM=',7032851374,'User','',1),(NULL,0,'Ruchitha','Devulappali',0,1,'2023-08-01 11:48:27.184508',8,'ruchitha@gmail.com','pbkdf2_sha256$600000$c1SKhj3I9JU2uRweYNkg12$SsYs4A9PCIkOycHVDY5eIDUbc1GrKtP30gzGsGMI9Z0=',6633998877,'Admin','',NULL),(NULL,0,'Gowtham','muddisetty',0,1,'2023-08-01 11:50:33.984895',9,'gowtham@gmail.com','pbkdf2_sha256$600000$mj0KNiRy2a79tW5ys6RGRP$8aZ9sV797k6t6iuIOMHv1yqMqyQcVr86aaRWabm84D4=',9696323254,'User','',1);
/*!40000 ALTER TABLE `account_user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-02 15:50:51
