// FILE: /api/login.js

export default function handler(req, res) {
  const url =
`https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}
&response_type=code
&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}
&scope=identify`;

  res.redirect(url);
}
