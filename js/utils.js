const utils = {
    withGrid(n) {
        return n * 16;
    },
    asGridCoord(x, y) {
        return `${x*16},${y*16}`
    },
    nextPosition(initialX, initialY, direction) {
        let x = initialX;
        let y = initialY;
        const size = 16;
        if (direction === "left") {
            x -= size;
        } else if (direction === "right") {
            x += size;
        } else if (direction === "up") {
            y -= size;
        } else if (direction === "down") {
            y += size;
        }
        return {
            x,
            y
        };
    },
    oppositeDirection(direction) {
        if (direction === "left") {
            return "right"
        }
        if (direction === "right") {
            return "left"
        }
        if (direction === "up") {
            return "down"
        }
        return "up";
    },
    emitEvent(name, detail) {
        const event = new CustomEvent(name, {
            detail
        });
        document.dispatchEvent(event);
    },
    wait(ms) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve()
            }, ms)
        })
    },
    turn_hud_on(){
        document.querySelectorAll(".hud").forEach(el => {
            if(el.dataset.top){
                el.style = `top: ${el.dataset.top};filter: none; cursor: pointer;pointer-events: auto;`;
                return;
            }
            el.style = "filter: none; cursor: pointer;pointer-events: auto;";
        })
    },
    turn_hud_off(){
        document.querySelectorAll(".hud").forEach(el => {
            if(el.dataset.top){
                el.style = `top: ${el.dataset.top};filter: blur(4px); cursor: default;pointer-events: none;`;
                return;
            }
            el.style = "filter: blur(4px); cursor: default;pointer-events: none;";
        })
    }
}
