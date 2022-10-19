let user = getSessionUser();
let contacts = user.contacts;

let orderedContacts = new Array([],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]);

/**
 * Check if contacts is defined, if so continue with orderContacts()
 * 
 */
function checkContacts() {
    if(contacts){
        orderContacts();
    }
}

/**
 * Sorts contacts by alphabetical order into orderedContacts and then executes renderCpntacts()
 * 
 */
function orderContacts() {
    for(let i = 0; i < contacts.length; i++) {
        contacts[i].id = `${i}`;
        let letter = contacts[i].name.toLowerCase().toString();
        letter = letter.replace(/\u00e4/g, "ae").replace(/\u00fc/g, "ue").replace(/\u00f6/g, "oe");
        letter = letter.slice(0,1);
        letter = letter.charCodeAt(0) - 97;
        orderedContacts[letter].push(contacts[i]);
    }
    renderContactbook();
}

/**
 * Using orderedContacts, contact elements are rendered on the HTML Page
 * 
 */
function renderContactbook() {
    document.getElementById('contact-book').innerHTML = '';
    for(let i = 0; i < orderedContacts.length; i++) {
        if(orderedContacts[i].length > 0) {
            document.getElementById('contact-book').innerHTML += /*html*/ `
                <div class="contactList">
                    <div class="listLetter">${String.fromCharCode(97 + i).toUpperCase()}</div>
                    <div class="listSeperator"></div>`
            for(let j = 0; j < orderedContacts[i].length; j++) {
                document.getElementById('contact-book').innerHTML += /*html*/ `
                        <div class="listContact" onclick="renderContactDetails(${i},${j})">
                            <div class="listContactInitials bgOr">VM</div>
                            <div class="listContactInfo">
                                <span class="listContactName">${orderedContacts[i][j].name}</span>
                                <span class="listContactEmail">${orderedContacts[i][j].email}</span>
                            </div>
                        </div>`;
            }
            document.getElementById('contact-book').innerHTML += /*html*/ `</div>`
        }
    }
}

/**
 * Using orderedContacts, detailed contact elements are rendered on the HTML Page
 * 
 * @param {number} firstIndex - indicates with wich letter the contact name begins (0=a...25=z; ä,ü,ö -> ae,ue,oe)
 * @param {number} secondIndex - position inside the upper letter array
 */
function renderContactDetails(firstIndex, secondIndex) {
    document.getElementById('contact-details').innerHTML = '';
    document.getElementById('contact-details').innerHTML += /*html*/ `
        <div class="contactHeader">
            <span class="listContactInitials contactScale bgLp">VM</span>
            <div class="contactInfo">
                <span class="contactName">${orderedContacts[firstIndex][secondIndex].name}</span>
                <a href="addTask.html" class="contactAddTaskBtn">
                    <img class="addTaskBtnImg" src="img/plus.svg">
                    <span class="addTaskBtnText">Add Task</span>
                </a>
            </div>
        </div>
        <div class="contactInformationHead">
            <span class="contactInformationTitle">Contact Information</span>
            <button class="editContactBtn" onclick="changeOverlayToEditContact(${firstIndex},${secondIndex})">
                <img src="img/pencil_wo_bg.svg">
                <span>Edit Contact</span>
            </button>
        </div>
        <div class="contactAdressInformations">
            <div class="contactAdressSegment">
                <span class="contactAdressTitle">Email</span>
                <a href="mailto: abc@example.com" class="contactAdressLink">${orderedContacts[firstIndex][secondIndex].email}</a>
            </div>
            <div class="contactAdressSegment">
                <span class="contactAdressTitle">Phone</span>
                <a href="tel: 0123456789" class="contactAdressLink">${orderedContacts[firstIndex][secondIndex].phone}</a>
            </div>
        </div>`;
}

/**
 * Opens the Edit/Create Overlay
 * 
 */
function openOverlay() {
    document.getElementById('page-mask').classList.remove('d-none');
    document.getElementById('contact-overlay').classList.remove('d-none');
}

/**
 * Close the Edit/Create Overlay
 * 
 */
