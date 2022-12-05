(function () {
    const file = window.localStorage.getItem("preferences");
    const file2 = JSON.parse(file);
    if(file2){
        if(file2.scale){
        document.querySelector(".game-container").style.transform = `scale(${file2.scale}) translateY(39%)`
        window.scale = file2.scale;
        }
        if(file2.website_color){
            document.body.style.background = file2.website_color;
            window.website_color = file2.website_color;
        }
        if(file2.game_color){
            document.querySelector(".game-container").style.background = file2.game_color;
            window.game_color = file2.game_color;
        }
    }
  const overworld = new Overworld({
    element: document.querySelector(".game-container")
  });
  overworld.init();

})();