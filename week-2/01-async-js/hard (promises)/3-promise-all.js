/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
function wait1(t) {
  return delay(1000);
}

function wait2(t) {
  return delay(2000);
}

function wait3(t) {
  return delay(3000);
}

async function calculateTime(t1, t2, t3) {
  const startTime = new Date();
  await Promise.all([waitOneSecond(), waitTwoSecond(), waitThreeSecond()]);
  const endTime = new Date();
  const elapsedTime = endTime - startTime;
  console.log(`All promises resolved in ${elapsedTime} milliseconds`);
}

calculateTime();

module.exports = calculateTime;
