import { screenSize, screenCenter } from './constants';

const barWidth = 320;
const barHeight = 50;
const padding = 10;

const innerWidth = barWidth - padding * 2;
const innerHeight = barHeight - padding * 2;
const barX = screenCenter.x - barWidth / 2;
const barY = screenCenter.y;
const innerBarX = barX + padding;
const innerBarY = barY + padding;

/**
 * A black screen that can be used in fade effects
 *
 * @param scene - the scene to add this screen to
 */
export function blackScreen(scene: Phaser.Scene) {
  return new Phaser.GameObjects.Rectangle(
    scene,
    screenCenter.x,
    screenCenter.y,
    screenSize.x,
    screenSize.y,
    0,
  );
}

/**
 * A function to display a loading bar while a scene's preload is in progress
 *
 * @param scene - the scene in which to add a loading screen when preload is occuring
 */
export function addLoadingScreen(scene: Phaser.Scene) {
  let progressBar: Phaser.GameObjects.Graphics;
  let progressBox: Phaser.GameObjects.Graphics;
  let loadingScreenBg: Phaser.GameObjects.GameObject;

  scene.load.on('start', () => {
    loadingScreenBg = scene.add.existing(blackScreen(scene));
    progressBar = scene.add.graphics();
    progressBox = scene.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(barX, barY, barWidth, barHeight);
  });

  scene.load.on('progress', (value: number) => {
    progressBar.clear();
    progressBar.fillStyle(0xffffff, 1);
    progressBar.fillRect(innerBarX, innerBarY, innerWidth * value, innerHeight);
  });

  scene.load.on('complete', () => {
    progressBar.destroy();
    progressBox.destroy();
    loadingScreenBg.destroy();
  });
}
