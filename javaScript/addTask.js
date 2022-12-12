/** AddTask Functions **/


let task = {
    id: "",
    board: "",
    category: "",
    title: "",
    description: "",
    progress: 0,
    progressNumber: 0,
    assignedTo: "",
    prio: "",
    dueDate: "",
    subtasks: new Array
}

let categories = [
    { name: "Sales", color: "bgRo" },
    { name: "Backoffice", color: "bgLg" },
    { name: "Design", color: "bgOg" },
    { name: "Development", color: "bgVi" }
];


// async function createTask() {
//     let newTask = {
//         id: 0,
//         title: document.getElementById('title').value,
//         description: document.getElementById('description').value,
//         category: document.getElementById('category').value,
//         assignedTo: document.getElementById('assignedTo').value,
//         dueDate: document.getElementById('Date').value,
//         prio: document.getElementById('prio').value,
//         subtasks: document.getElementById('subtasks').value
//     }

// }

/**
 * It takes two parameters, a name and a color, and then it changes the innerHTML of a div to display
 * the name and color.
 * @param name - The name of the category
 * @param color - the class name of the color you want to use
 */
function selectCategory(name, color) {
    closeSelection();
    let categoryList = document.getElementById('selectField');
    if (categoryList) {
        categoryList.innerHTML = `
        <p id="categoryName" class="textBox"></p>
        <div id="categoryColor" class="listContactInitials contactScale left"></div>
        `;
        document.getElementById('categoryName').innerHTML = name;
        document.getElementById('categoryColor').classList.add(color);
    }
}


function addTitle() {
    document.getElementById('input').value;
}

function addDescription() {
    document.getElementById('description').value;
}

// function selectCategory() {
//     document.getElementById('selectField').innerHTML += 
// }

function AssignedTo() {

}


function addSubtask() {
    let taskInput = document.getElementById('inputSubtask').value;
    task.subtasks.push(taskInput);
    renderSubtask(taskInput);
    document.getElementById('inputSubtask').value = ``;
    console.log(task.subtasks);
}
/**
 * 
 * @param {*} taskInput 
 */
function renderSubtask(taskInput) {
    document.getElementById('addSubtaskElement').innerHTML += `
    <div class="checkbox">
        <input class="" type="checkbox">
        <span>${taskInput}</span>
    </div>`
}

function saveSubtaskInJson() {

}













///**      Selection Functions       **///


/**
 * It removes the class 'd-none' from the element with the id 'list' and adds the class 'growIn' to the
 * same element. Then, after 200 milliseconds, it removes the class 'growIn' from the same element.
 * Finally, it changes the onclick attribute of the element with the id 'selectField' to
 * 'closeSelection()'.
 */
function openSelection() {
    document.getElementById('list').classList.remove('d-none');
    document.getElementById('list').classList.add('growIn');
    setTimeout(() => {
        document.getElementById('list').classList.remove('growIn');
    }, 200);
    document.getElementById('selectField').setAttribute('onclick', `closeSelection()`);
}

/**
 * It adds a class to the list element that makes it grow out, then after 200ms it adds a class that
 * makes it disappear and removes the class that makes it grow out.
 */
function closeSelection() {
    document.getElementById('list').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('list').classList.add('d-none');
        document.getElementById('list').classList.remove('growOut');
    }, 200);
    document.getElementById('selectField').setAttribute('onclick', `openSelection()`);
}

///**      ContactSelection Functions       **///

/**
 * It removes the class 'd-none' from the element with the id 'listContact' and adds the class 'growIn'
 * to the same element. Then it removes the class 'growIn' from the same element after 200
 * milliseconds. Then it sets the attribute 'onclick' of the element with the id 'selectioContactField'
 * to the function 'closeContactSelection()'.
 */
function openContactSelection() {
    document.getElementById('listContact').classList.remove('d-none');
    document.getElementById('listContact').classList.add('growIn');
    setTimeout(() => {
        document.getElementById('listContact').classList.remove('growIn');
    }, 200);
    document.getElementById('selectioContactField').setAttribute('onclick', `closeContactSelection()`);
}


/**
 * It adds a class to an element, then after 200ms, it adds another class to the same element and
 * removes the first class.
 */
function closeContactSelection() {
    document.getElementById('listContact').classList.add('growOut');
    setTimeout(() => {
        document.getElementById('listContact').classList.add('d-none');
        document.getElementById('listContact').classList.remove('growOut');
    }, 200);
    document.getElementById('selectioContactField').setAttribute('onclick', `openContactSelection()`);
}

///**      Select Option Functions       **///

/**
 * When the user clicks the button, the function will remove the class 'd-none' from the element with
 * the id 'newCategory' and the element with the id 'selectCorlor' and add the class 'd-none' to the
 * element with the id 'selectField' and the element with the id 'list'.
 */
function newCategory() {
    document.getElementById('newCategory').classList.remove('d-none');
    document.getElementById('selectCorlor').classList.remove('d-none');
    document.getElementById('selectField').classList.add('d-none');
    document.getElementById('list').classList.add('d-none');
}

/**
 * It removes the class 'd-none' from the element with the id 'selectField' and adds the class 'd-none'
 * to the element with the id 'newCategory' and the element with the id 'selectCorlor'. It also sets
 * the onclick attribute of the element with the id 'selectField' to the function 'openSelection()'.
 */
function clearNewCategory() {
    document.getElementById('selectField').classList.remove('d-none');
    document.getElementById('newCategory').classList.add('d-none');
    document.getElementById('selectCorlor').classList.add('d-none');
    document.getElementById('selectField').setAttribute('onclick', `openSelection()`);
}

/**
 * When the user clicks the button with the id of 'inviteNewContact', the function will remove the
 * class of 'd-none' from the element with the id of 'inviteNewContact', and add the class of 'd-none'
 * to the elements with the ids of 'selectioContactField' and 'listContact'.
 */

function inputNewContact() {
    document.getElementById('inviteNewContact').classList.remove('d-none');
    document.getElementById('selectioContactField').classList.add('d-none');
    document.getElementById('listContact').classList.add('d-none');
}


/**
 * It removes the class 'd-none' from the element with the id 'selectioContactField' and adds the class
 * 'd-none' to the elements with the ids 'inviteNewContact' and 'listContact'. It also sets the onclick
 * attribute of the element with the id 'selectioContactField' to the function
 * 'openContactSelection()'.</code>
 * 
 * 
 * 
 * I'm not sure if this is the best way to do this, but it works.
 */
function clearInviteNewContact() {
    document.getElementById('selectioContactField').classList.remove('d-none');
    document.getElementById('inviteNewContact').classList.add('d-none');
    document.getElementById('listContact').classList.add('d-none');
    document.getElementById('selectioContactField').setAttribute('onclick', `openContactSelection()`);
}
/**
 * 
 */

function selectPrio() {


}