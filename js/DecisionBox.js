class DecisionBox {
    constructor({onComplete}) {
        this.onComplete = onComplete;
    }
    createElement(){
        this.element = document.createElement("div");
        this.element.classList.add("DecisionBox")
        this.element.innerHTML = `<h2>Na pewno?</h2><div id="decision_tak">Tak</div><div id="decision_nie">Nie</div>`;
    } 
    close(){
        if(window.Overworld){
            if(!window.Overworld.map.isPaused){
                document.querySelector("canvas").style.filter = "none";
            }
        }else{
            document.querySelector("canvas").style.filter = "none";
        }
        this.element.remove();
        this.esc.unbind();
        this.ent.unbind();
    }      
   async init(container){
        let this2 = this;
        this.createElement();
        document.querySelector("canvas").style.filter = "blur(4px)";
        container.appendChild(this.element);
        document.addEventListener("click", function(event){
            if(event.target.getAttribute("id") == "decision_tak"){
                this2.onComplete();
                this2.close();
            }
            if(event.target.getAttribute("id") == "decision_nie"){
                this2.close(); 
            }
        });
       this.ent = new KeyPressListener("Enter", () => {
          this2.onComplete();
          this2.close();
       });
       this.esc = new KeyPressListener("Escape", () => {
          this2.close();
       });
    }

}
