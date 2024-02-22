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
    window.fights.forEach(el => {
        let div = document.createElement('div');
        div.className = 'fight';
        div.innerHTML = `
            <h3>${el.name}</h3>
            <img src="images/characters/${el.name.toLowerCase()}.png">
            <span>${el.reward}<img src="images/Objects/gold.png"></span>
            <p>${el.desc}</p>
            <button>Walcz</button>
        `;
        document.querySelector('.fights').appendChild(div);
    })
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

    window.fights = [
        {
            name: "Manekin",
            reward: 0,
            difficulty: 0,
            desc: "Dosłownie manekin."
        }
    ]

     this.show_fights();
     utils.wait(200);
     this.esc = new KeyPressListener("Escape", () => {
         this2.close();
     });
}
}