import './css/styles.css';
import './images/room.png'
import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import domUpdates from './domUpdates.js';
import { fetchData, postBooking, displayErrorMessage } from './apiCalls';
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");

//QUERY SELECTORS
const bookingMessage = document.querySelector(".booking-msg");
const bookingSectionButton = document.querySelector(".book-button");
const viewBookings = document.querySelector(".customer-bookings");
const customerDashboard = document.querySelector(".customer-dashboard");
const createBooking = document.querySelector(".create-booking-section");
const bookButton = document.querySelector('.book-room-button');
const searchResultsContainer = document.querySelector(".search-results");
const showFilterButton = document.querySelector(".filter-types-button");
const filtersBox = document.querySelector(".room-type-filter");
const foundResults = document.querySelector(".results-found");
const noResults = document.querySelector(".no-results");
const postBookingButton = document.querySelector(".book-room-button");
const pastBookingContainer = document.querySelector(".past-bookings");
const pastBookingSection = document.querySelector(".past-bookings-box");
const futureBookingContainer = document.querySelector(".future-bookings");
const futureBookingSection = document.querySelector(".future-bookings-box");
const customerName = document.querySelector(".customer-name");
const custSpent = document.getElementById("totalSpent");
const dateButton = document.querySelector(".date-button");
const clearDateButton = document.querySelector(".clear-date-search");
const clearRoomButton = document.querySelector(".clear-room-search");
const datePicked = document.getElementById("dateSelection");
const invalidDateMsg = document.querySelector(".invalid-date-msg");
const invalidTypeMsg = document.querySelector(".invalid-type-msg");
const filterByTypeButton = document.querySelector(".filter-button");
const loginPage = document.querySelector(".login-page")
const userNameInput = document.querySelector(".username-input");
const passwordInput = document.querySelector(".password-input");
const loginButton = document.getElementById("submitLogin")
const invalidUser = document.querySelector(".invalid-name-msg");
const invalidPass = document.querySelector(".invalid-pass-msg");
const errorBox = document.querySelector(".error-box")

//GLOBAL VARIABLES
let hotel, customer, roomData, bookingData, customersData, selectedDate;

//FUNCTIONS

//FETCH, ASSIGN, POST
const fetchAllData = (userNameID) => {
  Promise.all([fetchData("rooms"), fetchData("bookings"), fetchData("customers")])
    .then(data => {
      assignData(data);
      assignCustomer(data, userNameID);
      displayDashboard();
    })
    .catch(err => displayErrorMessage());
}

const assignData = (response) => {
  roomData = response[0].rooms;
  bookingData = response[1].bookings;
  customersData = response[2].customers;
  hotel = new Hotel(roomData, bookingData, customersData);
}

const assignCustomer = (data, userNameID) => {
  customer = new Customer(customersData[`${userNameID}`-1])
  getCustomerInfo(customer);

}

const getCustomerInfo = (customer) => {
  customer.getBookings(bookingData);
  customerName.innerText = `${customer.name}!`;
  custSpent.innerHTML = `$${customer.calculateTotalSpent(bookingData, roomData)}`;
}

const grabBooking = (event, roomData, customer) => {
  if (event.target.className === "book-room-button"){
    let chosenRoom = roomData.find(room => {
      return room.number === parseInt(event.target.id)
    })
    generateBooking(chosenRoom, customer)
  }
}

const generateBooking = (chosenRoom, customer) => {
  let bookedDate = selectedDate.split('-').join('/');
  const bookingInfo = {
    userID: customer.id,
    date: bookedDate,
    roomNumber: chosenRoom.number,
  }
  postBooking(bookingInfo)
}

const refreshBookings = () => {
  Promise.all([
      fetchData('rooms'),
      fetchData('bookings'),
      fetchData('customers')
    ]).then(data => {
      assignData(data)
      getCustomerInfo(customer)
      domUpdates.happyReservation();
      domUpdates.show(bookingSectionButton)
    })
  }


