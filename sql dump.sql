/*
SQLyog Community v13.1.6 (64 bit)
MySQL - 8.0.29 : Database - nedim_ajdin22
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
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `date_added` timestamp NOT NULL,
  `date_updated` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `current_quantity` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` char(38) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`cart_id`),
  KEY `fk_user_cart` (`user_id`),
  KEY `fk_product_cart` (`product_id`),
  CONSTRAINT `fk_product_cart` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `fk_user_cart` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `cart_item` */

/*Table structure for table `category` */

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `category` */

insert  into `category`(`category_id`,`name`) values 
(1,'Nedim'),
(2,'Ajdin');

/*Table structure for table `product` */

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `color` varchar(100) NOT NULL,
  `size` varchar(100) NOT NULL,
  `quantity` int NOT NULL,
  `gender` varchar(100) NOT NULL,
  `available` varchar(100) NOT NULL,
  `image` text CHARACTER SET utf8mb3 COLLATE utf8_bin NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8_bin NOT NULL,
  `subcategory_id` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  PRIMARY KEY (`product_id`),
  KEY `fk_subcategory_product` (`subcategory_id`),
  CONSTRAINT `fk_subcategory_product` FOREIGN KEY (`subcategory_id`) REFERENCES `subcategory` (`subcategory_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

/*Data for the table `product` */

insert  into `product`(`product_id`,`name`,`color`,`size`,`quantity`,`gender`,`available`,`image`,`description`,`subcategory_id`,`price`) values 
(1,'duksa1','white','M',0,'male','yes','https://cdn.shopify.com/s/files/1/0572/6479/9914/products/spod-1056281959-204-1_480x480@2x.png?v=1623190670','Maecenas lectus tellus, tempor quis ultricies a, placerat ac \r\nleo. Vestibulum egestas tellus id fringilla porta. Duis eu neque nulla. Aenean interdum, velit ut faucibus luctus, \r\neros metus accumsan metus, eu pellentesque leo nisl id sem. Suspendisse pharetra nec libero ut lobortis. Vestibulum s\r\nit amet rutrum magna. Proin pellentesque molestie lorem, et convallis mauris finibus in. Nullam in lectus ultricies, \r\nefficitur neque id, rutrum sapien. Phasellus consequat aliquet est, et sodales augue ultricies nec. Cras sodales sem \r\nmalesuada molestie posuere. Mauris enim est, rhoncus sit amet dui ullamcorper, sodales feugiat ex. Nullam porttitor, nisl non interdum pulvinar, \r\nsapien purus tempus dolor, eget fringilla mi leo at risus. Vestibulum nisl orci, iaculis a dictum sit amet, elementum et massa. \r\nCurabitur suscipit consectetur urna, at\r\n luctus ante euismod ut. Ut facilisis aliquam leo vitae malesuada. Proin et tempor est, quis porta tortor.',1,20),
(2,'duksa2','white','L',28,'male','yes','data:image/jpeg;base64,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','Maecenas lectus tellus, tempor quis ultricies a, placerat ac \r\nleo. Vestibulum egestas tellus id fringilla porta. Duis eu neque nulla. Aenean interdum, velit ut faucibus luctus, \r\neros metus accumsan metus, eu pellentesque leo nisl id sem. Suspendisse pharetra nec libero ut lobortis. Vestibulum s\r\nit amet rutrum magna. Proin pellentesque molestie lorem, et convallis mauris finibus in. Nullam in lectus ultricies, \r\nefficitur neque id, rutrum sapien. Phasellus consequat aliquet est, et sodales augue ultricies nec. Cras sodales sem \r\nmalesuada molestie posuere. Mauris enim est, rhoncus sit amet dui ullamcorper, sodales feugiat ex. Nullam porttitor, nisl non interdum pulvinar, \r\nsapien purus tempus dolor, eget fringilla mi leo at risus. Vestibulum nisl orci, iaculis a dictum sit amet, elementum et massa. \r\nCurabitur suscipit consectetur urna, at\r\n luctus ante euismod ut. Ut facilisis aliquam leo vitae malesuada. Proin et tempor est, quis porta tortor.',1,105),
(3,'duksa3','blue','S',55,'female','yes','https://ih1.redbubble.net/image.1815145045.9131/ssrco,lightweight_hoodie,womens,royal_lightweight_hoodie,front,square_product,x600-bg,f8f8f8.1u3.jpg','Maecenas lectus tellus, tempor quis ultricies a, placerat ac \r\nleo. Vestibulum egestas tellus id fringilla porta. Duis eu neque nulla. Aenean interdum, velit ut faucibus luctus, \r\neros metus accumsan metus, eu pellentesque leo nisl id sem. Suspendisse pharetra nec libero ut lobortis. Vestibulum s\r\nit amet rutrum magna. Proin pellentesque molestie lorem, et convallis mauris finibus in. Nullam in lectus ultricies, \r\nefficitur neque id, rutrum sapien. Phasellus consequat aliquet est, et sodales augue ultricies nec. Cras sodales sem \r\nmalesuada molestie posuere. Mauris enim est, rhoncus sit amet dui ullamcorper, sodales feugiat ex. Nullam porttitor, nisl non interdum pulvinar, \r\nsapien purus tempus dolor, eget fringilla mi leo at risus. Vestibulum nisl orci, iaculis a dictum sit amet, elementum et massa. \r\nCurabitur suscipit consectetur urna, at\r\n luctus ante euismod ut. Ut facilisis aliquam leo vitae malesuada. Proin et tempor est, quis porta tortor.',1,20),
(4,'duksa4','yellow','S',68,'male','yes','https://img.fruugo.com/product/4/23/242804234_max.jpg','Maecenas lectus tellus, tempor quis ultricies a, placerat ac \r\nleo. Vestibulum egestas tellus id fringilla porta. Duis eu neque nulla. Aenean interdum, velit ut faucibus luctus, \r\neros metus accumsan metus, eu pellentesque leo nisl id sem. Suspendisse pharetra nec libero ut lobortis. Vestibulum s\r\nit amet rutrum magna. Proin pellentesque molestie lorem, et convallis mauris finibus in. Nullam in lectus ultricies, \r\nefficitur neque id, rutrum sapien. Phasellus consequat aliquet est, et sodales augue ultricies nec. Cras sodales sem \r\nmalesuada molestie posuere. Mauris enim est, rhoncus sit amet dui ullamcorper, sodales feugiat ex. Nullam porttitor, nisl non interdum pulvinar, \r\nsapien purus tempus dolor, eget fringilla mi leo at risus. Vestibulum nisl orci, iaculis a dictum sit amet, elementum et massa. \r\nCurabitur suscipit consectetur urna, at\r\n luctus ante euismod ut. Ut facilisis aliquam leo vitae malesuada. Proin et tempor est, quis porta tortor.',1,45),
(5,'majica1','white','L',79,'male','yes','https://cdn.shopify.com/s/files/1/0572/6479/9914/products/spod-1056282722-1-1_1024x1024@2x.png?v=1623196501','Maecenas lectus tellus, tempor quis ultricies a, placerat ac \r\nleo. Vestibulum egestas tellus id fringilla porta. Duis eu neque nulla. Aenean interdum, velit ut faucibus luctus, \r\neros metus accumsan metus, eu pellentesque leo nisl id sem. Suspendisse pharetra nec libero ut lobortis. Vestibulum s\r\nit amet rutrum magna. Proin pellentesque molestie lorem, et convallis mauris finibus in. Nullam in lectus ultricies, \r\nefficitur neque id, rutrum sapien. Phasellus consequat aliquet est, et sodales augue ultricies nec. Cras sodales sem \r\nmalesuada molestie posuere. Mauris enim est, rhoncus sit amet dui ullamcorper, sodales feugiat ex. Nullam porttitor, nisl non interdum pulvinar, \r\nsapien purus tempus dolor, eget fringilla mi leo at risus. Vestibulum nisl orci, iaculis a dictum sit amet, elementum et massa. \r\nCurabitur suscipit consectetur urna, at\r\n luctus ante euismod ut. Ut facilisis aliquam leo vitae malesuada. Proin et tempor est, quis porta tortor.',2,15),
(6,'majica2','blue','S',0,'male','yes','https://cdn.shopify.com/s/files/1/0572/6479/9914/products/spod-1056591552-317-1_82761ca1-5307-4e49-9394-59a7640a2c82_480x480@2x.png?v=1625958130','Maecenas lectus tellus, tempor quis ultricies a, placerat ac \r\nleo. Vestibulum egestas tellus id fringilla porta. Duis eu neque nulla. Aenean interdum, velit ut faucibus luctus, \r\neros metus accumsan metus, eu pellentesque leo nisl id sem. Suspendisse pharetra nec libero ut lobortis. Vestibulum s\r\nit amet rutrum magna. Proin pellentesque molestie lorem, et convallis mauris finibus in. Nullam in lectus ultricies, \r\nefficitur neque id, rutrum sapien. Phasellus consequat aliquet est, et sodales augue ultricies nec. Cras sodales sem \r\nmalesuada molestie posuere. Mauris enim est, rhoncus sit amet dui ullamcorper, sodales feugiat ex. Nullam porttitor, nisl non interdum pulvinar, \r\nsapien purus tempus dolor, eget fringilla mi leo at risus. Vestibulum nisl orci, iaculis a dictum sit amet, elementum et massa. \r\nCurabitur suscipit consectetur urna, at\r\n luctus ante euismod ut. Ut facilisis aliquam leo vitae malesuada. Proin et tempor est, quis porta tortor.',2,30),
(7,'majica3','yellow','S',90,'male','yes','data:image/jpeg;base64,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','Maecenas lectus tellus, tempor quis ultricies a, placerat ac \r\nleo. Vestibulum egestas tellus id fringilla porta. Duis eu neque nulla. Aenean interdum, velit ut faucibus luctus, \r\neros metus accumsan metus, eu pellentesque leo nisl id sem. Suspendisse pharetra nec libero ut lobortis. Vestibulum s\r\nit amet rutrum magna. Proin pellentesque molestie lorem, et convallis mauris finibus in. Nullam in lectus ultricies, \r\nefficitur neque id, rutrum sapien. Phasellus consequat aliquet est, et sodales augue ultricies nec. Cras sodales sem \r\nmalesuada molestie posuere. Mauris enim est, rhoncus sit amet dui ullamcorper, sodales feugiat ex. Nullam porttitor, nisl non interdum pulvinar, \r\nsapien purus tempus dolor, eget fringilla mi leo at risus. Vestibulum nisl orci, iaculis a dictum sit amet, elementum et massa. \r\nCurabitur suscipit consectetur urna, at\r\n luctus ante euismod ut. Ut facilisis aliquam leo vitae malesuada. Proin et tempor est, quis porta tortor.',2,115),
(8,'majica4','white','M',100,'female','yes','https://ih1.redbubble.net/image.3032669940.8277/ssrco,classic_tee,womens,fafafa:ca443f4786,front_alt,square_product,600x600.jpg','Maecenas lectus tellus, tempor quis ultricies a, placerat ac \r\nleo. Vestibulum egestas tellus id fringilla porta. Duis eu neque nulla. Aenean interdum, velit ut faucibus luctus, \r\neros metus accumsan metus, eu pellentesque leo nisl id sem. Suspendisse pharetra nec libero ut lobortis. Vestibulum s\r\nit amet rutrum magna. Proin pellentesque molestie lorem, et convallis mauris finibus in. Nullam in lectus ultricies, \r\nefficitur neque id, rutrum sapien. Phasellus consequat aliquet est, et sodales augue ultricies nec. Cras sodales sem \r\nmalesuada molestie posuere. Mauris enim est, rhoncus sit amet dui ullamcorper, sodales feugiat ex. Nullam porttitor, nisl non interdum pulvinar, \r\nsapien purus tempus dolor, eget fringilla mi leo at risus. Vestibulum nisl orci, iaculis a dictum sit amet, elementum et massa. \r\nCurabitur suscipit consectetur urna, at\r\n luctus ante euismod ut. Ut facilisis aliquam leo vitae malesuada. Proin et tempor est, quis porta tortor.',2,25);

/*Table structure for table `product_order` */

DROP TABLE IF EXISTS `product_order`;

CREATE TABLE `product_order` (
  `product_order_id` char(38) CHARACTER SET utf8mb3 COLLATE utf8_bin NOT NULL,
  `order_date` timestamp NOT NULL,
  `price_total` decimal(18,4) NOT NULL,
  `quantity_total` int NOT NULL,
  `user_id` char(38) CHARACTER SET utf8mb3 COLLATE utf8_bin NOT NULL,
  `order_address` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`product_order_id`),
  KEY `fk_product_order_user` (`user_id`),
  CONSTRAINT `fk_product_order_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

/*Data for the table `product_order` */

insert  into `product_order`(`product_order_id`,`order_date`,`price_total`,`quantity_total`,`user_id`,`order_address`) values 
('a1f44769-9d52-468e-914c-afbefb2477d4','2022-06-22 22:55:07',20.0000,1,'a4e17253-af6c-43a2-9868-b05ce149f6e2',NULL),
('a8ba562a-abbd-4f76-a67b-ed45b8d1b04b','2022-06-23 20:52:30',120.0000,2,'a4e17253-af6c-43a2-9868-b05ce149f6e2',NULL),
('d15b1d95-407d-4df6-9665-85ddabe0fbe1','2022-06-23 20:56:00',105.0000,1,'a4e17253-af6c-43a2-9868-b05ce149f6e2',NULL),
('ea6da5dc-d86f-4313-9bd9-d4c013ef0aa8','2022-06-23 19:00:24',20.0000,1,'a4e17253-af6c-43a2-9868-b05ce149f6e2',NULL),
('f40b4031-b41f-43cf-8c4a-469014697941','2022-06-22 22:55:39',60.0000,2,'a4e17253-af6c-43a2-9868-b05ce149f6e2',NULL);

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

insert  into `product_order_item`(`product_order_item`,`product_id`,`quantity`) values 
('a1f44769-9d52-468e-914c-afbefb2477d4',1,1),
('f40b4031-b41f-43cf-8c4a-469014697941',2,2),
('ea6da5dc-d86f-4313-9bd9-d4c013ef0aa8',3,1),
('a8ba562a-abbd-4f76-a67b-ed45b8d1b04b',2,1),
('a8ba562a-abbd-4f76-a67b-ed45b8d1b04b',5,1),
('d15b1d95-407d-4df6-9665-85ddabe0fbe1',2,1);

/*Table structure for table `review` */

DROP TABLE IF EXISTS `review`;

CREATE TABLE `review` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8_bin NOT NULL,
  `date_created` timestamp NOT NULL,
  `user_id` char(38) CHARACTER SET utf8mb3 COLLATE utf8_bin NOT NULL,
  `product_id` int NOT NULL,
  `grade` int NOT NULL,
  PRIMARY KEY (`review_id`,`date_created`),
  KEY `fk_user_review` (`user_id`),
  KEY `fk_product_review` (`product_id`),
  CONSTRAINT `fk_product_review` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`),
  CONSTRAINT `fk_user_review` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

/*Data for the table `review` */

insert  into `review`(`review_id`,`description`,`date_created`,`user_id`,`product_id`,`grade`) values 
(10,'very good product!','2022-06-23 18:47:09','a4e17253-af6c-43a2-9868-b05ce149f6e2',5,5);

/*Table structure for table `subcategory` */

DROP TABLE IF EXISTS `subcategory`;

CREATE TABLE `subcategory` (
  `subcategory_id` int NOT NULL AUTO_INCREMENT,
  `namee` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8_bin NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`subcategory_id`),
  KEY `fk_category_subcategory` (`category_id`),
  CONSTRAINT `fk_category_subcategory` FOREIGN KEY (`category_id`) REFERENCES `category` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

/*Data for the table `subcategory` */

insert  into `subcategory`(`subcategory_id`,`namee`,`category_id`) values 
(1,'Hoodies',1),
(2,'T-Shirts',2);

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `user_id` char(38) COLLATE utf8_bin NOT NULL,
  `first_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `last_name` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(100) COLLATE utf8_bin NOT NULL,
  `date_created` timestamp NOT NULL,
  `email` varchar(45) COLLATE utf8_bin NOT NULL,
  `token` varchar(45) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_bin;

/*Data for the table `user` */

insert  into `user`(`user_id`,`first_name`,`last_name`,`password`,`date_created`,`email`,`token`) values 
('05c3b52f-b7b1-47a8-9eb3-0f0190e203d1','Ajdin','Pašić','U2FsdGVkX195hXQxKf1YNqns01xO9lGJ8YIcaGwHsVI=','2022-06-19 15:50:57','pasapassssttasasaasa@gmail.com',NULL),
('1','Nedim','Bandzovic','sarajevo1234','2001-02-20 02:00:00','nedimbandzovic2001@gmail.com',NULL),
('15475853-06da-4966-8b5f-042d71f4d083','Ajdin','Pašić','sarajevo1234','2022-06-19 15:09:28','pasapasa@gmail.com',NULL),
('1be49976-3620-48f7-bdcb-70f3cafdc492','Ajdin','Pašić','U2FsdGVkX1/bmilJ2Du5t9mLu98WpT6PT4t8x3wm8Pk=','2022-06-19 15:43:22','pasapassasasa@gmail.com',NULL),
('2','Ajdin','Pašić','1234567','2022-06-13 20:13:27','ajdin.pasic@gmail.com',NULL),
('251c6296-620b-4dfe-b5d0-b102609b6b42','Ajdin','Pašić','U2FsdGVkX19UwbtgiMbQONo54F5Yjx16SsRnGPZtdks=','2022-06-19 15:50:30','pasapassssasasaasa@gmail.com',NULL),
('70577014-996b-4b51-90b5-ddb113b17c62','aa','bb','-1159814797','2022-06-23 18:32:55','rixxjok7@gmail.com',NULL),
('a3fd9cff-d6b6-4f30-a7c7-2b89529ab214','Ajdin','Pašić','-2017952909','2022-06-19 15:57:30','pasapassssttasasttaasa@gmail.com','71fqwoqbwif5ekptbbzj5s'),
('a4e17253-af6c-43a2-9868-b05ce149f6e2','ajdin','pasic','2104800177','2022-06-19 16:06:52','rixxjok@gmail.com',NULL),
('de995a20-0dc8-4439-8e44-62674a01792c','Ajdin','Pašić','U2FsdGVkX19XNErogj7uXEGvhihab2PSOt/sedO7WZI=','2022-06-19 15:50:12','pasapassasasaasa@gmail.com',NULL);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
