import './css/styles.css';

import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'
import domUpdates from './domUpdates.js';
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");

console.log("sample rooms", sampleRooms);
console.log("sample people", sampleCustomers);
console.log("sample booking", sampleBookings);
// An example of how you tell webpack to use a CSS (SCSS) file

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './src/images/overlook.jpeg'

//QUERY SELECTORS
const bookingButton = document.querySelector(".book-button");
const viewBookings = document.querySelector(".customer-bookings");
const customerDashboard = document.querySelector(".customer-dashboard");
const searchBox = document.querySelector(".search-results-box")
const foundResults = document.querySelector(".results-found");
const noResults = document.querySelector(".no-results");
const pastBookingSection = document.querySelector(".past-bookings-box");
const futureBookingSection = document.querySelector(".future-bookings-box");
const customerName = document.querySelector(".customer-name");
const custSpent = document.getElementById("totalSpent");


//GLOBAL VARIABLES
let hotel = new Hotel(sampleRooms, sampleBookings);
let customer = new Customer(sampleCustomers[2]);

//FUNCTIONS



// const getCustomer = (sampleCustomers) => {
//   user = new Customer(sampleCustomers[0])
//   this.displayDashboard()
// }
const getCustomerInfo = (currentDate, sampleBookings, customer) => {
  customer.getBookings(sampleBookings);

  customerName.innerText = `${customer.name}!`;
  custSpent.innerHTML = `$${customer.calculateTotalSpent(sampleBookings, sampleRooms)}`;
  displayPastBookings();
  displayFutureBookings();
}

const displayDashboard = () => {

  getCustomerInfo(currentDate, sampleBookings, customer);

}



const displayPastBookings = () => {
  let rooms = hotel.rooms;
  let customerPastBookings = customer.getPastBookings(currentDate)
  pastBookingSection.innerHTML = "";
  customerPastBookings.forEach(booking => {
    let pastRoom = rooms.find(room => {
      return room.number === booking.roomNumber
    })

  pastBookingSection.innerHTML += `
    <article class="past-room-box">
      <img class="past-room-img" src="" alt="${pastRoom.roomType}"
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
        <img class="future-room-img" src="" alt="${futureRoom.roomType}"
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

window.addEventListener('load', displayDashboard);
//need to get a user
//what about with login fuck idk
//get users bookings
//display previous and upcoming bookings
