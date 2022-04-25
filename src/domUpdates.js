const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
import {
  searchResultsContainer, futureBookingSection,
  pastBookingSection, showBookingPage, displayDashboard, createBooking, foundResults, noResults
} from './scripts.js'

//QUERY SELECTORS

let domUpdates = {

//HIDE AND SHOW
hide(element) {
  element.classList.add("hidden");
},

show(element) {
  element.classList.remove("hidden");
},

toggle(element) {
  element.classList.toggle("hidden");
},
//CUSTOMER DASHBOARD


//ERROR HANDLINGS
happyReservation() {
  this.hide(createBooking);
  searchResultsContainer.innerHTML = "";
  this.hide(foundResults);
  searchResultsContainer.innerHTML += `<h2 class="good-book">Thank you for booking a room with Overlook, we look forward to seeing you soon!</h2>`
  // futureBookingSection.innerHTML = "";
  // pastBookingSection.innerHTML = "";
  // setTimeout(() => {
  //   displayDashboard()
  // },1700)

  // displayDashboard();
},

sadReservation() {
  this.hide(createBooking);
  searchResultsContainer.innerHTML = "";
  this.hide(foundResults);
  searchResultsContainer.innerHTML += `<h2 class="bad-book">Oh no, your booking was not sucessful. Please try again.</h2>`
  setTimeout(() => {
    displayDashboard()
  },1700)
  // futureBookingSection.innerHTML = "";
  // pastBookingSection.innerHTML = "";
  // showBookingPage();
},


//BOOKING PAGE



//BOOKING OPTIONS

}; //END OF DOMUPATES CURLY

export default domUpdates;
