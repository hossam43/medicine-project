import { ob } from "./intersectionObserver.js";

///////////////////////////////////////////////////////////
// // Set current year
// const yearEl = document.querySelector(".year");
// const currentYear = new Date().getFullYear();
// yearEl.textContent = currentYear;

///////////////////////////////////////////////////////////
// Make mobile navigation work

//Click: btn-mobile-nav

//Add: nav-open

//ON: .header-section

const btnNavEl = document.querySelector(".btn-mobile-nav");
const headerEl = document.querySelector(".header-section");

btnNavEl.addEventListener("click", () => {
  headerEl.classList.toggle("nav-open");
});

/////////////////////////////////////////
// Stick navigation

const sectionHeroEl = document.querySelector(".hero-section");
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];
    // console.log(ent);
    if (ent.isIntersecting === false) {
      document.body.classList.add("sticky");
    }
    if (ent.isIntersecting === true) {
      document.body.classList.remove("sticky");
    }
  },
  {
    // in the viewport
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);
obs.observe(sectionHeroEl);
/////////////////////////////////////////

// Shopping cart

const iconCart = document.querySelector(".nav-cta");
const close = document.querySelector(".close");
const body = document.querySelector("body");
const productsContainerHTML = document.querySelector(".productsContainer");
let listCartHTML = document.querySelector(".listCart");
let cartCounter = document.querySelector(".count");

let listProducts = [];
let carts = [];

// show and hide the Cart Table
iconCart.addEventListener("click", () => body.classList.toggle("showCart"));

// hide the Cart Table
close.addEventListener("click", () => body.classList.remove("showCart"));
// productsContainer
const addDataHTML = () => {
  productsContainerHTML.innerHTML = "";
  if (listProducts.length > 0) {
    listProducts.forEach((product) => {
      let newProduct = document.createElement("div");
      newProduct.classList.add("item");
      newProduct.dataset.id = product.id;
      newProduct.innerHTML = `<div class="product-img-box">
      <img
        src="${product.image}"
        alt=""
        class="product-img"
      />
    </div>
    <p class="product-name">${product.name}</p>
    <p class="product-price"><strong>$${product.price.toFixed(2)}</strong></p>
    <button
      type="submit"
      name="add"
      class="add-to-cart btn btn--sm"
      tabindex="0"
    >
      Add
    </button>`;

      productsContainerHTML.appendChild(newProduct);
    });
  }

  productsContainerHTML.addEventListener("click", (event) => {
    let positionClick = event.target;
    console.log(positionClick);
    if (positionClick.classList.contains("add-to-cart")) {
      // becuese the button is a child of the item div
      let productId = positionClick.parentElement.dataset.id;
      // pass it to add toCart
      addToCart(productId);
    }
  });
};

const addToCart = (productId) => {
  let positionThisProductInCart = carts.findIndex(
    (value) => value.product_id == productId
  );
  if (carts.length <= 0) {
    carts = [
      {
        product_id: productId,
        quantity: 1,
      },
    ];
  } else if (positionThisProductInCart < 0) {
    carts.push({
      productId: productId,
    });
  } else {
    carts[positionThisProductInCart].quantity =
      carts[positionThisProductInCart].quantity + 1;
  }
  console.log(carts);
  addCartsToHTML();
};

const addCartsToHTML = () => {
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  if (carts.length > 0) {
    carts.forEach((cart) => {
      totalQuantity = totalQuantity + cart.quantity;

      let positionProduct = listProducts.findIndex(
        (value) => value.id == cart.productId
      );

      if (positionProduct !== -1) {
        let info = listProducts[positionProduct];
        let newCart = document.createElement("div");
        newCart.classList.add("item");
        newCart.innerHTML = `<div class="image">
          <img src="${info.image}" alt="">
          <div class="name">${info.name}</div>
          <div class="totalPrice">$${info.price}</div>
          <div class="quantity">
            <span class="minus"></span>
            <span>${cart.quantity}</span>
            <span class="plus"></span>
          </div>`;
        listCartHTML.appendChild(newCart);
      }
      console.log(cart.quantity);
    });
  }

  cartCounter.innerText = totalQuantity;
};

const initApp = () => {
  // get data from json
  // works with http
  fetch("product.json")
    .then((response) => response.json())
    .then((responseData) => {
      listProducts = responseData;
      console.log(listProducts);
      addDataHTML();
    });
};

initApp();

// Reveal section

const allSection = document.querySelectorAll(".section--reveal");
const optionsList = {
  root: null,
  threshold: 0.1,
};
ob(allSection, "element--hidden", optionsList);

const smoothScrollNav = (parent, children) => {
  document.querySelector(parent).addEventListener("click", (e) => {
    e.preventDefault();
    const id = e.target.getAttribute("href");
    // Matching
    if (e.target.classList.contains(children)) {
      document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    }
  });
};

smoothScrollNav(".main-nav", "main-nav-link");

// slider
const sliderCreator = function () {
  const slider = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");
  let curSlide = 0;
  const maxSlide = slides.length;
  let startX;

  // Functions
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) =>
        //-100%
        (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      // 1
      curSlide++;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) curSlide = maxSlide - 1;
    else curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };
  init();

  // Event Handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);
  // Swipe detection for touch devices
  slider.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });
  slider.addEventListener("touchmove", function (e) {
    if (!startX) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (diff > 0) {
      // Swiped left
      nextSlide();
      activateDot(curSlide);
    }
    // Swiped right
    else {
      prevSlide();
      activateDot(curSlide);
    }
    startX = null; // Reset startX
  });

  slider.addEventListener("touchend", function () {
    startX = null; // Reset startX
  });

  document.addEventListener("keydown", function (e) {
    e.key === "ArrowLeft" && prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      activateDot(slide);
      goToSlide(slide);
    }
  });
};
sliderCreator();
