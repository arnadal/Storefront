function FetchItems() {

  function LoadItems(Data) {
    console.log(JSON.parse(Data));
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

  TransmitXHR(`test.json`);

};
