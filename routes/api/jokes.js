const express = require('express');
const axios = require('axios');
const auth = require('../../middleware/auth');
const router = express.Router()

// @route   GET api/jokes/getRandomJoke/
// @desc    Get a random joke on sports
// @access  PUBLIC
router.post('/getRandomJoke/', (req, res) =>{

    const queryStr = `https://api.chucknorris.io/jokes/random?category=sport`;

    console.log("Query string:" + queryStr);
    axios.get(queryStr)
    .then(response => res.json({response: response.data, success: true, jokeObtained: true})) 
    .catch(err => res.status(400).json({msg: err, success: false, jokeObtained: true}));
});

module.exports = router;