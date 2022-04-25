const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
import {customer, hotel, showBookingPage} from './scripts.js'
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
  return fetch("http://localhost:3001/api/v1/bookings", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(bookingInfo)
  })
  .then(response => {
    if (response.ok) {
      console.log("bookinginfo out", response);
      fetchData("bookings")
      customer.bookings.push(bookingInfo);
      domUpdates.happyReservation();
      return response.json()
    } else if (!response.ok){
      throw Error(`Error`)
    }
   })
  .catch(err => domUpdates.sadReservation());
}





const displayErrorMessage = (err) => {
  const errorBox = document.querySelector(".error-box");
  errorBox.innerHTML = `<h3>Oops, something went wrong. Please check your internet connection or refresh the page.</h3>`
}

export {
  fetchData,
  postBooking
}
