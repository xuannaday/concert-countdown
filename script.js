// ===== 演唱會倒數 =====
const concertDate = new Date("2026-03-01T19:30:00"); // 改成你的演唱會日期

function updateCountdown() {
  const now = new Date();
  const diff = concertDate - now;

  if (diff <= 0) {
    document.getElementById("countdown").innerHTML = "今天就是演唱會！！！🎉";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  document.getElementById("countdown").innerHTML =
    `${days}天 ${hours}時 ${minutes}分 ${seconds}秒`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ===== 勾選保存狀態 =====
const checkboxes = document.querySelectorAll("#songList input[type=checkbox]");

function updateProgress() {
  const done = Array.from(checkboxes).filter(cb => cb.checked).length;
  const total = checkboxes.length;
  document.getElementById("progress").innerText = `已練 ${done}/${total} 首`;
}

checkboxes.forEach(cb => {
  // 讀取 localStorage
  const saved = localStorage.getItem(cb.id);
  if (saved === "true") cb.checked = true;

  // 監聽勾選
  cb.addEventListener("change", () => {
    localStorage.setItem(cb.id, cb.checked);
    updateProgress();
  });
});

updateProgress();
