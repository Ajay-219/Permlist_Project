import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Permalist",
  password: "ajay2004",
  port: 5432,
});

db.connect();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Landing Page
app.get("/", (req, res) => {
  res.render("landing");
});

// Login Page
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  res.redirect("/list/1");
});

async function getLists() {
  const result = await db.query("SELECT * FROM lists ORDER BY created_at ASC");
  return result.rows;
}

// Dashboard
app.get("/list/:id", async (req, res) => {
  const listId = req.params.id;
  const lists = await getLists();

  const listNameResult = await db.query(
    "SELECT name FROM lists WHERE id = $1",
    [listId]
  );

  const itemsResult = await db.query(
    "SELECT * FROM items WHERE list_id = $1 ORDER BY created_at DESC",
    [listId]
  );

  res.render("index", {
    listTitle: listNameResult.rows[0].name,
    listItems: itemsResult.rows,
    lists: lists,
    currentListId: listId
  });
});

app.post("/add", async (req, res) => {
  await db.query(
    "INSERT INTO items (title, list_id) VALUES ($1, $2)",
    [req.body.newItem, req.body.listId]
  );
  res.redirect("/list/" + req.body.listId);
});

app.post("/delete", async (req, res) => {
  await db.query("DELETE FROM items WHERE id = $1", [req.body.deleteItemId]);
  res.redirect("/list/" + req.body.listId);
});

app.post("/edit", async (req, res) => {
  await db.query(
    "UPDATE items SET title = $1 WHERE id = $2",
    [req.body.updatedItemTitle, req.body.updatedItemId]
  );
  res.redirect("/list/" + req.body.listId);
});

app.post("/create-list", async (req, res) => {
  const result = await db.query(
    "INSERT INTO lists (name) VALUES ($1) RETURNING id",
    [req.body.listName]
  );
  res.redirect("/list/" + result.rows[0].id);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
