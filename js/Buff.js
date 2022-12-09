class Buff{
    constructor(type, time) {
     this.type = type;
     this.time = parseInt(time);
    }
    
    end(){
        this.element.remove();
        if(document.querySelector(".desc")){
            document.querySelector(".desc").remove();
        }
    }
    
   async init() {
        let this2 = this;
        this.element = document.createElement("div");
        this.element.classList.add("buff");
       this.element.classList.add("hud");
       this.element.dataset.type = this.type;
        document.querySelector(".game-container").appendChild(this.element);
        this.element.innerHTML = `<img src="./images/Objects/${this.type.toLowerCase()}.png" height="17px" width="13px">`;
       this.element.addEventListener("mouseenter", function(event){
           let desc = document.createElement("div");
           desc.classList.add("desc");
           desc.style = `position: absolute; top: ${event.clientY}px; left: ${event.clientX}px`;
            let nice_time = this2.time;
           if(nice_time >= 0){
               if(nice_time > 60000){
                   if((nice_time%60000)/1000 == 0){
                       nice_time = Math.floor(nice_time/60000)+":00";
                   }else if((nice_time%60000)/1000 < 10){
                       nice_time = Math.floor(nice_time/60000)+":0"+(nice_time%60000)/1000;;
                   }else{
                       nice_time = Math.floor(nice_time/60000)+":"+(nice_time%60000)/1000;
                   }
               }else{
                   if(nice_time < 1000){
                       nice_time = "0s";
                   }else{
               nice_time = nice_time/1000+"s";
                   }
               }
           }
               desc.innerText = `+1 ${this2.type} (${nice_time})`;
           let interval = setInterval(function(){
               nice_time = this2.time;
           if(nice_time > 0){
               if(nice_time > 60000){
                   if((nice_time%60000)/1000 == 0){
                       nice_time = Math.floor(nice_time/60000)+":00";
                   }else if((nice_time%60000)/1000 < 10){
                       nice_time = Math.floor(nice_time/60000)+":0"+(nice_time%60000)/1000;;
                   }else{
                       nice_time = Math.floor(nice_time/60000)+":"+(nice_time%60000)/1000;
                   }
               }else{
                   if(nice_time < 1000){
                       nice_time = "0s";
                   }else{
               nice_time = nice_time/1000+"s";
                   }
               }
           }
               desc.innerText = `+1 Speed (${nice_time})`;
               if(nice_time <= 0){
                   desc.innerText = `+1 Speed (0s)`;
                   clearInterval(interval);
               }
           }, 1000)
           document.querySelector("body").appendChild(desc);
       })
       this.element.addEventListener("mousemove", function(event){
               document.querySelector(".desc").style = `position: absolute; top: ${event.clientY+15}px; left: ${event.clientX+15}px`;
       })
       this.element.addEventListener("mouseleave", function(){
           document.querySelector(".desc").remove();
       })
       setInterval(function(){
           this2.element.dataset.time = this2.time;
           if(this2.time > 0){
           this2.time = this2.time-1000;
           }
       }, 1000)
       setTimeout(function(){
           this2.end();
       }, this2.time+1300)
   }

}
