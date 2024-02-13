const express = require('express');
const bodyParser = require('body-parser');
const { addColis, getColis, removeColis, getLocations, addLocation, removeLocation } = require('./localdb.js');

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get("/", (req, res) => {
    res.render('colis', { colis: getColis(), locations: getLocations(), path:req.baseUrl });
});

router.post('/add-colis', (req, res) => {
    const { name, location, otherlocation } = req.body;
    let colisObject = {
        name: name,
        location: location,
    };
    if (location === "Other") {
        colisObject["location"] = otherlocation;
        addLocation(otherlocation);
    }
    addColis(colisObject);
    res.redirect(req.baseUrl);
});

router.get('/remove-location', (req, res) => {
    const loc = req.query.loc;
    if (loc) {
        removeLocation(loc);
    }
    res.redirect(req.baseUrl);
});

router.get('/remove-colis', (req, res) => {
    const id = req.query.id;
    if (id) {
        removeColis(id);
    }
    res.redirect(req.baseUrl);
});

module.exports = router;
