/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 8.0.28 : Database - nedim_ajdin22
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`nedim_ajdin22` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `nedim_ajdin22`;

/*Table structure for table `cart_item` */

DROP TABLE IF EXISTS `cart_item`;

CREATE TABLE `cart_item` (
  `cart_id` char(38) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `date_added` timestamp NOT NULL,
  `date_updated` timestamp NULL DEFAULT NULL,
  `current_quantity` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` char(38) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_user_cart` (`user_id`),
  KEY `fk_product_cart` (`product_id`),
  CONSTRAINT `fk_product_cart` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `fk_user_cart` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `cart_item` */

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `category` */

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` int NOT NULL,
  `color` int NOT NULL,
  `size` int NOT NULL,
  `quantity` int NOT NULL,
  `gender` int NOT NULL,
  `available` int NOT NULL,
  `image` varchar(100) COLLATE utf8_bin NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `subcategory_id` int NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_subcategory_product` (`subcategory_id`),
  CONSTRAINT `fk_subcategory_product` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`subcategory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `product` */

/*Table structure for table `product_order` */

DROP TABLE IF EXISTS `product_order`;

CREATE TABLE `product_order` (
  `product_order_id` char(38) COLLATE utf8_bin NOT NULL,
  `order_date` timestamp NOT NULL,
  `price_total` decimal(18,4) NOT NULL,
  `quantity_total` int NOT NULL,
  `user_id` char(38) COLLATE utf8_bin NOT NULL,
  `order_address` varchar(100) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`product_order_id`),
  KEY `fk_product_order_user` (`user_id`),
  CONSTRAINT `fk_product_order_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `product_order` */

/*Table structure for table `product_order_item` */

DROP TABLE IF EXISTS `product_order_item`;

CREATE TABLE `product_order_item` (
  `product_order_item` char(38) COLLATE utf8_bin NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  KEY `fk_order_product` (`product_id`),
  KEY `fk_order_product_order` (`product_order_item`),
  CONSTRAINT `fk_order_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `fk_order_product_order` FOREIGN KEY (`product_order_item`) REFERENCES `product_order` (`product_order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `product_order_item` */

/*Table structure for table `review` */

DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `description` text COLLATE utf8_bin NOT NULL,
  `date_created` timestamp NOT NULL,
  `user_id` char(38) COLLATE utf8_bin NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`review_id`,`date_created`),
  KEY `fk_user_review` (`user_id`),
  KEY `fk_product_review` (`product_id`),
  CONSTRAINT `fk_product_review` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `fk_user_review` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `review` */

/*Table structure for table `subcategory` */

DROP TABLE IF EXISTS `subcategory`;

CREATE TABLE `subcategory` (
  `subcategory_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`subcategory_id`),
  KEY `fk_category_subcategory` (`category_id`),
  CONSTRAINT `fk_category_subcategory` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `subcategory` */

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` char(38) COLLATE utf8_bin NOT NULL,
  `first_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `date_created` timestamp NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `user` */

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
