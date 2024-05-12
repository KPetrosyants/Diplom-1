// ===================================================BURGER
const buttonBurger = document.querySelector(".burger");
const body = document.body;
const regexPhone =
  /^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;
const regexEmail =
  /^((([0-9A-Za-z]{1}[-0-9A-z.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}.){1,2}[-A-Za-z]{2,})$/u;
const regexNumber = /[0-9]/;
const regexWord = /[A-Za-zА-Яа-яЁё]/;

body.addEventListener("click", (e) => {
  const target = e.target;
  if (target.closest(".burger")) burgerOpener(e);
});

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
  const formInputs = form.querySelectorAll("input[type=text]");

  for (let input of formInputs) {
    input.classList.remove("input--err");
    input.classList.remove("noValid");
    if (input.value == "") {
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
  for (let input of formInputs) {
    if (input.classList.contains("input--err") || input.classList.contains("noValid")) return false;
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

const element = document.querySelector(".phone-mask");
const maskOptions = {
  mask: "+{7}(000)000-00-00",
  placeholderChar: "+{7}(000)000-00-00",
};
const mask = IMask(element, maskOptions);

// ====================================================
// ====================================================
// ====================================================
const heroSwiper = new Swiper(".hero__slider", {
  speed: 400,
  spaceBetween: 100,
  loop: true,
  slidesPerView: "auto",
  centeredSlides: true,
  autoplay: {
    delay: 3000,
  },
  // If we need pagination
  pagination: {
    el: ".hero__pagination",
    clickable: true,
    bulletClass: "hero__pagination-item",
    bulletActiveClass: "hero__pagination-item--active",
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + "</span>";
    },
  },

  // Navigation arrows
  navigation: {
    nextEl: ".hero__button-next",
    prevEl: ".hero__button-prev",
  },
});
