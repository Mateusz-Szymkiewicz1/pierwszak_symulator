class Book{
    constructor({onComplete}, book_id) {
        this.onComplete = onComplete;
        this.book = window.books.find(x=> x.id === book_id);
    }

    createElement() {
        this.element = document.createElement("div");
        this.element.classList.add("book")
        this.element.innerHTML = `<h2>${this.book.title}</h2><h4>${this.book.author}</h4>${this.book.text}`;
    }
    
    close() {
        document.querySelector("canvas").style.filter = "none";
        document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: none; cursor: pointer;pointer-events: auto;";
        })
        this.element.remove();
        this.esc.unbind();
        this.onComplete();
    }
        
   async init() {
        let this2 = this;
        this.createElement();
        document.querySelector("canvas").style.filter = "blur(4px)";
        document.querySelectorAll(".hud").forEach(el => {
            el.style = "filter: blur(4px); cursor: default;pointer-events: none;";
        })
        document.querySelector(".game-container").appendChild(this.element);
       this.esc = new KeyPressListener("Escape", () => {
            this2.close();
        });
    }

}
