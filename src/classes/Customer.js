const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");

class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.bookings = [];
    this.totalSpent = 0;
  }

  getBookings(hotelBookings) {
    this.bookings = hotelBookings.filter(booking =>
        this.id === booking.userID)
    if(!this.bookings.length){
      return 'You currently have no bookings. If you need to make a reservation, please visit our home page.'
  }
}

  getPastBookings(currentDate) {
    return this.bookings.filter(booking =>
    booking.date < currentDate)
}

  getUpcomingBookings(currentDate) {
    return this.bookings.filter(booking =>
      booking.date > currentDate
      || booking.date === currentDate)
}

  calculateTotalSpent(hotelBookings, hotelRooms) {
    this.getBookings(hotelBookings)
    const totalAmount = this.bookings.reduce((acc, booking) => {
      hotelRooms.forEach(room => {
        if(booking.roomNumber === room.number)
          acc += room.costPerNight
        })
        return acc
    },0)
      this.totalSpent = Math.round(totalAmount * 100) / 100;
      return this.totalSpent
  }


};

export default Customer;
