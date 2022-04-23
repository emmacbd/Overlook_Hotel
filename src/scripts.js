import './css/styles.css';

import Hotel from '../src/classes/Hotel';
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'

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

//GLOBAL VARIABLES
let hotel = new Hotel(sampleRooms, sampleBookings);
let customer = new Customer(sampleCustomers[2])

const getCustomer = (currentDate, sampleBookings) => {
  customer.getBookings(sampleBookings)
  let customerFutureBookings = customer.getUpcomingBookings(currentDate, sampleBookings)
  return customerPastBookings, customerFutureBookings
}
//FUNCTIONS

const hide = (element) => {
  element.classList.add("hidden");
}

const show = (element) => {
  element.classList.remove("hidden");
}

// const getCustomer = (sampleCustomers) => {
//   user = new Customer(sampleCustomers[0])
//   this.displayDashboard()
// }

const displayDashboard = () => {
  //totalspent innerHTML
  //username innertext
  this.getCustomer(currentDate, sampleBookings);
  this.displayPastBookings(currentDate, sampleBookings, sampleRooms);
  this.displayFutureBookings(currentDate, sampleBookings, sampleRooms);
}

const displayPastBookings = (sampleBookings, sampleRooms) => {
  let customerPastBookings = customer.getPastBookings(currentDate, sampleBookings)

  console.log(customerPastBookings)
  pastBookingSection.innerHTML = "";

  customerPastBookings.forEach(booking => {
    let pastRoom = sampleRooms.find(room =>
      room.number === booking.roomNumber)


  pastBookingSection.innerHTML += `
    <article class="past-room-box">
      <img class="past-room-img" src="" alt="${pastRoom.roomType}"
      <div class="past-booking-info">
        <p id="past-room-type"${pastRoom.roomType}</p>
        <p id="past-room-date"${pastRoom.date}</p>
        <p id="past-room-cost"${pastRoom.costPerNight}</p>
      </div>
    </article>
  `
  });
}

const displayFutureBookings = (customerFutureBookings) => {
  futureBookingSection.innerHTML = "";

  customerFutureBookings.forEach(booking => {
      let futureRoom = sampleRooms.find(room =>
        room.number === booking.roomNumber)



      futureBookingSection.innerHTML += `
      <article class="future-room-box">
        <img class="future-room-img" src="" alt="${futureRoom.roomType}"
        <div class="future-booking-info">
          <p id="future-room-type"${futureRoom.roomType}</p>
          <p id="future-room-date"${futureRoom.date}</p>
          <p id="future-room-cost"${futureRoom.costPerNight}</p>
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
