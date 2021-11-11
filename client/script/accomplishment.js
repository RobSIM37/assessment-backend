const baseAccomplishmentsURL = 'http://localhost:4000/api/accomplishments/';

function getCall() {

    axios.get(baseAccomplishmentsURL)
    .then(accomplishmentsResponseHandler)
    .catch(err=>alert(err));

}

const accomplishmentsResponseHandler = (res) => {

    const accompArr = res.data;

    if (accompArr.length === 0) {
        document.querySelector('h5').innerText = "(Complete a To Do List or Progress Meter to see it here!)";
    } else {
        document.querySelector('h5').innerText = "";
    }

    for (let i=0; i<accompArr.length; i++) {
        buildAccomplishmentHTML(accompArr[i]);
    }

}

function buildAccomplishmentHTML(obj) {

    const accompContainer = document.querySelector('#accomplishments-container');
    accompContainer.innerHTML += `
                                <article id="${obj.id}">
                                    <p class="accomplishment-type">${obj.type}</p>
                                    <p class="accomplishment-name" style="background:#${obj.color}">${obj.name}</p>
                                    <p class="accomplishment-date">${obj.date}</p>
                                </article>`

}

getCall();