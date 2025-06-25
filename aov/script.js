document.addEventListener("DOMContentLoaded", function() {
  const chonMod = document.getElementById("chonmod");
  const skinList = document.getElementById("skin-list");
  let isOpen = false;
  chonMod.addEventListener("click", function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (!isOpen) {
      skinList.style.height = "auto";
      const fullHeight = skinList.scrollHeight + "px";
      skinList.style.height = "0px";
      requestAnimationFrame(() => {
        skinList.style.height = fullHeight;
      });
      isOpen = true;
    } else {}
  });
  document.addEventListener("click", function(event) {
    const target = event.target;
    if (!skinList.contains(target) && target !== chonMod) {
      skinList.style.height = "0px";
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
  let canClose = false;
  setTimeout(() => {
    localStorage.setItem("hasVisitedBefore", "true");
    popup.classList.add("show");
    setTimeout(() => {
      canClose = true;
      closeBtn.disabled = false;
      closeBtn.textContent = ""
      closeBtn.style.opacity = "1";
      closeBtn.style.pointerEvents = "auto";
    }, 0);
    closeBtn.disabled = true;
    closeBtn.textContent = "";
    closeBtn.style.opacity = "0.5";
    closeBtn.style.pointerEvents = "none";
    
  }, 100);
  function closePopup() {
    if (!canClose) return;
    popup.classList.remove("show");
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
document.addEventListener('DOMContentLoaded', function () {
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


const skinList = document.getElementById("skin-list");

    skins.forEach((skin) => {
      const labelHTML = skin.label
        ? `<span class="label" style="background-color: ${skin.textColor}">${skin.label}</span>`
        : "";

      const miniImgHTML = skin.miniImg
        ? `<img src="${skin.miniImg}" class="mod-mini" style="border-color: ${skin.borderColor}" />`
        : "";

      const championNoteHTML = skin.champion && skin.miniImg
        ? `<div class="mod-champion-note">${skin.champion}</div>`
        : "";

      const titleHTML = skin.name
        ? `<div class="mod-title" style="background: linear-gradient(to bottom, #fff, ${skin.textColor}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; display: inline-block;">${skin.name}</div>`
        : "";

      const descHTML = skin.desc ? `<div class="mod-desc">${skin.desc}</div>` : "";

      const downloadBtnHTML = skin.downloadLinkIOS && skin.downloadLinkAndroid
        ? `<div class="download-container"><div class="download-btn-main" style="background: ${skin.textColor};color: black;" onclick="toggleDownloadOptions(this, '${skin.downloadLinkAndroid}', '${skin.downloadLinkIOS}', '${skin.textColor}')">Tải xuống</div></div>`
        : "";

      const cardHTML = `
        <div class="mod-card" style="border-color: ${skin.borderColor};color: ${skin.textColor}" onclick="changeBg('${skin.bgImg}')">
          ${labelHTML}
          <img src="${skin.bgImg}" class="bg" />
          <div class="mod-info">
            ${miniImgHTML}
            <div class="mod-texts" style="color: ${skin.textColor}">
              ${championNoteHTML}
              ${titleHTML}
              ${descHTML}
            </div>
          </div>
          ${downloadBtnHTML}
        </div>
      `;

      const wrapper = document.createElement("div");
      wrapper.innerHTML = cardHTML;
      skinList.appendChild(wrapper);
    });

    function toggleDownloadOptions(button, androidLink, iosLink, color) {
      const isExpanded = button.dataset.expanded === 'true';
      button.style.transition = 'opacity 0.3s ease';
      button.style.opacity = '0';
      setTimeout(() => {
        if (isExpanded) {
          button.innerHTML = 'Tải xuống';
          button.dataset.expanded = 'false';
        } else {
          button.innerHTML = `<a href="${androidLink}" target="_blank" style="color:#000;text-decoration:none;">Android</a><span style="margin: 0 5px;">|</span><a href="${iosLink}" target="_blank" style="color:#000;text-decoration:none;">iOS</a>`;
          button.dataset.expanded = 'true';
        }
        requestAnimationFrame(() => {
          button.style.opacity = '1';
        });
      }, 300);
      document.querySelectorAll('.download-btn-main').forEach(btn => {
        if (btn !== button) {
          btn.innerHTML = 'Tải xuống';
          btn.dataset.expanded = 'false';
          btn.style.opacity = '1';
        }
      });
    }

    document.addEventListener('click', (e) => {
      const isInside = e.target.closest('.download-container');
      if (!isInside) {
        document.querySelectorAll('.download-btn-main').forEach(btn => {
          btn.innerHTML = 'Tải xuống';
          btn.dataset.expanded = 'false';
          btn.style.opacity = '1';
        });
      }
    });

    function changeBg(imgPath) {
      const current = document.getElementById("bg");
      const next = document.getElementById("bg-next");
      next.style.backgroundImage = `url('${imgPath}')`;
      next.style.opacity = 1;
      setTimeout(() => {
        current.style.backgroundImage = `url('${imgPath}')`;
        next.style.opacity = 0;
      }, 800);
    }