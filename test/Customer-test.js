import { expect } from 'chai';
import Customer from '../src/classes/Customer'
import Booking from '../src/classes/Booking'
import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'
const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");

describe('Customer', () => {
  let customer1, customer2, customer3, booking1, booking2, booking3;

  beforeEach(() => {
    customer1 = new Customer(sampleCustomers[0]);
    customer2 = new Customer(sampleCustomers[1]);
    customer3 = new Customer(sampleCustomers[2]);
    booking1 = new Booking(sampleBookings[0]);
    booking2 = new Booking(sampleBookings[1]);
    booking3 = new Booking(sampleBookings[2]);
  });

  it('Should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('Should have an id', () => {
    expect(customer1.id).to.equal(1);
  });

  it('Should have a name', () => {
    expect(customer1.name).to.equal('Leatha Ullrich');
  });

  it('Should start with an empty array of booking', () => {
    expect(customer1.bookings).to.have.a.lengthOf(0);
  });

  it('Should start with 0 as total spent on bookings', () => {
    expect(customer1.totalSpent).to.equal(0);
  });

  it('Should have a method to check if customer has any bookings', () => {
    customer1.getBookings(sampleBookings);

    expect(customer1.bookings).to.deep.equal([{
      id: "5fwrgu4i7k55hl6t8",
      userID: 1,
      date: "2022/02/05",
      roomNumber: 12
    }]);
  });

  it('Should be able to check if customer has no bookings', () => {
    let sadCustomer = customer2.getBookings(sampleBookings);

    expect(sadCustomer).to.equal('You currently have no bookings. If you need to make a reservation, please visit our home page.')
  });

  it('Should have a method to determine how much a customer has spent on bookings', () => {
    let cust3Total = customer3.calculateTotalSpent(sampleBookings, sampleRooms);

    expect(cust3Total).to.equal(470.92);
  });

  it('Should be able to calculate other customers total spent on bookings', () => {
     let cust1Total = customer1.calculateTotalSpent(sampleBookings, sampleRooms);

     expect(cust1Total).to.equal(172.09);
  });

  it('Should have method to determine customer\'s previous bookings', () => {
    // customer3.getBookings(sampleBookings)
    customer3.getPastBookings(currentDate, sampleBookings);

    expect(customer3.pastBookings).to.have.lengthOf(1);
    expect(customer3.pastBookings[0].roomNumber).to.deep.equal(23);
  });

  it('Should have a method to determine customer\'s upcoming bookings', () => {
    // customer3.getBookings(sampleBookings);
    customer3.getUpcomingBookings(currentDate, sampleBookings);

    expect(customer3.upcomingBookings).to.have.lengthOf(1);
    expect(customer3.upcomingBookings[0].roomNumber).to.deep.equal(15);
  });
});
