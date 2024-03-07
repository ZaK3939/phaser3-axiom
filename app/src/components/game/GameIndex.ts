// import Main from 'components/Main';
import { useEffect } from 'react';
import 'phaser';
import PreloadScene from './scenes/PreloadScene';
import PlayScene from './scenes/PlayScene';

export default function GameIndex(): any {
  useEffect(() => {
    loadGame();
  }, []);

  const loadGame = async () => {
    if (typeof window !== 'object') {
      return;
    }

    var config = {
      type: Phaser.AUTO,
      width: 1000,
      height: 340,
      pixelArt: true,
      transparent: true,
      // width: window.innerWidth * window.devicePixelRatio,
      // height: window.innerHeight * window.devicePixelRatio,
      backgroundColor: '#4eb3e7',
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          // gravity: { y: 200 },
        },
      },
      parent: 'game',

      scale: {
        // mode: Phaser.Scale.FIT,
        // autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [PreloadScene, PlayScene],
    };

    let game = new Phaser.Game(config);

    // // game.scene.add('main', PlayScene);
    // game.scene.start('PreloadScene');
  };

  return null;
}
