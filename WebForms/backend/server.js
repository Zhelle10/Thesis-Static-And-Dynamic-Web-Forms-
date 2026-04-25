{
  /* 
     *ALWAYS change the URL/API address when changing hotspot or network. 

     *URL
      backend: URL:5000 OR 5000/api/static to see the datas
      frontend: URL:5153
*/
}

import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000; // 🔁 better than 3000 for hotspot

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

let staticForm = [];

app.get("/", (req, res) => {
  res.send("Backend is running ✅");
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

app.get("/api/static", (req, res) => {
  res.json(staticForm);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Server running on http://0.0.0.0:${PORT}`);
});
