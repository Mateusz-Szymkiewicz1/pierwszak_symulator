class Inventory {
    constructor({
        onComplete
    }) {
        this.onComplete = onComplete;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("Inventory")
        this.element.innerHTML = (`
      <h2>Ekwipunek</h2><table><tr><td id="t1"><td id="t2"><td id="t3"><td id="t4"></tr><tr><td id="t5"><td id="t6"><td id="t7"><td id="t8"></tr><tr><td id="t9"><td id="t10"><td id="t11"><td id="t12"></tr><tr><td id="t13"><td id="t14"><td id="t15"><td id="t16"></tr></table>
    `)
    }
    
    check(){
        window.heroInventory.forEach(e =>{
            for(let i = 1; i <= 16; i++){
                if(document.querySelector("#t"+i).innerHTML == ""){
                    document.querySelector("#t"+i).innerHTML = `<img src="${e.src}" width="20px" height="20px">`;
                    document.querySelector("#t"+i).dataset.itemName = e.id;
                    break;
                }
            }
        });
    }
    
    close() {
        document.querySelector("canvas").style.filter = "brightness(1)";
        this.esc?.unbind();
        this.esc2?.unbind();
        this.element.remove();
        this.onComplete();
    }
        
    async init(container) {
        this.createElement();
        document.querySelector("canvas").style.filter = "brightness(0.2)";
        container.appendChild(this.element);
        this.check();
        utils.wait(200);
        this.esc = new KeyPressListener("KeyE", () => {
            this.close();
        })
        this.esc2 = new KeyPressListener("Escape", () => {
            this.close();
        })
        document.addEventListener("mouseover", function(event){
            if(event.target.tagName == "TD" && event.target.dataset.itemName && !document.querySelector("h3")){
               let eq_h3 = document.createElement("h3");
                eq_h3.innerText = event.target.dataset.itemName;
                document.querySelector(".Inventory").appendChild(eq_h3);
            let eq_span = document.createElement("span");
                eq_span.innerText = window.GameObjects.find(x=> x.id === event.target.dataset.itemName).desc;
                document.querySelector(".Inventory").appendChild(eq_span);
            }
        });
        document.addEventListener("mouseout", function(event){
            if(event.target.tagName == "TD" && event.target.dataset.itemName && document.querySelector("h3")){
               document.querySelector("h3").remove();
                document.querySelector("span").remove();
            }
        });
    }

}
