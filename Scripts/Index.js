let Theme = `Dark`;

if (localStorage.getItem(`Theme`) == null) {

  localStorage.setItem(`Theme`, Theme);

} else {

  Theme = localStorage.getItem(`Theme`);
  if (Theme == `Dark`) document.querySelector(`:root`).classList.replace(`LightTheme`, `DarkTheme`);
  if (Theme == `Light`) document.querySelector(`:root`).classList.replace(`DarkTheme`, `LightTheme`);

}

if (localStorage.getItem(`Cart`) == null) {

  localStorage.setItem(`Cart`, JSON.stringify([]));

}

function ToggleTheme() {

  if (Theme == `Light`) {

    document.querySelector(`:root`).classList.replace(`LightTheme`, `DarkTheme`);
    Theme = `Dark`;
    localStorage.setItem(`Theme`, Theme);

  } else {

    document.querySelector(`:root`).classList.replace(`DarkTheme`, `LightTheme`);
    Theme = `Light`;
    localStorage.setItem(`Theme`, Theme);

  }

};

function Notify(Positivity, Message) {

  let NewElement = document.createElement(`div`);
  NewElement.innerHTML = Message;
  NewElement.setAttribute(`style`, `

  background: var(--Color4);
  border-left: 7.5px ${(Positivity) ? `#59FF64` : `#FF9F82`} solid;
  color: #EEEEEE;
  border-radius: var(--HighBorderRadius);
  position: fixed;
  right: 1%;
  bottom: 1%;

  `);

  document.body.appendChild(NewElement);

  setTimeout(function() {
    NewElement.remove();
  }, 5000);

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

console.log(window.location.pathname);

function ClearCart() {

  localStorage.setItem(`Cart`, JSON.stringify([]));
  Cart = JSON.parse(localStorage.getItem(`Cart`));
  document.querySelector(`#CheckoutStartButton`).setAttribute(`disabled`, `true`);
  RenderItems(Cart);
  RenderCartData(EvaluateData(JSON.parse(localStorage.getItem(`Cart`))))

};

function StartCheckout() {

  document.querySelector(`form#CheckoutForm`).style.display = `initial`;
  document.querySelector(`button#CheckoutStartButton`).style.display = `none`;

};

function Purchase() {

  ClearCart();

};

function EvaluateData(Data = []) {

  let Evaluation = {
    TotalPrice_INR: 0,
    Items: Data.length,
    ItemKinds: 0
  };

  if (Data.length != 0) {

    let IndexedItemKinds = [];

    for (let Index = 0; Index < Data.length; Index++) {

      let Element = Data[Index];

      Evaluation.TotalPrice_INR += Number(Element.Price.replace(`₹`, ``));

      if (!IndexedItemKinds.includes(Element.ItemName)) {

        IndexedItemKinds.push(Element.ItemName);
        Evaluation.ItemKinds++;

      }

    }

    Evaluation.TotalPrice_INR = `₹${Evaluation.TotalPrice_INR}`;

  }

  return Evaluation;

};

function RenderCartData(EvaluationReport) {

  document.querySelector(`span#CartData_TotalPrice`).innerHTML = EvaluationReport.TotalPrice_INR;
  document.querySelector(`span#CartData_Items`).innerHTML = EvaluationReport.Items;
  document.querySelector(`span#CartData_ItemKinds`).innerHTML = EvaluationReport.ItemKinds;

};

if (window.location.pathname == `/Cart.html`) RenderCartData(EvaluateData(JSON.parse(localStorage.getItem(`Cart`))));

var prevScrollPos = window.pageYOffset || document.documentElement.scrollTop;
var NavigationBar = document.querySelector(`#NavigationBar`);

window.addEventListener("scroll", function() {
  var currentScrollPos = window.pageYOffset || document.documentElement.scrollTop;

  if (prevScrollPos > currentScrollPos) {
    NavigationBar.classList.remove("hidden");
  } else {
    NavigationBar.classList.add("hidden");
  }

  prevScrollPos = currentScrollPos;
});

Notify(true);
