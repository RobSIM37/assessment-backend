const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json()); // When we want to be able to accept JSON.

const instantCtrl = require('./controllers/instantController');
const toDoCtrl = require('./controllers/toDoListsController');
const progressMeterCtrl = require('./controllers/progressMetersController');
const accomplishmentCtrl = require('./controllers/accomplishmentsController');

const instURL = '/api/instant/';
const todoURL = '/api/todo/';
const progURL = '/api/progress/';
const acomURL = '/api/accomplishments/';

// Instant Pick Me Ups
app.get(`${instURL}:type`, instantCtrl.returnInstantPickMeUp);

// To Do Lists
app.get(`${todoURL}`, toDoCtrl.getAllLists);
app.post(`${todoURL}`, toDoCtrl.postList);
app.post(`${todoURL}items/:id`, toDoCtrl.addListItem);
app.put(`${todoURL}items/:id`, toDoCtrl.updateListItem);
app.delete(`${todoURL}:id`, toDoCtrl.deleteList);
app.delete(`${todoURL}complete:id`, toDoCtrl.completeList);

// Progress Meters
app.get(`${progURL}`, progressMeterCtrl.getAllMeters);
app.post(`${progURL}`, progressMeterCtrl.postMeter);
app.put(`${progURL}:id`, progressMeterCtrl.editMeter);
app.delete(`${progURL}:id`, progressMeterCtrl.deleteMeter);
app.delete(`${progURL}complete:id`, progressMeterCtrl.completeMeter);

// Accomplishments
app.get(`${acomURL}`, accomplishmentCtrl.getAllAccomplishments);

app.listen(4000, () => console.log("Server running on 4000"));