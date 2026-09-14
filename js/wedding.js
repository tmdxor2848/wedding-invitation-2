/* =========================================================
   웨딩 필름 오프닝
   기존 wedding.js의 예전 오프닝 코드는 삭제하고
   이 코드를 wedding.js 가장 위에 붙여넣으세요.
========================================================= */

const wdFilmOpening =
  document.getElementById("wdFilmOpening");

const wdFilmButton =
  document.getElementById("wdFilmButton");

const weddingMusic =
  document.getElementById("weddingMusic");

const musicToggle =
  document.getElementById("musicToggle");

let wdFilmStarted = false;


/* 오프닝이 보이는 동안 본문 스크롤 방지 */

if (wdFilmOpening) {

  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";

}


function wdOpenFilmInvitation() {

  if (!wdFilmOpening || wdFilmStarted) {
    return;
  }

  wdFilmStarted = true;

  /* 배경음악 시작 */

  if (weddingMusic) {

    weddingMusic.volume = 0.3;

    weddingMusic.currentTime = 56;

    weddingMusic
      .play()
      .then(() => {

        if (musicToggle) {
          musicToggle.classList.add("is-visible");
        }

      })
      .catch(() => {

        console.log("음악 자동 재생이 차단되었습니다.");

      });

  }


  /* 1단계: 기존 타이틀 → 엔딩 문구 */

  wdFilmOpening.classList.add(
    "is-opening"
  );


  /* 2단계: 아이보리 빛으로 본문 연결 */

  setTimeout(() => {

    wdFilmOpening.classList.add(
      "is-closing"
    );

  }, 1450);


  /* 3단계: 실제 청첩장 노출 */

  setTimeout(() => {

    wdFilmOpening.classList.add(
      "is-finished"
    );

    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

  }, 2150);


  /* DOM에서 완전히 제거 */

  setTimeout(() => {

    wdFilmOpening.remove();

  }, 3300);

}


if (wdFilmButton) {

  wdFilmButton.addEventListener(
    "click",
    wdOpenFilmInvitation
  );

}


/* 1. 스크롤 FADE */
const fadeElements = document.querySelectorAll(".fade-up");

if ("IntersectionObserver" in window) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  fadeElements.forEach((element) => fadeObserver.observe(element));
} else {
  fadeElements.forEach((element) => element.classList.add("show"));
}

/* 2. D-DAY */
const ddayText = document.getElementById("dday");

if (ddayText) {
  const weddingDay = new Date(2026, 11, 19);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const dday = Math.round((weddingDay - today) / 86400000);

  if (dday > 0) {
    ddayText.textContent = `승택 ♥ 소미의 결혼식까지 ${dday}일 남았습니다.`;
  } else if (dday === 0) {
    ddayText.textContent = "오늘, 저희 결혼합니다.";
  } else {
    ddayText.textContent = "함께 축복해 주셔서 감사합니다.";
  }
}

/* 3. WEDDING GALLERY */
const galleryItems = [...document.querySelectorAll(".gallery-item")];
const galleryModal = document.getElementById("galleryModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");
const modalPrev = document.getElementById("modalPrev");
const modalNext = document.getElementById("modalNext");
const modalCount = document.getElementById("modalCount");
const galleryImages = galleryItems.map((item) => item.dataset.image).filter(Boolean);
let currentImageIndex = 0;

function showGalleryImage() {
  if (!modalImage || galleryImages.length === 0) return;

  modalImage.src = galleryImages[currentImageIndex];
  if (modalCount) {
    modalCount.textContent = `${currentImageIndex + 1} / ${galleryImages.length}`;
  }
}

function openGallery(index) {
  if (!galleryModal || galleryImages.length === 0) return;

  currentImageIndex = index;
  showGalleryImage();
  galleryModal.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeGallery() {
  if (!galleryModal) return;

  galleryModal.classList.remove("show");
  document.body.style.overflow = "";
}

function moveGallery(step) {
  if (galleryImages.length === 0) return;
  currentImageIndex = (currentImageIndex + step + galleryImages.length) % galleryImages.length;
  showGalleryImage();
}

galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => openGallery(index));
});

modalNext?.addEventListener("click", () => moveGallery(1));
modalPrev?.addEventListener("click", () => moveGallery(-1));
modalClose?.addEventListener("click", closeGallery);

