const state = {
  items: [
    {
      id: "001-beetroot",
      name: "beetroot",
      price: 0.35,
      category: "vegetable"
    },
    {
      id: "002-carrot",
      name: "carrot",
      price: 0.35,
      category: "vegetable"
    },
    {
      id: "003-apple",
      name: "apple",
      price: 0.35,
      category: "fruit"
    },
    {
      id: "004-apricot",
      name: "apricot",
      price: 0.35,
      category: "fruit"
    },
    {
      id: "005-avocado",
      name: "avocado",
      price: 0.35,
      category: "fruit"
    },
    {
      id: "006-bananas",
      name: "bananas",
      price: 0.35,
      category: "fruit"
    },
    {
      id: "007-bell-pepper",
      name: "bell pepper",
      price: 0.35,
      category: "vegetable"
    },
    {
      id: "008-berry",
      name: "berry",
      price: 0.35,
      category: "berry"
    },
    {
      id: "009-blueberry",
      name: "blueberry",
      price: 0.35,
      category: "berry"
    },
    {
      id: "010-eggplant",
      name: "eggplant",
      price: 0.35,
      category: "vegetable"
    }
  ],
  cart: [],
  filters: [
    {
      category: "Fruits"
    },
    {
      category: "Vegetables"
    },
    {
      category: "Berries"
    },
    {
      category: "All items"
    }
  ]
};

function renderStoreItems() {
  state.items.map((i) => {
    el = document.createElement("li");
    el.innerHTML =  `<div class="store--item-icon">
    <img src="assets/icons/${i.id}.svg" alt="${i.name}" />
    </div>
    <button id="${i.id}" onClick="addToCart(this.id)">Add to cart</button>`
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
  document.getElementsByClassName("total-number")[0].appendChild(el);
  
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

function renderFilterButtons() {
  state.filters.map((filter) => {
      el = document.createElement("span");
      el.innerHTML = `<button id="${filter.category}" class="filter-store-items-button center" onClick="filterStoreItems(this.id)">${filter.category}</button>`
      document.getElementsByClassName("filter-store-items")[0].appendChild(el);
  });
}

function renderFruitItems() {
  const storeitems = document.getElementsByClassName("item-list store--item-list")[0]; 
  storeitems.innerHTML = "";
  state.items.map((i) => {
    if(i.category === 'fruit'){
      el = document.createElement("li");
      el.innerHTML = `<div class="store--item-icon">
      <img src="assets/icons/${i.id}.svg" alt="${i.name}" />
      </div>
      <button id="${i.id}" onClick="addToCart(this.id)">Add to cart</button>`
      document.getElementsByClassName("item-list store--item-list")[0].appendChild(el);
    }
  });
}

function renderBerryItems() {
  const storeitems = document.getElementsByClassName("item-list store--item-list")[0]; 
  storeitems.innerHTML = "";
  state.items.map((i) => {
    if(i.category === 'berry'){
      el = document.createElement("li");
      el.innerHTML = `<div class="store--item-icon">
      <img src="assets/icons/${i.id}.svg" alt="${i.name}" />
      </div>
      <button id="${i.id}" onClick="addToCart(this.id)">Add to cart</button>`
      document.getElementsByClassName("item-list store--item-list")[0].appendChild(el);
    }
  });

}

function renderVegetableItems() {
  const storeitems = document.getElementsByClassName("item-list store--item-list")[0]; 
  storeitems.innerHTML = "";
  state.items.map((i) => {
    if(i.category === 'vegetable'){
      el = document.createElement("li");
      el.innerHTML = `<div class="store--item-icon">
      <img src="assets/icons/${i.id}.svg" alt="${i.name}" />
      </div>
      <button id="${i.id}" onClick="addToCart(this.id)">Add to cart</button>`
      document.getElementsByClassName("item-list store--item-list")[0].appendChild(el);
    }
  });

}

function filterStoreItems(filter) {
  if(filter === 'Fruits'){
    renderFruitItems();
  }
  if(filter === 'Vegetables'){
    renderVegetableItems();
  }
  if(filter === 'Berries'){
    renderBerryItems();
  }
  if(filter === 'All items'){
    const storeitems = document.getElementsByClassName("item-list store--item-list")[0]; 
    storeitems.innerHTML = "";
    renderStoreItems();
  }
}

renderStoreItems();
renderFilterButtons();
calculateTotalCost();