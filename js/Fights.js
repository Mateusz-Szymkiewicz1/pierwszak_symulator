class Fights{
  constructor({onComplete}){
     this.onComplete = onComplete;
 }
 close() {
     document.querySelector("canvas").style.filter = "none";
     utils.turn_hud_on();
     this.esc.unbind();
     this.element.remove();
     this.onComplete();
 }  
 show_fights(){
    
 } 
async init() {
     document.querySelector("canvas").style.filter = "blur(4px)";
     utils.turn_hud_off();
     let this2 = this;
     this.element = document.createElement("div");
     this.element.classList.add("fights");
     this.element.innerHTML = `<h2>Walki</h2>`;
     document.querySelector(".game-container").appendChild(this.element);
     this.element.setAttribute("tabindex", "0")
     this.element.focus();
     this.show_fights();
     utils.wait(200);
     this.esc = new KeyPressListener("Escape", () => {
         this2.close();
     });
}
}