let mergedContacts = [];
let currentPrio;


/**
 * It opens a modal window with a form to edit a task.
 * @param i - the index of the task in the filtered array
 */
function openEditTool(i) {
    // let task = boardTasks.find(t => t.id == filterdTasks[i].id);
    // let index = boardTasks.indexOf(task);
    document.getElementById('taskInfoContainer').innerHTML = generateEditBoardTask(i);
    document.getElementById('moreInfoBg').classList.remove('d-none')
    document.getElementById('backgroundCloser').classList.add('d-none')
    currentPrio = boardTasks[i].prio;
    selectCategory(boardTasks[i].category, boardTasks[i].categoryColor);
    getContactsBoard(i);
    showSelectedBtnEdit(i);
    renderSubTasksEdit(i);
    toggleSelection();
}


/**
 * It adds the class 'd-none' to the elements with the IDs 'moreInfoBg' and 'editInfo' and then calls
 * the function renderTodos(boardTasks) and sets the variable numberAssingendUserEdit to 0.
 */
function closeEditTool() {
    document.getElementById('moreInfoBg').classList.add('d-none')
    document.getElementById('editInfo').classList.add('d-none')
    document.getElementById('taskInfoContainer').classList.add('d-none')
    closeMobileInfo();
    filterdTasks = boardTasks;
    renderTodos(boardTasks);
    numberAssingendUserEdit = 0;
}




/**
 * It takes the index of the task that is being edited, and then loops through the subtasks of that
 * task, and then generates the HTML for each subtask
 * @param i - the index of the task in the boardTasks array
 */
function renderSubTasksEdit(i) {
    const subTaskContainerEdit = document.getElementById('subTaskContainerEdit');
    subTaskContainerEdit.innerHTML = '';

    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {
        const subtaskHTML = generateSubtaskBoard(i, y, boardTasks[i].subtasks[y]);
        subTaskContainerEdit.innerHTML += subtaskHTML;
    }
}

/**
 * It deletes the picked Task
 * @param i - the index of the task in the array
 */
function deleteTask(i) {
    boardTasks.splice(i, 1);
    closeEditTool()
    filterdTasks = boardTasks
    emptySearch()
    distributeIDs()
    saveTasks();
    renderTodos(boardTasks);
    initMsgBox('successfully deleted')
    
}



/**
 * It showes the current selected priority of the Task
 * @param i - the index of the task in the array
 */
