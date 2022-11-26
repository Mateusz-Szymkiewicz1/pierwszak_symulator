(function () {
    const file = window.localStorage.getItem("preferences");
    const file2 = JSON.parse(file);
    if(file2 && file2.scale){
        document.querySelector(".game-container").style.transform = `scale(${file2.scale}) translateY(39%)`
    }
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  overworld.init();

})();