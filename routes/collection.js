const router = require('express').Router();
const verify = require('./verifyToken');

const Photo = require('../models/photo.model');
const fetch   = require('node-fetch');

const ACCESS_KEY = '4ed9290a2a5bb9699d9a09cbbf8a998e5782e427f9d34c609d15a488ac533983';


router.post('/add', verify, async (req, res) => {

    let userID = req.user._id;
    let photoID = req.body.savedPhotoID;

    try {
        let photo = await Photo.findOne({ photoID, userID });

        if (photo) {
            return res.json(photo)
        } else {
            await fetch(`https://api.unsplash.com/photos/${photoID}?client_id=${ACCESS_KEY}`)
                .then(res => res.json())
                .then(data => { 
                    photo = new Photo({
                        photoID: photoID,
                        userID: userID,
                        photoData: data,
                        date: new Date()
                    });
                    photo.save()
                        .then( () => {
                            res.json('Photo saved!');
                        })
                        .catch( err => res.status(400).json('Error: ' + err));
                })
                .catch(err => {res.send(err);});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server Error');
    }

});

router.get('/get', verify, (req, res) => {
    Photo.find({userID: req.user._id})
        .then( photos => res.json(photos))
        .catch( err => res.status(400).json('Error: ' + err));
})

router.delete('/:id', (req,res) => {
    Photo.findOneAndDelete({photoID: req.params.id, userID: req.user._id})
    .then( photos => res.json('Photo deleted!'))
    .catch( err => res.status(400).json('Error: ' + err));
});

module.exports = router;