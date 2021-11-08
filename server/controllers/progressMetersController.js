const data = require('./dataController');

module.exports = {

    getAllMeters: (req, res) => {

        const result = data.getCompleteArray('progressMeters');

        if (result === undefined) {
            res.status(400).send(`Unable to provide Array of Progress Meters`);
        } else {
            res.status(200).send(result);
        }

    },

    postMeter: (req, res) => {
        
        const {body} = req;
        if (data.postTo('progressMeters', body)) {
            res.status(200).send(data.getCompleteArray('progressMeters'));
        } else {
            res.status(400).send('There was an error posting your Progress Meter');
        }

    },

    editMeter: (req, res) => {
        const {id} = req.params;
        const {body} = req;

        if (data.edit('progressMeters', id, body)) {
            res.status(200).send(data.getCompleteArray('progressMeters'));
        } else {
            res.status(400).send('There was an error editing your Progress Meter');
        }

    },

    deleteMeter: (req, res) => {
        
        const {id} = req.params;
        if (data.delete('progressMeters', id, {})) {
            res.status(200).send(data.getCompleteArray('progressMeters'));
        } else {
            res.status(400).send('There was an error deleting your Progress Meter');
        }

    },

    completeMeter: (req, res) => {

        const {id} = req.params;
        if (data.delete('progressMeters', id, {add:true})) {
            res.status(200).send(data.getCompleteArray('progressMeters'));
        } else {
            res.status(400).send('There was an error completing your Progress Meter');
        }

    }
}