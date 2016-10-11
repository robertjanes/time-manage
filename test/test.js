'use strict';
const timeManager = require(__dirname + '/../index.js');
const tm = new timeManager(60000, true);

tm.attach(function() {
  console.log('Attached function working.');
});

let thisEvent = tm.setEvent(new Date(2016, 9, 12, 0, 27, 0), function() {
  console.log('SetEvent function working.');
});
let thisEvent2 = tm.setEvent(new Date(2016, 9, 11, 23, 42, 0), function() {
  console.log('SetEvent function working.');
});
let thisEvent3 = tm.setEvent(new Date(2016, 9, 11, 23, 42, 0), function() {
  console.log('SetEvent function working.');
});
//tm.deleteEvent(thisEvent);
tm.deleteEvent(thisEvent2);
tm.deleteEvent(thisEvent3);

tm.init();
