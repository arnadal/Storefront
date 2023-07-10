let StoreItems;
let Cart = [];

async function FetchItems() {
  async function LoadItems(data) {
    StoreItems = data;
  }

  async function TransmitXHR(Filename) {
    return new Promise(function(resolve, reject) {
      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(xhr.responseText);
          } else {
            reject(new Error('Error: ' + xhr.status));
          }
        }
      };

      xhr.open('GET', Filename, true);
      xhr.send();
    });
  }

  try {
    const response = await TransmitXHR('Items.json');
    const data = JSON.parse(response);
    LoadItems(data);
  } catch (error) {
    console.error(error);
  }
}

function RenderItems(Data = []) {

  if (Data.length == 0) {

    if (window.location.pathname == `/Purchase.html`) {

      document.querySelector(`div#StoreItems`).innerHTML = `<p>Apologies! We could not find any item that you described. Try describing in short, and avoid being too specific.</p>`;

    } else if (window.location.pathname == `/Cart.html`) {

      document.querySelector(`div#StoreItems`).innerHTML = `<p>Your cart is empty. You might want to <a href="Purchase.html">purchase some products</a>!</p>`;

    }

    return;

  }

  let UltimateParent = document.querySelector(`div#StoreItems`);
  UltimateParent.innerHTML = ``;

  for (let Index = 0; Index < Data.length; Index++) {

    let NewElement = document.createElement(`div`);
    NewElement.className = `ItemCard`;
    NewElement.innerHTML = `<div class="ItemImage" style="background-image: url('${Data[Index].Image}');" alt="${Data[Index].ItemName}"></div><b class="ItemName">${Data[Index].ItemName}</b><span class="ItemPrice">${Data[Index].Price}</span><br>${(window.location.pathname.includes(`/Purchase.html`)) ? `<button id="AddToCartButton" onclick="AddToCart('${Data[Index].ItemName}')" style="position: relative; bottom: 0; right: 0;"><i class="material-icons">add_shopping_cart</i></button>` : ``}`;
    UltimateParent.appendChild(NewElement);

  }

};

function SearchItem(Item) {

  window.location.href = `Purchase.html?Search=${Item}`;

};

async function MainCode() {

  if (window.location.pathname.includes(`/Purchase.html`)) {

    await FetchItems();
    RenderItems(StoreItems);
    if (window.location.search.includes(`?Search=`)) {

      function FetchSearch() {

        let Search = decodeURI(window.location.search.replace(`?Search=`, ``));
        let Matches = [];

        for (let Index = 0; Index < StoreItems.length; Index++) {

          if (StoreItems[Index].ItemName.match(new RegExp(`${Search}`, `gi`)) != null) {

            Matches.push(StoreItems[Index]);

          }

        }

        return Matches;

      };

      RenderItems(FetchSearch());

    }

  };

  if (window.location.pathname.includes(`/Cart.html`)) {

    Cart = JSON.parse(localStorage.getItem(`Cart`));
    if (Cart.length == 0) document.querySelector(`#CheckoutStartButton`).setAttribute(`disabled`, `true`);
    RenderItems(Cart);

    setInterval(function() {

      if (JSON.stringify(Cart) != localStorage.getItem(`Cart`)) {

        Cart = JSON.parse(localStorage.getItem(`Cart`));
        if (Cart.length == 0) document.querySelector(`#CheckoutStartButton`).setAttribute(`disabled`, `true`);
        RenderItems(Cart);
        RenderCartData(EvaluateData(JSON.parse(localStorage.getItem(`Cart`))));

      }

    }, 250);

  }

}

MainCode();
