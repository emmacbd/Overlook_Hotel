const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
import {customer, hotel, showBookingPage, refreshBookings} from './scripts.js'
import domUpdates from "./domUpdates.js"

function fetchData(dataLocation) {
  return fetch(`http://localhost:3001/api/v1/${dataLocation}`)
 .then(response => {
   if (!response.ok) {
   throw Error(response.statusText)
  }
  return response.json()
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
      console.log("sad response", response);
      throw Error()
    } else {
      console.log("happy response", response);
      return response.json()
    }
  })
  .then(response => {
    refreshBookings()
  })
  .catch(error => {
    domUpdates.sadReservation();
  })

}

///refresh booking - fetch data,


const displayErrorMessage = (err) => {
  const errorBox = document.querySelector(".error-box");
  errorBox.innerHTML = `<h3>Oops, something went wrong. Please check your internet connection or refresh the page.</h3>`
}

export {
  fetchData,
  postBooking,
  displayErrorMessage,
}
