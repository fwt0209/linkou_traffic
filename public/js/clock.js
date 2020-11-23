let clock = document.querySelector(".clock");
let date = new Date().toLocaleString("zh-TW", { timeZone: "Asia/Taipei" });
setInterval(() => {
  document.querySelector(
    ".clock"
  ).textContent = new Date().toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
  });
}, 1000);
