'use strict';
const timeManager = require(__dirname + '/../index.js');
const tm = new timeManager(60000, true);

tm.setInterval(function() {
  console.log('Attached function working.');
});

let thisEvent = tm.setEvent(new Date(2016, 9, 12, 0, 27, 0), function() {
  console.log('SetEvent function working.');
});
//tm.deleteEvent(thisEvent);

tm.init();
