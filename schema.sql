CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	id INTEGER(20) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR(30) NOT NULL,
	department_name VARCHAR(30) NOT NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INTEGER(200) NOT NULL,
    item_id VARCHAR(20), NOT NULL
	PRIMARY KEY (id)
);
INSERT INTO products (id, product_name, department_name, price, stock_quantity, item_id)
VALUES (1, "refrigerator", "appliances", 950.00, 32, "a456t8"),
(2, 'stove', 'appliances', 1062.99, 77, 'a996r2'),
(3, 'airConditioner', 'appliances', 105.00, 110, 'a789d3'),
(3, 'airConditioner', 'appliances', 105.00, 110, 'a789d3'),
(4, 'dishwasher', 'appliances', 335.00, 454, 'a691b6'),
(5, 'pencils', 'office', 2.30, 583, 'o325b6'),
(6, 'ink', 'office', 19.00, 78, 'o749h8'),
(7, 'paper', 'office', 3.50, 81, 'o452y7'),
(8, 'stapler', 'office', 6.25, 96, 'o222e2'),
(9, 'television', 'electronics', 225.00, 35, 'e339x9'),
(10, 'speakers', 'electronics', 155.95, 48, 'e665w5'),
(11, 'xbox', 'electronics', 420.00, 117, 'e494q2'),
(12, 'roomba', 'electronics', 199.99, 237, 'e839z4');


