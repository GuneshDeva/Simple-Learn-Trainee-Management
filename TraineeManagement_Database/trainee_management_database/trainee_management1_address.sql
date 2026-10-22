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
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `door_no` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `pincode` int NOT NULL,
  `state` varchar(100) NOT NULL,
  `locality` varchar(100) NOT NULL,
  PRIMARY KEY (`address_id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (1,'132-434','Sri vianayaka Street','Banglore',560066,'Karnataka','Whitefield'),(2,'132-434','Sri vianayaka Street','Banglore',560066,'Karnataka','Whitefield'),(3,'132-434','Himayathnagar','Hydrabad',572201,'Telanaga','Himayathnagar'),(4,'132-434','Himayathnagar','Hydrabad',572201,'Telanaga','Himayathnagar'),(5,'132-434','Aswath Nagar','Banglore',523698,'Karnataka','Marathahalli'),(6,'134-29','sainikpuri','Bangloore',5355001,'Karnata','Belthur'),(7,'143-22','sainikpuri','Bangloore',5355001,'Karnataka','Karnataka'),(8,'143-22','sainikpuri','Bangloore',5355001,'Karnataka','Karnataka'),(9,'143-22','sainikpuri','Bangloore',5355001,'Karnataka','Karnataka'),(10,'132-434','Sri vianayaka Street','Banglore',560066,'Karnataka','Whitefield'),(11,'143','Himayathnagar','Hydrabad',572201,'Telanaga','Kukatpally'),(12,'189-02','umagot','Badrachalam',572201,'Telanaga','Manuguru'),(13,'22-21','Amalapuram','Bangloore',5355001,'Andhra Pradesh','Amalapuram'),(14,'121','SBR','Banglore',560066,'Banglore','SBR Horizon'),(15,'67-99','SBR','Banglore',560066,'Banglore','Karnataka'),(16,'34','GandhiNagar','Bangalore',560067,'Karnataka','Whitefield'),(17,'223','GandhiNagar','Bangalore',560067,'Karnataka','Whitefield'),(18,'1234','sainikpuri','Bangloore',5355001,'Karnata','SBR Horizon'),(19,'145','Himayathnagar','Hydrabad',572201,'Telanaga','Kukatpally'),(20,'14-96','Kalyana Street','Karnataka',596334,'Manglore','Mangalore'),(21,'123456','BNG','Bangloore',676767,'Karnata','iyujgnbvgh'),(22,'145567','BNG','Bangloore',535500,'Karnata','Belthur'),(23,'145','hopeform','Bangloore',5355001,'Karnata','Hopeform');
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
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
