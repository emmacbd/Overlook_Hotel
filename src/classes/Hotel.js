//need book room method, which would first call method that finds available rooms?

//need methods to find available rooms/determine unavailable

//filter room by type method

//book room method - need date input - IN SCRIPTS???
//or not bc I want to update the data model
//oh boy,

class Hotel {
  constructor(hotelRooms, hotelBookings, hotelCustomers) {
    this.rooms = hotelRooms;
    this.bookings = hotelBookings;
    this.customers = hotelCustomers;
    this.availableRooms;
  }

//SOMEHOW GET AN IF STATEMENT IF NO RESULTS FOUND ??? WTF
getBooking(hotelBookings){
   return this.rooms.filter(room =>
    room.number === hotelBookings.roomNumber)
}



//filter room by type method - param of roomtype, filter rooms array by roomtype but also will need check available rooms before returned filtered room by type FUCCK


}


export default Hotel;
