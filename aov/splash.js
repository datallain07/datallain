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
  const cacheKey = 'image_exists_' + url;
  const cached = localStorage.getItem(cacheKey);
  if (cached !== null) {
    const data = JSON.parse(cached);
    const maxAge = 1000 * 60 * 60 * 24 * 365;
    if (Date.now() - data.timestamp < maxAge) {
      return Promise.resolve(data.exists);
    } else {
      localStorage.removeItem(cacheKey);
    }
  }
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      localStorage.setItem(cacheKey, JSON.stringify({ exists: true, timestamp: Date.now() }));
      resolve(true);
    };
    img.onerror = () => {
      localStorage.setItem(cacheKey, JSON.stringify({ exists: false, timestamp: Date.now() }));
      resolve(false);
    };
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
img.alt = `${fullId}`;
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
      img.alt = `${heroId}`;
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