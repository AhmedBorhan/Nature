const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const Admin = require('../models/admin.model')

// @route   Post api/admin/register
// @desc    create Admin
// @access  private(Admin)
router.post('/register', (req, res) => {
    const newAdmin = new Admin({
        name: req.body.name,
        password: req.body.password,
    })
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newAdmin.password, salt, async(err, hash) => {
            try {
                newAdmin.password = hash;
                await newAdmin.save()
                res.json( newAdmin ) 
            } catch (error) {
                
            }    
        })
    })
});

// @route   Post api/admin/login
// @desc    admin login
// @access  private(Admin)
router.post('/login', async(req, res) => {
    const {
        password,
        name
    } = req.body;
    const errors = {}
    const admin = await Admin.findOne({name: name})
    if (admin) {
        const isMatch = await bcrypt.compare(password, admin.password)
        if (isMatch) {
            const payload = {
                name: admin.name,
                id: admin.id
            }
            jwt.sign(payload, "secret", {}, (err, token) => {
                res.json({
                    success: true,
                    token: "bearer " + token
                })
            });
        } else {
            console.log('isMatch', isMatch)
            errors.password = "wrong password"
            res.status(400).json(errors)
        }

    } else {
        errors.name = "no admin with that username"
        res.status(404).json(errors)
    }
});

// @route   Post api/admin/update
// @desc    get all request forms
// @access  private(Admin)
router.post('/update', (req, res) => {

});



module.exports = router;