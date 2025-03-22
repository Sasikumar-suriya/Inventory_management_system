use inventory_management;
CREATE TABLE Users (
   `id` CHAR(36) NOT NULL DEFAULT (UUID()),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    role VARCHAR(50) NOT NULL,
    password VARCHAR(255) NULL,
    `profilePicture` VARCHAR(500) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updatedAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

use inventory_management;
CREATE TABLE Category (
   `id` CHAR(36) NOT NULL DEFAULT (UUID()),
    `categoryName` VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    `createdBy` char(36) REFERENCES users(id) ON DELETE SET NULL,
    `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
    `updatedAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

use inventory_management;
ALTER TABLE category ADD PRIMARY KEY (id);
ALTER TABLE users ADD PRIMARY KEY (id);

CREATE TABLE Product (
  id CHAR(36) NOT NULL DEFAULT (UUID()), 
  productName VARCHAR(255) NOT NULL,
  description VARCHAR(255),
  quantity INTEGER NOT NULL,
  productColor VARCHAR(255) NOT NULL,
  productImages TEXT NOT NULL,
  priceOfone INTEGER NOT NULL,
  height VARCHAR(255),
  weight VARCHAR(255),
  brandName VARCHAR(255),
  width VARCHAR(255),
  size VARCHAR(255),
  material VARCHAR(255),
  manufactureDate DATE,
  expireyDate DATE,
  categoryId CHAR(36),
  createdBy CHAR(36),
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  
  -- Foreign key constraints
  FOREIGN KEY (categoryId) REFERENCES category(id) ON DELETE SET NULL,
  FOREIGN KEY (createdBy) REFERENCES users(id) ON DELETE SET NULL
);
