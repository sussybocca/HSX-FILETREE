export default async function handler(req, res) {
  try {
    const response = await fetch(
      "https://api.github.com/repos/sussybocca/.HSX/git/trees/main?recursive=1",
      {
        headers: {
          "Accept": "application/vnd.github.v3+json"
        }
      }
    );

    const text = await response.text();
    if (!response.ok) {
      return res.status(response.status).json({ error: text });
    }

    const data = JSON.parse(text);
    const files = data.tree.filter(item => item.type === "blob");
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
