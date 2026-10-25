CREATE DATABASE IF NOT EXISTS Database_Computer
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE Database_Computer;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'customer') NOT NULL DEFAULT 'customer',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(180) NOT NULL,
  category VARCHAR(60) NOT NULL,
  brand VARCHAR(100) NOT NULL,
  price DECIMAL(12, 0) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  image VARCHAR(255) DEFAULT '/uploads/component.svg',
  featured TINYINT(1) NOT NULL DEFAULT 0,
  performance INT NOT NULL DEFAULT 70,
  specs JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NULL,
  customer_name VARCHAR(100) NOT NULL,
  total DECIMAL(12, 0) NOT NULL,
  status ENUM('Chờ duyệt', 'Đang giao', 'Hoàn tất', 'Đã hủy') NOT NULL DEFAULT 'Chờ duyệt',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NULL,
  product_name VARCHAR(180) NOT NULL,
  price DECIMAL(12, 0) NOT NULL,
  quantity INT NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL
);

INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@store.test', 'admin123', 'admin'),
('Khach hang', 'user@store.test', 'user123', 'customer')
ON DUPLICATE KEY UPDATE email = VALUES(email);

INSERT INTO products (name, category, brand, price, stock, image, featured, performance, specs) VALUES
('AMD Ryzen 9 9950X3D', 'CPU', 'AMD', 19990000, 10, '/uploads/hw_cpu_9950x3d.jpg', 1, 99, JSON_OBJECT('socket', 'AM5', 'cores', '16 nhan 32 luong', 'tdp', '170W', 'ram', 'DDR5')),
('ASUS ROG Astral GeForce RTX 5090 OC 32GB', 'GPU', 'ASUS', 69990000, 5, '/uploads/hw_gpu_rtx5090.jpg', 1, 100, JSON_OBJECT('vram', '32GB GDDR7', 'psu', '1000W', 'slot', 'PCIe 5.0 x16', 'length', '357mm')),
('ASUS ROG Crosshair X870E Glacial', 'Mainboard', 'ASUS', 24990000, 7, '/uploads/hw_mobo_glacial.jpg', 1, 98, JSON_OBJECT('socket', 'AM5', 'ram', 'DDR5', 'form', 'E-ATX', 'chipset', 'X870E')),
('ROG x Hatsune Miku 360mm AIO Curved OLED', 'AIO', 'ASUS', 9490000, 9, '/uploads/hw_aio_miku.jpg', 1, 97, JSON_OBJECT('radiator', '360mm', 'display', 'Curved Anime OLED 60FPS', 'rpm', '2200 RPM')),
('Samsung 9100 PRO 1TB PCIe Gen5 x4 NVMe', 'SSD', 'Samsung', 5490000, 18, '/uploads/hw_ssd_9100pro.jpg', 1, 98, JSON_OBJECT('type', 'NVMe Gen5', 'speed', '14800MB/s', 'capacity', '1TB', 'pcie', '5.0')),
('MSI MAG A1250GL PCIE5 1250W 80+ Gold', 'PSU', 'MSI', 5690000, 12, '/uploads/hw_psu_msi1250w.jpg', 1, 95, JSON_OBJECT('power', '1250W', 'rating', '80 Plus Gold ATX 3.1', 'modular', 'Full modular 12V-2x6')),
('Triple Wireless LCD Telemetry Fans', 'AIO', 'ROG/LianLi', 3890000, 15, '/uploads/hw_fans_lcd.jpg', 0, 93, JSON_OBJECT('rpm', '1190 RPM', 'sensor', '31C CPU / 45C GPU LCD', 'pack', '3 Fans')),
('NVIDIA GeForce RTX 5070 12GB GDDR7', 'GPU', 'MSI', 19490000, 11, '/uploads/27869-pc-gaming-intel-core-i7-14700f-ram-32gb-vga-rtx-5070-12gb-01.jpg', 1, 93, JSON_OBJECT('vram', '12GB GDDR7', 'psu', '650W', 'slot', 'PCIe 5.0', 'length', '300mm')),
('Intel Core i5-14600K', 'CPU', 'Intel', 8290000, 18, '/uploads/cpu.svg', 1, 87, JSON_OBJECT('socket', 'LGA1700', 'cores', '14 nhan 20 luong', 'tdp', '125W', 'ram', 'DDR5')),
('AMD Ryzen 7 7800X3D', 'CPU', 'AMD', 10490000, 12, '/uploads/hw_cpu_9950x3d.jpg', 1, 94, JSON_OBJECT('socket', 'AM5', 'cores', '8 nhan 16 luong', 'tdp', '120W', 'ram', 'DDR5')),
('ASUS TUF RTX 4070 Super', 'GPU', 'ASUS', 17990000, 8, '/uploads/gpu.svg', 1, 92, JSON_OBJECT('vram', '12GB GDDR6X', 'psu', '650W', 'slot', 'PCIe 4.0', 'length', '301mm')),
('MSI B760 Tomahawk WiFi', 'Mainboard', 'MSI', 4890000, 16, '/uploads/mainboard.svg', 0, 79, JSON_OBJECT('socket', 'LGA1700', 'ram', 'DDR5', 'form', 'ATX', 'chipset', 'B760')),
('Gigabyte B650 Aorus Elite AX', 'Mainboard', 'Gigabyte', 5790000, 11, '/uploads/mainboard.svg', 1, 84, JSON_OBJECT('socket', 'AM5', 'ram', 'DDR5', 'form', 'ATX', 'chipset', 'B650')),
('Corsair Vengeance 32GB DDR5', 'RAM', 'Corsair', 3290000, 24, '/uploads/hw_ram_ddr5.jpg', 1, 86, JSON_OBJECT('type', 'DDR5', 'bus', '6000MHz', 'capacity', '32GB', 'kit', '2x16GB')),
('Samsung 990 Pro 1TB', 'SSD', 'Samsung', 2990000, 20, '/uploads/ssd.svg', 0, 90, JSON_OBJECT('type', 'NVMe', 'speed', '7450MB/s', 'capacity', '1TB', 'pcie', '4.0')),
('Cooler Master MWE Gold 750W', 'PSU', 'Cooler Master', 2390000, 14, '/uploads/psu.svg', 0, 82, JSON_OBJECT('power', '750W', 'rating', '80 Plus Gold', 'modular', 'Full modular'))
ON DUPLICATE KEY UPDATE name = VALUES(name);
