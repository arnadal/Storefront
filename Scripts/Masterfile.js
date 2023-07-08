document.querySelector(`nav`).innerHTML = `
  <div id="NavigationalContent" class="NoBackground NoBorderRadius">

    <div class="NoBackground NoPadding NoBorderRadius">
      <a href="index.html">Overview</a>
      <a href="Purchase.html">Start Purchasing</a>
      <a href="About.html">About</a>
    </div>

    <div id="NavigationalButtons" class="NoBackground NoBorderRadius">

      <a>
        <button onclick="ToggleTheme();"><i class="material-icons">invert_colors</i></button>
      </a>

      <a href="Cart.html">
        <button><i class="material-icons">shopping_cart</i></button>
      </a>

    </div>

  </div>
`;
