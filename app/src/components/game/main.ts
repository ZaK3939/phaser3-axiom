import Phaser from 'phaser';
import PreloadScene from './scenes/PreloadScene';
import PlayScene from './scenes/PlayScene';

export const PRELOAD_CONFIG = {
  cactusesCount: 6,
  birdsCount: 1,
};

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 1000,
  height: 340,
  pixelArt: true,
  transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  scene: [PreloadScene, PlayScene],
};

// new Phaser.Game(config);
export const StartGame = (parent: any) => {
  return new Phaser.Game({ ...gameConfig, parent: parent });
};
