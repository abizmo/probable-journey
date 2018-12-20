const { google } = require('googleapis');
const Search = require('../models/search');
const customsearch = google.customsearch('v1');

const customSearchOptions = (term, offset) => {
  return {
    cx: process.env.SEARCH_ENGINE_ID,
    q: term,
    auth: process.env.API_KEY,
    fileType: 'bmp, gif, png, jpg',
    start: (offset - 1) * 10 + 1
  };
};

const search = (req, res) => {
  const { term } = req.params;
  const offset = parseInt(req.query.offset) || 1;
  customsearch.cse.list(options(term, offset))
    .then(response => response.data.items)
    .then(images => images.map(image => {
      const imageJson = image.pagemap.cse_image || image.pagemap.imageobject; 
      const imageUrl = imageJson[0].src || imageJson[0].url;
      return {
        imageUrl,
        pageUrl: image.link
      }
    }))
    .then(images => res.json(images))
    .catch(err => console.log(err) && res.json({error: 'something happens'}))
};

module.exports.search = search;

const latest = (req, res) => {
  Search.find({})
    .select("term when -_id")
    .sort('-when')
    .exec()
    .then(searchs => res.json(searchs))
    .catch(err => res.status(500).json(err));
};

module.exports.latest = latest;

const add = (search) => {
  return new Promise((resolve, reject) => {
    if (!search) return reject(new Error("Not a search!"));
    Search.create({ term: search })
      .then(searchSaved => resolve({
        term: searchSaved.term,
        when: searchSaved.when
      }))
      .catch(err => reject(err));
  });
};

module.exports.add = add;