//LOGIN PAGE

const showLoginPage = () => {
  domUpdates.hide(customerDashboard)
  domUpdates.hide(viewBookings)
  domUpdates.hide(bookingSectionButton)
  domUpdates.hide(createBooking)
  domUpdates.hide(searchResultsContainer)
}

const confirmLogin = (event) => {
  event.preventDefault()
  let userName = userNameInput.value
  let password = passwordInput.value
    if(userName.startsWith('customer') && password === 'overlook2021'){
      let userNameID = parseInt(userName.split('customer')[1])
      domUpdates.hide(loginPage)
      fetchAllData(userNameID)
      return userNameID
  } else {
    domUpdates.show(invalidUser)
  }
}


//CUSTOMER DASHBOARD FUNCTIONS
const displayDashboard = () => {
  domUpdates.show(customerDashboard)
  domUpdates.hide(viewBookings)
  domUpdates.show(bookingSectionButton)
  domUpdates.hide(createBooking)
  domUpdates.hide(searchResultsContainer)
  displayPastBookings();
  displayFutureBookings();
}

const displayPastBookings = () => {
  pastBookingSection.innerHTML = "";
  let rooms = hotel.rooms;
  let customerPastBookings = customer.getPastBookings(currentDate)
    customerPastBookings.forEach(booking => {
    let pastRoom = rooms.find(room => {
      return room.number === booking.roomNumber
    })

  pastBookingSection.innerHTML += `
    <article class="past-room-box" tabindex="0">
      <img class="past-room-img" src="./images/room.png" alt="${pastRoom.roomType}">
      <div class="past-booking-info">
        <p>Room Type : ${pastRoom.roomType}</p>
        <p>Booking Date : ${booking.date}</p>
        <p>Bidet : ${pastRoom.bidet}</p>
        <p>Cost Per Night : $${pastRoom.costPerNight}</p>
      </div>
    </article>
  `
  });
}

const displayFutureBookings = () => {
  futureBookingSection.innerHTML = "";
  let rooms = hotel.rooms;
  let customerFutureBookings = customer.getUpcomingBookings(currentDate)

  customerFutureBookings.forEach(booking => {
      let futureRoom = rooms.find(room =>
        room.number === booking.roomNumber)

      futureBookingSection.innerHTML += `
      <article class="future-room-box" tabindex="0">
        <img class="future-room-img" src="./images/room.png"  alt="${futureRoom.roomType}">
        <div class="future-booking-info">
          <p>Room Type : ${futureRoom.roomType}</p>
          <p>Booking Date : ${booking.date}</p>
          <p>Bidet : ${futureRoom.bidet}</p>
          <p>Cost Per Night : $${futureRoom.costPerNight}</p>
        </div>
      </article>
      `
  });
}

//BOOKING PAGE

const showBookingPage = () => {
  domUpdates.hide(customerDashboard)
  domUpdates.show(viewBookings)
  domUpdates.hide(bookingSectionButton)
  domUpdates.show(createBooking)
  domUpdates.hide(invalidDateMsg)
  domUpdates.hide(invalidTypeMsg)
  domUpdates.hide(foundResults)
  domUpdates.hide(noResults)
  domUpdates.hide(searchResultsContainer)
  domUpdates.hide(errorBox)
  datePicked.value = "";
}

const showFilterTypes = () => {
  domUpdates.toggle(filtersBox)
  domUpdates.hide(invalidTypeMsg)

}

const confirmDate = (event) => {
  event.preventDefault();
  if(datePicked.value === ""){
    domUpdates.show(invalidDateMsg)
  } else {
    domUpdates.hide(invalidDateMsg)
    showDateSearch(datePicked)
  }
}

