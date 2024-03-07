import { EventBus } from '@/app/EventBus';
import { GameScene } from '../scenes/GameScene';

export class Player extends Phaser.Physics.Arcade.Sprite {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  scene: GameScene;
  jumpSound: Phaser.Sound.HTML5AudioSound;
  hitSound: Phaser.Sound.HTML5AudioSound;

  constructor(scene: GameScene, x: number, y: number) {
    super(scene, x, y, 'dino-run');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.init();

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
  }

  init() {
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.setOrigin(0, 1)
      .setGravityY(5000)
      .setCollideWorldBounds(true)
      .setBodySize(44, 92)
      .setOffset(20, 0)
      .setDepth(1);

    this.registerAnimations();
    this.registerSounds();
  }

  update() {
    const { space, down } = this.cursors;

    const isSpaceJustDown = Phaser.Input.Keyboard.JustDown(space);
    const isDownJustDown = Phaser.Input.Keyboard.JustDown(down);
    const isDownJustUp = Phaser.Input.Keyboard.JustUp(down);

    const onFloor = (this.body as Phaser.Physics.Arcade.Body).onFloor();

    if (isSpaceJustDown && onFloor) {
      this.setVelocityY(-1600);
      this.jumpSound.play();
    }

    if (isDownJustDown && onFloor) {
      this.body.setSize(this.body.width, 58);
      this.setOffset(60, 34);
    }

    if (isDownJustUp && onFloor) {
      this.body.setSize(44, 92);
      this.setOffset(20, 0);
    }

    if (!this.scene.isGameRunning) {
      return;
    }

    if (this.body.deltaAbsY() > 0) {
      this.anims.stop();
      this.setTexture('dino-run', 0);
    } else {
      this.playRunAnimation();
    }
  }

  playRunAnimation() {
    this.body.height <= 58 ? this.play('dino-down', true) : this.play('dino-run', true);
  }

  registerAnimations() {
    this.anims.create({
      key: 'dino-run',
      frames: this.anims.generateFrameNames('dino-run', { start: 2, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'dino-down',
      frames: this.anims.generateFrameNames('dino-down'),
      frameRate: 10,
      repeat: -1,
    });
  }

  registerSounds() {
    this.jumpSound = this.scene.sound.add('jump', { volume: 0.2 }) as Phaser.Sound.HTML5AudioSound;
    this.hitSound = this.scene.sound.add('hit', { volume: 0.2 }) as Phaser.Sound.HTML5AudioSound;
  }

  die() {
    this.anims.pause();
    this.setTexture('dino-hurt');
    this.hitSound.play();
    EventBus.emit('gameover');
  }
}
