import { expect } from 'chai';
import Hotel from '../src/classes/Hotel'
import Room from '../src/classes/Room'
import Booking from '../src/classes/Booking'
import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");

describe('Hotel', () => {
  let room1, room2, booking1, hotel;

  beforeEach( () => {
    room1 = new Room(sampleRooms[0]);
    room2 = new Room(sampleRooms[1]);
    booking1 = new Booking(sampleBookings[0]);
    hotel = new Hotel(sampleRooms, sampleBookings, sampleCustomers);
  });


it('Should have a list of rooms', () => {
  expect(hotel.rooms).to.equal(sampleRooms);
});

it('Should have a list of bookings', () => {
  expect(hotel.bookings).to.equal(sampleBookings)
});

it('Should have a method to find unavailable rooms', () => {
   hotel.getUnavailableRooms("2022/04/23");
   expect(hotel.unavailableRooms[0]).to.deep.equal({
    id: '5fwrgu4i7k55hl6sz',
    userID: 9,
    date: '2022/04/23',
    roomNumber: 15
  });
});

it('Should have a method to find available rooms', () => {
    hotel.getAvailableRooms("2022/04/23");
    expect(hotel.availableRooms).to.have.a.lengthOf(4)
  });

it('Should have a method to sort available rooms by type', () => {
    hotel.getAvailableRooms("2022/04/23")
    let filteredRooms = hotel.filterRoomsByType("single room")
    expect(filteredRooms).to.have.a.lengthOf(2);
  });


});
