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
const skins = [
      {
        champion: "Florentino",
        name: "Blade",
        downloadLinkIOS: "https://link4m.com/i92tvN",
        downloadLinkAndroid: "https://link4m.com/DEc0xdjm",
        bgImg: "img/blade.png",
        miniImg: "img/blade_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(0, 255, 175)",
        borderColor: "rgba(0, 255, 175, 0.5)",
      },
      {
        champion: "Florentino",
        name: "Furina",
        downloadLinkIOS: "https://link4m.com/Jgfrg",
        downloadLinkAndroid: "https://link4m.com/TpDdj",
        bgImg: "img/furina.png",
        miniImg: "img/furina_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(0, 176, 255)",
        borderColor: "rgba(0, 176, 255, 0.5)",
      },
      {
        champion: "billow",
        name: "Tartaglia",
        downloadLinkIOS: "https://link4m.com/xhzoq",
        downloadLinkAndroid: "https://link4m.com/9HLs5yUY",
        bgImg: "img/childe.png",
        miniImg: "img/childe_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(0, 176, 255)",
        borderColor: "rgba(0, 176, 255, 0.5)",
      },
      {
        champion: "Raz",
        name: "Wriothesley",
        downloadLinkIOS: "https://link4m.com/pZnNB3gJ",
        downloadLinkAndroid: "https://link4m.com/pOKHfO",
        bgImg: "img/wriothesley.png",
        miniImg: "img/wriothesley_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(155, 255, 255)",
        borderColor: "rgba(155, 255, 255, 0.3)",
      },
      {
        champion: "Sinestrea",
        name: "Nilou",
        downloadLinkIOS: "https://link4m.com/e9ZQ93ZG",
        downloadLinkAndroid: "https://link4m.com/E5wPznf0",
        bgImg: "img/nilou.png",
        miniImg: "img/nilou_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(0, 176, 255)",
        borderColor: "rgba(0, 176, 255, 0.5)",
      },
      {
        champion: "Mina",
        name: "Arlecchino",
        downloadLinkIOS: "https://link4m.com/tuRbI9i",
        downloadLinkAndroid: "https://link4m.com/8fe4Qx",
        bgImg: "img/arlecchino.png",
        miniImg: "img/arlecchino_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(255, 50, 50)",
        borderColor: "rgba(255, 50, 50, 0.5)",
      },
      
      {
        champion: "Tachi",
        name: "Ichigo Kurosaki",
        downloadLinkIOS: "https://link4m.com/bXRMs0",
        downloadLinkAndroid: "https://link4m.com/VZzPUp8L",
        bgImg: "img/ichigo.png",
        miniImg: "img/ichigo_mini.png",
        label: "Mới",
        desc: "Effects - Sound",
        textColor: "rgb(255, 0, 0)",
        borderColor: "rgba(255, 0, 0, 0.5)",
      },
      {
        champion: "Tachi",
        name: "Jingliu",
        downloadLinkIOS: "https://link4m.com/mQ61uYJ",
        downloadLinkAndroid: "https://link4m.com/TlmYSkI",
        bgImg: "img/jingliu.png",
        miniImg: "img/jingliu_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(100, 200, 255)",
        borderColor: "rgba(100, 200, 255, 0.5)",
      },
      {
        champion: "Allain",
        name: "FIREFLY",
        downloadLinkIOS: "https://link4m.com/8xv9sN",
        downloadLinkAndroid: "https://link4m.com/bWYi4",
        bgImg: "img/firefly.png",
        miniImg: "img/firefly_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button - Notify",
        textColor: "rgb(60, 255, 193)",
        borderColor: "rgba(60, 255, 193, 0.6)",
      },
      {
        champion: "Allain",
        name: "LẠC TUYẾT BẠCH LANG",
        downloadLinkIOS: "https://link4m.com/9o0hw",
        downloadLinkAndroid: "https://link4m.com/yG1HJc",
        bgImg: "img/ltbl.png",
        miniImg: "img/ltbl_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button - Notify",
        textColor: "rgb(155, 255, 255)",
        borderColor: "rgba(155, 255, 255, 0.3)",
      },
      {
        champion: "Butterfly",
        name: "Changli",
        downloadLinkIOS: "https://link4m.com/HCJNcii6",
        downloadLinkAndroid: "https://link4m.com/e3fzTuKu",
        bgImg: "img/changli.png",
        miniImg: "img/changli_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(255, 148, 100)",
        borderColor: "rgba(255, 148, 100, 0.5)",
      },
      {
        champion: "Butterfly",
        name: "Castorice",
        downloadLinkIOS: "https://link4m.com/GzO7n4",
        downloadLinkAndroid: "https://link4m.com/f3q1T",
        bgImg: "img/castorice.png",
        miniImg: "img/castorice_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(145, 145, 255)",
        borderColor: "rgba(145, 145, 255, 0.5)",
      },
      {
        champion: "Nakroth",
        name: "Xiao",
        downloadLinkIOS: "https://link4m.com/ENxCx2W",
        downloadLinkAndroid: "https://link4m.com/nM43Am",
        bgImg: "img/xiao.png",
        miniImg: "img/xiao_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button - Notify",
        textColor: "rgb(61, 245, 255)",
        borderColor: "rgba(61, 245, 255, 0.5)",
      },
      {
        champion: "Kil'Groth",
        name: "Hắc Vệ Thần",
        downloadLinkIOS: "https://link4m.com/iyKiW5",
        downloadLinkAndroid: "https://link4m.com/miAezt",
        bgImg: "img/hvt.png",
        miniImg: "img/hvt_mini.png",
        label: "Mới",
        desc: "Effects - Sound",
        textColor: "rgb(0, 130, 255)",
        borderColor: "rgba(0, 130, 255, 0.5)",
      },
      {
        champion: "TULEN",
        name: "DAN HENG IL",
        downloadLinkIOS: "https://link4m.com/bOwQC5",
        downloadLinkAndroid: "https://link4m.com/m6H2oI3E",
        bgImg: "img/danheng.png",
        miniImg: "img/danheng_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(61, 245, 255)",
        borderColor: "rgba(61, 245, 255, 0.5)",
      },
      {
        champion: "VIOLET",
        name: "CARLOTTA",
        downloadLinkIOS: "https://link4m.com/RJimKb",
        downloadLinkAndroid: "https://link4m.com/zbeHqM8W",
        bgImg: "img/carlotta.png",
        miniImg: "img/carlotta_mini.png",
        label: "Mới",
        desc: "Effects - Sound - Button",
        textColor: "rgb(255, 145, 255)",
        borderColor: "rgba(255, 145, 255, 0.5)",
      },
      {
        champion: "PACK",
        name: "4 SKINS UNDERWORLD",
        downloadLinkIOS: "https://link4m.com/5nFdnI",
        downloadLinkAndroid: "https://link4m.com/CgA1xJIU",
        bgImg: "img/underworld.png",
        miniImg: "img/pack_mini.png",
        label: "Mới",
        desc: "Effects - Sound",
        textColor: "rgb(244, 180, 70)",
        borderColor: "rgba(244, 180, , 0.5)",
      },
      ];

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