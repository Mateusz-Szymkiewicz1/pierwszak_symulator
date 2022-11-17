class HealthBar{
    constructor() {
     
    }
 
   async init() {
        let this2 = this;
        this.element = document.createElement("div");
        this.element.classList.add("health_bar");
       this.fill = document.createElement("div");
       this.fill.classList.add("health_fill");
       this.fill.style.width = window.health+"px";
        document.querySelector(".game-container").appendChild(this.element);
       this.element.append(this.fill);
        this.element.innerHTML = `<span>HP</span>`+this.element.innerHTML;
       this.element.addEventListener("mouseenter", function(event){
           let desc = document.createElement("div");
           desc.classList.add("desc");
           desc.style = `position: absolute; top: ${event.clientY}px; left: ${event.clientX}px`;
            desc.innerText = "Health";
           document.querySelector("body").appendChild(desc);
       })
       this.element.addEventListener("mousemove", function(event){
               document.querySelector(".desc").style = `position: absolute; top: ${event.clientY+15}px; left: ${event.clientX+15}px`;
       })
       this.element.addEventListener("mouseleave", function(){
           document.querySelector(".desc").remove();
       })
   }

}