function showSelectedBtnEdit(i) {
    if (boardTasks[i].prio == 'urgent') {
        document.getElementById("urgentBoard").style.backgroundColor = "#FF3D00";
        document.getElementById('urgentBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
    } else if (boardTasks[i].prio == 'medium') {
        document.getElementById("mediumBoard").style.backgroundColor = "#FFA800";
        document.getElementById('mediumBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
    } else if (boardTasks[i].prio == 'low') {
        document.getElementById("lowBoard").style.backgroundColor = "#8BE644";
        document.getElementById('lowBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
    }
}

/**
 * It takes the value of the input field, creates a new object with the value as the title and a status
 * of false, and pushes that object into the subtasks array of the boardTasks object.
 * @param i - the index of the task in the boardTasks array
 */
function deleteSubtaskBoard(i, y) {
    boardTasks[i].subtasks.splice(y, 1);
    renderSubTasksEdit(i);
    initMsgBox('Subtask is deleted!');
}

/**
 * It takes the value of the input field, creates a new object with the value as the title and a status
 * of false, and pushes that object into the subtasks array of the boardTasks object.
 * @param i - the index of the task in the boardTasks array
 */
function addSubtaskBoard(i) {
    let inputSubtask = document.getElementById('inputSubtaskBoard').value;
    if (inputSubtask) {
        let subtask = { title: inputSubtask, status: false };
        boardTasks[i].subtasks.push(subtask);
    }
    document.getElementById('inputSubtaskBoard').value = ``;
    renderSubTasksEdit(i);
}

/**
 * The function resets the color for all buttons and then sets the color for the selected button.
 * @param button - The button that was clicked
 */
function toggleColorPrio(button) {
    // Reset the color for all buttons
    resetColorButton();
    // Set the color for the selected button
    setColorbutton(button);
}

/**
 * When the user clicks on a button, the function will reset the background color of all buttons to
 * white and reset the filter of all images to none.
 */
function resetColorButton() {
    document.getElementById("urgentBoard").style.backgroundColor = "#FFFFFF";
    document.getElementById("mediumBoard").style.backgroundColor = "#FFFFFF";
    document.getElementById("lowBoard").style.backgroundColor = "#FFFFFF";
    document.getElementById('urgentBoard-img').style.filter = 'none';
    document.getElementById('mediumBoard-img').style.filter = 'none';
    document.getElementById('lowBoard-img').style.filter = 'none';
}


/**
 * When the user clicks on a button, the button's background color changes to a different color and the
 * button's image changes to a different image.
 * @param button - the button that was clicked
 */
function setColorbutton(button) {
    switch (button.id) {
        case "urgentBoard":
            document.getElementById("urgentBoard").style.backgroundColor = "#FF3D00";
            document.getElementById('urgentBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
            currentPrio = 'urgentBoard';
            break;
        case "mediumBoard":
            document.getElementById("mediumBoard").style.backgroundColor = "#FFA800";
            document.getElementById('mediumBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
            currentPrio = 'mediumBoard';
            break;
        case "lowBoard":
            document.getElementById("lowBoard").style.backgroundColor = "#8BE644";
            document.getElementById('lowBoard-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';
            currentPrio = 'lowBoard';
            break;
        default:
            break;
    }
}

/**
 * It takes two arrays, merges them, removes duplicates, and then generates a list of contacts assigned
 * to a board.
 * @param i - the index of the board in the boardTasks array
 */
function renderContactsAssigndToBoard(i) {
    let array1 = boardTasks[i].assignedTo;
    let array2 = contactsBoard;
    let uniqueContacts = new Set();
    mergedContacts = [];
    mergeContacts(array1, array2, uniqueContacts);
    generateAssignedContacts(i);
}

/**
 * It takes two arrays of objects, and merges them into a single array of objects, while removing
 * duplicates.
 * @param array1 - [{name: 'John', phone: '555-555-5555'}, {name: 'Jane', phone: '555-555-5555'}]
 * @param array2 - [{name: "John", phone: "555-555-5555"}, {name: "Jane", phone: "555-555-5555"}]
 * @param uniqueContacts - Set of unique contacts
 */
function mergeContacts(array1, array2, uniqueContacts) {
    for (const element of array1.concat(array2)) {
        if (!uniqueContacts.has(element.email)) {
            uniqueContacts.add(element.email);
            mergedContacts.push(element);
        }
    }
}


/**
 * If the checkbox exists, toggle it and update the assigned status.
 * @param checkBoxId - the id of the checkbox that was clicked
 * @param mergedId - The id of the merged issue
 * @param boardId - the id of the board
 */
function toggleCheckbox(checkBoxId, mergedId, boardId) {
    let checkbox = document.getElementById(checkBoxId);
    if (checkbox) {
        checkbox.checked = !checkbox.checked;
        updateAssignedStatus(checkBoxId, mergedId, boardId);
    }
}

/**
 * It updates the assigned counter and the board task assignment.
 * @param checkBoxId - the id of the checkbox that was clicked
 * @param mergedId - The id of the task in the database
 * @param boardId - the id of the board
 */
function updateAssignedStatus(checkBoxId, mergedId, boardId) {
    let checkBox = document.getElementById(checkBoxId);
    let isChecked = checkBox.checked;
    updateAssignedCounter(isChecked ? 1 : -1);
    updateBoardTaskAssignment(mergedId, boardId, isChecked);
}

/**
 * Updates the counter for the number of assigned contacts based on the given addition parameter
 * and updates the display on the user interface.
 * 
 * @param {boolean} addition - If true, increases the counter by 1; if false, decreases the counter by 1.
 */
function updateAssignedCounter(addition) {
    // Updates the counter for the number of assigned contacts based on the addition parameter.
    numberAssingendUserEdit += addition ? 1 : -1;

    // Sets the default text for the case when no contacts are assigned.
    let text = `Select contacts to assign`;

    // If at least one contact is assigned, updates the text according to the number of assigned contacts.
    if (numberAssingendUserEdit > 0) {
        text = `${numberAssingendUserEdit} contact${numberAssingendUserEdit > 1 ? 's' : ''} assigned`;
    }

    // Updates the user interface with the updated text.
    document.getElementById('contactNumber').innerHTML = text;
}


/**
 * Updates the assigned contacts of a board task by adding or removing the specified contact.
 *
 * @param {number} mergedId - The index of the contact within the mergedContacts list.
 * @param {number} boardId - The index of the board task within the boardTasks list.
 * @param {boolean} addition - If true, adds the contact to the assigned contacts; if false, removes the contact.
 */
function updateBoardTaskAssignment(mergedId, boardId, addition) {
    // Update the status of the contact in mergedContacts.
    mergedContacts[mergedId].status = addition;

    // If addition is true, add the contact to the assigned contacts of the board task.
    if (addition) {
        boardTasks[boardId].assignedTo.push(mergedContacts[mergedId]);
    } else {
        // If addition is false, remove the contact from the assigned contacts of the board task.
        boardTasks[boardId].assignedTo = boardTasks[boardId].assignedTo.filter(contact => contact !== mergedContacts[mergedId]);
    }
}


/**
 * Generates the list of assigned contacts for a specific task and updates the user interface.
 *
 * @param {number} i - The index of the current task within the boardTasks list.
 */
function generateAssignedContacts(i) {
    // Resets the counter for the number of assigned contacts.
    numberAssingendUserEdit = 0;

    // Iterates through all assigned contacts of the current task.
    boardTasks[i].assignedTo.forEach(assigned => {
        let matchId = mergedContacts.indexOf(mergedContacts.find(u => u.email == assigned.email));
        mergedContacts[matchId].status = true;
        numberAssingendUserEdit++;
    });

    // Updates the counter based on the current number of assigned users.
    updateAssignedCounter();

    // Generates the HTML for the list of assigned contacts and updates the user interface.
    generateAssignedContactsHTML(i)
}




/**
 * Updates the counter for the number of assigned contacts and updates the display on the user interface.
 * 
 * @param {number} [addition=0] - The incremental value to increase or decrease the counter.
 *                                 Positive values increase the counter, negative values decrease it.
 *                                 If no value is provided, the counter remains unchanged.
 */
function updateAssignedCounter(addition = 0) {
    // Updates the counter for the number of assigned contacts based on the incremental value.
    numberAssingendUserEdit += addition;

    // Sets the default text for the case when no contacts are assigned.
    let text = `Select contacts to assign`;

    // If at least one contact is assigned, updates the text according to the number of assigned contacts.
    if (numberAssingendUserEdit > 0) {
        text = `${numberAssingendUserEdit} contact${numberAssingendUserEdit > 1 ? 's' : ''} assigned`;
    }

    // Updates the user interface with the updated text.
    document.getElementById('contactNumber').innerHTML = text;
}





/**
 * It takes the index of the task to be edited, pushes the edited task to the boardTasks array, closes
 * the edit tool, renders the todos, and saves the tasks.
 * @param i - the index of the task in the array
 */
function saveEditedTaskBoard(i) {
    pushToBoardTask(i);
    closeEditTool();
    renderTodos(boardTasks);
    saveTasks();
    initMsgBox('Task edited!');
    
}

/**
 * It takes the values from the input fields and puts them into the array.
 * @param i - the index of the task in the array
 */
function pushToBoardTask(i) {
    boardTasks[i].title = document.getElementById('titleEditBoard').value;
    boardTasks[i].description = document.getElementById('descriptionEditBoard').value;
    boardTasks[i].category = document.getElementById('categoryName').innerHTML;
    boardTasks[i].categoryColor = document.getElementById('categoryColor').style.backgroundColor;
    boardTasks[i].dueDate = document.getElementById('EditDate').value
    boardTasks[i].prio = currentPrio.replace('Board', '');
}

