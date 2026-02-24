document.addEventListener("DOMContentLoaded", () => {
  // 漢堡選單
  const hamburger = document.getElementById("hamburger");
  const sideNav = document.getElementById("side-nav");

  hamburger.addEventListener("click", () => {
    if (sideNav.style.width === "260px") {
      sideNav.style.width = "0";
      document.body.style.overflow = "auto";
    } else {
      sideNav.style.width = "260px";
      document.body.style.overflow = "hidden";
    }
  });

  // 分頁切換（只抓有 data-song 的）
  const pages = document.querySelectorAll(".page");
  const navItems = document.querySelectorAll(".side-nav li[data-song]");

  function showPage(pageId) {
    pages.forEach(p => p.classList.remove("active"));
    const target = document.getElementById(pageId);
    if (target) target.classList.add("active");

    sideNav.style.width = "0";
    document.body.style.overflow = "auto";
  }

  showPage("home");

  navItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.stopPropagation();
      const page = item.getAttribute("data-song");
      if (page) showPage(page);
    });
  });

  // Setlist 子選單動畫版（自動抓高度）
  const setlistToggle = document.getElementById("setlist-toggle");
  const setlistMenu = document.getElementById("setlist-menu");

  // 初始高度設為 0
  setlistMenu.style.height = "0px";

  setlistToggle.addEventListener("click", (e) => {
    e.stopPropagation();

    if (setlistMenu.style.height !== "0px") {
      // 收起
      setlistMenu.style.height = "0px";
      setlistToggle.innerHTML = "Setlist ▼";
    } else {
      // 展開：抓內容實際高度
      setlistMenu.style.height = setlistMenu.scrollHeight + "px";
      setlistToggle.innerHTML = "Setlist ▲";
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

  // 勾選保存狀態
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
});
