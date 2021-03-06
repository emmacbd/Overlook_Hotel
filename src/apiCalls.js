const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
import {customer, hotel, showBookingPage, refreshBookings, bookingSectionButton} from './scripts.js'
import domUpdates from "./domUpdates.js"


//FETCH REQUEST
function fetchData(dataLocation) {
  return fetch(`http://localhost:3001/api/v1/${dataLocation}`)
 .then(response => {
   if (!response.ok) {
   throw Error(response.statusText)
 } else {
   return response.json()
 }
  })
 .catch(err => displayErrorMessage(err));
}

// POST REQUEST
function postBooking(bookingInfo) {
    fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingInfo)
  })
  .then(response => {
    if (!response.ok) {
      throw Error()
    } else {
      return response.json()
    }
  })
  .then(response => {
    refreshBookings()
  })
  .catch(error => {
    domUpdates.sadReservation();
    domUpdates.show(bookingSectionButton)
  })

}


const displayErrorMessage = (err) => {
  const errorBox = document.querySelector(".error-box");
  errorBox.innerHTML = `<h3>Oops, something went wrong. Please check your internet connection or refresh the page.</h3>`
}

export {
  fetchData,
  postBooking,
  displayErrorMessage,
}
