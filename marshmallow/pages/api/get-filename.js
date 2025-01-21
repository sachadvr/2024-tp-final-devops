import path from "path";
import fs from "fs";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const dataPath = path.join(process.cwd(), "uploads");

    const files = fs.readdirSync(dataPath);
    if (files.length === 0) {
      return res.status(404).send("No files found");
    }
    const filename = files[files.length - 1];
    return res.status(200).send(filename);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error reading files");
  }
}
