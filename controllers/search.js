const { google } = require('googleapis');
const Search = require('../models/search');
const customsearch = google.customsearch('v1');

const search = (req, res) => {
  const term = req.params.term;
  customsearch.cse.list({
    cx: process.env.SEARCH_ENGINE_ID,
    q: term,
    auth: process.env.API_KEY
  })
    .then(response => response.data.items)
    .then(images => images.map(image => {
      const imageUrl = image.pagemap.cse_image[0].src;
      return {
        imageUrl,
        pageUrl: image.link
      }
    }))
    .then(images => res.json(images))
    .catch(err => res.json(err))
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