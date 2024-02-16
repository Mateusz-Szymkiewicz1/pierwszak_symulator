class Person extends GameObject{
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;
        this.punchingProgressRemaining = 0;
        this.duckingProgressRemaining = 0;
        this.hand = 'right'
        this.isStanding = false;
        this.isPlayerControlled = config.isPlayerControlled || false;
        this.directionUpdate = {
            "up": ["y", -1],
            "down": ["y", 1],
            "left": ["x", -1],
            "right": ["x", 1]
        }
    }
    update(state){
        if(this.movingProgressRemaining > 0){
            this.updatePosition();
        }
        else{
            if(!state.map.isCutscenePlaying && this.isPlayerControlled && state.arrow){
                this.startBehavior(state, {type: "walk", direction: state.arrow});
            }
            this.updateSprite(state);
        }
    } 
    startBehavior(state, behavior){
        this.direction = behavior.direction;
        if(behavior.type === "walk"){
            if(state.map.isSpaceTaken(this.x, this.y, this.direction)){
               if(this.isPlayerControlled != true){
                   behavior.retry && setTimeout(() => {
                       this.startBehavior(state, behavior)
                   }, 10);
               }
               return;
            }
            if(this.isPlayerControlled == true && !window.Overworld.map.isPaused){
                let speed = 2;
                if(window.speed){
                    speed = window.speed*2;
                }
                const eventHandler = new OverworldEvent({type: "play_audio", audio: "walk", volume: 0.4, speed: speed});
                eventHandler.init();
            }
            state.map.moveWall(this.x,this.y,this.direction);  
            this.movingProgressRemaining = 16;
            this.updateSprite(state);
        } 
        if(behavior.type === 'punch'){
            this.hand = behavior.hand;
            this.punchingProgressRemaining = 16;
            this.updateSprite(state);
        }
        if(behavior.type === 'duck'){
            this.duckingProgressRemaining = 16;
            this.updateSprite(state);
        }
        if(behavior.type === "stand"){
            this.isStanding = true;
            setTimeout(() => {
                utils.emitEvent("PersonStandComplete", {whoId: this.id});
                this.isStanding = false;
            }, behavior.time)
        }
    }
    updatePosition(){
        const [property, change] = this.directionUpdate[this.direction];
        this[property] += change;
        this.movingProgressRemaining -= 1;
        if(this.movingProgressRemaining === 0){
            utils.emitEvent("PersonWalkingComplete", {whoId: this.id});
            if(this.isPlayerControlled == true){
                document.querySelector("#audio_walk").pause();
            }
        }
    }  
    updateSprite(){
        if(window.Overworld.map.isPaused){
            document.querySelector("#audio_walk").pause();
        }
        if(this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        if(this.punchingProgressRemaining > 0){
            this.punchingProgressRemaining -= 1;
            this.sprite.setAnimation("punch-"+this.direction+"-"+this.hand);
            return;
        }
        if(this.duckingProgressRemaining > 0){
            this.duckingProgressRemaining -= 1;
            this.sprite.setAnimation("duck-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
    }
}