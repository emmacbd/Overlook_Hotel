import { expect } from 'chai';
import Hotel from '../src/classes/Hotel'
import {sampleCustomers, sampleRooms, sampleBookings} from '../test/sample-data.js'

describe('Room', () => {
  let room1, room2;

  beforeEach( () => {
    room1 = new Room(sampleRooms[0]);
    room2 = new Room(sampleRooms[1]);
  });

});
