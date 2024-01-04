const fs = require('fs');
const colisPath = './colis.json';
const locationPath = './locations.json';

const badObject = new Error("Bad Object passed to the db");

function addColis(colis) {
    validateColisObj(colis);
    const pastObjects = getColis();
    id = 0;
    if (pastObjects.length > 0) {
        id = pastObjects[pastObjects.length - 1]['id']+1;
    }
    colis['id'] = id;
    pastObjects.push(colis);
    saveColis(pastObjects)
}

function deserialize(data) {
    return JSON.parse(data);
}

function serialize(data) {
    return JSON.stringify(data)
}

function getColis() {
    const data = fs.readFileSync(colisPath, 'utf8');
    return deserialize(data);
}

function saveColis(colisArray) {
    fs.writeFileSync(colisPath, serialize(colisArray));
}

function removeColis(colisId) {
    const pastObjects = getColis();
    const newObjects = pastObjects.filter(obj => obj.id !== Number(colisId));

    saveColis(newObjects);
}

function validateColisObj(obj) {
    if (obj && typeof obj === 'object' && 'name' in obj && 'location' in obj) {
        if (obj['name'] && obj['location']) {
            return;
        }
    }
    console.log(obj);
    throw badObject;
}
function setupDb() {
    fs.writeFileSync(colisPath, '[]');
    fs.writeFileSync(locationPath, '[]');
}


function getLocations() {
    const data = fs.readFileSync(locationPath, 'utf8');
    return deserialize(data);
}

function addLocation(loc) {
    oldloc = getLocations();
    oldloc.push(loc);
    saveLocation(oldloc);
}

function removeLocation(loc) {
    oldloc = getLocations();
    const indexToRemove = oldloc.indexOf(loc);
    if (indexToRemove !== -1) {
        oldloc.splice(indexToRemove, 1);
    }
    saveLocation(oldloc);
}

function saveLocation(location) {
    fs.writeFileSync(locationPath, serialize(location));
}


module.exports = {
    addColis,
    getColis,
    removeColis,
    setupDb,
    getLocations,
    addLocation,
    removeLocation
};