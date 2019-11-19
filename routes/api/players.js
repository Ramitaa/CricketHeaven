const express = require('express');
const axios = require('axios');
const auth = require('../../middleware/auth');
const router = express.Router()

//Player Model
const Player = require('../../models/Player');

// @route   GET api/players/
// @desc    Get all player
// @access  PUBLIC
router.get('/getHistory', auth, (req, res) =>{
    Player.find()
    .sort({date: -1 })
    .then(response => res.json({response, success: true, searchCompleted: true})) 
    .catch(err => res.json({err, success: false, searchCompleted: false}));
});

// @route   GET api/players/matches
// @desc    Get upcoming matches
// @access  PUBLIC
router.get('/getMatches', auth,(req, res) =>{

    const queryStr = `https://cricapi.com/api/matches?apikey=z9upzg0YhLZUAjMoM3nIel09INf2`;

    console.log("Query string:" + queryStr);
    axios.get(queryStr)
    .then(response => res.json({response: response.data, success: true, searchCompleted: true})) 
    .catch(err => res.json({err, success: false, searchCompleted: true}));
});

// @route   GET api/players/getplayer/tendulkar
// @desc    Get player by ID
// @access  PRIVATE
router.get('/getPlayer/:name', auth, (req, res) =>{
    const queryStr = `https://cricapi.com/api/playerFinder?apikey=z9upzg0YhLZUAjMoM3nIel09INf2&name=${req.params.name}`;

    console.log("Query string:" + queryStr);

    var promise = new Promise(function(resolve, reject) {
        axios.get(queryStr)
        .then( (response) => {
            var searchedPlayers = response.data.data;
            resolve(searchedPlayers);
        }) 
        .catch(err => res.json({success: false}));
    });    

    promise.then(function(raw_player){

        URLs = []; 

        for (i in raw_player)
        {
            var id = raw_player[i].pid;
            const queryStr = `https://cricapi.com/api/playerStats?apikey=z9upzg0YhLZUAjMoM3nIel09INf2&pid=${id}`;
            URLs.push(queryStr);
        }
        getAllData(URLs)
        .then(response => res.json({response, success: true, searchCompleted: true}))
        .catch(err => res.json({err, success: false, searchCompleted: true}))

    })
    .catch(err => res.json({promise_error: false}));
});

async function getAllData(URLs){
    let networkRequestPromises = URLs.map(fetchData);
    return await Promise.all(networkRequestPromises);
}
  
function fetchData(URL) {
    return axios
      .get(URL)
      .then(function(response) {

        var player = {
            id: response.data.pid,
            fullName: response.data.fullName,
            birth: response.data.born,
            country: response.data.country,
            role: response.data.playingRole,
            imageURL: response.data.imageURL,
            battingStyle: response.data.battingStyle,
            bowlingStyle: response.data.bowlingStyle,
            majorTeams: response.data.majorTeams,
            profile: response.data.profile
        };
        return player;
      })
      .catch(function(error) {
        return { success: false };
      });
}

// @route   GET api/players/getPlayerStatistics/28101
// @desc    Get player by ID
// @access  PRIVATE
router.get('/getPlayerStatistics/:id', auth, (req, res) =>{
    const queryStr = `https://cricapi.com/api/playerStats?apikey=z9upzg0YhLZUAjMoM3nIel09INf2&pid=${req.params.id}`;

    console.log("Query string:" + queryStr);

    var promise = new Promise(function(resolve, reject) {
        axios.get(queryStr)
        .then( (response) => {
            var raw_player = {
                success: true,
                searchCompleted: true,
                id: response.data.pid,
                fullName: response.data.fullName,
                birth: response.data.born,
                country: response.data.country,
                role: response.data.playingRole,
                imageURL: response.data.imageURL,
                battingStyle: response.data.battingStyle,
                bowlingStyle: response.data.bowlingStyle,
                majorTeams: response.data.majorTeams,
                profile: response.data.profile,
                bowling: response.data.data.bowling,
                batting: response.data.data.batting,
                age: response.data.age
            };
            resolve(raw_player);

        }) 
        .catch(err => res.json({success: false}));
    });
    
    promise.then(function(raw_player){

        const newPlayer  = new Player({
            id: raw_player.id,
            fullName: raw_player.fullName,
            birth: raw_player.birth,
            country: raw_player.country,
            role: raw_player.role,
            imageURL: raw_player.imageURL,
            battingStyle: raw_player.battingStyle,
            bowlingStyle: raw_player.bowlingStyle,
            majorTeams: raw_player.majorTeams
        });
    
        newPlayer.save().then(player => res.json(raw_player)).catch(err => res.json(err));
    })
});

// @route   DELETE api/players/28101
// @desc    Delete player by ID
// @access  PUBLIC
router.delete('/:id', auth, (req, res) =>{
    Player.findById(req.params.id)
    .then(player => player.remove().then(() => res.json({ success: true}))
    .catch(err => res.status(404).json({ success: false})));
});

module.exports = router;