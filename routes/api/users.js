if (process.env.NODE_ENV !== "production")
    require('dotenv').config()

const express = require('express')
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const router = express.Router();

//User Model
const User = require('../../models/User');

// @route   GET api/users/register
// @desc    Register new users
// @access  PUBLIC
router.post('/register', (req, res) =>{
    
    const { name, email, password } = req.body;

    if (!name || !email || !password){
        return res.status(400).json({msg: 'All fields are required!'}); }
    
    User.findOne({ email })
    .then(user => {
        if (user){
            return res.status(400).json({msg: 'Account with this email already exists!'});
        }

        const newUser = new User({
            name,
            email,
            password
        })

        // Generate salt and password
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                .then(user => {

                    // Generate JWT token
                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;

                            res.json({
                                token,
                                user :{
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            });
                        }
                    )
                })
            })
        })

    })
    
});

// @route   GET api/users/login
// @desc    Login users
// @access  PUBLIC
router.post('/login', (req, res) =>{
    
    const { email, password } = req.body;

    if (!email || !password){
        return res.status(400).json({msg: 'All fields are required!'}); }
    
    User.findOne({ email })
    .then(user => {
        if (!user){
            return res.status(400).json({msg: 'An account with this email does not exist'});
        }

        // Validate password 
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch){
                return res.status(400).json({ msg: 'Invalid password credentials'});}
            
            // Generate JWT token
            jwt.sign(
                { id: user.id },
                process.env.JWT_SECRET,
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;

                    res.json({
                        token,
                        user :{
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    });
                }
            )
            
        })

    }).catch(err => res.json(err));
    
});

// @route   GET api/users/getUserToken
// @desc    Get user data
// @access  PRIVATE
router.get('/getUserToken', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user));
})


// @route POST api/users/updatePassword
// @desc  Update password in mongodb
// @access PRIVATE
router.put('/updatePassword', (req, res) =>{
    
    const { id, name, email, password } = req.body;

    if (!id){
        return res.status(400).json({msg: 'ID is required!'}); }

    if (!name || !email || !password){
        return res.status(400).json({msg: 'All fields are required!'}); }
    
    var updatedUser = {
        name: name, 
        email: email, 
        password: password
    }

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            console.log("Updating password 1:" + hash);
            updatedUser.password = hash;
            console.log("Updating password 2:" + updatedUser.password);

            User.findByIdAndUpdate(id, updatedUser, { new: true}, function(err, user) {
                res.json({
                    user :{
                        id: user.id,
                        name: user.name,
                        email: user.email
                    },
                    success: true
                });
            });
        })
    });      
    
});

module.exports = router;