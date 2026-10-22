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
-- Table structure for table `account_trainer`
--

DROP TABLE IF EXISTS `account_trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account_trainer` (
  `trainer_id` int NOT NULL AUTO_INCREMENT,
  `trainer_name` varchar(100) NOT NULL,
  `trainer_phonenumber` varchar(10) NOT NULL,
  `triner_email` varchar(254) NOT NULL,
  `trainer_age` int NOT NULL,
  `trainer_gender` varchar(10) NOT NULL,
  `created_by` varchar(100) NOT NULL,
  `created_on` date NOT NULL,
  `updated_by` varchar(100) NOT NULL,
  `updated_on` date NOT NULL,
  `address_id_id` int DEFAULT NULL,
  PRIMARY KEY (`trainer_id`),
  UNIQUE KEY `address_id_id` (`address_id_id`),
  CONSTRAINT `account_trainer_address_id_id_14be7ccf_fk_address_address_id` FOREIGN KEY (`address_id_id`) REFERENCES `address` (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_trainer`
--

LOCK TABLES `account_trainer` WRITE;
/*!40000 ALTER TABLE `account_trainer` DISABLE KEYS */;
INSERT INTO `account_trainer` VALUES (1,'Mahindra','8784561258','Mahindra@gmail.com',28,'Male','siva','2023-07-15','siva','2023-07-15',1),(7,'Ram','9988775566','Ram@gmail.com',30,'Male','sharath','2023-07-28','sharath','2023-07-28',19),(9,'Sharath','8989898989','sharath@gmail.com',25,'Male','sharath','2023-08-01','sharath','2023-08-01',22);
/*!40000 ALTER TABLE `account_trainer` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-08-02 15:50:53
