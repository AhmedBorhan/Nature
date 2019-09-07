const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const Activity = require('../models/activity.model')

// @route   Post api/activity
// @desc    get all activity
// @access  public
router.get('/', async(req, res) => {
    const {search , city} = req.body
    const filter = {}
    // search ? filter['$or'] = [{
    //     $text: {
    //         $search: search
    //     }
    // },
    // {
    //     title: {
    //         $regex: `${search}`
    //     }
    // }] : ''
    search ? filter.title = { $regex: `${search}` } : ''
    city.length>0 ? filter["location.city"] = { $in : city } : ''
    console.log('filter', filter)
    try {
        const activites = await Activity.find(filter) 
        res.json(activites)
    } catch (error) {
        res.json({error : error}); 
    }
    
});

// @route   Post api/activity/add
// @desc    add new activity
// @access  private(admin)
router.post('/add', verifyToken ,async(req, res) => {
    const { title , description , location} = req.body
    const newActivity = new Activity({
        title,
        description,
        location
    })
    try {
        const activity = await newActivity.save()
        res.json(activity)
    } catch (error) {
        res.status(400).json(error)
    }
});

// @route   Post api/activity/:id
// @desc    get single activity
// @access  public
router.get('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const activity =  await Activity.findById(id)
        activity ?res.json(activity) : res.sendStatus(404)
    } catch (error) {
        res.status(400).json(error)
    }
});

// @route   Post api/activity/: xfddbvdf
// @desc    edit activity
// @access  private(admin)
router.post('/:id', verifyToken, async (req, res) => {
    const { title, description, location } = req.body
    const { id } = req.params
    try {
        const activity = await Activity.findById(id)
        if(!activity) return res.sendStatus(404)
        //applying new values
        activity.title = title
        activity.description = description
        activity.location = location
        //waiting to save it to the DB
        await activity.save()
        res.json(activity)
    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)
    }
});

// @route   Post api/activity/:id
// @desc    delete activity
// @access  private(admin)
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params
    try {
        const activity = await Activity.findByIdAndRemove(id);
        activity ? res.json({success : true}) : res.sendStatus(404)
    } catch (error) {
        res.status(400).json(error)
    }
});

//jwt.verify(req.token, 'secretkey', (err, authData) => {
function verifyToken(req, res, next) {
    // Get auth header value
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is undefined
    if (typeof bearerHeader !== 'undefined') {
        // Split at the space
        const bearer = bearerHeader.split(' ');
        // Get token from array
        const bearerToken = bearer[1];
        //verfy the token
        jwt.verify(bearerToken, 'secret', (err, authData) => {
            if(!err) next()
            else res.sendStatus(403)
        })
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}


module.exports = router;