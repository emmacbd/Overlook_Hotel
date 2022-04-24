//need book room method, which would first call method that finds available rooms?

//need methods to find available rooms/determine unavailable

//filter room by type method


class Hotel {
  constructor(hotelRooms, hotelBookings, hotelCustomers) {
    this.rooms = hotelRooms;
    this.bookings = hotelBookings;
    this.customers = hotelCustomers;
    this.unavailableRooms = [];
    this.availableRooms;
  }

  getUnavailableRooms(chosenDate) {
    return this.unavailableRooms = this.bookings.filter(booking => {
      return chosenDate === booking.date
  });
}

  getAvailableRooms(chosenDate) {
    this.getUnavailableRooms(chosenDate)
    let unavailRoomNums = this.unavailableRooms.map(booking => booking.roomNumber)
    let freeRooms = this.rooms.reduce((acc, room) => {
      if(!unavailRoomNums.includes(room.number)){
      acc.push(room)
    }
      return acc
    },[])
    this.availableRooms = freeRooms
  }

  filterRoomsByType(roomChoice){
    return this.availableRooms.filter(room => {
      return roomChoice === room.roomType
    });
  }
}


export default Hotel;
