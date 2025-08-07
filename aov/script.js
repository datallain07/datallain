localStorage.removeItem("dontShowWelcomePopup");
document.addEventListener("DOMContentLoaded", function() {
  const chonMod = document.getElementById("chonmod");
  const skinList = document.getElementById("skin-list");
  const sideMenu = document.getElementById("side-menu");
  const overlay = document.getElementById("overlay");
  let isOpen = false;
  chonMod.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (isOpen) return;
    skinList.style.height = skinList.scrollHeight + "px";
    skinList.classList.remove("collapsed");
    skinList.classList.add("expanded");
    skinList.addEventListener("transitionend", function handler() {
      skinList.style.height = "auto";
      skinList.removeEventListener("transitionend", handler);
    });
    isOpen = true;
  });
  document.addEventListener("click", function(event) {
    const target = event.target;
    const isOutsideSkinList = !skinList.contains(target);
    const isInsideSideMenu = target.closest('#side-menu') !== null;
    const isInsideHeader = target.closest('header') !== null;
    const isInsideOverlay = target.closest('#overlay') !== null;
    
    if (
      isOpen &&
      isOutsideSkinList &&
      !isInsideSideMenu &&
      !isInsideHeader &&
      !isInsideOverlay
    ) {
      skinList.style.height = skinList.scrollHeight + "px";
      requestAnimationFrame(() => {
        skinList.style.height = "0px";
        skinList.classList.add("collapsed");
        skinList.classList.remove("expanded");
      });
      isOpen = false;
    }
  });
  skinList.addEventListener("click", function(event) {
    event.stopPropagation();
  });
});
const menuButton = document.getElementById('menu-button');
const sideMenu = document.getElementById('side-menu');
const overlay = document.getElementById('overlay');
menuButton.addEventListener('click', () => {
  sideMenu.classList.add('show');
  overlay.classList.add('show');
});
overlay.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  overlay.classList.remove('show');
});
document.addEventListener("DOMContentLoaded", function() {
  const popup = document.getElementById("welcome-popup");
  const closeBtn = document.getElementById("close-popup");
  const dontShowAgain = document.getElementById("dont-show-again");
  let canClose = false;
  const dontShow = localStorage.getItem("dontShowWelcomePopup");
  if (dontShow === "true") return;
  setTimeout(() => {
    localStorage.setItem("hasVisitedBefore", "true");
    popup.style.display = "flex";
    requestAnimationFrame(() => {
      popup.classList.add("show");
      popup.style.opacity = "1";
    }); 
    let countdown = 0;
    closeBtn.textContent = `Có thể đóng sau ${countdown}s`;
    closeBtn.disabled = true;
    closeBtn.style.opacity = "0.5";
    closeBtn.style.pointerEvents = "none";
    closeBtn.style.cursor = "not-allowed";
    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdown > 0) {
        closeBtn.textContent = `Có thể đóng sau ${countdown}s`;
      } else {
        clearInterval(countdownInterval);
        canClose = true;
        closeBtn.disabled = false;
        closeBtn.textContent = "";
        closeBtn.style.opacity = "1";
        closeBtn.style.pointerEvents = "auto";
        closeBtn.style.cursor = "pointer";
      }
    }, 1000);
  }, 100);
  function closePopup() {
    if (!canClose) return;
    if (dontShowAgain && dontShowAgain.checked) {
      localStorage.setItem("dontShowWelcomePopup", "true");
    }
    popup.classList.remove("show");
    popup.style.opacity = "0";
  }
  popup.addEventListener("transitionend", function(e) {
    if (e.propertyName === "opacity" && !popup.classList.contains("show")) {
      popup.style.display = "none";
    }
  });
  closeBtn.addEventListener("click", closePopup);
  popup.addEventListener("click", function(e) {
    if (e.target === popup && canClose) {
      closePopup();
    }
  });
});
window.addEventListener('wheel', function(e) {
  if (e.ctrlKey) e.preventDefault();
}, { passive: false });
window.addEventListener('keydown', function(e) {
  if (e.ctrlKey && (e.key === '+' || e.key === '-' || e.key === '=')) {
    e.preventDefault();
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const donateItem = document.querySelector('.menu-item:nth-child(1)');
  const donatePopup = document.getElementById('donate-popup');
  donateItem.addEventListener('click', () => {
    donatePopup.classList.add('show');
    donatePopup.classList.remove('hide');
  });
  donatePopup.addEventListener('click', (e) => {
    if (e.target === donatePopup) {
      donatePopup.classList.add('hide');
      donatePopup.classList.remove('show');
      setTimeout(() => {
        donatePopup.style.display = 'none';
      }, 300);
    }
  });
  const observer = new MutationObserver(() => {
    if (donatePopup.classList.contains('show')) {
      donatePopup.style.display = 'flex';
    }
  });
  observer.observe(donatePopup, { attributes: true });
});
function getRGBColor(time) {
  const r = Math.floor(127 * Math.sin(0.03 * time + 0) + 128);
  const g = Math.floor(127 * Math.sin(0.03 * time + 2) + 128);
  const b = Math.floor(127 * Math.sin(0.03 * time + 4) + 128);
  return `rgb(${r}, ${g}, ${b})`;
}
function startRGBGlow(element) {
  let time = 0;
  element.classList.add('rgb-glow');
  const interval = setInterval(() => {
    const color = getRGBColor(time);
    element.style.setProperty('--rgb-color', color);
    time++;
  }, 50);
  return () => {
    clearInterval(interval);
    element.classList.remove('rgb-glow');
  };
}
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.menu-item');
  let stopGlow = null;
  items.forEach(item => {
    item.addEventListener('click', () => {
      if (stopGlow) stopGlow();
      stopGlow = startRGBGlow(item);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".menu-item").forEach(item => {
    item.addEventListener("click", e => {
      const link = item.querySelector("a");
      if (link && !e.target.closest("a")) {
        window.open(link.href, '_blank');
      }
    });
  });
});
