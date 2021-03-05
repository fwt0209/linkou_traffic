function startTime() {
  let clock = document.querySelector(".clock");
  let date = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });
  clock.textContent = date;
  setTimeout(startTime, 1000);
}
