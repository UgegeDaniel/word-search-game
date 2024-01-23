function countdownTimer(seconds, callback) {
  let currentSeconds = seconds;
  const countdownInterval = setInterval(function () {
    document.querySelector(
      "#timer"
    ).innerText = `Game ends in: ${currentSeconds} seconds`;
    if (currentSeconds === 0) {
      clearInterval(countdownInterval);
      if (typeof callback === "function") {
        callback();
      }
    } else {
      currentSeconds--;
    }
  }, 1000);
}
