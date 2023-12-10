/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Return a promise chain which return the time in milliseconds it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function delay(n) {
  return new Promise((resolve) => {
    setTimeout(resolve, n * 1000);
  });
}

function wait1(t) {
  return delay(1);
}

function waitTwoSecond() {}

function wait3(t) {
  return delay(3);
}

async function calculateTime(t1, t2, t3) {
  const t1 = new Date();
  await waitOneSecond();
  await waitTwoSecond();
  await waitThreeSecond();
  console.log(new Date() - t1);
}

calculateTime();

module.exports = calculateTime;
