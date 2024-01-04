const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { addColis, getColis, removeColis,getLocations,addLocation,removeLocation } = require('./localdb.js');
const path = require('path'); // Node.js path module for handling file path
const app = express();
const port = 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Set EJS as the view engine
app.use('/public', express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Define a route to render the EJS template
app.get('/', (req, res) => {
    res.render('index', { colis: getColis(),locations: getLocations()});
});

app.post('/add-colis', (req, res) => {
    const { name, location,otherlocation } = req.body;
    colisObject = {
        name: name,
        location: location,
    };
    if (location == "Other") {
        colisObject["location"] = otherlocation;
        addLocation(otherlocation);
    }
    
    addColis(colisObject);
    res.redirect('/')
});

app.get('/remove-location', (req, res) => {
    const loc = req.query.loc;
    if(loc){
        removeLocation(loc);
    }
    res.redirect('/')
});

app.get('/remove-colis', (req, res) => {
    const id = req.query.id;
    if(id){
        removeColis(id);
    }
    res.redirect('/')
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});