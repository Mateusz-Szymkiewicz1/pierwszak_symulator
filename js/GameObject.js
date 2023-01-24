class GameObject {
  constructor(config) {
        this.id = null;
        this.isMounted = false;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.useShadow = config.useShadow || false;
        this.walkable = config.walkable || false;
        this.pickUp = config.pickUp || false;
        this.counter = config.counter;
        this.movePixels = config.movePixels || false;
        this.direction = config.direction || "down";
        this.sprite = new Sprite({
          gameObject: this,
          src: config.src || "images/characters/people/hero.png",
        });
        this.behaviorLoop = config.behaviorLoop || [];
        this.behaviorLoopIndex = 0;
        this.talking = config.talking || [];
    }
    mount(map){
        this.isMounted = true;
        if(this.walkable === false){
            map.addWall(this.x, this.y);
        }   
        setTimeout(() => {
            this.doBehaviorEvent(map);
        }, 10);
    } 
    async doBehaviorEvent(map){     
        if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding){
            return;
        }     
        let eventConfig = this.behaviorLoop[this.behaviorLoopIndex];
        eventConfig.who = this.id;     
        const eventHandler = new OverworldEvent({map, event: eventConfig});
        await eventHandler.init();
        this.behaviorLoopIndex += 1;
        if(this.behaviorLoopIndex === this.behaviorLoop.length){
            this.behaviorLoopIndex = 0;
        }
        this.doBehaviorEvent(map);
    }
}