const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => {
  res.status(200).json({ msg: "OK!" });
});

router.get('/imagesearch/:something', (req, res) => {
  const something = req.params.something;
  res.status(200).json({ msg: `You are looking for some ${something}!`});
});

router.get('/latest/imagesearch', (req, res) => {
  res.status(200).json({ msg: "None search has been made!"});
});

module.exports = router;