const showDateSearch = (datePicked) => {

  domUpdates.hide(customerDashboard)
  domUpdates.show(viewBookings)
  domUpdates.hide(foundResults)
  domUpdates.hide(noResults)
  domUpdates.hide(bookingSectionButton)
  domUpdates.show(createBooking)
  domUpdates.show(searchResultsContainer)

  selectedDate = datePicked.value.split('-').join('/')
  searchResultsContainer.innerHTML = "";

  let availableByDateRooms = hotel.getAvailableRooms(selectedDate)
    if(!availableByDateRooms.length){
      domUpdates.show(noResults)
    } else {
      domUpdates.show(foundResults)
    }
      availableByDateRooms.forEach(room => {
        searchResultsContainer.innerHTML += `
        <article class="available-room-box">
          <img class="avail-room-img" src="./images/room.png"  alt="${room.roomType}">
          <div class="booking-info">
            <p>${room.roomType}</p>
            <p id="room-type">Number of Beds: ${room.numBeds}</p> <p>${room.bedSize} Size Bed </p>
            <p>Bidet : ${room.bidet}</p>
            <p id="room-cost">Cost Per Night: ${room.costPerNight}</p>
            </div>
          <button class="book-room-button" id=${room.number}>BOOK THIS ROOM</button>
        </article>
      `
  });

}

const grabFilteredByType = () => {
  confirmDate(event);
  let grabRadio = document.querySelector('input[name="room-type-options"]:checked');
  if(!grabRadio) {
    domUpdates.show(invalidDateMsg)
    domUpdates.show(invalidTypeMsg);
  } else {
    domUpdates.hide(invalidTypeMsg)

  switch(grabRadio.id) {
    case 'residential':
      return displayByType('residential suite');
      break;
    case 'junior':
      domUpdates.show(foundResults)
      return displayByType('junior suite');
      break;
    case 'suite':
      domUpdates.show(foundResults)
      return displayByType('suite');
      break;
    case 'single':
      domUpdates.show(foundResults)
      return displayByType('single room');
      break;
    case 'any':
      domUpdates.show(foundResults)
    return showDateSearch(datePicked);
      break;
  }
 }
}

const displayByType = (roomType) => {
  let filteredRooms = hotel.filterRoomsByType(roomType)
  if(!filteredRooms.length){
    domUpdates.show(noResults)
    domUpdates.hide(foundResults)
  } else {
    domUpdates.show(foundResults)
    domUpdates.hide(noResults)
  }
  searchResultsContainer.innerHTML = "";
  filteredRooms.forEach(room => {
    searchResultsContainer.innerHTML += `
    <article class="available-room-box">
      <img class="avail-room-img" src="./images/room.png"  alt="${room.roomType}">
      <div class="booking-info">
        <p>${room.roomType}</p>
        <p id="room-type">Number of Beds: ${room.numBeds}</p> <p>${room.bedSize} Size Bed </p>
        <p>Bidet : ${room.bidet}</p>
        <p id="room-cost">Cost Per Night: ${room.costPerNight}</p>
        </div>
      <button class="book-room-button" id=${room.number}>BOOK THIS ROOM</button>
    </article>
  `
});
}

//EVENT LISTENERS

window.addEventListener('load', showLoginPage);

loginButton.addEventListener('click', (event) => {
  confirmLogin(event)
});

bookingSectionButton.addEventListener('click', showBookingPage);

searchResultsContainer.addEventListener('click', (event) => {
  grabBooking(event, roomData, customer)
});

viewBookings.addEventListener('click', displayDashboard);

dateButton.addEventListener('click', (event) => {
  event.preventDefault();
  confirmDate(event);
});

filterByTypeButton.addEventListener('click', (event) => {
  event.preventDefault();
  grabFilteredByType();
});

showFilterButton.addEventListener('click', showFilterTypes);

export {
  customer,
  hotel,
  foundResults,
  noResults,
  searchResultsContainer,
  futureBookingSection,
  pastBookingSection,
  showBookingPage,
  displayDashboard,
  createBooking,
  refreshBookings,

}
