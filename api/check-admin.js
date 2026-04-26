export default async function handler(req, res) {

const token = req.query.token;

/* YOUR SERVER + ROLE */
const GUILD_ID = "1496138405203939338";
const ADMIN_ROLE_ID = "1496143353925074954";

if(!token){
return res.json({ allowed:false });
}

try {

/* GET MEMBER FROM DISCORD GUILD */
const member = await fetch(
`https://discord.com/api/users/@me/guilds/${GUILD_ID}/member`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
).then(r => r.json());

const roles = member.roles || [];

/* CHECK ROLE */
const allowed = roles.includes(ADMIN_ROLE_ID);

return res.json({ allowed });

} catch (err) {
return res.json({ allowed:false });
}

}

