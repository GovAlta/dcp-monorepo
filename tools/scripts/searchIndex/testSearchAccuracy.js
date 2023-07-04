import { createIndex } from './createIndex.js'
import Fuse from 'fuse.js'
import fetch from 'node-fetch';

const testData = [
    {
        query: "about",
        expect: {
            length: 2,
            slugs: ["about-page-1", "about-page-2"]
        },
        description: "Test search for key word: about."
    },

    {
        query: "abot",
        expect: {
            length: 2,
            slugs: ["about-page-1", "about-page-2"]
        },
        description: "Test fuzzy search for key word: abot."
    },
    {
        query: "We also want to tell the stories about **the people**",
        expect: {
            length: 2,
            slugs: ["story-page-1"]
        },
        description: "Test special characters"
    },
    {
        query: "story",
        expect: {
            length: 1,
            slugs: ["story-page-1"],
        },
        description: "Test search for key word: about."
    },
    {
        query: "From problem to solution, Digital Design and Delivery (3D)",
        expect: {
            length: 1,
            slugs: ["about-page-1"],
        },
        description: "Test search for 1st sentence in the about page."
    }
]

async function testElasticSearch() {
    // To run this function, we need to setup the elasticsearch. We can achieve this by. 
    // podman run --name es01 --net elastic -p 9200:9200 -e "discovery.type=single-node"  -e "xpack.security.enabled=false" -it docker.elastic.co/elasticsearch/elasticsearch:8.8.1
    const host = "http://localhost:9200"
    const indexes = createIndex()
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

  function testFuseWithLocationIgnore() {
    console.log('Test fuse with location ignore.')
    const option = {
        keys: ["title", "description", "slug", "Content", "body"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
        ignoreLocation: true
      };
    testFuse(option)

    console.log('##################')

  }


  function testFuseWithoutLocationIgnore() {
    console.log('Test fuse without location ignore.')
    const option = {
        keys: ["title", "description", "slug", "Content", "body"],
        includeMatches: true,
        minMatchCharLength: 2,
        threshold: 0.5,
      };
    testFuse(option)

    console.log('##################')

  }
  
  function testFuse(option) {
    const indexes = createIndex()

    
    // Need to update the query.
    const query = ""
    const fuse = new Fuse(indexes, option)


    for(const testCase of testData) {
        console.log('++++++++++++++')

        console.log(`query parameter: ${testCase.query}`)
        const result = fuse
        .search(testCase.query)
        .map((result) => result.item)
        .slice(0, 5);
        console.log(testCase.description)
        console.log(`Expect obtain ${testCase.expect?.length} results and get ${result.length}`)
        const resultInRage = result.slice(0, Math.min(testCase.expect?.length, result.length))

        for (const [i, entry] of resultInRage.entries()) {
            if (entry?.slug === testCase.expect.slugs[i]) {
                console.log(`${i + 1}st element order in result matches expectation`)
            } else {
                console.error(`Expect ${i + 1}st element slug is ${testCase.expect.slugs[i]}, but get ${entry?.slug}.`)
            }
        }
    }
  }
  
  testFuseWithLocationIgnore()
  testFuseWithoutLocationIgnore()
  testElasticSearch()