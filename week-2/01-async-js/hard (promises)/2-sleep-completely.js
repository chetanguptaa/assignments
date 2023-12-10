/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 */

function sleep(milliseconds) {
  let start = new Date().getTime();
  let end = start + milliseconds;
  for (let iter = start; iter <= end; iter = new Date().getTime()) {}
  return new Promise(function (resolve, reject) {
    resolve();
  });
}

module.exports = sleep;
