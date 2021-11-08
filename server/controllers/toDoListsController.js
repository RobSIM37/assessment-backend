const data = require('./dataController');

module.exports = {

    getAllLists: (req, res) => {

        const result = data.getCompleteArray('toDoLists');

        if (result === undefined) {
            res.status(400).send(`Unable to provide Array of To Do Lists`);
        } else {
            res.status(200).send(result);
        }

    },

    postList: (req, res) => {

        const {body} = req;
        if (data.postTo('toDoLists', body)) {
            res.status(200).send(data.getCompleteArray('toDoLists'));
        } else {
            res.status(400).send('There was an error posting your To Do List');
        }

    },

    editList: (req, res) => {
        
        const {id} = req.params;
        const {body} = req;

        if (data.edit('toDoLists', id, body)) {
            res.status(200).send(data.getCompleteArray('toDoLists'));
        } else {
            res.status(400).send('There was an error editing your To Do List');
        }

    },

    addListItem: (req, res) => {
        
        const {id} = req.params;
        const {body} = req;
        
        if (data.addTo('toDoLists', id, body)) {
            res.status(200).send(data.getCompleteArray('toDoLists'));
        } else {
            res.status(400).send('There was an error adding an item to your To Do List');
        }

    },

    updateListItem: (req, res) => {

        const {id} = req.params;
        const {body} = req;

        if (data.updateItemStatus('toDoLists', id, body)) {
            res.status(200).send(data.getCompleteArray('toDoLists'));
        } else {
            res.status(400).send('There was an error updating an item on your To Do List');
        }
    },

    deleteList: (req, res) => {

        const {id} = req.params;
        if (data.delete('toDoLists', id, {})) {
            res.status(200).send(data.getCompleteArray('toDoLists'));
        } else {
            res.status(400).send('There was an error deleting your To Do List');
        }

    },

    completeList: (req, res) => {

        const {id} = req.params;
        if (data.delete('toDoLists', id, {add:true})) {
            res.status(200).send(data.getCompleteArray('toDoLists'));
        } else {
            res.status(400).send('There was an error completing your To Do List');
        }

    }
}