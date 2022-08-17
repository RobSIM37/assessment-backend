const jetpack = require("fs-jetpack");
const crypto = require("crypto");

const dataFilePath = "./data/dataFile.dat"

let dataArrays = {
    toDoLists: [],
    progressMeters: [],
    accomplishments: []
}

function getIndex(type, id) {

    const arr = dataArrays[type];
    
    for (let i=0; i<arr.length; i++){

        const obj = arr[i];
        if (obj.id == id) {
            return i;
        }
    }

}

function parseType(type) {

    switch (type) {
        case 'toDoLists':
            return 'To Do List';
        case 'progressMeters':
            return 'Progress Meter';
        case 'accomplishments':
            return 'Accomplishment';
        case 'slideshowSources':
            return 'Slideshow Source';
        case 'complements':
            return 'Complement';
        case 'fortunes':
            return 'Fortunes'
    }
}

function formatedDate() {

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = today.getFullYear();

    return `${month}/${day}/${year}`;
}

module.exports = {

    getCompleteArray(type) {

        return dataArrays[type];

    },

    postTo(type, obj) {

        const issuedID = crypto.randomUUID();
        dataArrays[type].push({id: issuedID, ...obj});
        return true;

    },

    edit(type, id, obj) {

        const arr = dataArrays[type];
        const index = getIndex(type, id);
        const item = arr[index];

        if (item['id'] === id) {
            for (key in obj) {
                item[key] = obj[key];
            }
            return true
        } else {
            return false;
        }
    },

    addTo(type, id, obj) {

        const arr = dataArrays[type];
        const index = getIndex(type, id);
        const item = arr[index];

        if (item['id'] == id) {
            item['items'].push(obj);

            return true;

        } else {
            return false;
        }
    },

    updateItemStatus(type, id, obj) {

        const arr = dataArrays[type];
        const index = getIndex(type, id);
        const item = arr[index];

        if (item['id'] == id) {

            for (let i=0; i<item.items.length; i++) {

                if (item.items[i].text == obj.text) {
                    item.items[i].checked = obj.checked;
                }
            }

            return true;

        } else {
            return false;
        }
    },

    delete(type, id, obj) {
        
        const index = getIndex(type, id);
        const deletedItem = dataArrays[type].splice(index,1)[0];

        const {add} = obj;
        if (add) {
            const parsedType = parseType(type);
            const today = formatedDate();
            this.postTo('accomplishments', {
                type: parsedType,
                name: deletedItem.name,
                date: today,
                color: deletedItem.color
            });
        }

        if (deletedItem === undefined) {
            return false
        } else {
            return true
        }
    },

    loadData: (filePath = dataFilePath)=> {
        console.log(`attempting to load data from: ${filePath}...`);
        if (jetpack.exists(filePath)) {
            dataArrays = JSON.parse(jetpack.read(filePath));
            console.log(`...loaded data`)
        } else {
            console.log(`Data File: ${filePath} was not found`)
        }
    },

    saveData: (filePath = dataFilePath)=> {
        jetpack.write(filePath, dataArrays)
        console.log(`data saved to ${filePath}`)
    }
}