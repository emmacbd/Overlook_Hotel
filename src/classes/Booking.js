//will have rooms and bookings, available and unavailable rooms?
//pass booking object into constructor
//id
//userID
//date
//roomNumber

class Booking {
  constructor(booking){
    this.id = booking.id;
    this.userID = booking.userID;
    this.date = booking.date;
    this.roomNumber = booking.roomNumber;
  }
}

export default Booking;
