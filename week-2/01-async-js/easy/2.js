function startCounter(count) {
  console.log(count);
  setTimeout(() => {
    startCounter(count + 1);
  }, 1000);
}
startCounter(0);