function closeOverlay() {
    document.getElementById('page-mask').classList.add('d-none');
    document.getElementById('contact-overlay').classList.add('d-none');
}

/**
 * Change the overlay content for editing a contact
 * 
 * @param {number} firstIndex - indicates with wich letter the contact name begins (0=a...25=z; ä,ü,ö -> ae,ue,oe)
 * @param {number} secondIndex - position inside the upper letter array
 */
function changeOverlayToEditContact(firstIndex, secondIndex) {
    document.getElementById('contact-overlay').innerHTML = '';
    document.getElementById('contact-overlay').innerHTML += /*html*/ `
        <div class="overlayLeft">
            <img src="img/logo-white.svg">
            <span id="overlay-headline" class="overlayHealine">Edit contact</span>
            <div class="overlaySperator"></div>
        </div>
        <div class="overlayRight">
            <img onclick="closeOverlay()" class="overlayClose" src="img/closeCross.svg">
            <div>
                <span id="overlay-user-img" class="overlayUserImg bgLp">VM</span>
            </div>
            <form class="overlayInputForm" onsubmit="saveContact()">
                <div class="overlayInputSection">
                    <input id="input-name" placeholder="Name" type="text" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].name}" required><img src="img/user.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-email" placeholder="Email" type="email" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].email}" required><img src="img/Email.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-phone" placeholder="Phone" type="tel" class="overlayInput" value="${orderedContacts[firstIndex][secondIndex].phone}" required><img src="img/phone.svg">
                </div>
                <div class="overlayBtnSection">
                    <button id="overlay-save-btn" type="submit" class="overlayActionBtn">Save</button>
            </form>
                    <button onclick="deleteContact(${firstIndex},${secondIndex})" id="overlay-cancel-btn" class="overlayCancelBtn">
                        <span>Delete</span>
                        <img src="img/trash.png">
                    </button>
                </div>
        </div>`;
    openOverlay();
}

/**
 * Delete a Contact from the Array
 * 
 * @param {number} firstIndex - indicates with wich letter the contact name begins (0=a...25=z; ä,ü,ö -> ae,ue,oe)
 * @param {number} secondIndex - position inside the upper letter array
 */
function deleteContact(firstIndex, secondIndex) {
    let id = orderedContacts[firstIndex][secondIndex].id;
    contacts.splice(id,id);
    orderContacts();
}

/**
 * Save a Contact
 * 
 */
function saveContact() {
    console.log("Yes")
}

/**
 * Change the overlay content for creating a new contact
 * 
 */
function changeOverlayToNewContact() {
    document.getElementById('contact-overlay').innerHTML = '';
    document.getElementById('contact-overlay').innerHTML += /*html*/ `
        <div class="overlayLeft">
            <img src="img/logo-white.svg">
            <span id="overlay-headline" class="overlayHealine">Add contact</span>
            <span id="overlay-subheadline" class="overlaySubheadline">Tasks are better with a team!</span>
            <div class="overlaySperator"></div>
        </div>
        <div class="overlayRight">
            <img onclick="closeOverlay()" class="overlayClose" src="img/closeCross.svg">
            <div>
                <img id="overlay-default-user-img" class="overlayDefaultUserImg" src="img/defaultUser.svg">
            </div>
            <form class="overlayInputForm">
                <div class="overlayInputSection">
                    <input id="input-name" placeholder="Name" type="text" class="overlayInput" required><img src="img/user.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-email" placeholder="Email" type="email" class="overlayInput" required><img src="img/Email.svg">
                </div>
                <div class="overlayInputSection">
                    <input id="input-phone" placeholder="Phone" type="tel" class="overlayInput" required><img src="img/phone.svg">
                </div>
                <div class="overlayBtnSection">
                    <button id="overlay-create-btn" typ="submit" class="overlayActionBtn" onsubmit="">
                        <span>Create contact</span>
                        <img src="img/simpleCheck.svg">
                    </button> 
            </form>
                    <button onclick="closeOverlay()" id="overlay-cancel-btn" class="overlayCancelBtn">
                        <span>Cancel</span>
                        <img src="img/closeCross.svg">
                    </button>
                </div>
        </div>`;
    openOverlay();
}