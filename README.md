# Time Manage

Manage time dependant processes over long periods.

The timer updates on a minute-by-minute basis and accounts for inaccuracies in the vanilla Javascript `SetTimeout` function.

## Install

```
npm install time-manage --save
```

## Use

```js
const timeManage = require('time-manage');
const time = new timeManage();
```

## Intervals

Intervals are called every minute.

### Set an interval

```js
let myInterval = time.setInterval(function() {
  console.log('I run every minute');
});
```

### Delete an interval

```js
time.deleteInterval(myInterval);
```

## Events

Events are called at their `Date`.

### Set an Event

```js
let myDate = new Date(2017, 0, 10, 15, 0, 0);
let myEvent = time.setEvent(myDate, function() {
  console.log('The time is 15:00, 10 January 2017');
});
```

### Delete an event

```js
time.deleteEvent(myEvent);
```
