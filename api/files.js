// api/files.js
import fetch from "node-fetch";

export default async function handler(req, res) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: "GitHub token not set" });
  }

  try {
    const response = await fetch(
      "https://api.github.com/repos/sussybocca/.HSX/git/trees/main?recursive=1",
      {
        headers: {
          "Authorization": `token ${GITHUB_TOKEN}`,
          "Accept": "application/vnd.github.v3+json"
        }
      }
    );

    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).send(text);
    }

    const data = await response.json();
    const files = data.tree.filter(item => item.type === "blob");
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
