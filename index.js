let cardsContainer = document.querySelector(".main-content .cards-containers");
let numOfItemsInCart = document.querySelector(".num-of-items-in-cart");
let counter = 0;
let cardsArr = [
  {
    name: "Black T-Shirt",
    price: 40,
    isAdded: false,
    image: `<img
  src="./Assetes/images/cards/1-black tshirt.png"
  class="card-img-top"
  alt="..."
/>`,
  },
  {
    name: "Black Watch",
    price: 140,
    isAdded: false,
    image: `<img
  src="./Assetes/images/cards/2-watch.png"
  class="card-img-top"
  alt="..."
/>`,
  },
  {
    name: "Blue Back Bag",
    price: 80,
    isAdded: false,
    image: `<img
  src="./Assetes/images/cards/3-blue back bag.png"
  class="card-img-top"
  alt="..."
/>`,
  },
  {
    name: "Gaming Keyboard",
    price: 58,
    isAdded: false,
    image: `<img
  src="./Assetes/images/cards/4-gaming keyboard.png"
  class="card-img-top"
  alt="..."
/>`,
  },
  {
    name: "Modern Headset",
    price: 100,
    isAdded: false,
    image: `<img
  src="./Assetes/images/cards/5-headset.png"
  class="card-img-top"
  alt="..."
/>`,
  },
  {
    name: "Purple Hand Bag",
    price: 24,
    isAdded: false,
    image: `<img
  src="./Assetes/images/cards/6-hand bag.png"
  class="card-img-top"
  alt="..."
/>`,
  },
  {
    name: "Red T-Shirt",
    price: 36,
    isAdded: false,
    image: `<img
  src="./Assetes/images/cards/7-red tshirt.png"
  class="card-img-top"
  alt="..."
/>`,
  },
  {
    name: "Smart Phone",
    price: 200,
    isAdded: false,
    image: `<img
  src="./Assetes/images/cards/8-phone.png"
  class="card-img-top"
  alt="..."
/>`,
  },
];
let shoppingCartArr = [];
const currentPage = window.location.pathname;
if (currentPage.includes("index.html")) {
  renderCardsContainer();
}
function renderCardsContainer() {
  cardsContainer.innerHTML = "";
  cardsArr.forEach((ele, index) => {
    cardsContainer.innerHTML += `
        <div class="card col-12 col-md-6 col-lg-3">
          ${ele.image}
          <div class="card-body">
            <h5 onclick="openItemPage(${index})" style="cursor: pointer;" class="card-title">${
      ele.name
    }</h5>
            <h5 class="price text-danger">$${ele.price}</h5>
            <p class="card-text">
              Quick example text to build on the card title and make up the bulk
              of the card's content.
            </p>
            <a onclick="addtocart(${index})" href="#" class="btn ${
      ele.isAdded ? "btn-danger" : "btn-primary"
    } w-100 p-3">${ele.isAdded ? "Remove From Cart" : "Add to Cart"}</a>
          </div>
        </div>
        `;
  });
}

function addtocart(index) {
  cardsArr[index].isAdded = !cardsArr[index].isAdded;
  let obj = {
    name: cardsArr[index].name,
    price: cardsArr[index].price,
    image: cardsArr[index].image,
    quantity: 1,
    tax: cardsArr[index].price / 15,
    shipping: 15,
    totalPrice: cardsArr[index].price,
  };

  if (cardsArr[index].isAdded) {
    shoppingCartArr.push(obj);
    counter++;
  } else {
    let indexOfItem = shoppingCartArr.findIndex(
      (ele) => ele.name == cardsArr[index].name
    );
    shoppingCartArr.splice(indexOfItem, 1);
    counter--;
  }
  numOfItemsInCart.innerText = counter;
  renderCardsContainer();
}

