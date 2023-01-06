class Question{
    constructor({text,npc,options,onComplete}){
        this.text = text;
        this.npc = npc || null;
        this.options = options;
        this.onComplete = onComplete;
        this.element = null;
    }
    
    createElement(){
        let this2 = this;
        this.element = document.createElement("div");
        this.element.classList.add("Question");
        this.element.innerHTML = `<p class="Question_p"></p>`;
        this.options.forEach(opt => {
            let label = document.createElement("label");
            label.classList.add(".span_option");
            label.dataset.index = this2.options.indexOf(opt);
            label.innerText = opt.text;
            this.element.appendChild(label);
            if(opt.req){
                if(eval(opt.req)){
                    label.addEventListener("click", function(){
                        this2.element.remove();
                        this2.actionListener.unbind();
                        if(opt.reaction){
                            eval(opt.reaction);  
                        }else{
                        this2.onComplete().then(function(){
                          eval(opt.reaction);  
                        })
                        }
                    })
                }else{
                    label.style = "filter: contrast(0.4);pointer-events: none;"
                }
            }else{
                label.addEventListener("click", function(){
                    this2.element.remove();
                    this2.actionListener.unbind();
                    if(opt.reaction){
                        eval(opt.reaction);  
                    }else{
                    this2.onComplete().then(function(){
                      eval(opt.reaction);  
                    })
                    }
                })
            }
        })
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".Question_p"),
            text: this.text          
        })  
        this.actionListener = new KeyPressListener("Enter", () => {
            this.done();
        })
    }
    
    done(){
        if(!this.revealingText.isDone){
           this.revealingText.warpToDone();
       }
    }
    
    init(container){
        this.createElement();
        container.appendChild(this.element);
        this.revealingText.init();
    }
}