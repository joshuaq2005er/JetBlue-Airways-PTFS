export default async function handler(req, res) {

const code = req.query.code;

/* If no code, redirect to Discord login */
if(!code){
const redirect = `https://discord.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&scope=identify%20guilds.members.read`;

return res.redirect(redirect);
}

try {

/* STEP 1: Exchange code for access token */
const tokenRes = await fetch("https://discord.com/api/oauth2/token", {
method:"POST",
headers:{
"Content-Type":"application/x-www-form-urlencoded"
},
body:new URLSearchParams({
client_id:process.env.CLIENT_ID,
client_secret:process.env.CLIENT_SECRET,
grant_type:"authorization_code",
code,
redirect_uri:process.env.REDIRECT_URI
})
});

const tokenData = await tokenRes.json();

/* STEP 2: Get user info */
const userRes = await fetch("https://discord.com/api/users/@me", {
headers:{
Authorization:`Bearer ${tokenData.access_token}`
}
});

const user = await userRes.json();

/* STEP 3: Redirect to frontend with token */
return res.redirect(
`/apply.html?token=${tokenData.access_token}&username=${user.username}&id=${user.id}`
);

} catch (err) {
return res.status(500).send("OAuth Error");
}
}
