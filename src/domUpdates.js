const dayjs = require('dayjs');
let currentDate = dayjs().format("YYYY/MM/DD");


//QUERY SELECTORS

let domUpdates = {

//HIDE AND SHOW
hide(element) {
  element.classList.add("hidden");
},

show(element) {
  element.classList.remove("hidden");
},

toggle(element) {
  element.classList.toggle("hidden");

}
//CUSTOMER DASHBOARD




//BOOKING PAGE



//BOOKING OPTIONS

}; //END OF DOMUPATES CURLY

export default domUpdates;
