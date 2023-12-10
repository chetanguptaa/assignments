const getTime = () => {
  const time = new Date();
  let hour = time.getHours();
  const min = time.getMinutes();
  const sec = time.getSeconds();
  let isPastNoon = false;
  if (hour > 12) {
    hour -= 12;
    isPastNoon = true;
  }
  console.log(
    `${hour < 10 ? "0" : ""}${hour}:${min < 10 ? "0" : ""}${min}:${
      sec < 10 ? "0" : ""
    }${sec}${isPastNoon ? " P.M" : " A.M"}`
  );
};

setInterval(getTime, 1000);
