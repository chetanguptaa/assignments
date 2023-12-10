/*
 * Write 3 different functions that return promises that resolve after 1, 2, and 3 seconds respectively.
 * Write a function that sequentially calls all 3 of these functions in order.
 * Print out the time it takes to complete the entire operation.
 * Compare it with the results from 3-promise-all.js
 */

function delay(n) {
  return new Promise((resolve) => {
    setTimeout(resolve, n * 1000);
  });
}

function waitOneSecond() {
  return delay(1);
}

function waitTwoSecond() {
  return delay(2);
}

function waitThreeSecond() {
  return delay(3);
}

async function calculateTime() {
  const t1 = new Date();
  await waitOneSecond();
  await waitTwoSecond();
  await waitThreeSecond();
  console.log(new Date() - t1);
}

calculateTime();
