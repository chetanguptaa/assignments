let time = 0;

const counter = () => {
  console.log(time++);
};

setInterval(counter, 1000);
