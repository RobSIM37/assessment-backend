const data = require('./dataController');

module.exports = {

    getAllAccomplishments: (req, res) => {

        const result = data.getCompleteArray('accomplishments');

        if (result === undefined) {
            res.status(400).send(`Unable to provide Array of Accomplishments`);
        } else {
            res.status(200).send(result);
        }

    }
}