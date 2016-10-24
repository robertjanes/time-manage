'use strict';

class TimeManage {
  constructor(debug) {
    this.date = Date.now();
    this.intervals = [];
    this.events = [];
    this.pastEvents = [];
    this.debug = debug;
  }

  getEventId(date) {
    return date.getTime().toString() + Date.now().toString() + this.events.length.toString();
  }

  getIntervalId() {
    return Date.now().toString() + this.intervals.length.toString();
  }

  isEventPast(id) {
    for (let e = 0; e < this.pastEvents.length; e += 1) {
      if (this.pastEvents[e].id == id) return true;
    }
    return false;
  }

  setEvent(date, callback) {
    let newEvent = {id: this.getEventId(date), date, callback};
    this.events.push(newEvent);
    if (this.debug) this.log('Event [' + newEvent.id + '] set for ' + newEvent.date);
    return newEvent.id;
  }

  deleteEvent(id) {
    for (let e = 0; e < this.events.length; e += 1) {
      if (id === this.events[e].id) {
        this.events.splice(e, 1);
        if (this.debug) this.log('Event [' + id + '] deleted');
      }
    }
  }

  callSetEvents() {
    for (let e = this.events.length - 1; e >= 0; e -= 1) {
      if (this.date > this.events[e].date.getTime()) {
        this.events[e].callback(this.time);
        this.pastEvents.push(this.events[e]);
        this.events.splice(e, 1);
      }
    }
  }

  update() {
    this.date = Date.now();
    this.callIntervals(this.date);
    this.callSetEvents();
    let nextInterval = this.calcDrift();
    if (this.debug) this.log('Next interval: ' + (nextInterval / 1000) + 's');
    setTimeout(this.update.bind(this), nextInterval);
  }

  calcDrift() {
    let driftDate = new Date();
    let drift = 90000 - driftDate.getSeconds() * 1000 + driftDate.getMilliseconds();
    if (this.debug) this.log('INTERVAL at ' + driftDate + "\n\x20\x20\x20\x20" + 'Timeout drifted by ' + (60000 - drift) + 'ms');
    return drift;
  }

  getTime() {
    return this.date;
  }

  setInterval(callback) {
    let intervalEvent = {id: this.getIntervalId(), callback}
    this.intervals.push(intervalEvent);
    if (this.debug) this.log('Interval event [' + intervalEvent.id + '] created');
    return intervalEvent.id;
  }

  deleteInterval(id) {
    for (let c = 0; c < this.intervals.length; c += 1) {
      if (id === this.intervals[c].id) {
        this.intervals.splice(c, 1);
        if (this.debug) this.log('Interval event [' + id + '] deleted');
      }
    }
  }

  callIntervals(time) {
    for (let c = 0; c < this.intervals.length; c += 1) {
      this.intervals[c].callback(time);
      if (this.debug) this.log('Callback for Interval event [' + this.intervals[c].id + '] called');
    }
  }

  log(message) {
    console.log('TM: ' + message);
  }

  init() {
    this.update();
  }
}

module.exports = TimeManage;
