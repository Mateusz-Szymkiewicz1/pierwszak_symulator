class Gold{
    add(value){
        window.gold = window.gold+value;
        document.querySelector(".gold span").innerText = window.gold;
    } 
    spend(value){
        window.gold = window.gold-value;
        document.querySelector(".gold span").innerText = window.gold;
    }  
    async init() {
       this.element = document.createElement("div");
       this.element.className = 'hud gold';
       this.element.innerHTML = `<img src="./images/Objects/gold.png"><span>${window.gold}</span>`;
       document.querySelector(".game-container").appendChild(this.element);
       document.querySelector(".gold img").addEventListener("mouseenter", function(event){
           const desc = document.createElement("div");
           desc.classList.add("desc");
           desc.style = `position: absolute; top: ${event.clientY}px; left: ${event.clientX}px`;
           desc.innerText = "Gold";
           document.querySelector("body").appendChild(desc);
       })
       document.querySelector(".gold img").addEventListener("mousemove", function(event){
            document.querySelector(".desc").style = `position: absolute; top: ${event.clientY+15}px; left: ${event.clientX+15}px`;
       })
       document.querySelector(".gold img").addEventListener("mouseleave", function(){
           if(document.querySelector(".desc")){
              document.querySelector(".desc").remove();
           }
       })
   }
}