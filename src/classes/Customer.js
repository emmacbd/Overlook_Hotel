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
