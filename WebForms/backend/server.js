import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
};

// 🔥 LOG ALL REQUESTS
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  next();
});

// ✅ STORAGE
let staticForm = [];
let dynamicForm = []; // ✅ ADD THIS

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
});

// ✅ FIXED
app.post("/api/dynamic", (req, res) => {
  console.log("📦 DYNAMIC DATA RECEIVED:", req.body);

  const formattedData = {
    ...req.body,
    timeSpent: formatTime(req.body.timeSpent),
  };

  dynamicForm.push(formattedData); // ✅ FIXED

  res.json({ success: true });
});

app.post("/api/static", (req, res) => {
  console.log("📦 DATA RECEIVED:", req.body);

  const formattedData = {
    ...req.body,
    timeSpent: formatTime(req.body.timeSpent),
  };

  staticForm.push(formattedData);

  res.json({ success: true });
});

// ✅ FIXED
app.get("/api/dynamic", (req, res) => {
  res.json(dynamicForm); // ✅ FIXED
});

app.get("/api/static", (req, res) => {
  res.json(staticForm);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Server running on http://0.0.0.0:${PORT}`);
});
