class ExpBar{
  async add(value){
      if(window.exp == window.levels[window.levels.length-1].exp) return
      window.exp = window.exp+value;
      if(window.exp >= window.levels[window.current_level].exp && window.current_level < window.levels.length-1){
        window.exp = window.exp-window.levels[window.current_level].exp;
        window.current_level++;
      }
      if(window.exp > window.levels[window.levels.length-1].exp){
        window.exp = window.levels[window.levels.length-1].exp
      }
      const ratio = window.exp/window.levels[window.current_level].exp
      document.querySelector(".exp_fill").style.width = (100*ratio)+"px"
      if(document.querySelector(".desc") && document.querySelector(".desc").dataset.div == "exp_bar"){
           document.querySelector(".desc").innerText = `Exp ${window.exp}/${window.levels[window.current_level].exp}`;
      }
  }

  async init() {

      window.levels = [
        {
          exp: 100
        },
        {
          exp: 300
        },
        {
          exp: 800
        },
        {
          exp: 1200
        },
        {
          exp: 2000
        },
        {
          exp: 3500
        },
        {
          exp: 5000
        },
        {
          exp: 7500
        },
        {
          exp: 10000
        }
      ]

      this.element = document.createElement("div");
      this.element.className = 'hud exp_bar';
      this.fill = document.createElement("div");
      this.fill.classList.add("exp_fill");
      const ratio = window.exp/window.levels[window.current_level].exp
      this.fill.style.width = (100*ratio)+"px"
      document.querySelector(".game-container").appendChild(this.element);
      this.element.append(this.fill);
      this.element.innerHTML = `<span>EXP</span>`+this.element.innerHTML;
      this.element.addEventListener("mouseenter", function(event){
          let desc = document.createElement("div");
          desc.classList.add("desc");
          desc.dataset.div = "exp_bar";
          desc.style = `position: absolute; top: ${event.clientY}px; left: ${event.clientX}px`;
          desc.innerText = `Exp ${window.exp}/${window.levels[window.current_level].exp}`;
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