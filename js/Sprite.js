class Sprite {
  constructor(config) {
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
          this.isLoaded = true;
        }
        this.shadow = new Image();
        this.useShadow = config.gameObject.useShadow || false;
        this.walkable = config.gameObject.walkable || false;
        this.pickUp = config.gameObject.pickUp || false;
        this.movePixels = config.gameObject.movePixels || false;
        if(this.useShadow){
          this.shadow.src = "images/characters/shadow.png";
        }
        this.shadow.onload = () => {
          this.isShadowLoaded = true;
        }
        this.animations = config.animations || {
          "idle-down": [ [0,0] ],
          "idle-right": [ [0,1] ],
          "idle-up": [ [0,2] ],
          "idle-left": [ [0,3] ],
          "walk-down": [ [1,0],[0,0],[3,0],[0,0] ],
          "walk-right": [ [1,1],[0,1],[3,1],[0,1] ],
          "walk-up": [ [1,2],[0,2],[3,2],[0,2] ],
          "walk-left": [ [1,3],[0,3],[3,3],[0,3] ]
        }
        this.currentAnimation =  config.currentAnimation || "idle-down";
        this.currentAnimationFrame = 0;
        this.animationFrameLimit = config.animationFrameLimit || 8;
        this.animationFrameProgress = this.animationFrameLimit;
        this.gameObject = config.gameObject;
    }
    get frame(){
        return this.animations[this.currentAnimation][this.currentAnimationFrame];
    }
    setAnimation(key){
        if(this.currentAnimation !== key){
            this.currentAnimation = key;
            this.currentAnimationFrame = 0;
            this.animationFrameProgress = this.animationFrameLimit;
        }
    }
    updateAnimationProgress(){
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -= 1;
            return;
        }
        this.animationFrameProgress = this.animationFrameLimit;
        this.currentAnimationFrame += 1;
        if(this.frame === undefined){
            this.currentAnimationFrame = 0;
        }
    }
  draw(ctx, cameraPerson) {
      if(window.map.id == "Schron" && this.useShadow){
          this.shadow.src = "images/characters/shadow_dark.png";
      }
      if(this.movePixels){
        var x = this.gameObject.x + utils.withGrid(10.5) - cameraPerson.x;
        var y = this.gameObject.y + utils.withGrid(6) - cameraPerson.y;
      }
      else{
        var x = this.gameObject.x - 8 + utils.withGrid(10.5) - cameraPerson.x;
        var y = this.gameObject.y - 18 + utils.withGrid(6) - cameraPerson.y;
      }
    this.isShadowLoaded && ctx.drawImage(this.shadow, x, y);
    const [frameX, frameY] = this.frame;
    this.isLoaded && ctx.drawImage(this.image,
      frameX * 32,frameY * 32,
      32,32,
      x,y,
      32,32)
   this.updateAnimationProgress();
  }
}