import './css/styles.css';

import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
// import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'
// import domUpdates from './domUpdates.js';
import { fetchData } from './apiCalls';
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");


// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './src/images/overlook.jpeg'

//QUERY SELECTORS
const bookingButton = document.querySelector(".book-button");
const viewBookings = document.querySelector(".customer-bookings");
const customerDashboard = document.querySelector(".customer-dashboard");
const searchBox = document.querySelector(".search-results-box")
const foundResults = document.querySelector(".results-found");
const noResults = document.querySelector(".no-results");
const pastBookingContainer = document.querySelector(".past-bookings");
const pastBookingSection = document.querySelector(".past-bookings-box");
const futureBookingContainer = document.querySelector(".future-bookings");
const futureBookingSection = document.querySelector(".future-bookings-box");
const customerName = document.querySelector(".customer-name");
const custSpent = document.getElementById("totalSpent");


//GLOBAL VARIABLES
let hotel, customer, roomData, bookingData, customersData;

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
        <p id="past-room-type">${pastRoom.roomType}</p>
        <p id="past-room-date">${booking.date}</p>
        <p id="past-room-cost">${pastRoom.costPerNight}</p>
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
          <p id="future-room-type">${futureRoom.roomType}</p>
          <p id="future-room-date">${booking.date}</p>
          <p id="future-room-cost">${futureRoom.costPerNight}</p>
        </div>
      </article>
      `
  });
}


//EVENT LISTENERS

window.addEventListener('load', fetchAllData);
//need to get a user
//what about with login fuck idk
//get users bookings
//display previous and upcoming bookings
