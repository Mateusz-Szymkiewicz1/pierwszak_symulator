class Settings{
    constructor({
        onComplete
    }) {
        this.onComplete = onComplete;
    }
    
    close() {
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
        document.querySelector(".health_bar").style = "filter: brightness(0.2); cursor: default;pointer-events: none;";
        document.querySelector(".quest_button").style = "filter: brightness(0.2);cursor:default; pointer-events:none;";
        document.querySelector(".gold span").style = "filter: brightness(0.2);cursor:default;";
        document.querySelector(".gold img").style = "filter: brightness(0.2);cursor:default;pointer-events:none;";
           let quest_popups = document.querySelectorAll(".QuestPopup");
        quest_popups.forEach(el => {
            el.style.filter = "brightness(0.2)";
            el.style.cursor = "default";
            el.style.pointerEvents = "none";
        })
        let this2 = this;
        this.element = document.createElement("div");
        this.element.classList.add("settings");
       this.element.innerHTML = `<h2>Ustawienia</h2><h3>Rozmiar okna</h3><label>min</label><input type="range" list="dl" value="25" max="40" min="10"><label>max</label><datalist id="dl"><option>0</option><option>10</option><option>20</option><option>30</option><option>40</option></datalist><button>Tryb Pełnoekranowy</button>`;
       const file = window.localStorage.getItem("preferences");
    const file2 = JSON.parse(file);
        document.querySelector(".game-container").appendChild(this.element);
        if(file2 && file2.scale){
           document.querySelector(".settings > input[type=range]").value = file2.scale*10;
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
               scale: skala
           }))
       })
       document.querySelector(".settings > button").addEventListener("click", function(){
           if(window.fullscreen == 1){
               window.fullscreen = 0;
               let skala =  document.querySelector(".settings > input[type=range]").value/10;
               document.querySelector(".game-container").style.transform = `scale(${skala}) translateY(39%)`;
       document.body.style.background = "#fff";
       document.body.style.overflow = "auto";
        document.querySelector(".game-container").style.outline = "1ox solid #000;";
               document.querySelector(".settings > input[type=range]").disabled = false;
        document.querySelector(".settings > input[type=range]").style.filter = "contrast(1)";
               document.querySelector(".settings > button").style.border = "1px solid #2ecc71";
           }else{
               this2.fullscreen();
           }
       })
   }

}
