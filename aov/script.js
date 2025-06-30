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
    skinList.classList.add("expanded");
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
          skinList.classList.remove("expanded");
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
      skinList.insertAdjacentHTML("beforeend", cardHTML);
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
const headGrid = document.getElementById('head-grid');
const searchInput = document.getElementById('search');

const ID_RANGES = [
  { start: 105, end: 206 },
  { start: 501, end: 650 }
];

const heroList = {
  105: "Toro", 106: "Krixi", 107: "Zephys", 108: "Gildur", 109: "Veera", 110: "Kahlii", 111: "Violet", 112: "Yorn",
  113: "Chaugnar", 114: "Omega", 115: "Jinna", 116: "Butterfly", 117: "Ormarr", 118: "Alice", 119: "Mganga",
  120: "Mina", 121: "Marja", 123: "Maloch", 124: "Ignis", 126: "Arduin", 127: "Azzen'Ka", 128: "Lữ Bố", 129: "Triệu Vân",
  130: "Airi", 131: "Murad", 132: "Hayate", 133: "Valhein", 134: "Skud", 135: "Thane", 136: "Ilumia", 137: "Paine",
  139: "Kil'Groth", 140: "Superman", 141: "Lauriel", 142: "Natalya", 144: "Taara", 146: "Zill", 148: "Preyta",
  149: "Xeniel", 150: "Nakroth", 152: "Điêu Thuyền", 153: "Kaine", 154: "Yena", 156: "Aleister", 157: "Raz",
  159: "Dolia", 162: "Kriknak", 163: "Ryoma", 166: "Arthur", 167: "Ngộ Không", 168: "Lumburr", 169: "Slimz",
  170: "Moren", 171: "Cresht", 173: "Fennik", 174: "Stuart", 175: "Grakk", 177: "Lindis", 180: "Max", 184: "Helen",
  186: "TeeMee", 187: "Arum", 189: "Krizzix", 190: "Tulen", 191: "Rouie", 192: "Celica", 193: "Amily", 194: "Wiro",
  195: "Enzo", 196: "Elsu", 199: "Eland'orr", 206: "Charlotte",
  501: "Tel'Annas", 502: "Astrid", 503: "Zuka", 504: "Wonder Woman", 505: "Baldum", 506: "Omen", 507: "The Flash",
  508: "Wisp", 509: "Y'bneth", 510: "Liliana", 511: "Ata", 512: "Rourke", 513: "Zata", 514: "Roxie", 515: "Richter",
  518: "Quillen", 519: "Annette", 520: "Veres", 521: "Florentino", 522: "Errol", 523: "D'Arcy", 524: "Capheny",
  525: "Zip", 526: "Ishar", 527: "Sephera", 528: "Qi", 529: "Volkath", 530: "Dirak", 531: "Keera", 532: "Thorne",
  533: "Laville", 534: "Dextra", 535: "Sinestrea", 536: "Aoi", 537: "Allain", 538: "Iggy", 539: "Lorion",
  540: "Bright", 541: "Bonnie", 542: "Tachi", 543: "Aya", 544: "Yan", 545: "Yue", 546: "Teeri", 548: "Bijan",
  563: "Heino", 567: "Erin", 568: "Ming", 596: "Goverra", 597: "Biron", 598: "Bolt Baron", 599: "Billow"
};

