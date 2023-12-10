/*
    Write a function that returns a promise that resolves after n seconds have passed, where n is passed as an argument to the function.
*/

const wait = (n) => {
  let p = new Promise((resolve) => {
    setTimeout(resolve, n * 1000);
  });
  return p;
};

const main = async () => {
  wait(10);
  console.log("Hi after 10 secs");
};

main();

wait(10).then(() => {
  console.log("Hi after 10 secs");
});

module.exports = wait;