/* ///////////// */
let productPage = document.querySelector(".main-content .product-page");
function openItemPage(itemIndex) {
  cardsContainer.innerHTML = "";
  productPage.innerHTML = `
        <div class="container d-flex flex-wrap">
              <div class="image col-12 col-md-6">
                ${cardsArr[itemIndex].image}
              </div>
              <div class="content col-12 col-md-6 d-flex flex-column gap-4 ps-md-2">
                <h2 class="card-title">${cardsArr[itemIndex].name}</h2>
                <h2 class="price text-danger">$${cardsArr[itemIndex].price}</h2>
                <p class="card-text">
                  Quick example text to build on the card title and make up the bulk
                  of the card's content.
                </p>
                <div class="links d-flex flex-column flex-md-row gap-2">
                  <a
                    href="#"
                    class="btn btn-white text-primary border-primary p-3 w-100 w-md-50"
                    >Add To Wishlist</a
                  >
                  <a onclick="addtocart(${itemIndex})" href="#" class="btn ${
    cardsArr[itemIndex].isAdded ? "btn-danger" : "btn-primary"
  } w-100 p-3">${
    cardsArr[itemIndex].isAdded ? "Remove From Cart" : "Add to Cart"
  }</a>
                </div>
                <div class="shipping-info d-flex justify-content-around gap-4">
                  <div class="d-flex">
                    <i class="fa-solid fa-truck-fast"></i>
                    <div>
                      <p>Free Delivery</p>
                      <p>1-2 Days</p>
                    </div>
                  </div>
                  <div class="d-flex">
                    <i class="fa-solid fa-store"></i>
                    <div>
                      <p>In Stock</p>
                      <p>Today</p>
                    </div>
                  </div>
                  <div class="d-flex">
                    <i class="fa-solid fa-certificate"></i>
                    <div>
                      <p>Guaranteed</p>
                      <p>1 Year</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
}
/* ///////// */
function backToCardsPage() {
  productPage.innerHTML = "";
  if (checkout.classList.contains("d-block")) {
    checkout.classList.replace("d-block", "d-none");
  }
  //   checkout.innerHTML = "";
  renderCardsContainer();
}
/* /////////////// */

let checkout = document.querySelector(".main-content .check-out");
let cartList = document.querySelector(
  ".main-content .check-out .left .cart-list"
);
let fatora = document.querySelector(".check-out .right .fatora");

function renderCart() {
  let subTotalValue = 0;
  let taxValue = 0;
  let shippingValue = 0;
  cardsContainer.innerHTML = "";
  productPage.innerHTML = "";
  checkout.classList.replace("d-none", "d-block");
  /////
  cartList.innerHTML = "";
  shoppingCartArr.forEach((ele, index) => {
    cartList.innerHTML += `
    <div class="cart-item border d-flex justify-content-between">
                <div class="left d-flex">
                  <div class="image p-2">
                    ${ele.image}
                  </div>
                  <div class="info d-flex flex-column">
                    <p class="item-name">${ele.name}</p>
                    <p class="item-price">${ele.price}</p>
                  </div>
                </div>
                <div class="right d-flex flex-column p-2">
                  <button onclick="deleteItem(${index})" class="remove-item btn mb-0 text-end">
                    <i class="fa-solid fa-x"></i>
                  </button>
                  <p class="d-flex gap-3 p-3 fs-4">
                    <button onclick="decreaseQuantity(${index})" class="decrease btn">-</button
                    ><span class="item-quantity">${ele.quantity}</span
                    ><button onclick="increaseQuantity(${index})" class="increase btn">+</button>
                  </p>
                </div>
              </div>
    `;
    subTotalValue += ele.totalPrice;
    taxValue += ele.tax;
    shippingValue += ele.shipping;
  });
  fatora.innerHTML = `
  <h4>Order Summary</h4>
              <ul>
                <li class="d-flex justify-content-between">
                  <p>SubTotal</p>
                  <p>$${subTotalValue}</p>
                </li>
                <li class="d-flex justify-content-between">
                  <p>Estimated Tax</p>
                  <p id="tax">$${taxValue.toFixed(2)}</p>
                </li>
                <li class="d-flex justify-content-between">
                  <p>Estimated shipping</p>
                  <p>$${shippingValue}</p>
                </li>
                <li class="text-primary d-flex justify-content-between">
                  <p>Total</p>
                  <p>$${(subTotalValue + taxValue + shippingValue).toFixed(
                    2
                  )}</p>
                </li>
              </ul>
              <a href="" class="w-100 btn btn-primary">CheckOut</a>
  `;
}

function decreaseQuantity(index) {
  if (shoppingCartArr[index].quantity > 1) {
    shoppingCartArr[index].quantity--;
    //
    shoppingCartArr[index].totalPrice =
      shoppingCartArr[index].price * shoppingCartArr[index].quantity;
    shoppingCartArr[index].tax =
      (shoppingCartArr[index].price / 15) * shoppingCartArr[index].quantity;
    shoppingCartArr[index].shipping = 15 * shoppingCartArr[index].quantity;
    //
  } else {
    let itemIndex = cardsArr.findIndex(
      (ele) => ele.name === shoppingCartArr[index].name
    );
    cardsArr[itemIndex].isAdded = false;
    shoppingCartArr.splice(index, 1);
    counter--;
    numOfItemsInCart.innerText = counter;
  }
  renderCart();
}
function increaseQuantity(index) {
  shoppingCartArr[index].quantity++;
  //
  shoppingCartArr[index].totalPrice =
    shoppingCartArr[index].price * shoppingCartArr[index].quantity;
  shoppingCartArr[index].tax =
    (shoppingCartArr[index].price / 15) * shoppingCartArr[index].quantity;
  shoppingCartArr[index].shipping = 15 * shoppingCartArr[index].quantity;
  //
  renderCart();
}

function deleteItem(index) {
  let itemIndex = cardsArr.findIndex(
    (ele) => ele.name === shoppingCartArr[index].name
  );
  cardsArr[itemIndex].isAdded = false;
  shoppingCartArr.splice(index, 1);
  counter--;
  numOfItemsInCart.innerText = counter;
  renderCart();
}
