function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

const init = document.querySelector(".init");
const time = document.querySelector(".time");
const date = document.querySelector(".date");
const bomb = document.querySelector(".bomb");
const bip = document.querySelector(".bip");
const potato = document.querySelector(".potato");
const detonation = document.querySelector(".detonation");

var now = new Date();
var future = new Date();

init.addEventListener("click", start);

function start() {
  date.style.display = "block";
  potato.style.display = "block";
  potato.src = "assets/potato.png";
  const seconds = Math.abs(time.value);
  console.log(seconds);

  future.setSeconds(future.getSeconds() + seconds);

  changeTime();

  var interval = setInterval(changeTime, 1000);
}

function changeTime() {
  subTime = Math.abs(future - now);
  if (subTime !== 0) {
    bip.play();
    animate(subTime / 4);
    let bombTime = now.getSeconds() - 1;
    potato.style.animation = `fading ${bombTime / 2} infinite`;
    now.setSeconds(now.getSeconds() + 1);
    remainTime = millisToMinutesAndSeconds(Math.abs(future - now));

    date.innerHTML = remainTime;

    if (subTime <= 5000) {
      potato.src = "assets/sad_potato.png";
    }

    if (subTime === 16000) {
      bip.pause();
      bomb.play();
    }
  } else {
    detonation.style.display = "block";
  }
}

function animate(duration) {
  potato.animate(
    [
      // keyframes
      { filter: "saturate(1)" },
      { filter: "saturate(2)" },
    ],
    {
      // timing options
      duration,
      iterations: Infinity,
    }
  );
}
