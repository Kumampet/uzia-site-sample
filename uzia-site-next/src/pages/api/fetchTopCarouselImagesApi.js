// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// トップページカルーセル画像取得API

import fs from "fs";
import path from 'path';
import _forEach from "lodash/forEach";

export default function handler(req, res) {
  const directoryPath = path.join(process.cwd(), 'public/img/top_carousel')
  const filenames = fs.readdirSync(directoryPath);
  
  const imageArray = [];
  
  _forEach(filenames, (filename) => {
    const host = req.headers.host;
    const protocol = req.headers["x-forwarded-proto"];
    const url = `${protocol}://${host}/img/top_carousel/${filename}`;
    imageArray.push({
      path: url,
      key: filename
    });
  });

  // console.log({imageArray})
  res.status(200).json({ imageArray });
}
