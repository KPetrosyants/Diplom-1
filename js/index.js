// ===================================================BURGER
const buttonBurger = document.querySelector(".burger");
const accordPreload = document.querySelector(".accord__item--active-pleload");
const formPopup = document.querySelector("#formPopup");
const body = document.body;

const regexPhone =
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const regexEmail =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u;
const regexNumber = /[0-9]/;
const regexWord = /[A-Za-zА-Яа-яЁё]/;

// if (accordPreload) {
//   accordPreload.classList.add("accord__item--active");
//   accordPreload.lastElementChild.style.maxHeight =
//     accordPreload.lastElementChild.scrollHeight + "px";
// }

body.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest(".burger")) burgerOpener(e);
  if (target.closest(".accord__item")) accrodItemActiveted(e);
  if (
    target.closest(".popup-opener") ||
    target.classList.contains("popup") ||
    target.closest(".popup__clouser")
  ) {
    popupOpener(e);
  }
  if (
    target.closest(".form__calc-link") ||
    target.closest(".popup__body-calc") ||
    target.closest(".popup__clouser") ||
    target.classList.contains("popup")
  ) {
    popupCalcOpener(e);
  }

  if (target.closest(".issue-form__button")) {
    e.preventDefault();
    validateForm(".issue-form");
  }
});

formPopup.addEventListener("click", formSubit);

function formSubit(e) {
  e.preventDefault();
  const target = e.target;
  if (target.closest(".modal__button")) {
    if (validateForm("#formPopup")) {
      body.classList.remove("popup--opened");
    }
  }
}

function popupOpener(e) {
  e.preventDefault();
  const target = e.target;
  body.classList.add("popup--opened");

  if (target.classList.contains("popup") || target.closest(".popup__clouser")) {
    body.classList.remove("popup--opened");
  }
}
function popupCalcOpener(e) {
  e.preventDefault();
  const target = e.target;
  body.classList.add("popupCalc--opened");
  if (
    target.classList.contains("popup__body-calc") ||
    target.classList.contains("popup") ||
    target.closest(".popup__clouser")
  ) {
    body.classList.remove("popupCalc--opened");
    return;
  }
  if (target.closest(".popupCalc__button")) {
    const inputResult = document.getElementById("form-volume");
    inputResult.value = calculeteValue(e);
    body.classList.remove("popupCalc--opened");
  }
}
function calculeteValue(e) {
  let result = 1;
  const selected = document.getElementById("measurement").value;
  const valueInpyts = document.querySelectorAll(".popupCalc__input");
  for (let input of valueInpyts) {
    console.log(input.value);

    if (!regexNumber.test(input.value)) {
      return 0;
    }
    result = result * input.value;
  }
  switch (selected) {
    case "sm":
      result = result / Math.pow(10, 6);
      break;
    case "mm":
      result = result / Math.pow(10, 9);
      break;
    default:
      result;
      break;
  }
  return result;
}
function accrodItemActiveted(e) {
  if (e.target.closest(".footer__list-item")) e.preventDefault();

  const activeAccord = document.querySelector(".accord__item--active");
  const accorItemCliced = e.target.closest(".accord__item");
  const contentAccodr = accorItemCliced.lastElementChild;

  if (!accorItemCliced.classList.contains("accord__item--active")) {
    if (activeAccord) {
      activeAccord.classList.remove("accord__item--active");
      activeAccord.lastElementChild.style.maxHeight = 0;
    }
    accorItemCliced.classList.add("accord__item--active");
    contentAccodr.style.maxHeight = contentAccodr.scrollHeight + "px";
  } else {
    accorItemCliced.classList.remove("accord__item--active");
    contentAccodr.style.maxHeight = 0;
  }
}

var resizeTimeout;
window.addEventListener(
  "resize",
  function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      deactiveteBullet();
    }, 100);
  },
  true
);
function burgerOpener(e) {
  body.classList.toggle("burger--opened");
}

// ===================================================SECTION-CALC

const form = document.querySelector(".calc__form");

form.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest(".file__delete")) handleFileSelect(e);
  if (target.closest(".button-arrow") || target.closest(".modal__button-back")) {
    switchForms(e);
  }
});

function switchForms(e) {
  const target = e.target;

  const quantityActiveBullets = document.querySelectorAll(
    ".calc__form-bullet.calc__form-bullet--active"
  );
  const quantityDeactiveBullets = document.querySelectorAll(".calc__form-bullet");
  const bullet1 = quantityDeactiveBullets[0];
  const bullet2 = quantityDeactiveBullets[1];
  const bullet3 = quantityDeactiveBullets[2];

  if (target.closest(".modal__button-back")) {
    document.querySelector("#form2").classList.remove("active");
    document.querySelector("#form1").classList.add("active");
    bullet2.classList.remove("calc__form-bullet--active");
    return;
  }

  switch (quantityActiveBullets.length) {
    case 2:
      if (!validateForm("#form2")) return;
      bullet3.classList.add("calc__form-bullet--active");
      document.querySelector("#form2").classList.remove("active");
      document.querySelector("#form3").classList.add("active");

      break;

    default:
      if (!validateForm("#form1")) return;
      bullet2.classList.add("calc__form-bullet--active");
      document.querySelector("#form1").classList.remove("active");
      document.querySelector("#form2").classList.add("active");
      break;
  }
}

