game.playerEntity = me.Entity.extend({
init: function(x, y, settings) {
    this._super(me.Entity, 'init', [x, y, {
            image: "player",
            width: 64,
            height: 64,
            spritewidth: "64",
            spriteheight: "64",
            getShape: function() {
                return (new me.Rect(0, 0, 64, 64)).toPolygon();
            }
        }]);


    this.body.setVelocity(5, 20);

    this.renderable.addAnimation("idle", [78]);
    this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
    this.renderable.addAnimation("atack", [65, 67, 68, 68, 69, 70, 71, 72], 80);
},
    update: function(delta) {
        if (me.input.isKeyPressed("right")) {
            this.body.vel.x += this.body.accel.x * me.timer.tick;
            this.flipX(true);
        }
        else if (me.input.isKeyPressed('left')) {
            this.body.vel.x -= this.body.accel.x * me.timer.tick;
            this.flipX(false);
        }
        else {
            this.body.vel.x = 0;
        }

        
        if (me.input.isKeyPressed('jump')) {
            if (!this.body.jumping && !this.body.falling) {
                this.body.vel.y = - this.body.maxVel.y * me.timer.tick;
                this.body.jumping = true;
            }
        }
        
        if (me.input.isKeyPressed("atack")) {
            console.log("atack1");
            if (!this.renderable.isCurrentAnimation("atack")) {
                console.log("atack2");
                this.renderable.addAnimation("atack");
                this.renderable.setAnimationFrame();
            }
        }
        else if (this.body.vel.x !== 0) {
            if (!this.renderable.isCurrentAnimation("walk")) {
                this.renderable.setCurrentAnimation("walk");
            }
        }
        else {
            this.renderable.setCurrentAnimation("idle");
        }
        
        this.body.update(delta);
        this._super(me.Entity, "update", [delta]);
        return true;
    }
});
                game.playerBaseEntitiy = me.Entity.extend({
                init: function(x, y, settings) {
                this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                        width: 100,
                        height: 100,
                        spritewidth: "100",
                        spriteheight: "100",
                        getShape: function() {
                        return (new me.Rect(0, 0, 100, 100)).toPolygon();
                        }
                }]);
                        this.broken = false;
                        this.health = 10;
                        this.alwaysUpdate = true;
                        this.body.onCollision = this.onCollision.bind(this);
                        this.type = "playerBaseEntity";
                        
                         this.renderable.addAnimation("idle", [0]);
                         this.renderable.addAnimation("broken", [1]);
                         this.renderable.setCurrentAnimation("idle");
                },
                        update: function(delta) {
                        if (this.health <= 0) {
                        this.broken = true;
                        this.renderable.setCurrentAnimation("broken");
                        }
                        this.body.update(delta);
                                this._super(me.Entity, "update", [delta]);
                                return true;
                        },
                        onCollision: function() {

                        }

                });
                game.EnemyBaseEntitiy = me.Entity.extend({
                init: function(x, y, settings) {
                this._super(me.Entity, 'init', [x, y, {
                image: "tower",
                        width: 100,
                        height: 100,
                        spritewidth: "100",
                        spriteheight: "100",
                        getShape: function() {
                        return (new me.Rect(0, 0, 100, 100)).toPolygon();
                        }
                }]);
                        this.broken = false;
                        this.health = 10;
                        this.alwaysUpdate = true;
                        this.body.onCollision = this.onCollision.bind(this);
                        this.type = "EnemyBaseEntity";
                },
                        update: function(delta) {
                        if (this.health <= 0) {
                        this.broken = true;
                        }
                        this.body.update(delta);
                                this._super(me.Entity, "update", [delta]);
                                return true;
                        },
                        onCollision: function() {

                        }

                });