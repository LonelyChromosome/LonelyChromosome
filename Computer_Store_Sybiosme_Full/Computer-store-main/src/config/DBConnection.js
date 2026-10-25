const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

const envPath = path.join(__dirname, "..", "..", ".env");
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, "utf8").split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) return;
    const [key, ...valueParts] = trimmed.split("=");
    if (!process.env[key]) {
      process.env[key] = valueParts.join("=").trim();
    }
  });
}

const rawPool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "200606",
  database: process.env.DB_NAME || "Database_Computer",
  waitForConnections: true,
  connectionLimit: 10,
});

const memStore = {
  users: [
    { id: 1, name: "Admin", email: "admin@store.test", password: "admin123", role: "admin" },
    { id: 2, name: "Khach hang", email: "user@store.test", password: "user123", role: "customer" },
  ],
  products: [
    { id: 101, name: "AMD Ryzen 9 9950X3D", category: "CPU", brand: "AMD", price: 19990000, stock: 10, image: "/uploads/hw_cpu_9950x3d.jpg", featured: 1, performance: 99, specs: { socket: "AM5", cores: "16 nhân 32 luồng", tdp: "170W", ram: "DDR5" } },
    { id: 102, name: "ASUS ROG Astral GeForce RTX 5090 OC 32GB", category: "GPU", brand: "ASUS", price: 69990000, stock: 5, image: "/uploads/hw_gpu_rtx5090.jpg", featured: 1, performance: 100, specs: { vram: "32GB GDDR7", psu: "1000W", slot: "PCIe 5.0 x16", length: "357mm" } },
    { id: 103, name: "ASUS ROG Crosshair X870E Glacial", category: "Mainboard", brand: "ASUS", price: 24990000, stock: 7, image: "/uploads/hw_mobo_glacial.jpg", featured: 1, performance: 98, specs: { socket: "AM5", ram: "DDR5", form: "E-ATX", chipset: "X870E" } },
    { id: 104, name: "ROG × Hatsune Miku 360mm AIO Curved OLED", category: "AIO", brand: "ASUS", price: 9490000, stock: 9, image: "/uploads/hw_aio_miku.jpg", featured: 1, performance: 97, specs: { radiator: "360mm", display: "Curved Anime OLED 60FPS", rpm: "2200 RPM" } },
    { id: 105, name: "Samsung 9100 PRO 1TB PCIe Gen5 x4 NVMe", category: "SSD", brand: "Samsung", price: 5490000, stock: 18, image: "/uploads/hw_ssd_9100pro.jpg", featured: 1, performance: 98, specs: { type: "NVMe Gen5", speed: "14800MB/s", capacity: "1TB", pcie: "5.0" } },
    { id: 106, name: "MSI MAG A1250GL PCIE5 1250W 80+ Gold", category: "PSU", brand: "MSI", price: 5690000, stock: 12, image: "/uploads/hw_psu_msi1250w.jpg", featured: 1, performance: 95, specs: { power: "1250W", rating: "80 Plus Gold ATX 3.1", modular: "Full modular 12V-2x6" } },
    { id: 1, name: "Intel Core i5-14600K", category: "CPU", brand: "Intel", price: 8290000, stock: 18, image: "/uploads/cpu.svg", featured: 1, performance: 87, specs: { socket: "LGA1700", cores: "14 nhân 20 luồng", tdp: "125W", ram: "DDR5" } },
    { id: 2, name: "AMD Ryzen 7 7800X3D", category: "CPU", brand: "AMD", price: 10490000, stock: 12, image: "/uploads/hw_cpu_9950x3d.jpg", featured: 1, performance: 94, specs: { socket: "AM5", cores: "8 nhân 16 luồng", tdp: "120W", ram: "DDR5" } },
    { id: 3, name: "ASUS TUF RTX 4070 Super", category: "GPU", brand: "ASUS", price: 17990000, stock: 8, image: "/uploads/gpu.svg", featured: 1, performance: 92, specs: { vram: "12GB GDDR6X", psu: "650W", slot: "PCIe 4.0", length: "301mm" } },
    { id: 4, name: "MSI B760 Tomahawk WiFi", category: "Mainboard", brand: "MSI", price: 4890000, stock: 16, image: "/uploads/mainboard.svg", featured: 0, performance: 79, specs: { socket: "LGA1700", ram: "DDR5", form: "ATX", chipset: "B760" } },
    { id: 5, name: "Gigabyte B650 Aorus Elite AX", category: "Mainboard", brand: "Gigabyte", price: 5790000, stock: 11, image: "/uploads/mainboard.svg", featured: 1, performance: 84, specs: { socket: "AM5", ram: "DDR5", form: "ATX", chipset: "B650" } },
    { id: 6, name: "Corsair Vengeance 32GB DDR5", category: "RAM", brand: "Corsair", price: 3290000, stock: 24, image: "/uploads/hw_ram_ddr5.jpg", featured: 1, performance: 86, specs: { type: "DDR5", bus: "6000MHz", capacity: "32GB", kit: "2x16GB" } },
    { id: 7, name: "Samsung 990 Pro 1TB", category: "SSD", brand: "Samsung", price: 2990000, stock: 20, image: "/uploads/ssd.svg", featured: 0, performance: 90, specs: { type: "NVMe", speed: "7450MB/s", capacity: "1TB", pcie: "4.0" } },
    { id: 8, name: "Cooler Master MWE Gold 750W", category: "PSU", brand: "Cooler Master", price: 2390000, stock: 14, image: "/uploads/psu.svg", featured: 0, performance: 82, specs: { power: "750W", rating: "80 Plus Gold", modular: "Full modular" } },
  ],
  orders: [
    { id: 1001, user_id: 2, customer_name: "Minh Nguyễn (Apex 3D Studio)", total: 128930000, status: "Hoàn tất", created_at: new Date("2026-10-24") },
    { id: 1002, user_id: 2, customer_name: "Hoàng Lê (AI Lab Hà Nội)", total: 37550000, status: "Đang giao", created_at: new Date("2026-10-25") },
    { id: 1003, user_id: 2, customer_name: "Trần Tuấn (Gaming Rig)", total: 28470000, status: "Chờ duyệt", created_at: new Date("2026-10-25") },
  ],
};

