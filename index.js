const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')

const urls = fs.readFileSync("url.txt");
urls.toString().split('\n').forEach(function(url){
  request(url, (e, response, body) => {
    if (e) {
        console.error(e)
    }
    try {
        const $ = cheerio.load(body)
        const node = $('script[type="application/ld+json"]').get(0);
        try {
          // const jsonld = JSON.parse(node.firstChild.data);
          const json_ld = {
            url,
            data: node.firstChild.data
          }
          // fs.writeFileSync('json-ld.json', JSON.stringify(json_ld, null, 2));
          console.log(url)
          console.log(node.firstChild.data)
        } catch (err) {
          // In case of error, you can try to debug by logging the node
          // console.log(node);
          console.log(err);
        }
    } catch (e) {
        console.error(e)
    }
  })
})