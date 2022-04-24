import './css/styles.css';

import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
// import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'
import domUpdates from './domUpdates.js';
import { fetchData } from './apiCalls';
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './src/images/overlook.jpeg'

//QUERY SELECTORS
const bookingButton = document.querySelector(".book-button");
const viewBookings = document.querySelector(".customer-bookings");
const customerDashboard = document.querySelector(".customer-dashboard");
const createBooking = document.querySelector(".create-booking-section");
const searchResultsContainer = document.querySelector(".search-results");
const searchResultsSection = document.querySelector(".search-results-box");
const showFilterButton = document.querySelector(".filter-types-button");
const filtersBox = document.querySelector(".room-type-filter");
const foundResults = document.querySelector(".results-found");
const noResults = document.querySelector(".no-results");
const pastBookingContainer = document.querySelector(".past-bookings");
const pastBookingSection = document.querySelector(".past-bookings-box");
const futureBookingContainer = document.querySelector(".future-bookings");
const futureBookingSection = document.querySelector(".future-bookings-box");
const customerName = document.querySelector(".customer-name");
const custSpent = document.getElementById("totalSpent");
const dateButton = document.querySelector(".date-button");
const datePicked = document.getElementById("dateSelection");

//GLOBAL VARIABLES
let hotel, customer, roomData, bookingData, customersData, selectedDate;

//FUNCTIONS

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

const displayDashboard = () => {
  domUpdates.show(customerDashboard)
  domUpdates.hide(viewBookings)
  domUpdates.show(bookingButton)
  domUpdates.hide(createBooking)
  getCustomerInfo(currentDate, hotel);
}



const displayPastBookings = () => {
  let rooms = roomData;
  let customerPastBookings = customer.getPastBookings(currentDate)
  pastBookingSection.innerHTML = "";
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
  let rooms = hotel.rooms;
  let customerFutureBookings = customer.getUpcomingBookings(currentDate)
  futureBookingSection.innerHTML = "";

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

const showBookingPage = () => {
  domUpdates.hide(customerDashboard)
  domUpdates.show(viewBookings)
  domUpdates.hide(bookingButton)
  domUpdates.show(createBooking)
}

const showFilterTypes = () => {
  domUpdates.toggle(filtersBox)
}

const showSearchResults = (datePicked) => {
  domUpdates.hide(customerDashboard)
  domUpdates.show(viewBookings)
  domUpdates.hide(bookingButton)
  domUpdates.show(createBooking)
  domUpdates.show(searchResultsContainer)

  selectedDate = datePicked.value.split('-').join('/')

  hotel.getAvailableRooms(selectedDate)

  let availableByDateRooms = hotel.getAvailableRooms(selectedDate)
  searchResultsSection.innerHTML = "";

  availableByDateRooms.forEach(room => {

      searchResultsSection.innerHTML += `
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

const showFilteredByType = () => {
  let grabRadio = document.querySelector('input[name="room-type-options"]:checked');
  switch(grabRadio.id) {
    case 'residential':
      domUpdates.show(foundResults)
      return hotel.filterRoomsByType('residential suite');
      break;
    case 'junior':
      domUpdates.show(foundResults)
      return hotel.filterRoomsByType('junior suite');
      break;
    case 'suite':
      domUpdates.show(foundResults)
      return hotel.filterRoomsByType('suite');
      break;
    case 'single':
      domUpdates.show(foundResults)
      return hotel.filterRoomsByType('single room');
      break;
    case 'any':
      domUpdates.show(foundResults)
      return hotel.getAvailableRooms(datePicked);
      break;
  }
    if(!hotel.getAvailableRooms(datePicked).length){
      domUpdates.show(noResults)
  }
}

//EVENT LISTENERS

window.addEventListener('load', fetchAllData);

bookingButton.addEventListener('click', showBookingPage);

viewBookings.addEventListener('click', displayDashboard);

dateButton.addEventListener('click', (event) => {
  event.preventDefault();
  showSearchResults(datePicked);
});

showFilterButton.addEventListener('click', showFilterTypes)
//need to get a user
//what about with login fuck idk
//get users bookings
//display previous and upcoming bookings