function runFallbackQuery(sql, params = []) {
  const q = sql.replace(/\s+/g, " ").trim();
  if (q.startsWith("SELECT * FROM products WHERE featured = 1")) {
    return [memStore.products.filter((p) => p.featured).slice(0, 8)];
  }
  if (q.startsWith("SELECT * FROM products WHERE id = ?")) {
    return [memStore.products.filter((p) => p.id === Number(params[0]))];
  }
  if (q.startsWith("SELECT DISTINCT category FROM products")) {
    const cats = [...new Set(memStore.products.map((p) => p.category))].sort();
    return [cats.map((category) => ({ category }))];
  }
  if (q.startsWith("SELECT * FROM products")) {
    let list = [...memStore.products];
    let pIdx = 0;
    if (q.includes("name LIKE ?")) {
      const kw = String(params[pIdx] || "").replace(/%/g, "").toLowerCase();
      pIdx += 2;
      list = list.filter((p) => p.name.toLowerCase().includes(kw) || p.brand.toLowerCase().includes(kw));
    }
    if (q.includes("category = ?")) {
      const cat = params[pIdx++];
      list = list.filter((p) => p.category === cat);
    }
    if (q.includes("performance >= ?")) {
      const minP = Number(params[pIdx++]);
      list = list.filter((p) => p.performance >= minP);
    }
    return [list.sort((a, b) => b.id - a.id)];
  }
  if (q.startsWith("INSERT INTO products")) {
    const newId = Date.now();
    memStore.products.push({
      id: newId,
      name: params[0],
      category: params[1],
      brand: params[2],
      price: Number(params[3]) || 0,
      stock: Number(params[4]) || 0,
      image: params[5] || "/uploads/component.svg",
      featured: params[6] ? 1 : 0,
      performance: Number(params[7]) || 70,
      specs: typeof params[8] === "string" ? JSON.parse(params[8] || "{}") : params[8] || {},
    });
    return [{ insertId: newId, affectedRows: 1 }];
  }
  if (q.startsWith("UPDATE products SET name = ?")) {
    const p = memStore.products.find((x) => x.id === Number(params[6]));
    if (p) {
      p.name = params[0];
      p.brand = params[1];
      p.category = params[2];
      p.price = Number(params[3]) || 0;
      p.stock = Number(params[4]) || 0;
      p.performance = Number(params[5]) || 70;
    }
    return [{ affectedRows: p ? 1 : 0 }];
  }
  if (q.startsWith("UPDATE products SET stock = GREATEST")) {
    const p = memStore.products.find((x) => x.id === Number(params[1]));
    if (p) p.stock = Math.max(0, p.stock - Number(params[0]));
    return [{ affectedRows: 1 }];
  }
  if (q.startsWith("DELETE FROM products WHERE id = ?")) {
    const before = memStore.products.length;
    memStore.products = memStore.products.filter((x) => x.id !== Number(params[0]));
    return [{ affectedRows: before - memStore.products.length }];
  }
  if (q.startsWith("SELECT * FROM orders")) {
    return [[...memStore.orders].sort((a, b) => b.id - a.id)];
  }
  if (q.startsWith("INSERT INTO orders")) {
    const newId = 1000 + memStore.orders.length + 1;
    memStore.orders.push({
      id: newId,
      user_id: params[0],
      customer_name: params[1],
      total: Number(params[2]) || 0,
      status: "Chờ duyệt",
      created_at: new Date(),
    });
    return [{ insertId: newId, affectedRows: 1 }];
  }
  if (q.startsWith("INSERT INTO order_items")) {
    return [{ insertId: Date.now(), affectedRows: 1 }];
  }
  if (q.startsWith("UPDATE orders SET status = ?")) {
    const o = memStore.orders.find((x) => x.id === Number(params[1]));
    if (o) o.status = params[0];
    return [{ affectedRows: 1 }];
  }
  if (q.includes("COALESCE(SUM(total), 0) AS revenue")) {
    const revenue = memStore.orders.reduce((s, o) => s + Number(o.total || 0), 0);
    const orders = memStore.orders.length;
    const pending = memStore.orders.filter((o) => o.status === "Chờ duyệt").length;
    return [[{ revenue, orders, pending }]];
  }
  if (q.startsWith("SELECT * FROM users WHERE email = ?")) {
    return [memStore.users.filter((u) => u.email === params[0])];
  }
  if (q.startsWith("SELECT * FROM users WHERE id = ?")) {
    return [memStore.users.filter((u) => u.id === Number(params[0]))];
  }
  if (q.startsWith("INSERT INTO users")) {
    const newId = memStore.users.length + 1;
    memStore.users.push({ id: newId, name: params[0], email: params[1], password: params[2], role: "customer" });
    return [{ insertId: newId, affectedRows: 1 }];
  }
  return [[]];
}

async function execute(sql, params = []) {
  try {
    return await rawPool.execute(sql, params);
  } catch (_err) {
    return runFallbackQuery(sql, params);
  }
}

async function getConnection() {
  try {
    return await rawPool.getConnection();
  } catch (_err) {
    return {
      beginTransaction: async () => {},
      execute: async (sql, params) => runFallbackQuery(sql, params),
      commit: async () => {},
      rollback: async () => {},
      release: () => {},
    };
  }
}

module.exports = { execute, getConnection };
