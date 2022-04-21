import { expect } from 'chai';
import Room from '../src/classes/Room'
import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'

describe('Room', () => {
  let room1, room2;

  beforeEach( () => {
    room1 = new Room(sampleRooms[0]);
    room2 = new Room(sampleRooms[1]);
  });

  it('Should have an number', () => {
    expect(room1.number).to.equal(2)
    expect(room2.number).to.equal(7)

  });

  it('Should have an id', () => {
    expect(room1.roomType).to.equal("suite")
    expect(room2.roomType).to.equal("single room")

  });

  it('Should have an id', () => {
    expect(room1.bidet).to.equal(false)
    expect(room2.bidet).to.equal(false)

  });

  it('Should have an id', () => {
    expect(room1.bedSize).to.equal("full")
    expect(room2.bedSize).to.equal("queen")

  });

  it('Should have an id', () => {
    expect(room1.numBeds).to.equal(2)
    expect(room2.numBeds).to.equal(2)

  });

  it('Should have an id', () => {
    expect(room1.costPerNight).to.equal(477.38)
    expect(room2.costPerNight).to.equal(231.46)
  });

});
