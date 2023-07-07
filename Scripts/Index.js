function SearchItem(Item) {

  window.location.href = `../Purchase.html?Search=${Item}`;

};

if (window.location.pathname == `Purchase.html`) {

  

  if (window.location.search.includes(`?Search=`)) {

    function FetchSearch() {

      let Search = window.location.search.replace(`?Search=`, ``);
  
    };

  }

}
