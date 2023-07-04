import Fuse from 'fuse.js'
import fs from 'fs'
import glob from 'glob'
import fm from "front-matter"
import fetch from 'node-fetch';


export function createIndex() {
  const content = []
  glob.sync('./apps/**/*.mdx').map((path) => {
    const fullpath = process.cwd() + path.substring(1)
    const relativePath = path.substring("./apps/".length)

    const fileContent = fs.readFileSync(fullpath, "utf8");
    const frontmatter = fm(fileContent);
    const meta = fm(fileContent)?.attributes || {};
    const indexObject = {...meta, body: frontmatter.body, filepath: relativePath, url: path.split("/")[5] + "/index.html"}
    content.push(indexObject)
  })

  const exportIndexFile = process.cwd() + "/apps/dcp-guide/public/search.json"

  fs.writeFileSync(exportIndexFile, JSON.stringify(content))

  return content;
}