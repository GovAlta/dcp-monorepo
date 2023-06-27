import Fuse from 'fuse.js'
import fs from 'fs'
import glob from 'glob'
import fm from "front-matter"
import fetch from 'node-fetch';


function createIndex() {
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

async function testElasticSearch(indexes) {
  // To run this function, we need to setup the elasticsearch. We can achieve this by. 
  // podman run --name es01 --net elastic -p 9200:9200 -e "discovery.type=single-node"  -e "xpack.security.enabled=false" -it docker.elastic.co/elasticsearch/elasticsearch:8.8.1
  const host = "http://localhost:9200"
  await fetch(host + '/data', {method: 'DELETE'})
  for (const index of indexes) {
      await fetch(host + "/data/_doc", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(index)} )
  }
}

function testIndex(data) {
  const option = {
    keys: ["title", "description", "slug", "body"],
    includeMatches: true,
    minMatchCharLength: 2,
  }
  // Need to update the query.
  const query = ""
  const fuse = new Fuse(data, option)
  const result = fuse.search(query).map((item) => item.item.filepath)

}

const indexes = createIndex();
testIndex(indexes)

// await testElasticSearch(indexes)