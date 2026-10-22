let reservation = {
    startDate: null,
    endDate: null,
    guestsCount: 0,
    roomType: null,
    name: null,
    phone: null,
    email: null
};

// Show the requested form
function changeContent(className) {
    document.querySelectorAll('.custom-form').forEach(div => {
        div.classList.add('hidden');
    });

    const target = document.querySelector(`.${className}`);

    if (target != null) {
        target.classList.remove('hidden');
    }
}

// Start a new reservation
document.querySelector('#new-reservation').addEventListener('click', cleanData);

function cleanData(e) {
    e.preventDefault();
    changeContent('search-form-content');
}

// Return to personal data
document.querySelector('#confirm-back-btn').addEventListener('click', getBackToPersonalData);

function getBackToPersonalData(e) {
    e.preventDefault();
    changeContent('guest-details-form-content');
}

// Confirm reservation
document.querySelector('#confirm-reservation').addEventListener('click', showThanksPage);

function showThanksPage(e) {
    e.preventDefault();
    changeContent('thank-you-content');
}

// Return to room search
document.querySelector('#guest-details-back-btn').addEventListener('click', fillRoomForm);

function fillRoomForm(e) {
    e.preventDefault();
    changeContent('search-result-form-content');
}

// Save guest details and show confirmation
document.querySelector('#guest-details-next-btn').addEventListener('click', getPersonalData);

function getPersonalData(e) {
    e.preventDefault();

    const data = e.target.parentElement.parentElement;

    const name = data.querySelector('#name').value.trim();
    const phone = data.querySelector('#phone-number').value.trim();
    const email = data.querySelector('#email').value.trim();

    if (name !== '' && phone !== '' && email !== '') {
        reservation.name = name;
        reservation.phone = phone;
        reservation.email = email;

        changeContent('confirm-reservation-content');
        fillConfirmReservationData(reservation);
    }
}

// Display reservation details
function fillConfirmReservationData(customReservation) {
    document.querySelector('.confirm-reservation #guest-name').textContent =
        `Name: ${customReservation.name}`;

    document.querySelector('.confirm-reservation #guest-phone').textContent =
        `Phone Number: ${customReservation.phone}`;

    document.querySelector('.confirm-reservation #guest-email').textContent =
        `Email: ${customReservation.email}`;

    document.querySelector('.confirm-reservation #guest-room-type').textContent =
        `Room Type: ${customReservation.roomType}`;

    document.querySelector('.confirm-reservation #guest-data-in').textContent =
        `Date-in: ${customReservation.startDate}`;

    document.querySelector('.confirm-reservation #guest-data-out').textContent =
        `Date-out: ${customReservation.endDate}`;
}

// Return to search form and restore previous values
document.querySelector('#search-back-btn').addEventListener('click', fillSearchForm);

function fillSearchForm(e) {
    e.preventDefault();

    changeContent('search-form-content');

    document.querySelector('#check-in').value = reservation.startDate ?? '';
    document.querySelector('#check-out').value = reservation.endDate ?? '';
    document.querySelector('#people').value = reservation.guestsCount || '';
}

// Select a room type
document.querySelectorAll('.room-type').forEach(room => {
    room.addEventListener('click', selectRoomType);
});

function selectRoomType(e) {
    e.preventDefault();

    const room = e.target.closest('.room-type');

    if (room == null) {
        return;
    }

    document.querySelectorAll('.room-type').forEach(item => {
        item.classList.remove('selected-room');
    });

    room.classList.add('selected-room');
}

// Continue with the selected room
document.querySelector('#search-next-btn').addEventListener('click', findRoom);

function findRoom(e) {
    e.preventDefault();

    const selectedRoom = document.querySelector('.selected-room h4');

    if (selectedRoom == null) {
        return;
    }

    reservation.roomType = selectedRoom.textContent;
    changeContent('guest-details-form-content');
}

// Search for available rooms
document.querySelector('#search-form-button').addEventListener('click', searchFormData);

function searchFormData(e) {
    e.preventDefault();

    const checkIn = document.querySelector('#check-in').value;
    const checkOut = document.querySelector('#check-out').value;
    const people = document.querySelector('#people').value;

    if (
        checkIn !== '' &&
        checkOut !== '' &&
        people !== '' &&
        new Date(checkIn) < new Date(checkOut)
    ) {
        reservation.startDate = checkIn;
        reservation.endDate = checkOut;
        reservation.guestsCount = people;

        changeContent('search-result-form-content');
    }
}