galleryModal?.addEventListener("click", (event) => {
  if (event.target === galleryModal) closeGallery();
});

document.addEventListener("keydown", (event) => {
  if (!galleryModal?.classList.contains("show")) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowRight") moveGallery(1);
  if (event.key === "ArrowLeft") moveGallery(-1);
});

/* 4. 꽃가마 애니메이션 */
const gamaSection = document.querySelector(".gama-section");
const gamaRunner = document.querySelector(".gama-runner");

if (gamaSection && gamaRunner) {
  if ("IntersectionObserver" in window) {
    const gamaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          gamaRunner.classList.add("is-running");
          gamaObserver.unobserve(gamaSection);
        }
      });
    }, { threshold: 0.3 });

    gamaObserver.observe(gamaSection);
  } else {
    gamaRunner.classList.add("is-running");
  }
}

/* 5. 계좌번호 열기 / 닫기 */
document.querySelectorAll(".account-toggle").forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const group = toggle.closest(".account-group");
    if (!group) return;

    group.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(group.classList.contains("open")));
  });
});

/* 6. 계좌번호 복사 */
async function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();

  if (!copied) throw new Error("copy failed");
}

document.querySelectorAll(".copy-account").forEach((button) => {
  button.addEventListener("click", async () => {
    const account = button.dataset.account;
    if (!account) return;

    const originalText = button.textContent;

    try {
      await copyText(account);
      button.textContent = "복사완료";
    } catch {
      button.textContent = "복사실패";
    }

    window.setTimeout(() => {
      button.textContent = originalText;
    }, 1500);
  });
});

/* 7. 카카오 웨딩홀 지도 */
const weddingMapContainer = document.getElementById("weddingMap");

function initWeddingMap() {
  const kakaoApi = window.kakao;

  if (!weddingMapContainer || !kakaoApi?.maps?.services) {
    console.warn("카카오 지도 API 또는 services 라이브러리를 불러오지 못했습니다.");
    return;
  }

  const map = new kakaoApi.maps.Map(weddingMapContainer, {
    center: new kakaoApi.maps.LatLng(35.18, 128.10),
    level: 4
  });

  const geocoder = new kakaoApi.maps.services.Geocoder();

  geocoder.addressSearch(
    "경남 진주시 진성면 동부로1307번길 37",
    (result, status) => {
      if (status !== kakaoApi.maps.services.Status.OK || !result[0]) {
        console.warn("웨딩홀 주소를 찾지 못했습니다.", status);
        return;
      }

      const position = new kakaoApi.maps.LatLng(result[0].y, result[0].x);
      map.setCenter(position);

      new kakaoApi.maps.Marker({
        map,
        position
      });

      new kakaoApi.maps.CustomOverlay({
        map,
        position,
        yAnchor: 2.2,
        content: '<div class="wedding-map-label">더 리움 웨딩홀</div>'
      });
    }
  );
}

if (weddingMapContainer && window.kakao?.maps) {
  if (typeof window.kakao.maps.load === "function") {
    window.kakao.maps.load(initWeddingMap);
  } else {
    initWeddingMap();
  }
}

/* =========================================
   배경음악 ON / OFF
========================================= */

if (
  musicToggle &&
  weddingMusic
) {

  musicToggle.addEventListener(
    "click",
    () => {

      const icon =
        musicToggle.querySelector("i");


      /* 음악이 재생 중이면 끄기 */

      if (!weddingMusic.paused) {

        weddingMusic.pause();

        musicToggle.classList.add(
          "is-muted"
        );

        musicToggle.setAttribute(
          "aria-pressed",
          "false"
        );

        musicToggle.setAttribute(
          "aria-label",
          "배경음악 켜기"
        );

        if (icon) {

          icon.className =
            "fa-solid fa-volume-xmark";

        }

        return;
      }


      /* 음악이 꺼져 있으면 다시 켜기 */

      weddingMusic
        .play()
        .then(() => {

          musicToggle.classList.remove(
            "is-muted"
          );

          musicToggle.setAttribute(
            "aria-pressed",
            "true"
          );

          musicToggle.setAttribute(
            "aria-label",
            "배경음악 끄기"
          );

          if (icon) {

            icon.className =
              "fa-solid fa-volume-high";

          }

        })
        .catch(() => { });

    }
  );

}