const baseInstantURL = 'http://localhost:4000/api/instant/';

function getCall(type) {

    axios.get(`${baseInstantURL}/${type}`).then(instantResponseHandler);

}

const instantResponseHandler = (res) => {

    alert(res.data);

}

function instantClickHandler(event) {

    getCall(event.target.id);

}

document.querySelector('#complements').addEventListener('click', instantClickHandler);
document.querySelector('#fortunes').addEventListener('click', instantClickHandler);