function validateForm(formName) {
  const form = document.querySelector(formName);
  const formInputsText = form.querySelectorAll("input[type=text]");
  const formInputsNumber = form.querySelectorAll("input[type=number]");
  const formInputsEmail = form.querySelectorAll("input[type=email]");
  const formTextarea = form.querySelectorAll("textarea");
  let allEl = [...formInputsText, ...formInputsNumber, ...formInputsEmail];
  if (formTextarea) {
    allEl = [...allEl, ...formTextarea];
  }

  for (let input of allEl) {
    input.classList.remove("input--err");
    input.classList.remove("noValid");
    if (
      input.value == "" &&
      (input.classList.contains("regexWord") ||
        input.classList.contains("regexEmail") ||
        input.classList.contains("regexNumber"))
    ) {
      input.classList.add("input--err");
    }
    if (
      (input.classList.contains("regexWord") &&
        !regexWord.test(input.value) &&
        input.value != "") ||
      (input.classList.contains("regexEmail") &&
        !regexEmail.test(input.value) &&
        input.value != "") ||
      (input.classList.contains("regexNumber") &&
        !regexNumber.test(input.value) &&
        input.value != "") ||
      (input.classList.contains("phone-mask") && input.value.length != 16)
    ) {
      input.classList.add("noValid");
    }
  }
  for (let input of allEl) {
    if (input.classList.contains("input--err") || input.classList.contains("noValid")) return false;
  }
  for (let input of allEl) {
    input.value = "";
  }

  return true;
}
// ====================================================
// ====================================================
// ====================================================
// ====================================================

function handleFileSelect(evt) {
  const previewArea = document.querySelector(".file__preview");
  if (evt.target.closest(".file__delete")) {
    previewArea.innerHTML = "";
    return;
  }
  const file = evt.target.files; // FileList object
  const f = file[0];
  // Only process image files.
  if (!f.type.match("image.*")) {
    alert("Image only please....");
  }
  const reader = new FileReader();
  // Closure to capture the file information.
  reader.onload = (function (theFile) {
    return function (e) {
      // Render thumbnail.
      const span = document.createElement("span");
      span.innerHTML = [
        '<img class="thumb" title="',
        escape(theFile.name),
        '" src="',
        e.target.result,
        '" />',
      ].join("");
      previewArea.insertBefore(span, null);
    };
  })(f);
  // Read in the image file as a data URL.
  reader.readAsDataURL(f);
}
document.getElementById("form-file").addEventListener("change", handleFileSelect, false);

// ====================================================
// ====================================================
// ====================================================
// ====================================================
// ====================================================

const element = document.querySelectorAll(".phone-mask");
const maskOptions = {
  mask: "+{7}(000)000-00-00",
  placeholderChar: "+{7}(000)000-00-00",
};
element.forEach((e) => {
  const mask = IMask(e, maskOptions);
});

// ====================================================
// ====================================================
// ====================================================
const heroSwiper = new Swiper(".hero__slider", {
  speed: 400,
  spaceBetween: 100,
  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  //   autoplay: {
  //     delay: 3000,
  //   },
  pagination: {
    el: ".hero__pagination",
    clickable: true,
    bulletClass: "hero__pagination-item",
    bulletActiveClass: "hero__pagination-item--active",
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "</span>";
    },
  },
  navigation: {
    nextEl: ".hero__button-next",
    prevEl: ".hero__button-prev",
  },
});

const benefitsSwiper = new Swiper(".benefits-swiper", {
  speed: 400,
  slidesPerView: 1,
  grid: {
    fill: "rows",
    rows: 1,
  },
  pagination: {
    el: ".benefits-pagination",
    clickable: true,
    bulletClass: "benefits-pagination-item",
    bulletActiveClass: "benefits-pagination-item--active",
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "</span>";
    },
  },

  breakpoints: {
    601: {
      slidesPerView: 2,
      slideToClickedSlide: true,
      grid: {
        fill: "rows",
        rows: 2,
      },
    },

    801: {
      slidesPerView: 3,
      slideToClickedSlide: true,
      grid: {
        fill: "rows",
        rows: 2,
      },
    },

    1001: {
      slidesPerView: 4,
      slideToClickedSlide: true,
      grid: {
        fill: "rows",
        rows: 2,
      },
    },
  },
});

const deliverySwiper = new Swiper(".delivery__swiper", {
  speed: 500,
  slidesPerView: 1,

  spaceBetween: 30,
  navigation: {
    nextEl: ".delivery__swiper-button-next",
    prevEl: ".delivery__swiper-button-prev",
  },
  breakpoints: {
    600: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    700: {
      spaceBetween: 60,
      slidesPerView: 2,
    },

    1001: {
      slidesPerView: 3,
    },
  },
});

const serviceSwiper = new Swiper(".service__swiper", {
  speed: 500,
  slidesPerView: 1,

  spaceBetween: 30,
  navigation: {
    nextEl: ".service__swiper-button-next",
    prevEl: ".service__swiper-button-prev",
  },
  breakpoints: {
    600: {
      spaceBetween: 30,
      slidesPerView: 2,
    },
    700: {
      spaceBetween: 60,
      slidesPerView: 2,
    },

    1001: {
      slidesPerView: 3,
    },
  },
});

function deactiveteBullet() {
  const activeBullet = document.querySelector(".benefits-pagination-item--active");

  if (document.body.clientWidth > 1000 && activeBullet) {
    activeBullet.classList.remove("benefits-pagination-item--active");
    activeBullet.classList.remove("benefits-pagination-item");
  }
}
deactiveteBullet();
