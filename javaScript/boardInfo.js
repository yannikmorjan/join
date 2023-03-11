/**
 * It opens a modal with information about a task.
 * </code>
 * @param i - the index of the task in the array of tasks
 */
function openTaskInfo(i) {
    let infoContainer = document.getElementById('taskInfoContainer');
    infoContainer.classList.remove('d-none');
    infoContainer.innerHTML = generateTaskInfoHTML(i);
    document.getElementById('backgroundCloser').classList.remove('d-none');
    renderAssingedUserInfo(i);
    renderSubTasksInfo(i);
    showSelectedBtn(i);
    emptySearch();
    openMobileInfo();
}

/**
 * It closes the task info container and the background closer.
 */
function closeMoreInfo() {
    let infoContainer = document.getElementById('taskInfoContainer');
    infoContainer.classList.add('d-none');
    document.getElementById('backgroundCloser').classList.add('d-none');
    filterTasks();
    closeMobileInfo();
}

/**
 * It saves the tasks, closes the more info window, and renders the todos.
 */
function closeAndSaveInfo() {
    saveTasks();
    closeMoreInfo();
    renderTodos(boardTasks);
}

/**
 * It renders the assigned users to the task.
 * @param i - the index of the task in the boardTasks array
 */
function renderAssingedUserInfo(i) {
    document.getElementById('assignedUserInfo').innerHTML = '';

    if (!boardTasks[i].assignedTo.length) {
        document.getElementById('assignedUserInfo').innerHTML = 'No contacts assigned.';
    } else {
        for (let y = 0; y < boardTasks[i].assignedTo.length; y++) {

            document.getElementById('assignedUserInfo').innerHTML += /*html*/`
            <div class="assignedUserInfoParent">
                <div class="assignedUserImg" style="background-color: ${boardTasks[i].assignedTo[y].color}" data-tooltip="${boardTasks[i].assignedTo[y].email}" data-flow="right">
                  ${getInitials(boardTasks[i].assignedTo[y].name)}
                </div>
                <p>${boardTasks[i].assignedTo[y].name}</p>
        </div>
            
            `
        }
    }

    
}

/**
 * It renders the subtasks of a task in the task info modal.
 * @param i - the index of the task in the array
 */
function renderSubTasksInfo(i) {

    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {

        if (!boardTasks[i].subtasks[y].status) {
            document.getElementById('subTaskContainer').innerHTML += /*html*/`
            <div class="subtaskInfo">
                <input class="subtaskCheckbox" onclick="subtaskCheckedInfo(${i})" id="subtaskCheckboxInfo${y}" type="checkbox">
                <p>${boardTasks[i].subtasks[y].title}</p>
            </div>
            `
        } else {
            document.getElementById('subTaskContainer').innerHTML += /*html*/`
        
            <div class="subtaskInfo">
                <input onclick="subtaskCheckedInfo(${i})" id="subtaskCheckboxInfo${y}" checked type="checkbox">
                <p>${boardTasks[i].subtasks[y].title}</p>
            </div>
            `
        }
    }
}

/**
 * It's a function that takes in a number, and then loops through an array of objects, and then loops
 * through an array of objects inside of the first array of objects, and then checks if a checkbox is
 * checked, and then changes the status of the object inside of the array inside of the array of
 * objects.
 * @param i - the index of the task in the boardTasks array
 */
function subtaskCheckedInfo(i) {

    for (let y = 0; y < boardTasks[i].subtasks.length; y++) {

        let checked = document.getElementById('subtaskCheckboxInfo' + y).checked

        if (checked) {
            boardTasks[i].subtasks[y].status = true;
        } else {
            boardTasks[i].subtasks[y].status = false;
        }
    }
}

/**
 * It changes the background color of the button and the image filter of the image inside the button.
 * @param i - the index of the task in the array
 */
function showSelectedBtn(i) {



    if (boardTasks[i].prio == 'urgent') {
        document.getElementById("urgentBoardInfo").style.backgroundColor = "#FF3D00";
        document.getElementById('urgentBoardInfo-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';

    } else if (boardTasks[i].prio == 'medium') {
        document.getElementById("mediumBoardInfo").style.backgroundColor = "#FFA800";
        document.getElementById('mediumBoardInfo-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';

    } else if (boardTasks[i].prio == 'low') {
        document.getElementById("lowBoardInfo").style.backgroundColor = "#8BE644";
        document.getElementById('lowBoardInfo-img').style.filter = 'invert(100%) sepia(5%) saturate(0%) hue-rotate(352deg) brightness(1000%) contrast(105%)';

    }

}