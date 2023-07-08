let Theme = `Dark`;

if (localStorage.getItem(`Cart`) == null) {

  localStorage.setItem(`Cart`, JSON.stringify([]));

}

function ToggleTheme() {

  if (Theme == `Light`) {

    document.querySelector(`:root`).classList.replace(`LightTheme`, `DarkTheme`);
    Theme = `Dark`;

  } else {

    document.querySelector(`:root`).classList.replace(`DarkTheme`, `LightTheme`);
    Theme = `Light`;

  }

};

function AddToCart(ItemName) {

  let Cart = JSON.parse(localStorage.getItem(`Cart`));
  let ItemObject = {};

  for (let Index = 0; Index < StoreItems.length; Index++) {

    if (StoreItems[Index].ItemName == ItemName) {

      ItemObject = StoreItems[Index];
      break;

    }

  }

  Cart.push(ItemObject);
  localStorage.setItem(`Cart`, JSON.stringify(Cart));

};
