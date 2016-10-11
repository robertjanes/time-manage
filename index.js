'use strict';

class TimeManager {
  constructor(int, debug) {
    this.time;
    this.interval = int;
    this.callbacks = [];
    this.debug = debug;
  }

  update() {
    this.time = Date.now();
    this.callAttached(this.time);
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

  get() {
    return this.time;
  }

  attach(func) {
    this.callbacks.push(func);
    return this.callbacks.length - 1;
  }

  detach(id) {
    this.callbacks[id] = false;
  }

  callAttached(time) {
    for (let c = 0; c < this.callbacks.length; c += 1) {
      if (this.callbacks[c]) this.callbacks[c](time);
    }
  }

  init() {
    this.update();
  }
}

module.exports = TimeManager;
