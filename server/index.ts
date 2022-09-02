import express, { Request } from 'express'
import request from 'request'

const app = express()
const port = 3000

type QueryParams = {
  url: string;
};

function fileNameFromUrl(url: string) {
  var matches = url.match(/\/([^\/?#]+)[^\/]*$/) || '';
  if (matches.length > 1) {
    return matches[1];
  }
  return null;
}

app.get('/*', (req: Request<{}, {}, {}, QueryParams>, res) => {
  const { url } = req.query

  request({
    url: `${url}`,
    encoding: null,
    headers: {
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:96.0) Gecko/20100101 Firefox/96.0',
      Accept: 'image/avif,image/webp,*/*',
      'Accept-Language': 'en-US,en;q=0.5',
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
      Referer: 'https://beta.sankakucomplex.com/',
      'Sec-Fetch-Dest': 'image',
      'Sec-Fetch-Mode': 'no-cors',
      'Sec-Fetch-Site': 'same-site',
      Pragma: 'no-cache',
      'Cache-Control': 'no-cache',
      TE: 'trailers'
    }
  }, 
  (err, resp, buffer) => {
    if (err) {
      console.log(err)
    }
    if (!err && resp.statusCode === 200){
      res.set("Content-Type", "image/jpeg");
      res.set('Content-Disposition', `attachment; filename=${fileNameFromUrl(url)}`)
      res.send(resp.body);
    }
  });
})

app.listen(port, () => console.log(`image server running at port ${port}`))
