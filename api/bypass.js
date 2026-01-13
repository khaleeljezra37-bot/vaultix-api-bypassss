export default function handler(req, res) {

  // 1️⃣ CHANGE THIS to your website domain
  const WEBSITE = "https://vaultix-bypassers.vercel.app/";

  // 2️⃣ CORS HEADERS (REQUIRED)
  res.setHeader("Access-Control-Allow-Origin", WEBSITE);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // 3️⃣ HANDLE PREFLIGHT (IMPORTANT)
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // 4️⃣ SET COOKIE (REQUIRED SETTINGS)
  res.setHeader(
    "Set-Cookie",
    "session=abc123; Path=/; HttpOnly; Secure; SameSite=None"
  );

  // 5️⃣ RETURN RESPONSE
  res.status(200).json({
    success: true,
    message: "API works, website unblocked ✅"
  });
}
