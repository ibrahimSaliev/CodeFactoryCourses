const products = [
  {
    name: "HTML Course",
    image: "html-icon-logo.png",
    price: 800.99,
    qtty: 1,
  },
  {
    name: "CSS Course",
    image: "css-icon-logo.png",
    price: 500.5,
    qtty: 1,
  },
  {
    name: "JS Course",
    image: "js-icon-logo.png",
    price: 2100.0,
    qtty: 1,
  },
];
//current object formatter
const currencyFormater = new Intl.NumberFormat("de-AT", {
  style: "currency",
  currency: "EUR",
});
// const today = new Date()

const updateDom = () => {
  let productsRow = document.querySelector(".products");
  productsRow.innerHTML = "";

  for (let product of products) {
    // console.log(product.name);
    productsRow.innerHTML += `
    <div class="card product col my-4" style="width: 300px;">
                  <img class="card-img-top mt-2 px-3" src="./images/${
                    product.image
                  }" alt="${product.name}">
                  <div class="card-body px-3 py-0">
                      <h5 class="card-title">${product.name}</h5>
                      <p class="card-text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero, libero.</p>
                      <p class="card-text h3 text-end">${currencyFormater.format(
                        product.price
                      )}</p>
                      <p class="card-text3 d-flex justify-content-end"><button class="btn w-75 product-button"><i
                                  class="fs-4 bi bi-cart-plus"></i> Add to cart</button></p>
  
                  </div>
    `;
  }
  const addToCartBtn = document.querySelectorAll(".product-button");
  // console.log(addToCartBtn);

  addToCartBtn.forEach((btn, index) => {
    // console.log(btn);
    btn.addEventListener("click", () => {
      addToCart(products[index]);
    });
  });
};
updateDom();

const cart = [];

const addToCart = (product) => {
  // console.log(products[index]);
  // console.table(cart);
  if (cart.find((item) => item.name == product.name)) {
    product.qtty++;
  } else {
    cart.push(product);
  }
  // console.table(cart);
  createRows();
  cartTotal();
};

const createRows = () => {
  let result = "";
  for (let item of cart) {
    result += `
    <div class="cart-row row gx-0">
                <div class="cart-item col-6 ps-md-5 my-2 d-flex align-items-center justify-content-start">
                    <img class="cart-item-image" src="./images/${
                      item.image
                    }" width="100" height="100" alt="${item.name}">
                    <div class="cart-item-title h5 ms-2">${item.name}</div>
                </div>
                <div class="cart-qtty-action col-2 d-flex justify-content-center align-items-center">
                    <div class="d-flex">
                        <i class="plus fs-5 bi bi-plus-circle-fill"></i>
                    </div>
                    <div class="text-center m-0 cart-quantity h4 w-25">${
                      item.qtty
                    }</div>
                    <div class="d-flex">
                        <i class="minus fs-5 bi bi-dash-circle-fill"></i>
                    </div>
                </div>
                <div class="col-1 d-flex justify-content-start align-items-center">
                    <i class="del fs-4 bi bi-trash3-fill text-danger"></i>
                </div>
                <div class="cart-price col-3 h5 my-auto text-end p-2 pe-sm-5">${currencyFormater.format(
                  item.price
                )}</div>
            </div>
    `;
  }
  document.querySelector(".cart-items").innerHTML = result;
  const plusBtns = document.querySelectorAll(".plus");
  plusBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      plusQtty(index);
    });
  });
  const minusBtns = document.querySelectorAll(".minus");
  minusBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      minusQtty(index);
    });
  });

  const deleteItems = document.querySelectorAll(".del");
  deleteItems.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      deleteItem(index);
    });
  });
};

const plusQtty = (index) => {
  cart[index].qtty++;
  createRows();
  cartTotal();
};

const minusQtty = (index) => {
  if (cart[index].qtty == 1) {
    cart.splice(index, 1);
  } else {
    cart[index].qtty--;
  }
  createRows();
  cartTotal();
};
const deleteItem = (index) => {
  cart[index].qtty = 1;
  cart.splice(index, 1);
  createRows();
  cartTotal();
};
const cartTotal = () => {
  let total = 0;
  for (let item of cart) {
    total += item.price * item.qtty;
  }
  document.querySelector("#price").innerHTML = currencyFormater.format(total);
};

let sort = document.querySelector(".sort");

const sortItems = () => {
  products.sort((a, b) => {
    return a.price - b.price;
  });
  // console.table(products);
  updateDom();
};

sort.addEventListener("click", sortItems);
