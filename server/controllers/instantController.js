const data = require('./dataController');

module.exports = {
    returnInstantPickMeUp: (req, res) => {
        
        const {type} = req.params;
        const result = data.getRandomItem(type);

        if (result === undefined) {
            res.status(400).send(`Unable to provide Instant Pick Me Up of type: ${type}`);
        } else {
            res.status(200).send(result);
        }
    }
}