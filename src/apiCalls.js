const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
import {customer, hotel} from './scripts.js'

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
    body: JSON.stringify(bookingInfo),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      fetchData("bookings")
      customer.bookings.push(bookingInfo)
      customer.getBookings(hotel.bookings)
      return response.json()
    } else if (!response.ok){
      throw Error(response.statusText)
    }
   })
  .catch(err => console.log(err));
}


const displayErrorMessage = (err) => {
  const errorBox = document.querySelector(".error-box");
  errorBox.innerHTML = `<h3>Oops, something went wrong. Please check your internet connection or refresh the page.</h3>`
}

export {
  fetchData,
  postBooking
}
