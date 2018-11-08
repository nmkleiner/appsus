"use strict";
export default {
  now,
  stopCounting
};
var interval;
var now = Date.now();

interval = setInterval(() => {
    now += 1000;
    //   console.log(this.now)
}, 1000);

function stopCounting() {
    clearInterval(interval);
}
