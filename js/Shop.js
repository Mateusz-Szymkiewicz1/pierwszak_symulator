class Shop{
     constructor({onComplete}, products) {
        this.onComplete = onComplete;
        this.products = products;
    }
 
    close() {
        document.querySelector("canvas").style.filter = "none";
       document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: none; cursor: pointer;pointer-events: auto;";
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
       document.querySelector("canvas").style.filter = "blur(4px)";
        document.querySelectorAll(".hud").forEach(el => {
            if(el.className != "gold hud"){
            el.style = "filter: blur(4px); cursor: default;pointer-events: none;";
            }
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
       gold.add(100)
       this.element.addEventListener("mouseup", function product_mouseup(event){
           if(event.target.className == "product"){
               if(window.gold >= this2.products.find(x=> x.id === event.target.dataset.product).price){
                   gold.spend(this2.products.find(x=> x.id === event.target.dataset.product).price);
                   let obj = window.GameObjects.find(x=> x.id === event.target.dataset.product);
                   if(window.heroInventory.find(x=> x.id === event.target.dataset.product)){
                       if(window.heroInventory.find(x=> x.id === event.target.dataset.product).deleted == true){
                           window.heroInventory.find(x=> x.id === event.target.dataset.product).deleted = false;
                       window.heroInventory.find(x=> x.id === event.target.dataset.product).amount = 1;
                       }else{
                           window.heroInventory.find(x=> x.id === event.target.dataset.product).amount++;
                       }
                   }else{
                   window.heroInventory.push(obj);
                   }
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
