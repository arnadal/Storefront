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

function Notify(Positivity = true, Message = `Something happened that we couldn't identify!`) {

  let Element = document.querySelector(`#Notification`);
  Element.innerHTML = Message;
  if (Positivity) Element.classList.replace(`Negative`, `Positive`);
  if (!Positivity) Element.classList.replace(`Positive`, `Negative`);
  Element.classList.toggle(`Shown`);

  setTimeout(function() {
    HideNotification();
  }, 10000);

};

function HideNotification() {

  let Element = document.querySelector(`#Notification`);
  Element.classList.replace(`Shown`, `NotShown`);

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
  document.querySelector(`#CheckoutStartButton`).removeAttribute(`disabled`);
  document.querySelector(`#CheckoutStartButtonDisabledText`).removeAttribute(`style`);
  RenderItems(Cart);
  RenderCartData(EvaluateData(JSON.parse(localStorage.getItem(`Cart`))))

};

function StartCheckout() {

  document.querySelector(`form#CheckoutForm`).style.display = `initial`;
  document.querySelector(`button#CheckoutStartButton`).style.display = `none`;

};

function Purchase() {

  ClearCart();
  Notify(false, `Apologies! Making a successful purchase is not available right now.`);

};

function CalculateMarket() {
  let Total_INR = 0;

  for (let Index = 0; Index < StoreItems.length; Index++) {
    console.log(Number(StoreItems[Index].Price.replace(`₹`, ``)), StoreItems[Index].Stock);
    Total_INR += Number(StoreItems[Index].Price.replace(`₹`, ``)) * StoreItems[Index].Stock;
  }

  return Total_INR;

};

function EvaluateData(Data = []) {

  let Evaluation = {
    TotalAmount_INR: 0,
    TotalPrice_INR: 0,
    ServiceFee_INR: 0,
    Discount_INR: 0,
    Items: Data.length,
    ItemKinds: 0
  };

  if (Data.length != 0) {

    let IndexedItemKinds = [];

    for (let Index = 0; Index < Data.length; Index++) {

      let Element = Data[Index];

      Evaluation.TotalPrice_INR += Number(Element.Price.replace(`₹`, ``));
      Evaluation.ServiceFee_INR += 100;

      if (Index != 0 && Index % 2 == 0) Evaluation.Discount_INR += 25;

      if (!IndexedItemKinds.includes(Element.ItemName)) {

        IndexedItemKinds.push(Element.ItemName);
        Evaluation.ItemKinds++;

      }

    }

  }

  Evaluation.TotalAmount_INR = (Evaluation.TotalPrice_INR + Evaluation.ServiceFee_INR) - Evaluation.Discount_INR;

  Evaluation.TotalAmount_INR = `₹${Evaluation.TotalAmount_INR.toLocaleString()}`;
  Evaluation.TotalPrice_INR = `₹${Evaluation.TotalPrice_INR.toLocaleString()}`;
  Evaluation.ServiceFee_INR = `₹${Evaluation.ServiceFee_INR.toLocaleString()}`;
  Evaluation.Discount = `₹${Evaluation.Discount_INR.toLocaleString()}`;

  return Evaluation;

};

function RenderCartData(EvaluationReport) {

  document.querySelector(`span#CartData_TotalAmount`).innerHTML = EvaluationReport.TotalAmount_INR;
  document.querySelector(`span#CartData_TotalPrice`).innerHTML = EvaluationReport.TotalPrice_INR;
  document.querySelector(`span#CartData_ServiceFee`).innerHTML = EvaluationReport.ServiceFee_INR;
  document.querySelector(`span#CartData_Discount`).innerHTML = EvaluationReport.Discount;
  document.querySelector(`span#CartData_Items`).innerHTML = EvaluationReport.Items;
  document.querySelector(`span#CartData_ItemKinds`).innerHTML = EvaluationReport.ItemKinds;

  document.querySelector(`span#CartData_TotalAmount2`).innerHTML = EvaluationReport.TotalAmount_INR;

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

if (sessionStorage.getItem(`Greeted`) == null) {
  sessionStorage.setItem(`Greeted`, `false`);
}

let Greeted = (sessionStorage.getItem(`Greeted`) == `false`) ? false : true;

setTimeout(function() {
  if (!Greeted) {
    Notify(true, `Welcome!`);
    sessionStorage.setItem(`Greeted`, `true`);
    Greeted = true;
  }
}, 1000);
