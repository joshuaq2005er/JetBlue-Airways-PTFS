// FILE: /api/callback.js

export default async function handler(req, res) {
  const code = req.query.code;

  const token = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REDIRECT_URI
    })
  }).then(r => r.json());

  const user = await fetch("https://discord.com/api/users/@me", {
    headers: {
      Authorization: `Bearer ${token.access_token}`
    }
  }).then(r => r.json());

  res.redirect(`/apply.html?username=${user.username}&id=${user.id}`);
}
