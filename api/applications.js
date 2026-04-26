// FILE: /api/applications.js

let DB = [];

export default function handler(req, res) {
  if (req.method === "POST") {
    DB.push({
      ...req.body,
      status: "Pending HR"
    });

    return res.json({ success: true });
  }

  if (req.method === "GET") {
    return res.json(DB);
  }
}
