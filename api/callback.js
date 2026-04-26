export default async function handler(req, res) {

const code = req.query.code;

/* STEP 1: exchange code */
const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
method:"POST",
headers:{"Content-Type":"application/x-www-form-urlencoded"},
body:new URLSearchParams({
client_id:process.env.CLIENT_ID,
client_secret:process.env.CLIENT_SECRET,
grant_type:"authorization_code",
code,
redirect_uri:process.env.REDIRECT_URI
})
});

const tokenData = await tokenRes.json();

/* STEP 2: get user */
const user = await fetch("https://discord.com/api/users/@me", {
headers:{
Authorization:`Bearer ${tokenData.access_token}`
}
}).then(r=>r.json());

/* STEP 3: redirect back */
return res.redirect(
`/apply.html?token=${tokenData.access_token}&user=${user.username}`
);

}
