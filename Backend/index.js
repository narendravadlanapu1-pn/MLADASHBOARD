const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, "mlaDetails.db");
let db;

// ✅ Initialize DB + Server
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // ✅ Create tables
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS mlas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        party TEXT,
        constituency TEXT,
        contact TEXT,
        photo TEXT
      );
    `);

    await db.exec(`
      CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        mla_id INTEGER,
        name TEXT,
        budget INTEGER,
        progress INTEGER,
        status TEXT,
        FOREIGN KEY (mla_id) REFERENCES mlas(id)
      );
    `);

    app.listen(5000, () => {
      console.log("🚀 Server running at http://localhost:5000");
    });
  } catch (error) {
    console.error("❌ DB Error:", error);
    process.exit(1);
  }
};

initializeDbAndServer();

// 🟢 Register user
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await db.get("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (existing)
      return res.status(400).json({ message: "User already exists!" });

    const hashed = await bcrypt.hash(password, 10);
    await db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
      username,
      hashed,
    ]);
    res.status(200).json({ message: "✅ Registered successfully" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🔵 Login
app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await db.get("SELECT * FROM users WHERE username = ?", [
      username,
    ]);
    if (!user)
      return res.status(400).json({ message: "Invalid username or password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(400).json({ message: "Invalid username or password" });

    res.status(200).json({ message: "✅ Login successful" });
  } catch (e) {
    res.status(500).json({ message: "Server error" });
  }
});

// 🧩 Get all MLAs
app.get("/mlas", async (req, res) => {
  try {
    const mlas = await db.all("SELECT * FROM mlas");
    res.status(200).json(mlas);
  } catch (e) {
    res.status(500).json({ message: "Error fetching MLA data" });
  }
});

// 🧩 Get MLA projects by ID
app.get("/mlas/:id/projects", async (req, res) => {
  try {
    const { id } = req.params;
    const projects = await db.all("SELECT * FROM projects WHERE mla_id = ?", [
      id,
    ]);
    res.status(200).json(projects);
  } catch (e) {
    res.status(500).json({ message: "Error fetching projects" });
  }
});

// 🧩 Seed MLAs
app.post("/seed-mlas", async (req, res) => {
  try {
    const { count } = await db.get("SELECT COUNT(*) AS count FROM mlas");
    if (count > 0)
      return res.status(200).json({ message: "✅ MLAs already seeded!" });

    const mlaList = [
      {
        name: "Kunamneni Sambasiva Rao",
        party: "Indian National Congress",
        constituency: "Kothagudem",
        contact: "+91 98765 43210",
        photo:
          "https://res.cloudinary.com/dftpcwyzm/image/upload/v1759828547/1861721-mlakunamnenisambasivarao_tgobvl.jpg",
      },
      {
        name: "Thummala Nageswara Rao",
        party: "Indian National Congress",
        constituency: "Khammam",
        contact: "+91 91234 56789",
        photo:
          "https://res.cloudinary.com/dftpcwyzm/image/upload/v1759828735/Untitled-design-2024-06-20T213905.678_mhb1yo.jpg",
      },
      {
        name: "Harish Rao",
        party: "Bharat Rashtra Samithi",
        constituency: "Siddipet",
        contact: "+91 99887 66554",
        photo:
          "https://res.cloudinary.com/dftpcwyzm/image/upload/v1759828766/Untitled-design-2024-10-27T211957.474_yskgq3.jpg",
      },
      {
        name: "Venkata Ramana Reddy",
        party: "Bharatiya Janata Party (BJP)",
        constituency: "Kamareddy",
        contact: "+91 98765 12345",
        photo:
          "https://res.cloudinary.com/dftpcwyzm/image/upload/v1759829061/250px-K_V_Ramana_Reddy_jkoudt.jpg",
      },
      {
        name: "Malla Reddy",
        party: "Bharat Rashtra Samithi",
        constituency: "Medchal",
        contact: "+91 99876 54321",
        photo:
          "https://res.cloudinary.com/dftpcwyzm/image/upload/v1759829176/Chamakura-Malla-Reddy_th4kub.jpg",
      },
      {
        name: "Gangula Kamalakar",
        party: "Bharat Rashtra Samithi",
        constituency: "Karimnagar",
        contact: "+91 98765 67890",
        photo:
          "https://res.cloudinary.com/dftpcwyzm/image/upload/v1759829311/997799-gangula-kamalakar_neewgb.webp",
      },
    ];

    for (const mla of mlaList) {
      await db.run(
        `INSERT INTO mlas (name, party, constituency, contact, photo)
         VALUES (?, ?, ?, ?, ?)`,
        [mla.name, mla.party, mla.constituency, mla.contact, mla.photo]
      );
    }

    res.status(200).json({ message: "✅ MLA data seeded successfully" });
  } catch (e) {
    res.status(500).json({ message: "Failed to insert MLA data" });
  }
});

// 🧩 Seed Projects
app.post("/seed-projects", async (req, res) => {
  try {
    const { count } = await db.get("SELECT COUNT(*) AS count FROM projects");
    if (count > 0)
      return res.status(200).json({ message: "✅ Projects already seeded!" });

    const projectsList = [
      { mla_id: 1, name: "Road Construction", budget: 5000000, progress: 100, status: "Completed" },
      { mla_id: 1, name: "School Renovation", budget: 2000000, progress: 50, status: "In Progress" },
      { mla_id: 2, name: "Hospital Upgradation", budget: 3000000, progress: 75, status: "In Progress" },
      { mla_id: 3, name: "Water Supply Scheme", budget: 4000000, progress: 100, status: "Completed" },
      { mla_id: 4, name: "Park Development", budget: 1500000, progress: 40, status: "In Progress" },
      { mla_id: 5, name: "Community Center", budget: 1000000, progress: 60, status: "In Progress" },
      { mla_id: 6, name: "Bridge Repair", budget: 2500000, progress: 90, status: "In Progress" },
      { mla_id: 1, name: "Drainage Improvement", budget: 1200000, progress: 80, status: "In Progress" },
      { mla_id: 2, name: "Smart Lighting Project", budget: 900000, progress: 30, status: "In Progress" },
      { mla_id: 3, name: "Solar Panel Installation", budget: 2500000, progress: 55, status: "In Progress" },
    ];

    for (const project of projectsList) {
      await db.run(
        `INSERT INTO projects (mla_id, name, budget, progress, status)
         VALUES (?, ?, ?, ?, ?)`,
        [project.mla_id, project.name, project.budget, project.progress, project.status]
      );
    }

    res.status(200).json({ message: "✅ Projects data seeded successfully" });
  } catch (e) {
    res.status(500).json({ message: "Failed to insert project data" });
  }
});
