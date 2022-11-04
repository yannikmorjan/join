setURL('https://gruppe-303.developerakademie.net/smallest_backend_ever');

//**signUp Functions **//
 /* A function that is used to include the header.html file into the index.html file. */
 async function addUser() {
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({ name: name.value, email: email.value, password: password.value, contacts: new Array() });
    await backend.setItem('users', JSON.stringify(users));
    // Weiterleitung zu login Seite + Nachricht anzeigen: "Successful registration"
    window.location.href = 'index.html?msg=Successful registration';
    showSuccessfulMsg();
}

function showSuccessfulMsg() {
    document.getElementById('messageBox').classList.remove('display-none');
    document.getElementById('messageBox').classList.add('growIn');
    setTimeout(() => {
        document.getElementById('messageBox').classList.remove('growIn');
    }, 200);
}

/* A comment. */
/* A variable that is used to store the element with the id "msgBox" in it. */

// const urlParams = new URLSearchParams(window.location.search);
// const msg = urlParams.get('msg');
// if(msg) {
//    messageBox.innerHTML = msg
// }

/**
 * /* A function that is used to include the header.html file into the index.html file. */

function goToSummary() {
    window.location.href = 'summary.html';
}

function goToBoard() {
    window.location.href = 'board.html';

}

function goToAddTask() {
    window.location.href = 'addTask.html';
}

function goToContacts() {
    window.location.href = 'contacts.html';
}

function goToSignUp() {
    window.location.href = 'signUp.html';
}

function goToLogIn() {
    window.location.href = 'index.html';
}

/**
 * Checks from the sessionStorage if the user is logged in. If not redirect to index.html
 * 
 */
function checkLoginStatus() {
    if (sessionStorage.getItem('sessionUser') == null){
        window.location.href = 'index.html';
    }
}

/**
/* A function that is used to open the logout container. */


function openLogOutContainer() {
    document.getElementById('logOutContainer').classList.remove('d-none');
    document.getElementById('logOutContainer').classList.add('growIn');

    setTimeout(() => {
        document.getElementById('logOutContainer').classList.remove('growIn');
    }, 200);

    document.getElementById('openLogOutContainer').setAttribute('onclick', `closeLogOutContainer()`);
}
/* A function that is used to close the logout container. */
/**
 * 
 */
function closeLogOutContainer() {
    document.getElementById('logOutContainer').classList.add('d-none');
    document.getElementById('logOutContainer').classList.add('growOut');

    setTimeout(() => {
        document.getElementById('logOutContainer').classList.add('d-none');
        document.getElementById('logOutContainer').classList.remove('growOut');
    }, 200);
    document.getElementById('openLogOutContainer').setAttribute('onclick', `openLogOutContainer()`);
}



// Message Box
function openMsgBox() {
    document.getElementById('msgBox').classList.add('msgBox-in-out');
    document.getElementById('msgBox').classList.remove('d-none');
}

function closeMsgBox() {

}

async function init() {
    await downloadFromServer();
    users = JSON.parse(await backend.getItem('users')) || [];
}

/**
 * Get you the data of the actual session user from the sessionStorage in parsed form.
 * 
 * @returns session user object
 */
function getSessionUser() {
    let user = sessionStorage.getItem('sessionUser');
    user = JSON.parse(user);
    return user; 
}

/**
 * Deletes the actual session user from the sessionStorage
 * 
 */
function deleteSessionUser() {
    sessionStorage.removeItem('sessionUser');
}

// async function signUp() {
//     users.push('');
//     await backend.setItem('users', JSON.stringify(users));
// }



//**Include Function */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}

async function headerInclude() {

}