document.addEventListener("DOMContentLoaded", function () {
  const chonMod = document.getElementById("chonmod");
  const skinList = document.getElementById("skin-list");
  let isOpen = false;
  chonMod.addEventListener("click", function (event) {
    event.preventDefault();
    event.stopPropagation();
    if (isOpen) return;
    skinList.style.height = skinList.scrollHeight + "px";
    skinList.classList.remove("collapsed");
    skinList.addEventListener("transitionend", function handler() {
      skinList.style.height = "auto";
      skinList.removeEventListener("transitionend", handler);
    });
    isOpen = true;
  });
  document.addEventListener("click", function (event) {
    const target = event.target;
    if (!skinList.contains(target) && target !== chonMod) {
      if (isOpen) {
        skinList.style.height = skinList.scrollHeight + "px";
        requestAnimationFrame(() => {
          skinList.style.height = "0px";
          skinList.classList.add("collapsed");
        });
        isOpen = false;
      }
    }
  });
  skinList.addEventListener("click", function (event) {
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
  document.querySelectorAll('.mod-card').forEach(function(card) {
  card.addEventListener('click', function() {
    const isExpanded = card.classList.contains('expand');
    if (isExpanded) return;
    document.querySelectorAll('.mod-card.expand').forEach(function(c) {
      collapseCard(c);
      c.classList.remove('expand');
    });
    expandCard(card);
    card.classList.add('expand');
  });
});
function expandCard(card) {
  const startHeight = card.offsetHeight;
  card.style.height = startHeight + 'px';
  card.classList.add('expand');
  card.offsetHeight;
  const targetHeight = card.scrollHeight;
  card.style.height = targetHeight + 'px';
  card.addEventListener('transitionend', function handler() {
    card.style.height = 'auto';
    card.removeEventListener('transitionend', handler);
  });
}
function collapseCard(card) {
  const startHeight = card.scrollHeight;
  card.style.height = startHeight + 'px';
  card.offsetHeight;
  card.style.height = '60px';
}
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
document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const animationToggle = document.getElementById("toggle-animation");
  const disableAnimations = localStorage.getItem("disableAnimations") === "true";
  if (disableAnimations) {
    body.classList.add("no-animation");
    animationToggle.checked = true;
  }
  animationToggle.addEventListener("change", function () {
    if (this.checked) {
      body.classList.add("no-animation");
      localStorage.setItem("disableAnimations", "true");
    } else {
      body.classList.remove("no-animation");
      localStorage.setItem("disableAnimations", "false");
    }
  });
});
const darkToggle = document.getElementById("darkModeToggle");
const body = document.body;
if (localStorage.getItem("darkMode") === "enabled") {
  body.classList.add("dark-mode");
  darkToggle.checked = true;
} else {
  body.classList.remove("dark-mode");
  darkToggle.checked = false;
}
darkToggle.addEventListener("change", function () {
  if (this.checked) {
    body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
  } else {
    body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const qualityToggle = document.getElementById("reduceQualityToggle");
  if (localStorage.getItem("reduceQuality") === "enabled") {
    qualityToggle.checked = true;
    applyImageCompression(true);
  }
  qualityToggle.addEventListener("change", function () {
    const shouldReduce = this.checked;
    localStorage.setItem("reduceQuality", shouldReduce ? "enabled" : "disabled");
    applyImageCompression(shouldReduce);
  });
  function applyImageCompression(shouldReduce) {
    const images = document.querySelectorAll(".mod-card img");
    images.forEach(img => {
      if (shouldReduce) {
        if (!img.dataset.originalSrc) {
          img.dataset.originalSrc = img.src;
        }
        waitForImageLoad(img).then(loadedImg => {
          const w = loadedImg.naturalWidth;
          const h = loadedImg.naturalHeight;
          if (w <= 360 && h <= 360) return;
          const scale = 360 / Math.max(w, h);
          compressImage(loadedImg, scale, 0.3);
        });
      } else {
        if (img.dataset.originalSrc) {
          img.src = img.dataset.originalSrc;
        }
      }
    });
  }
  function waitForImageLoad(img) {
    return new Promise(resolve => {
      if (img.complete) resolve(img);
      else {
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
      }
    });
  }
  function compressImage(imgElement, scale = 1, quality = 0.2) {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imgElement.src;
    img.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const compressedData = canvas.toDataURL("image/webp", quality);
      imgElement.src = compressedData;
    };
  }
});