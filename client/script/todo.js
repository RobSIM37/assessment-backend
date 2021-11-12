const baseToDoURL = 'http://localhost:4000/api/todo/';
const unfinishedButtonColor = 'ff0000';
const finishedButtonColor = '339933';

const toDoResponseHandler = (res) => {

    fillListContainer(res.data);

}

function getCall() {

    axios.get(baseToDoURL)
    .then(toDoResponseHandler)
    .catch(err=>alert(err));

}

function postCall(body) {

    axios.post(baseToDoURL, body)
    .then(toDoResponseHandler)
    .catch(err=>alert(err));

}

function addItemCall(id, body) {

    axios.post(`${baseToDoURL}items/${id}`, body)
    .then(toDoResponseHandler)
    .catch(err=>alert(err));

}

function editItemCall(id, body){

    axios.put(`${baseToDoURL}items/${id}`, body)
    .then(toDoResponseHandler)
    .catch(err=>alert(err));

}

function deleteItemCall(id, body) {

    axios.delete(`${baseToDoURL}items/${id}`, body)
    .then(toDoResponseHandler)
    .catch(err=>alert(err));

}

function deleteCall(id) {

    axios.delete(`${baseToDoURL}${id}`)
    .then(toDoResponseHandler)
    .catch(err=>alert(err));

}

function completeCall(id) {

    axios.delete(`${baseToDoURL}complete/${id}`)
    .then(toDoResponseHandler)
    .catch(err=>alert(err));

}

function evaluateListCompletion(list){

    let completed = true;

    const listItems = Array.from(list.querySelector('ul').children);
    
    let index = 0
    while (completed && index<listItems.length) {

        const span = listItems[index].querySelector('span');
        if (!(span.classList.contains('checked'))) {
            completed = false;
        }

        index++;
    }

    const header = list.querySelector('.list-header');
    const button = header.querySelector('button');

    if (completed && listItems.length > 0) {
        button.style.background = `#${finishedButtonColor}`;
        button.innerText = 'o';
    } else {
        button.style.background = `#${unfinishedButtonColor}`;
        button.innerText = 'x';
    }

}

function toggleListItemClickHandler(event) {

    const item = event.target;
    item.classList.toggle('checked');

    const list = item.closest(".list");
    const id = list.id;
    evaluateListCompletion(list);

    editItemCall(id, {text: item.innerText, checked: item.classList.contains('checked')});

}

function closeButtonClickHandler(event) {

    const button = event.target;
    const list = button.closest(".list");

    if (button.innerText === "o") {
        completeCall(list.id);
    } else {
        deleteCall(list.id);
    }

}

function isValidListData(name, color) {

    let valid = true
    valid = (valid && name.length > 0);
    valid = (valid && !isNaN(Number('0x' + color)) && color.length === 6);

    return valid;

}

function newListSubmitHandler(event) {

    event.preventDefault();

    const toolName = document.querySelector('.tool-name');
    const barColor = document.querySelector('.bar-color')
    const name = toolName.value;
    const color = barColor.value;

    if (isValidListData(name, color)) {
        postCall({
            name,
            color,
            items: []
        })

    } else {
        alert('There was an issue with the data provided to make your new List.\nHere are some rules to help:\nThe List Name cannot be blank.\nThe Bar Color is a Hexidecimal value.\nIt must be six characters long and may only contain:\nnumbers (0-9) and leters (a-f).');
    }

    toolName.value = "";
    barColor.value = finishedButtonColor;

}

function newItemSubmitHandler(event) {

    event.preventDefault();
    const form = event.target;

    const list = form.closest('.list');
    const input = form.querySelector('input')
    const text = input.value;

    const checked = false;
    
    if (!(text === "")) {
        addItemCall(list.id, {text:text, checked:checked});
    } else {
        alert(`New list items cannot be blank.`);
    }

}

function fillListContainer(ListArr) {

    const container = document.querySelector('#list-container')

    container.innerHTML = '';

    for (let i=0; i<ListArr.length; i++) {
        addListToContainer(ListArr[i]);
    }

}

function addListToContainer(listObj) {

    const {id, name, color} = listObj;

    const preListHTML = `<article id=${id} class="list">
                            <section class="list-header" style="background:#${color}">
                                <p class="title">${name}</p>
                                <button class="close-button list-button">x</button>
                            </section>
                            <form class="list-form">
                                <ul class="list-items">`;

    let listHTML = '';

    for (let i=0; i<listObj.items.length; i++) {
        listHTML = `${listHTML}<li>`

        const listItem = listObj.items[i];

        if (listItem.checked) {
            listHTML = `${listHTML}<span class="checked">${listObj.items[i].text}</span>`
        } else {
            listHTML = `${listHTML}<span>${listObj.items[i].text}</span>`
        }

        listHTML = `${listHTML}</li>`
    }

    const postListHTML =        `</ul>
                                <input type="text" placeholder="add an item here" value="">
                            </form>
                        </article>`;

    const tempSpan = document.createElement('span');
    
    tempSpan.innerHTML = preListHTML + listHTML + postListHTML;
    
    const form = tempSpan.querySelector('form')
    form.addEventListener('submit', newItemSubmitHandler);

    const listButton = tempSpan.querySelector('.list-button');
    listButton.addEventListener('click', closeButtonClickHandler);

    const spans = Array.from(tempSpan.querySelectorAll('span'));

    for(let i=0; i<spans.length; i++) {
        spans[i].addEventListener('click', toggleListItemClickHandler);
    }

    const container = document.querySelector('#list-container');
    list = tempSpan.firstChild;

    evaluateListCompletion(list);
    container.appendChild(list);

}

document.querySelector('form').addEventListener('submit',newListSubmitHandler);
getCall();