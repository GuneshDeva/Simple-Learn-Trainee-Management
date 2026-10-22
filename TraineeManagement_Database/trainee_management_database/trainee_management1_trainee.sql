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
-- Table structure for table `trainee`
--

DROP TABLE IF EXISTS `trainee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainee` (
  `trainee_id` int NOT NULL AUTO_INCREMENT,
  `trainee_name` varchar(100) NOT NULL,
  `trainee_age` int NOT NULL,
  `trainee_gender` varchar(20) NOT NULL,
  `trainee_phonenumber` varchar(10) NOT NULL,
  `trainee_email` varchar(254) NOT NULL,
  `address_id_id` int NOT NULL,
  `batch_id_id` int NOT NULL,
  PRIMARY KEY (`trainee_id`),
  UNIQUE KEY `address_id_id` (`address_id_id`),
  KEY `trainee_batch_id_id_6b2d44dd_fk_batch_batch_id` (`batch_id_id`),
  CONSTRAINT `trainee_address_id_id_1db1d24a_fk_address_address_id` FOREIGN KEY (`address_id_id`) REFERENCES `address` (`address_id`),
  CONSTRAINT `trainee_batch_id_id_6b2d44dd_fk_batch_batch_id` FOREIGN KEY (`batch_id_id`) REFERENCES `batch` (`batch_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainee`
--

LOCK TABLES `trainee` WRITE;
/*!40000 ALTER TABLE `trainee` DISABLE KEYS */;
INSERT INTO `trainee` VALUES (3,'Ram',22,'Male','8784561258','keshore@gmail.com',5,1),(5,'Deva',22,'Male','9696323254','deva@gmail.com',11,1),(6,'Chaya Tejasri',23,'Male','9988556677','chaya@gmail.com',12,1),(13,'Uma Mahesh',223,'Male','9898989898','uma@gmail.com',21,1),(14,'Ruchitha Devulappaly',23,'Female','6633998877','ruchitha@gmail.com',23,4);
/*!40000 ALTER TABLE `trainee` ENABLE KEYS */;
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
