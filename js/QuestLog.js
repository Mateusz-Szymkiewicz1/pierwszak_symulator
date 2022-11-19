class QuestLog{
    constructor({onComplete}) {
        this.onComplete = onComplete;
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("QuestLog")
        this.element.innerHTML = `<h2>Questy</h2>`;
    }
    
    close() {
        document.querySelector("canvas").style.filter = "brightness(1)";
        document.querySelector(".health_bar").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".gold img").style = "filter: brightness(1);cursor:pointer;pointer-events: auto;";
        document.querySelector(".gold span").style = "filter: brightness(1);cursor:pointer;";
        document.querySelector(".quest_button").innerText = '!';
        document.querySelector(".quest_button").style.paddingTop = "1px";
       document.querySelector(".quest_button").style.height = "20px";
        var old_element = document.querySelector(".quest_button");
var new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element);
       document.querySelector(".quest_button").addEventListener("click", function(){
           if (!window.Overworld.map.isCutscenePlaying) {
                window.Overworld.map.startCutscene([
                    {
                        type: "questlog"
                    }
            ]);
            }
       })
        setTimeout(function(){
            document.querySelector(".quest_button").addEventListener("mouseenter", function(event){
            if(!document.querySelector(".QuestLog")){
                let desc = document.createElement("div");
           desc.classList.add("desc");
           desc.style = `position: absolute; top: ${event.clientY}px; left: ${event.clientX}px`;
            desc.innerText = "Quests";
           document.querySelector("body").appendChild(desc);
            }
        })
        document.querySelector(".quest_button").addEventListener("mousemove", function(event){
            if(!document.querySelector(".QuestLog")){
                if(document.querySelector(".desc")){
               document.querySelector(".desc").style = `position: absolute; top: ${event.clientY+15}px; left: ${event.clientX+15}px`;     
                }
            }
            else{
                if(document.querySelector(".desc")){
                document.querySelector(".desc").remove();
                }
            }
       })
       document.querySelector(".quest_button").addEventListener("mouseleave", function(){
           if(document.querySelector(".desc")){
           document.querySelector(".desc").remove();
           }
       })
        },500)
        this.element.remove();
        this.esc.unbind();
        this.onComplete();
    }
        
   async init(container) {
       if(document.querySelector(".desc")){
                document.querySelector(".desc").remove();
                }
       document.querySelector(".quest_button").innerText = 'x';
       document.querySelector(".quest_button").style.paddingTop = "0px";
       document.querySelector(".quest_button").style.height = "21px";
        let this2 = this;
        this.createElement();
        document.querySelector("canvas").style.filter = "brightness(0.2)";
        document.querySelector(".health_bar").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold img").style = "filter: brightness(0.2);cursor:default;pointer-events: none;";
        document.querySelector(".gold span").style = "filter: brightness(0.2);cursor:default;";
        container.appendChild(this.element);
       utils.wait(200);
       this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
       var old_element = document.querySelector(".quest_button");
var new_element = old_element.cloneNode(true);
old_element.parentNode.replaceChild(new_element, old_element);
       document.querySelector(".quest_button").addEventListener("click", function quest_close(){
           this2.close();
       })
    }

}
