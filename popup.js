const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const statusText = document.getElementById("status");

startButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "start" }, (response) => {
    statusText.textContent = "Status: Running";
    console.log(response.status);
  });
});

stopButton.addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "stop" }, (response) => {
    statusText.textContent = "Status: Stopped";
    console.log(response.status);
  });
});
