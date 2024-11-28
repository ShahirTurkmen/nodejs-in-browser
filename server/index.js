const express = require("express");
const serveIndex = require("serve-index");
const path = require("path");
const cors = require("cors");
const fs = require("fs");
const app = express();
const PORT = 8081;
const rootDir = path.join(__dirname, "..", "www", "mnt"); // Update to your directory
app.use(cors());
app.use(
  "/mnt",
  serveIndex(rootDir, {
    icons: true,
    json: true, // Enable JSON output
  })
);

app.use("/mnt", express.static(rootDir));
app.use("/", express.static(path.join(__dirname)));

// Function to read the directory and return its structure as JSON
const getDirectoryContents = (dirPath) => {
  const items = fs.readdirSync(dirPath);
  const directoryContents = items.map((item) => {
    const itemPath = path.join(dirPath, item);
    const isDirectory = fs.statSync(itemPath).isDirectory();
    let fileContent = isDirectory ? null : fs.readFileSync(itemPath, "utf8"); // Read file content if it's a file
    // console.log(item, isDirectory, fileContent, itemPath);

    return {
      name: item,
      path: itemPath,
      isDirectory: isDirectory,
      contents: isDirectory ? getDirectoryContents(itemPath) : null, // Recursively get contents for directories
      fileContent,
    };
  });
  return directoryContents;
};

// Route to serve the directory structure as JSON
app.get("/api/dir/mnt", (req, res) => {
  const directoryStructure = getDirectoryContents(rootDir);
  res.json(directoryStructure);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
