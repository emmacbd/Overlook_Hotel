import { expect } from 'chai';
import Booking from '../src/classes/Booking'
import Customer from '../src/classes/Customer';
import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");


describe('Booking', () => {
  let customer1, customer2, customer3, booking1, booking2, booking3;

  beforeEach(() => {
    booking1 = new Booking(sampleBookings[0]);
    booking2 = new Booking(sampleBookings[1]);
  });

  it('Should have an id', () => {

    expect(booking1.id).to.equal("5fwrgu4i7k55hl6sz")
  });

  it('Should have a userID', () => {
    expect(booking1.userID).to.equal(9)
  });

  it('Should have a date', () => {
    expect(booking1.date).to.equal("2022/04/23")
  });

  it('Should have a room number', () => {
    expect(booking1.roomNumber).to.equal(15)
  });

});
