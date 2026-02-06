📌 Permalist – Task Management Dashboard

A modern-style task management web application built using Node.js, Express, PostgreSQL, and EJS.

Permalist allows users to create multiple task lists (Work, Personal, Family, etc.), manage tasks efficiently, and experience a clean admin-style dashboard interface.



🛠 Tech Stack

-Frontend

-EJS (Templating Engine)

-HTML5

-CSS3 (Modern SaaS Styling)

-Backend

-Node.js

-Express.js

-Database

-PostgreSQL

-Version Control

-Git & GitHub



📁 Project Structure

Permalist/
│
├── app.js
├── package.json
├── README.md
│
├── views/
│   ├── index.ejs
│   ├── landing.ejs
│   ├── login.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
│
└── public/
    ├── styles.css
    ├── landing.css
    └── login.css


⚙️ Installation & Setup

1️⃣ Clone the Repository
git clone https://github.com/yourusername/Permalist.git
cd Permalist

2️⃣ Install Dependencies
npm install

3️⃣ Setup PostgreSQL Database

Create a database named:
Permalist


Then run:
CREATE TABLE lists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  list_id INTEGER REFERENCES lists(id) ON DELETE CASCADE
);


Insert a default list:
INSERT INTO lists (name) VALUES ('Today');


4️⃣ Update Database Credentials
In app.js update:
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Permalist",
  password: "your_password",
  port: 5432,
});

5️⃣ Run the Server
node app.js

Open:
http://localhost:3000
