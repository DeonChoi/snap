const router = require('express').Router();
const verify = require('./verifyToken');

const Photo = require('../models/photo.model');

router.post('/add', verify, async (req, res) => {

    let userID = req.user._id;
    let photoID = req.body.savedPhotoID;

    try {
        let photo = await Photo.findOne({ photoID, userID });

        if (photo) {
            return res.json(photo)
        } else {
            photo = new Photo ({
                photoID: photoID,
                userID: userID,
                date: new Date()
            });

            await photo.save()
            .then( () => {
                res.json('Photo saved!');
            })
            .catch( err => res.status(400).json('Error: ' + err));
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

router.delete('/:id', verify, (req,res) => {
    Photo.findOneAndDelete({photoID: req.params.id, userID: req.user._id})
    .then( photos => res.json('Photo deleted!'))
    .catch( err => res.status(400).json('Error: ' + err));
});

module.exports = router;