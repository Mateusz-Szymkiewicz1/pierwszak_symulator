class Person extends GameObject{
    constructor(config){
        super(config);
        this.movingProgressRemaining = 0;
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
                this.startBehavior(state, {
                    type: "walk",
                    direction: state.arrow
                })
            }
        this.updateSprite(state);
        }
    }
    
    startBehavior(state, behavior){
        this.direction = behavior.direction;
        if(behavior.type === "walk"){
       if(state.map.isSpaceTaken(this.x, this.y, this.direction)){
           behavior.retry && setTimeout(() => {
               this.startBehavior(state, behavior)
           }, 10);
           return;
       }
            if(this.isPlayerControlled == true){
                document.querySelector("#audio_walk").volume = 0.4;
                if(window.speed){
                document.querySelector("#audio_walk").playbackRate = window.speed*2;
                }else{
                    document.querySelector("#audio_walk").playbackRate = 2;
                }
                document.querySelector("#audio_walk").play();
            }
         state.map.moveWall(this.x,this.y,this.direction);  
        this.movingProgressRemaining = 16;
            this.updateSprite(state);
        }
        
        if(behavior.type === "stand"){
            this.isStanding = true;
            setTimeout(() => {
              utils.emitEvent("PersonStandComplete", {
               whoId: this.id
                })
                this.isStanding = false;
            }, behavior.time)
        }
    }
    
    updatePosition(){
            const [property, change] = this.directionUpdate[this.direction];
            this[property] += change;
            this.movingProgressRemaining -= 1;
        if(this.movingProgressRemaining === 0){
           utils.emitEvent("PersonWalkingComplete", {
               whoId: this.id
           })
              if(this.isPlayerControlled == true){
                document.querySelector("#audio_walk").pause();
            }
        }
    }
    
    updateSprite(){
        
        if(this.movingProgressRemaining > 0){
            this.sprite.setAnimation("walk-"+this.direction);
            return;
        }
        this.sprite.setAnimation("idle-"+this.direction);
    }
}