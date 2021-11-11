const baseProgressURL = 'http://localhost:4000/api/progress/';
const completedButtonColor = '339933';

function getNumber(str) {

    let result = ''

    for (let i=0; i<str.length; i++){
        if (!isNaN(str[i])){
            result += str[i];
        } 
    }

    return parseInt(result);

}

const progressResponseHandler = (res) => {

    fillMeterContainer(res.data);

}

function getCall() {

    axios.get(baseProgressURL).then(progressResponseHandler);

}

function postCall(body) {

    axios.post(baseProgressURL, body).then(progressResponseHandler);

}

function putCall(id, body) {

    axios.put(`${baseProgressURL}/${id}`, body).then(progressResponseHandler);

}

function deleteCall(id) {
    
    axios.delete(`${baseProgressURL}${id}`).then(progressResponseHandler);

}

function completeCall(id) {

    axios.delete(`${baseProgressURL}/complete/${id}`).then(progressResponseHandler);

}

function isValidMeterData(name, start, current, goal, color) {

    let valid = true
    valid = (valid && name.length > 0);
    valid = (valid && !isNaN(getNumber(start)));
    valid = (valid && !isNaN(getNumber(goal)));
    valid = (valid && !isNaN(Number('0x' + color)) && color.length === 6);
    valid = (valid && isValidProgressData(start, current, goal));

    return valid;
}

function isValidProgressData(start, current, goal){

    return ((goal > start && current >= start && goal >= current) ||
            (goal < start && current <=start && goal <= current));

}

function closeButtonClickHandler(event) {

    const button = event.target;
    const meter = button.closest(".meter");

    if (button.innerText === 'x') {
        deleteCall(meter.id);
    } else {
        completeCall(meter.id);
    }

}

function newMeterSubmitHandler(event) {

    event.preventDefault();
    const form = event.target;
    const nameInput = form.querySelector('.tool-name')
    const startInput = form.querySelector('#starting-value')
    const goalInput = form.querySelector('#goal-value')
    const colorInput = form.querySelector('.bar-color')

    const name = nameInput.value;
    const start = startInput.value;
    const current = start;
    const goal = goalInput.value;
    const color = colorInput.value;

    if (isValidMeterData(name,start,current,goal,color)) {
        postCall({
            name, start, current, goal, color
        })
    } else {
        alert('There was an issue with the data provided to make your new Meter.\nHere are some rules to help:\nThe Meter Name cannot be blank.\nThe Starting Value and Goal Value must contain at least one number.\nThe Bar Color is a Hexidecimal value.\nIt must be six characters long and may only contain:\nnumbers (0-9) and leters (a-f).')
    }

    nameInput.value = '';
    startInput.value = '';
    goalInput.value = '';
    colorInput.value = completedButtonColor;

}

function editCurrentSubmitHandler(event) {

    event.preventDefault();
    const form = event.target;
    const meter = form.closest(".meter");
    const start = getNumber(form.querySelector('.start').innerText);
    const current = getNumber(form.querySelector('input').value);
    const goal = getNumber(form.querySelector('.goal').innerText);

    const currentText = form.querySelector('input').value
    if (isValidProgressData(start, current, goal)) {
        putCall(meter.id, {current: currentText})
    } else {
        alert('There was an issue with the data provided to update your Meter.\nThe Current Value must be between the range of\nthe Starting Value and Goal Values (inclusive).');
    }
}

function fillMeterContainer(meterArr) {

    const meterContainer = document.querySelector('#meter-container');
    meterContainer.innerHTML = '';

    for (let i=0; i<meterArr.length; i++){
        addMeterToContainer(meterArr[i]);
    }

}

function addMeterToContainer(meterObj) {

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = `
                    <div class="meter">
                        <div class="meter-header">
                            <div class="name">${meterObj.name}</div>
                            <button class="close-button">x</button>
                        </div>
                        <div class="bar"></div>
                        <form class="meter-text">
                            <div class="start">${meterObj.start}</div>
                            <input type="text" value="${meterObj.current}">
                            <div class="goal">${meterObj.goal}</div>
                        </form>
                    </div>`;

    const meter = tempDiv.querySelector('.meter');
    const bar = tempDiv.querySelector('.bar');
    const button = tempDiv.querySelector('.close-button');
    const form = tempDiv.querySelector('.meter-text');

    button.addEventListener('click', closeButtonClickHandler);
    form.addEventListener('submit', editCurrentSubmitHandler);

    const startVal = getNumber(meterObj.start);
    const currentVal = getNumber(meterObj.current);
    const goalVal = getNumber(meterObj.goal);

    meter.id = meterObj.id;

    if (goalVal > startVal) {
        bar.style.alignSelf = "flex-start";
        bar.style.width = `${100 * ((currentVal-startVal)/(goalVal-startVal))}%`;
    } else {
        bar.style.alignSelf = "flex-end";
        bar.style.width = `${100 * ((currentVal-goalVal)/(startVal-goalVal))}%`;
    }

    bar.style.background = `#${meterObj.color}`;

    if (currentVal === goalVal) {
        button.style.background = `#${completedButtonColor}`;
        button.innerText = 'o';
    }

    const meterContainer = document.querySelector('#meter-container');
    meterContainer.appendChild(tempDiv);

}

document.querySelector('form').addEventListener('submit',newMeterSubmitHandler);
getCall();
