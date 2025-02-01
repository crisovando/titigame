import { createAnimations } from "./animations.js";

class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene" });
  }

  preload() {
    this.load.image("cloud1", "assets/scenery/overworld/cloud1.png");
    this.load.spritesheet("mario", "assets/entities/mario.png", {
      frameWidth: 18,
      frameHeight: 16,
    });
    this.load.image("floorbrick", "assets/scenery/overworld/floorbricks.png");

    this.load.audio("gameover", "assets/sound/music/gameover.mp3");
    this.load.audio("jump", "assets/sound/effects/jump.mp3");
    this.load.audio("theme", "assets/sound/music/overworld/theme.mp3");
  }

  create() {
    this.add.image(100, 50, "cloud1").setOrigin(0, 0).setScale(0.15);

    this.floor = this.physics.add.staticGroup();
    this.floor
      .create(0, config.height, "floorbrick")
      .setOrigin(0, 1)
      .refreshBody();
    this.floor
      .create(200, config.height, "floorbrick")
      .setOrigin(0, 1)
      .refreshBody();
    // this.floor.create(config.width, config.height, "floorbrick").setOrigin(1, 1);

    // this.mario = this.add.sprite(50, 210, "mario").setOrigin(0, 1);
    this.mario = this.physics.add
      .sprite(50, 40, "mario")
      .setOrigin(0, 1)
      .setCollideWorldBounds(true)
      .setGravityY(300);

    this.physics.world.setBounds(0, 0, 2000, config.height);
    this.physics.add.collider(this.mario, this.floor);

    this.cameras.main.setBounds(0, 0, 2000, config.height);
    this.cameras.main.startFollow(this.mario);

    this.keys = this.input.keyboard.createCursorKeys();

    createAnimations(this.anims);
  }

  update() {
    if (this.mario.isDead) {
      return;
    }
    
    if (this.keys.left.isDown) {
      this.mario.anims.play("mario-walk", true);
      this.mario.x -= 1;
      this.mario.flipX = true;
    } else if (this.keys.right.isDown) {
      this.mario.anims.play("mario-walk", true);
      this.mario.x += 1;
      this.mario.flipX = false;
    } else {
      this.mario.anims.play("mario-idle", true);
    }
    if (this.keys.up.isDown && this.mario.body.touching.down) {
      this.mario.y -= 2;
      this.mario.setVelocityY(-300);
      this.sound.play("jump");
    }
    if (!this.mario.body.touching.down) {
      this.mario.anims.play("mario-jump", true);
    }

    if (this.mario.y >= config.height) {
      this.mario.isDead = true;
      this.mario.setCollideWorldBounds(false);
      this.mario.anims.play("mario-die", true);
      this.sound.play("gameover");
      setTimeout(() => {
        this.mario.setVelocityY(-300);
      }, 100);

      setTimeout(() => {
        this.scene.restart();
      }, 2500);
    }
  }
}

const config = {
  type: Phaser.AUTO,
  width: 256,
  height: 244,
  backgroundColor: "#049cd8",
  parent: "game",
  scene: [MainScene],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
