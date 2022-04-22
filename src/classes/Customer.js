//has id, name, bookings, total spent
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");
//format date from sample bookings, may have to split/join when user enters idk at this point

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.pastBookings = [];
    this.upcomingBookings = [];
    this.totalSpent = 0;
  }

  getBookings(bookingData) {
    let foundBookings = bookingData.forEach(booking => {
      if(this.id === booking.userID){
        this.bookings.push(booking)
      }
    });
    if(!this.bookings.length){
    return 'You currently have no bookings. If you need to make a reservation, please visit our home page.'
  }
}

getPastBookings(currentDate, bookingData) {
  this.bookings.forEach(booking => {
    if(booking.date < currentDate){
      this.pastBookings.push(booking)
    }
  })
    return this.pastBookings
  //what iterator to use
  //want to check each booking date in bookings array, if date of booking is before or less than current date, then push into pastbookings

}

getUpcomingBookings(currentDate, bookingData) {
  this.bookings.forEach(booking => {
    if(booking.date > currentDate || booking.date === currentDate){
      this.upcomingBookings.push(booking)
    }
  })
    return this.upcomingBookings
}
// Any room bookings I have made (past or present/upcoming)
//need method to see past bookings,



//need method to see upcoming bookings,



  calculateTotalSpent(bookingData, roomData) {
    this.getBookings(bookingData)
    const totalAmount = this.bookings.reduce((acc, booking) => {
      roomData.forEach(room => {
        if(booking.roomNumber === room.number)
          acc += room.costPerNight
        })
        return acc
    },0)
      this.totalSpent = totalAmount
      return totalAmount
  }


};
export default Customer;
