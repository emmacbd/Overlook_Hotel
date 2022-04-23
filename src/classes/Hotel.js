//rooms, bookings, available rooms, unavailable rooms, type of room

//need book room method, which would first call method that finds available rooms?

//need methods to find available rooms/determine unavailable

//filter room by type method

//book room method - need date input

//

//
class Hotel {
  constructor(hotelRooms, hotelBookings) {
    this.rooms = hotelRooms;
    this.bookings = hotelBookings;
    this.availableRooms;
  }

//SOMEHOW GET AN IF STATEMENT IF NO RESULTS FOUND ??? WTF
getBooking(bookingInfo){
   return this.rooms.find(room =>
    room.number === bookingInfo.roomNumber)
}

///check bookings array and compare with input date of user wtf how ok
//dayjs
//

//filter room by type method dear god - param of roomtype, filter rooms array by roomtype but also will need check available rooms before returned filtered room by type FUCCK


}


export default Hotel
