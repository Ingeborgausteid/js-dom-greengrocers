const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35
    }
  ],
  cart: []
};

function renderStoreItems() {
  state.items.map((i) => {
    console.log(i);
    el = document.createElement("li");
    el.innerHTML =  `<div class="store--item-icon">
    <img src="assets/icons/${i.id}.svg" alt="${i.name}" />
    </div>
    <button id="${i.id}" onClick="addToCart(this.id)">Add to cart</button>`
    console.log(document.getElementsByClassName("item-list store--item-list"));
    document.getElementsByClassName("item-list store--item-list")[0].appendChild(el);
  });
}

function addToCart(item) {
  const isIncart = state.cart.find( c => c.id === item);
  if(isIncart === undefined){
    el = state.items.find( x => x.id === item);
    el.qty = 1;
    state.cart.push(el);
  }
  else isIncart.qty += 1;
  console.log(state.cart.length);
  renderCartItems();
}

function renderCartItems() {
  const cartItems = document.getElementsByClassName("item-list cart--item-list")[0]; 
  cartItems.innerHTML = "";
  state.cart.map((cartItem) => {
    el = document.createElement("li");
    el.innerHTML = `<img
    class="cart--item-icon"
    src="assets/icons/${cartItem.id}.svg"
    alt="${cartItem.name}"
    /> <p>${cartItem.name}</p>
    <button id="${cartItem.id}" class="quantity-btn remove-btn center" onClick="reduceNumberofItems(this.id)">-</button>
    <span class="quantity-text center">${cartItem.qty}</span>
    <button id="${cartItem.id}" class="quantity-btn add-btn center" onClick="increaseNumberofItems(this.id)">+</button>`
    console.log(document.getElementsByClassName("item-list cart--item-list"));
    document.getElementsByClassName("item-list cart--item-list")[0].appendChild(el);
    });
  
    calculateTotalCost();
}

function calculateTotalCost() {
  const cartTotal = document.getElementsByClassName("total-number")[0]; 
  cartTotal.innerHTML = "";
  let totalCost = 0
  if(state.cart.length === 0) {
    totalCost = 0.00;
    el = document.createElement("span");
    el.innerHTML = `£${totalCost}`
  }
  
  state.cart.map((cartItem) => {
    totalCost += cartItem.price * cartItem.qty;
  });

  el = document.createElement("span");
  el.innerHTML = `£${totalCost.toFixed(2)}`
  console.log(document.getElementsByClassName("total-number"));
  document.getElementsByClassName("total-number")[0].appendChild(el);
  console.log(totalCost)
}

function reduceNumberofItems(item){
  getitem = state.cart.find( i => i.id === item )
  if(getitem.qty > 1){
    getitem.qty -= 1
  } else if(getitem.qty <= 1){
    getindex = state.cart.indexOf(getitem)
    state.cart.splice(getindex, 1)
  }
  
  renderCartItems();
}

function increaseNumberofItems(item){
  getitem = state.cart.find(i => i.id === item )
  getitem.qty += 1
  renderCartItems();
}

renderStoreItems();
calculateTotalCost();