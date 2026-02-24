// 漢堡選單控制
const hamburger = document.getElementById("hamburger");
const sideNav = document.getElementById("side-nav");

hamburger.addEventListener("click", () => {
  if (sideNav.style.width === "260px") {
    sideNav.style.width = "0";
    document.body.style.overflow = "auto";   // 解鎖主頁
  } else {
    sideNav.style.width = "260px";
    document.body.style.overflow = "hidden"; // 鎖住主頁
  }
});

// 分頁切換
const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".side-nav li");

function showPage(pageId) {
  pages.forEach(p => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");
  sideNav.style.width = "0"; // 點選後收回選單
  document.body.style.overflow = "auto";
}

// 首頁預設
showPage("home");

// 點選選單切換
navItems.forEach(item => {
  item.addEventListener("click", () => {
    const page = item.getAttribute("data-song");
    showPage(page);
  });
});

// =========================
// Setlist 子選單動畫版
// =========================
const setlistToggle = document.getElementById("setlist-toggle");
const setlistMenu = document.getElementById("setlist-menu");

setlistToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // 防止影響分頁切換

  setlistMenu.classList.toggle("open");

  if (setlistMenu.classList.contains("open")) {
    setlistToggle.innerHTML = "Setlist ▲";
  } else {
    setlistToggle.innerHTML = "Setlist ▼";
  }
});

// 演唱會倒數
const concertDate = new Date("2026-03-07T19:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = concertDate - now;
  const el = document.getElementById("countdown");
  if (!el) return;

  if (diff <= 0) {
    el.innerHTML = "今天就是演唱會！！！🎉";
    return;
  }

  const days = Math.floor(diff / (1000*60*60*24));
  const hours = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  el.innerHTML = `${days}天 ${hours}時 ${minutes}分 ${seconds}秒`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// 勾選保存狀態 (首頁)
const checkboxes = document.querySelectorAll("#songList input[type=checkbox]");

function updateProgress() {
  const done = Array.from(checkboxes).filter(cb => cb.checked).length;
  const total = checkboxes.length;
  const el = document.getElementById("progress");
  if (el) el.innerText = `已練 ${done}/${total} 首`;
}

checkboxes.forEach(cb => {
  const saved = localStorage.getItem(cb.id);
  if (saved === "true") cb.checked = true;
  cb.addEventListener("change", () => {
    localStorage.setItem(cb.id, cb.checked);
    updateProgress();
  });
});

updateProgress();

