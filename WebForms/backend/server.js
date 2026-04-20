import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

let staticForm = [];
let dynamicForm = [];

app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.post("/api/static", (req, res) => {
  staticForm.push(req.body);
  res.json({ success: true });
});

app.post("/api/dynamic", (req, res) => {
  dynamicForm.push(req.body);
  res.json({ success: true });
});

app.get("/api/static", (req, res) => {
  res.json(staticForm);
});

app.get("/api/dynamic", (req, res) => {
  res.json(dynamicForm);
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
