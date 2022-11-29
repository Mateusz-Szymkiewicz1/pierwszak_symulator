class Shop{
     constructor({onComplete}, products) {
        this.onComplete = onComplete;
        this.products = products;
    }
 
    close() {
        document.querySelector("canvas").style.filter = "brightness(1)";
        document.querySelector(".health_bar").style = "filter: brightness(1);cursor:pointer;pointer-events:auto;";
        document.querySelector(".quest_button").style= "filter: brightness(1);cursor:pointer;pointer-events:auto;";
        let quest_popups = document.querySelectorAll(".QuestPopup");
        quest_popups.forEach(el => {
            el.style.filter = "brightness(1)";
            el.style.cursor = "pointer";
            el.style.pointerEvents = "auto";
        })
        this.esc.unbind();
        this.element.remove();
        this.onComplete();
    }
    
    show_products(){
        this.element.innerHTML = "<h2>Sklep</h2>";
        this.products.forEach(el => {
            this.element.innerHTML = this.element.innerHTML+`<div class="product" data-product="${el.id}">
                <h3>${el.id}</h3>
                <span>${el.desc}</span>
                <h4>${el.price}G</h4>
                <img src="${el.src}" height="30px" width="30px">
            </div>`;
        })
    }
    
   async init() {
       document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelector(".health_bar").style = "filter: brightness(0.2); cursor: default;pointer-events: none;";
        document.querySelector(".quest_button").style = "filter: brightness(0.2);cursor:default; pointer-events:none;";
           let quest_popups = document.querySelectorAll(".QuestPopup");
        quest_popups.forEach(el => {
            el.style.filter = "brightness(0.2)";
            el.style.cursor = "default";
            el.style.pointerEvents = "none";
        })
        let this2 = this;
        this.element = document.createElement("div");
        this.element.classList.add("shop");
       this.element.innerHTML = `<h2>Sklep</h2>`;
        document.querySelector(".game-container").appendChild(this.element);
       this.show_products();
       utils.wait(200);
       this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
       const gold = new Gold();
       gold.add(20);
       this.element.addEventListener("mouseup", function product_mouseup(event){
           if(event.target.className == "product"){
               if(window.gold >= this2.products.find(x=> x.id === event.target.dataset.product).price){
                   gold.spend(this2.products.find(x=> x.id === event.target.dataset.product).price);
                   let obj = window.GameObjects.find(x=> x.id === event.target.dataset.product);
                   window.heroInventory.push(obj);
               }else{
                    document.querySelector(".gold > span").style.color = "red";
                   document.querySelector(".gold > span").style.animation = "shake 1s ease";
                   setTimeout(function(){
                     document.querySelector(".gold > span").style.color = "#fff";
                   document.querySelector(".gold > span").style.animation = "";  
                   }, 1200)
                }
           }
       })
   }

}
