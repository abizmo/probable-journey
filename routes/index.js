const express = require('express');
const searchController = require('../controllers/search');
const router = express.Router();

const saveSearch = (req, res, next) => {
  searchController.add(req.params.term)
    .then(search => next(null, search))
    .catch(err => next(err));
}

router.get('/test', (req, res) => {
  res.status(200).json({ msg: "OK!" });
});

router.get('/imagesearch/:term', saveSearch, searchController.search);

router.get('/latest/imagesearch', searchController.latest);

module.exports = router;