function checkImageExists(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

async function showHeroImages(heroId, splashDiv, card) {
  const isActive = card.classList.contains('active');
  document.querySelectorAll('.dat2-item').forEach(el => {
    el.classList.remove('active');
    const otherSplash = el.querySelector('.splash-container');
    if (otherSplash) otherSplash.innerHTML = '';
  });
  if (isActive) {
    splashDiv.innerHTML = '';
    card.classList.remove('active');
    return;
  }
  card.classList.add('active');
  splashDiv.innerHTML = '<small style="color: gray;"></small>';
  let found = false;
  for (let i = 0; i < 100; i++) {
  const suffix = String(i).padStart(2, '0');
  const fullId = `${heroId}${suffix}`;
  const bigUrl = `https://dl.ops.kgtw.garenanow.com/CHT/HeroTrainingLoadingNew_B36/${fullId}.jpg`;
  const exists = await checkImageExists(bigUrl);
  if (exists) {
    if (!found) splashDiv.innerHTML = '';
    found = true;
      const wrapper = document.createElement('div');
wrapper.style.position = 'relative';
wrapper.style.marginTop = '8px';
const img = document.createElement('img');
img.src = bigUrl;
img.alt = `Splash ${fullId}`;
img.style.width = '100%';
img.style.borderRadius = '12px';
const idTag = document.createElement('div');
idTag.textContent = `${fullId}`;
idTag.style.position = 'absolute';
idTag.style.top = '8px';
idTag.style.left = '8px';
idTag.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
idTag.style.color = 'white';
idTag.style.padding = '2px 6px';
idTag.style.fontSize = '12px';
idTag.style.borderRadius = '4px';
idTag.style.pointerEvents = 'none';
idTag.classList.add('splash-id');
idTag.style.display = 'none';
wrapper.appendChild(img);
wrapper.appendChild(idTag);
splashDiv.appendChild(wrapper);
    }
  }
  if (!found) {
    splashDiv.innerHTML = '<small style="color: red;">Không tìm thấy splash art.</small>';
  }
}
async function loadHeroHeads() {
  const allIDs = [];
  for (const range of ID_RANGES) {
    for (let id = range.start; id <= range.end; id++) {
      allIDs.push(id);
    }
  }
  allIDs.sort((a, b) => a - b);
  for (const heroId of allIDs) {
    const idStr = String(heroId).padStart(3, '0');
    const headUrl = `https://dl.ops.kgtw.garenanow.com/CHT/HeroHeadPath/30${idStr}0head.jpg`;
    const exists = await checkImageExists(headUrl);
    if (exists) {
      const card = document.createElement('div');
      card.className = 'dat2-item';
      card.dataset.name = (heroList[heroId] || "").toLowerCase();
      const header = document.createElement('div');
      header.className = 'dat2-header';
      const img = document.createElement('img');
      img.src = headUrl;
      img.className = 'thumb';
      img.alt = `Hero ${heroId}`;
      const textDiv = document.createElement('div');
      textDiv.className = 'text';
      const nameEl = document.createElement('strong');
      nameEl.textContent = heroList[heroId] || `ID ${heroId}`;
      const small = document.createElement('small');
      small.textContent = 'Click để xem splash art';
      textDiv.appendChild(nameEl);
      textDiv.appendChild(small);
      header.appendChild(img);
      header.appendChild(textDiv);
      const splashContainer = document.createElement('div');
      splashContainer.className = 'splash-container';
      card.appendChild(header);
      card.appendChild(splashContainer);
      header.addEventListener('click', (e) => {
  e.stopPropagation();
  showHeroImages(heroId, splashContainer, card);
});
      headGrid.appendChild(card);
    }
  }
}
searchInput.addEventListener('input', () => {
  const keyword = searchInput.value.trim().toLowerCase();
  const cards = document.querySelectorAll('.dat2-item');
  cards.forEach(card => {
    const name = (card.dataset.name || "").toLowerCase();
    let matchedId = '';
    for (const [id, heroName] of Object.entries(heroList)) {
      if (heroName.toLowerCase() === name) {
        matchedId = id;
        break;
      }
    }
    const match = name.includes(keyword) || matchedId.includes(keyword);
    card.style.display = match ? 'flex' : 'none';
  });
});
loadHeroHeads();
document.addEventListener("DOMContentLoaded", () => {
  const showIdToggle = document.getElementById("toggle-show-id");
  if (showIdToggle) {
    showIdToggle.checked = false;
  }
  function updateHeroNames(showId) {
    document.querySelectorAll(".dat2-item").forEach(card => {
      const img = card.querySelector("img.thumb");
      const nameEl = card.querySelector("strong");
      if (!img || !nameEl) return;
      
      const heroId = parseInt(img.alt.replace("Hero ", ""));
      const name = heroList[heroId] || "null";
      nameEl.textContent = showId ? `${heroId}: ${name}` : name;
    });
  }
  function updateSplashIdVisibility(showId) {
    document.querySelectorAll(".splash-container div").forEach(wrapper => {
      const idTag = wrapper.querySelector('div');
      if (idTag && idTag.textContent.match(/^\d{5}$/)) {
        idTag.style.display = showId ? 'block' : 'none';
        idTag.classList.add('splash-id');
      }
    });
  }
  updateHeroNames(false);
  updateSplashIdVisibility(false);
  if (showIdToggle) {
    showIdToggle.addEventListener("change", () => {
      const showId = showIdToggle.checked;
      updateHeroNames(showId);
      updateSplashIdVisibility(showId);
    });
  }
});
const splashButton = document.getElementById('open-splash');
const splashContainer = document.getElementById('splash-container');
splashButton.addEventListener('click', function (event) {
  event.stopPropagation();
  if (splashContainer.classList.contains('hidden')) {
    splashContainer.classList.remove('hidden');
    splashContainer.style.height = '0px';
    requestAnimationFrame(() => {
      const fullHeight = splashContainer.scrollHeight + "px";
      splashContainer.style.transition = "height 0.3s ease";
      splashContainer.style.height = fullHeight;
      splashContainer.addEventListener("transitionend", function handleTransitionEnd() {
        splashContainer.style.height = "auto";
        splashContainer.removeEventListener("transitionend", handleTransitionEnd);
      });
    });
  } else {
    splashContainer.style.height = splashContainer.scrollHeight + "px"; 
    requestAnimationFrame(() => {
      splashContainer.style.transition = "height 0.3s ease";
      splashContainer.style.height = "0px";
    });
    setTimeout(() => {
      splashContainer.classList.add('hidden');
    }, 300);
  }
});
splashContainer.addEventListener('click', function (event) {
  event.stopPropagation();
});
document.addEventListener('click', function () {
  if (!splashContainer.classList.contains('hidden')) {
    splashContainer.style.height = splashContainer.scrollHeight + "px";
    requestAnimationFrame(() => {
      splashContainer.style.transition = "height 0.3s ease";
      splashContainer.style.height = "0px";
    });

    setTimeout(() => {
      splashContainer.classList.add('hidden');
    }, 300);
  }
});