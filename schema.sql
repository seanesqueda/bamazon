-- Drops the database if it exists currently --
DROP DATABASE IF EXISTS bamazon;
-- Creates the database --
CREATE DATABASE bamazon;
-- Use the database --
USE bamazon;

-- Create Table --
CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY (item_id)
);