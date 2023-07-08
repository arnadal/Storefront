function FetchItems() {

  function LoadItems(Data) {

    Data = JSON.parse(Data);
    StoreItems = Data;

  };

  function TransmitXHR(Filename) {

    let XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        LoadItems(this.response);
      }
    };
    XHR.open(`GET`, `${Filename}`, false);
    XHR.send();

  };

  TransmitXHR(`Items.json`);

};

function RenderItems(Data) {

  let UltimateParent = document.querySelector(`div#StoreItems`)
  UltimateParent.innerHTML = ``;
  let PreviousParent = null;

  for (let Index = 0; Index < Data.length; Index++) {

    let Parent = PreviousParent;

    if (Index % 4 == 0) {
      Parent = document.createElement(`div`);
      Parent.className = `ItemCardRow`;
      PreviousParent = Parent;
    }

    let NewElement = document.createElement(`div`);
    NewElement.className = `ItemCard`;
    NewElement.innerHTML = `<div class="ItemImage" style="background-image: url('${Data[Index].Image}');" alt="${Data[Index].ItemName}"></div><b class="ItemName">${Data[Index].ItemName}</b><br><span class="ItemPrice">${Data[Index].Price}</span><br>${(window.location.pathname == `/Purchase.html`) ? `<button id="AddToCartButton" onclick="AddToCart('${Data[Index].ItemName}')" style="position: relative; bottom: 0; right: 0; float: right;"><i class="material-icons">add_shopping_cart</i></button>` : ``}`;
    Parent.appendChild(NewElement);
    UltimateParent.appendChild(Parent);

  }

};

function SearchItem(Item) {

  window.location.href = `Purchase.html?Search=${Item}`;

};

if (window.location.pathname == `/Purchase.html`) {

  FetchItems();
  RenderItems(StoreItems);

  if (window.location.search.includes(`?Search=`)) {

    function FetchSearch() {

      let Search = decodeURI(window.location.search.replace(`?Search=`, ``));
      let Matches = [];

      for (let Index = 0; Index < StoreItems.length; Index++) {

        console.log(Index, Search, Matches, StoreItems[Index]);
        if (StoreItems[Index].ItemName.match(new RegExp(`${Search}`, `gi`)) != null) {

          Matches.push(StoreItems[Index]);
          console.log(Matches);

        }

      }

      return Matches;

    };

    RenderItems(FetchSearch());

  }

};

if (window.location.pathname == `/Cart.html`) {

  RenderItems(JSON.parse(localStorage.getItem(`Cart`)));

}
