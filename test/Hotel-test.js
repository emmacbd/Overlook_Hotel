import { expect } from 'chai';
import Hotel from '../src/classes/Hotel'
import Room from '../src/classes/Room'
import Booking from '../src/classes/Booking'
import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'

describe('Room', () => {
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

it('Should have a method to retrieve booking information', () => {
  let foundBooking = hotel.getBooking(booking1);

  expect(foundBooking.number).to.equal(15);
  expect(foundBooking.bidet).to.equal(false);
});

 // it('Should have a method to find available rooms', () => {
 //   let availableRooms =
 // });

});
