class Settings{
    constructor({
        onComplete
    }) {
        this.onComplete = onComplete;
    }
    
    close() {
        if(!document.querySelector(".PauseMenu")){
            document.querySelector("canvas").style.filter = "brightness(1)";
        }
        if(document.querySelector(".TitleScreen")){
            document.querySelector(".TitleScreen>*").setAttribute('style', 'filter: brightness(1)');
             document.querySelector(".DescriptionBox").setAttribute('style', 'filter: brightness(1)');
        }
        this.esc.unbind();
        this.element.remove();
        this.onComplete();
    }
    
    
    fullscreen(){
        // TEN KOD JEST GRZECHEM PRZECIW LUDZKOŚCI, ALE DZIAŁA
        window.fullscreen = 1;
       let width0 = window.getComputedStyle(document.querySelector(".game-container")).width;
       let width = parseInt(width0.slice(0, width0.length-2));
       let scale = document.querySelector(".settings > input[type=range]").value/10;
       let counter = 0;
       while(width != window.innerWidth){
           counter++;
           if(width < window.innerWidth){
               scale = scale+0.005;
               width = parseInt(width0.slice(0, width0.length-2));
               width = width*scale;
           }
           if(width > window.innerWidth){
               scale = scale-0.005;
               width = parseInt(width0.slice(0, width0.length-2));
               width = width*scale;
           }
           if(counter > 2000){
               break;
           }
       }
       let height0 = window.getComputedStyle(document.querySelector(".game-container")).height;
       let height = parseInt(height0.slice(0, height0.length-2));
       let scale2 = document.querySelector(".settings > input[type=range]").value/10;
       let counter2 = 0;
       while(height != window.innerHeight){
           counter2++;
           if(height < window.innerHeight){
               scale2 = scale2+0.005;
               height = parseInt(height0.slice(0, height0.length-2));
               height = height*scale2;
           }
           if(height > window.innerHeight){
               scale2 = scale2-0.005;
               height = parseInt(height0.slice(0, height0.length-2));
               height = height*scale2;
           }
           if(counter2 > 2000){
               break;
           }
       }
       document.querySelector(".game-container").style.transform = `scale(${scale},${scale2}) translateY(34%)`
       document.body.style.background = "#202020";
       document.body.style.overflow = "hidden";
        document.querySelector(".game-container").style.outline = "0";
        document.querySelector(".settings > input[type=range]").disabled = true;
        document.querySelector(".settings > input[type=range]").style.setProperty("filter", "contrast(0.4)");
        document.querySelector(".settings > button").style.border = "1px solid rgba(255, 67, 95)";
    }
    
   async init() {
       document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: brightness(0.2); cursor: default;pointer-events: none;";
        })
        let this2 = this;
        this.element = document.createElement("div");
        this.element.classList.add("settings");
       this.element.innerHTML = `<h2>Ustawienia</h2><h3>Rozmiar okna</h3><label>min</label><input type="range" list="dl" value="25" max="40" min="10"><label>max</label><datalist id="dl"><option>0</option><option>10</option><option>20</option><option>30</option><option>40</option></datalist><button>Tryb Pełnoekranowy</button><br /><h3>Kolory</h3><label>Tło strony :</label><input type="color" value="#ffffff" id="color_website"><br /><label>Tło gry :</label><input type="color" value="#202020" id="color_game"><div class="color_default">Przywróć domyślne</div>`;
       window.scale = 2.5;
       window.website_color = "#ffffff";
       window.game_color = "#202020";
       const file = window.localStorage.getItem("preferences");
    const file2 = JSON.parse(file);
        document.querySelector(".game-container").appendChild(this.element);
        if(file2 && file2.scale){
            if(file2.scale){
           document.querySelector(".settings > input[type=range]").value = file2.scale*10;
            window.scale = file2.scale;
            }
            if(file2.website_color){
            document.querySelector("#color_website").value = file2.website_color;
            window.website_color = file2.website_color;
            }
            if(file2.game_color){
            document.querySelector("#color_game").value = file2.game_color;
            window.game_color = file2.game_color;
            }
       }
        if(typeof window.fullscreen !== 'undefined' && window.fullscreen == 1){
           document.querySelector(".settings > input[type=range]").disabled = true;
        document.querySelector(".settings > input[type=range]").style.setProperty("filter", "contrast(0.4)")
       }
       utils.wait(200);
       this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
       document.querySelector(".settings > input[type=range]").addEventListener("change", function(){
           let skala = document.querySelector(".settings > input[type=range]").value/10;
           document.querySelector(".game-container").style.transform = `scale(${skala}) translateY(39%)`;
           window.localStorage.setItem("preferences", JSON.stringify({
               scale: skala,
               website_color: window.website_color,
               game_color: window.game_color
           }))
       })
       document.querySelector(".settings > button").addEventListener("click", function(){
           if(window.fullscreen == 1){
               window.fullscreen = 0;
               let skala =  document.querySelector(".settings > input[type=range]").value/10;
               document.querySelector(".game-container").style.transform = `scale(${skala}) translateY(39%)`;
       document.body.style.background = "#fff";
       document.body.style.overflow = "auto";
        document.querySelector(".game-container").style.outline = "1px solid #000";
               document.querySelector(".settings > input[type=range]").disabled = false;
        document.querySelector(".settings > input[type=range]").style.filter = "contrast(1)";
               document.querySelector(".settings > button").style.border = "1px solid #2ecc71";
           }else{
               this2.fullscreen();
           }
       })
       let timeout;
       document.querySelector("#color_website").addEventListener("input", function(e){
           if(typeof timeout !== 'undefined' || timeout !== null){
               clearTimeout(timeout);
           }
           document.body.style.background = e.target.value;
           window.website_color = e.target.value;
           timeout = setTimeout(function(){
                window.localStorage.setItem("preferences", JSON.stringify({
               scale: window.scale,
               website_color: e.target.value,
               game_color: window.game_color
           }))
           }, 100)
       })
       let timeout2;
       document.querySelector("#color_game").addEventListener("input", function(e){
           if(typeof timeout2 !== 'undefined' || timeout2 !== null){
               clearTimeout(timeout2);
           }
           document.querySelector(".game-container").style.background = e.target.value;
           window.game_color = e.target.value;
           timeout2 = setTimeout(function(){
               window.localStorage.setItem("preferences", JSON.stringify({
               scale: window.scale,
               website_color: window.website_color,
               game_color: e.target.value
                }))
           }, 100)
       })
       document.querySelector(".color_default").addEventListener("click", function(){
           window.game_color = "#202020";
           window.website_color = "#ffffff";
           document.querySelector(".game-container").style.background = window.game_color;
           document.querySelector("#color_website").value = window.website_color;
           document.querySelector("#color_game").value = window.game_color;
           document.body.style.background = window.website_color;
            window.localStorage.setItem("preferences", JSON.stringify({
               scale: window.scale,
               website_color: window.website_color,
               game_color: window.game_color
            }))
       })
   }

}
