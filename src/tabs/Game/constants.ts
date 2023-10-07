import RoomPreview from './RoomPreview';
import type { GameParams } from '../../bundles/game/types';

export enum Links {
  gameUserGuide = 'https://github.com/source-academy/modules/wiki/%5Bgame%5D-User-Guide',
  gameDeveloperDocumentation = 'https://github.com/source-academy/modules/wiki/%5Bgame%5D-Developer-Documentation',
  gameAPIDocumentation = 'https://source-academy.github.io/modules/documentation/modules/game.html',
}

export const screenSize = {
  x: 1920,
  y: 1080,
};

export const screenCenter = {
  x: screenSize.x / 2,
  y: screenSize.y / 2,
};

export const config = {
  debug: true,
  type: Phaser.CANVAS,
  width: screenSize.x,
  height: screenSize.y,
  physics: {
    'default': 'arcade',
  },
  scale: {
    mode: Phaser.Scale.FIT,
    parent: 'game-display',
  },
  fps: {
    target: 24,
  },
};

export const createRoomPreview = (ctx: GameParams) => {
  const game = new Phaser.Game(config);
  game.scene.add('RoomPreview', RoomPreview, true, ctx);
  return game;
};

export enum AssetType {
  Image = 'Image',
  Sprite = 'Sprite',
}

export const ImageAssets = {
  sourceCrashedPod: {
    type: AssetType.Image,
    key: 'source-crashed-pod',
    path: '/locations/sourceCrashedPod.png',
  },
};
