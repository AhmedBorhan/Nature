const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const Activity = require('../models/activity.model')

//image props
const sharp = require("sharp");
const fs = require("fs");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads/original");
    },
    filename: (req, file, cb) => {
        const dateName = new Date().toISOString();
        cb(null, `${Date.now()}${file.originalname}`);
        //cb(null, file.fieldname + '-' + Date.now())
    }
});

//filtering the file so it takes just images
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype == "image/jpeg" ||
        file.mimetype == "image/png" ||
        file.mimetype == "image/jpg"
    ) {
        cb(null, true);
    } else {
        cb("file type must be ( .jpeg , .png , .jpg)", false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

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
    // search ? filter.title = { $regex: `${search}` } : ''
    // city.length>0 ? filter["location.city"] = { $in : city } : ''
    console.log('filter', filter)
    try {
        const activites = await Activity.find() 
        res.json(activites)
    } catch (error) {
        res.json({error : error}); 
    }
    
});

// @route   get api/activity/last
// @desc    get last activity
// @access  public
router.get('/last', async (req, res) => {
    try {
        const lastActivity = await Activity.findOne()
        res.json(lastActivity)
    } catch (error) {
        res.json({ error: error });
    }
})

// @route   Post api/activity/add
// @desc    add new activity
// @access  private(admin)
router.post('/add' ,async(req, res) => {
    const { title , description , location, images} = req.body
    images.map(image => {
        image.url = `http://localhost:5000/uploads/images/${image.name}`;
    })
    const newActivity = new Activity({
        title,
        description,
        location
    })
    console.log('newActivity', newActivity)
    try {
        const activity = await newActivity.save()
        res.json(activity)
        images.map(image => {
            copyImage(image.name)
        })
    } catch (error) {
        console.log('error :', error);
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

// @route   Post api/activity/edit/:id
// @desc    edit activity
// @access  private(admin)
router.post('/edit/:id', async (req, res) => {
    const { title, description, location, images } = req.body
    const { id } = req.params
    images.map(image => {
        image.url = `http://localhost:5000/uploads/images/${image.name}`;
    })
    try {
        const activity = await Activity.findById(id)
        if(!activity) return res.sendStatus(404)
        //applying new values
        activity.title = title
        activity.description = description
        activity.location = location
        activity.images = images
        //waiting to save it to the DB
        await activity.save()
        res.json(activity)
        activity.images.map(item => {
            var path = `./uploads/images/${item.name}`;
            console.log("pathhhhhhhhh" , path)
            if (!fs.existsSync(path)) copyImage(item.name)
        })

    } catch (error) {
        console.log('error', error)
        res.status(400).json(error)
    }
});

// @route   POST api/activity/upload
// @desc    upload request image 
// @access  Private
router.post("/upload",upload.array("activityImage", 15),(req, res) => {
    //images pathes that we save in the model
    //var ImagePath, imgName
    var mem = ".jpeg";
    const images = [];
    for (let index = 0; index < req.files.length; index++) {
        let imgName = `${Date.now() + index}${index * 1000}${mem}`;
        let ImagePath = `http://localhost:5000/uploads/temp/${imgName}`;
        console.log('index :', index);
        console.log('imgName :', imgName);
        try {
            sharp(req.files[index].path)
                .resize({
                    width: 720,
                    withoutEnlargement: true
                })
                .toFile(`uploads/temp/${imgName}`, (err, info) => {
                    if (!err) {
                        const data = {
                            url: ImagePath,
                            name: imgName
                        }
                        images.push(data)
                        if (images.length === req.files.length) {
                            return res.json(images)
                        }
                    } else {
                        console.log("error is " + err)
                        return res.json(err);
                    }
                });
        } catch (err) {
            console.log('error in sharp = ' + err)
        }
    }
});

// @route   Post api/activity/image/:id
// @desc    delete single image
// @access  private(admin)
router.delete('/image/:name', async (req, res) => {
    var path = `./uploads/temp/${req.params.name}`;
    console.log('path', path)
    try {
        if(fs.existsSync(path)){
            fs.unlinkSync(path);
            console.log("temp")
        }else {
            path = `./uploads/images/${req.params.name}`;
            fs.unlinkSync(path);
            console.log("images")
        }
       
        //
        //file removed
        console.log('imag deleted')
    } catch (err) {
        console.error("error deleteing an old image" + err);
    }
});

// @route   Post api/activity/:id
// @desc    delete activity
// @access  private(admin)
router.delete('/:id', verifyToken, async (req, res) => {
    const { id } = req.params
    try {
        const activity = await Activity.findByIdAndRemove(id);
        if(activity) {
            res.json({success : true})
            activity.images.map(item => {
                var path = `./uploads/images/${item.name}`;
                DeleteImage(path);
            })
        } else {
            res.sendStatus(404)
        }  
    } catch (error) {
        res.status(400).json(error)
    }
});

const DeleteImage = (ImagePath) => {
    try {
        fs.unlinkSync(ImagePath);
        //file removed
    } catch (err) {
        console.error("error deleteing an old image" + err);
    }
}

const copyImage = async(name) =>{
    await fs.copyFile(`./uploads/temp/${name}`, `./uploads/images/${name}`, (err) => {
        if (err) throw err;
    });
    DeleteImage(`./uploads/temp/${name}`)
}

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