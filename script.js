const concertDate = new Date("2026-03-07T19:00:00");

const quotes = [
  "今天也是為你發光的一天 ✨",
  "很快就可以見面了 🫶",
  "這次一定要對到眼！！",
  "準備好應援了嗎？"
];

function updateCountdown() {
  const now = new Date();
  const diff = concertDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "今天就是那天！！！🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerHTML =
    `${days}天 ${hours}時 ${minutes}分 ${seconds}秒`;
}

function randomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  document.getElementById("quote").innerText = quotes[randomIndex];
}

function copyLink() {
  navigator.clipboard.writeText(window.location.href);
  alert("已複製網址！");
}

setInterval(updateCountdown, 1000);
updateCountdown();
randomQuote();

