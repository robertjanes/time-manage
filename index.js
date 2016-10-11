'use strict';

class TimeManage {
  constructor(int, debug) {
    this.date;
    this.interval = int;
    this.callbacks = [];
    this.events = [];
    this.debug = debug;
  }

  getEventIdTrial(date) {
    return date.getTime().toString() + Date.now().toString() + this.events.length.toString();
  }

  getAttachIdTrial() {
    return Date.now().toString() + this.callbacks.length.toString();
  }

  setEvent(date, callback) {
    let newEvent = {id: this.getEventIdTrial(date), date, callback};
    this.events.push(newEvent);
    if (this.debug) console.log('Event with id ' + newEvent.id + ' set for ' + newEvent.date);
    return newEvent.id;
  }

  deleteEvent(id) {
    for (let e = 0; e < this.events.length; e += 1) {
      if (id === this.events[e].id) {
        this.events.splice(e, 1);
        if (this.debug) console.log('Event with id ' + id + ' deleted');
      }
    }
  }

  callSetEvents() {
    for (let e = this.events.length - 1; e >= 0; e -= 1) {
      if (this.date > this.events[e].date.getTime()) {
        this.events[e].callback(this.time);
        this.events.splice(e, 1);
      }
    }
    if (this.debug) console.log(this.events);
  }

  update() {
    this.date = Date.now();
    this.callAttached(this.date);
    this.callSetEvents();
    let nextInterval = this.calcDrift() * 1000;
    if (this.debug) console.log('Next interval: ' + (nextInterval / 1000) + 's');
    setTimeout(this.update.bind(this), nextInterval);
  }

  calcDrift() {
    let driftDate = new Date();
    let drift = 60 - driftDate.getSeconds() + 30;
    if (this.debug) console.log(driftDate + "\nTimeout drifted by " + (driftDate.getSeconds() - 30) + 's');
    return drift;
  }

  getTime() {
    return this.date;
  }

  attach(callback) {
    let attachEvent = {id: this.getAttachIdTrial(), callback}
    this.callbacks.push(attachEvent);
    if (this.debug) console.log('Attach Event with id ' + attachEvent.id + ' created');
    return attachEvent.id;
  }

  detach(id) {
    for (let c = 0; c < this.callbacks.length; c += 1) {
      if (id === this.callbacks[c].id) {
        this.callbacks.splice(c, 1);
        if (this.debug) console.log('Attach Event with id ' + id + ' deleted');
      }
    }
  }

  callAttached(time) {
    for (let c = 0; c < this.callbacks.length; c += 1) {
      this.callbacks[c].callback(time);
      if (this.debug) console.log('Callback for attach Event with id ' + this.callbacks[c].id + ' called');
    }
  }

  init() {
    this.update();
  }
}

module.exports = TimeManage;
