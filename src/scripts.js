import './css/styles.css';

import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
// import './src/images/overlook.jpeg'

// import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'
import domUpdates from './domUpdates.js';
import { fetchData, postBooking } from './apiCalls';
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");


// An example of how you tell webpack to use an image (also need to link to it in the index.html)

//QUERY SELECTORS
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
//GLOBAL VARIABLES
let hotel, customer, roomData, bookingData, customersData, selectedDate;

//FUNCTIONS


//FETCH, ASSIGN, POST
const fetchAllData = () => {
  Promise.all([fetchData("rooms"), fetchData("bookings"), fetchData("customers")])
    .then(data => {
      assignData(data);
      displayDashboard();
    })
    .catch(err => console.log(err));
}

const assignData = (response) => {
    roomData = response[0].rooms;
    bookingData = response[1].bookings;
    customersData = response[2].customers;
    hotel = new Hotel(roomData, bookingData, customersData);
}

const getCustomerInfo = (currentDate, hotel) => {
  customer = new Customer(customersData[25]);

  customer.getBookings(bookingData);

  customerName.innerText = `${customer.name}!`;
  custSpent.innerHTML = `$${customer.calculateTotalSpent(bookingData, roomData)}`;
  displayPastBookings();
  displayFutureBookings();
}


const grabBooking = (event, roomData) => {
  if (event.target.className === "book-room-button"){
    let chosenRoom = roomData.find(room => {
      return room.number === parseInt(event.target.id)
    })
    generateBooking(chosenRoom)
  }
}

const generateBooking = (chosenRoom) => {
  let bookedDate = selectedDate.split('-').join('/');
  const bookingInfo = {
    userID: customer.id,
    date: bookedDate,
    roomNumber: chosenRoom.number,
  }

  postBooking(bookingInfo)
}

//CUSTOMER DASHBOARD FUNCTIONS
const displayDashboard = () => {
  domUpdates.show(customerDashboard)
  domUpdates.hide(viewBookings)
  domUpdates.show(bookingSectionButton)
  domUpdates.hide(createBooking)
  domUpdates.hide(searchResultsContainer)
  getCustomerInfo(currentDate, hotel);

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
    <article class="past-room-box">
      <img class="past-room-img" src="" alt="${pastRoom.roomType}">
      <div class="past-booking-info">
        <p id="past-room-type">Room Type: ${pastRoom.roomType}</p>
        <p id="past-room-date">Booking Date: ${booking.date}</p>
        <p id="past-room-cost">Cost Per Night: ${pastRoom.costPerNight}</p>
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
      <article class="future-room-box">
        <img class="future-room-img" src="" alt="${futureRoom.roomType}">
        <div class="future-booking-info">
          <p id="future-room-type">Room Type: ${futureRoom.roomType}</p>
          <p id="future-room-date">Booking Date: ${booking.date}</p>
          <p id="future-room-cost">Cost Per Night: ${futureRoom.costPerNight}</p>
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
}

const showFilterTypes = () => {
  domUpdates.toggle(filtersBox)
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
  searchResultsContainer.innerHTML = "";

  domUpdates.hide(customerDashboard)
  domUpdates.show(viewBookings)
  domUpdates.hide(foundResults)
  domUpdates.hide(noResults)
  domUpdates.hide(bookingSectionButton)
  domUpdates.show(createBooking)
  domUpdates.show(searchResultsContainer)

  selectedDate = datePicked.value.split('-').join('/')

  hotel.getAvailableRooms(selectedDate)
  if(!hotel.getAvailableRooms(datePicked).length){
    domUpdates.show(noResults)
  } else {
    domUpdates.show(foundResults)
  }

  let availableByDateRooms = hotel.getAvailableRooms(selectedDate)
      availableByDateRooms.forEach(room => {

        searchResultsContainer.innerHTML += `
        <article class="available-room-box">
          <div class="booking-info">${room.roomType}</div>
          <img class="avail-room-img" src="" alt="${room.roomType}">
          <div class="booking-info">
            <h3 id="room-type">Number of Beds: ${room.numBeds} Bed Size: ${room.bedSize}</h3>
            <h3 id="room-cost">Cost Per Night: ${room.costPerNight}</h3>
            </div>
          <button class="book-room-button" id=${room.number}>BOOK THIS ROOM</button>
        </article>
      `
  });

}

const grabFilteredByType = () => {
  let grabRadio = document.querySelector('input[name="room-type-options"]:checked');
  console.log(!grabRadio);
  if(!grabRadio) {
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
  searchResultsContainer.innerHTML = "";
  filteredRooms.forEach(room => {
    searchResultsContainer.innerHTML += `
    <article class="available-room-box">
      <div class="booking-info">${room.roomType}</div>
      <img class="avail-room-img" src="" alt="${room.roomType}">
      <div class="booking-info">
        <h3 id="room-type">Number of Beds: ${room.numBeds} Bed Size: ${room.bedSize}</h3>
        <h3 id="room-cost">Cost Per Night: ${room.costPerNight}</h3>
        </div>
      <button class="book-room-button" id=${room.number}>BOOK THIS ROOM</button>
    </article>
  `
});


}
//maybe have a get filtered by type and then displayby type???

//EVENT LISTENERS

window.addEventListener('load', fetchAllData);

bookingSectionButton.addEventListener('click', showBookingPage);

// postBookingButton.addEventListener('click', createBooking);
searchResultsContainer.addEventListener('click', (event) => {
  grabBooking(event, roomData)
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

export {customer, hotel}
