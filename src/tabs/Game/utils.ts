/** @typedef {string} AssetKey - key associated with an asset */
export type AssetKey = string;

/** @typedef {string} AssetPath - path associated with an asset */
export type AssetPath = string;

/**
 * Waits for an image (with assetkey, assetpath) to load in scene
 *
 * @param scene scene where to load this asset
 * @param assetKey the key to be used
 * @param assetPath the path to the file
 * @returns {Promise} promise that resolves when image is loaded.
 */
export const loadImage = (scene: Phaser.Scene, assetKey: AssetKey, assetPath: AssetPath) => new Promise<AssetKey>((resolve) => {
  if (scene.textures.get(assetKey).key !== '__MISSING') {
    resolve(assetKey);
  } else {
    scene.load.image(assetKey, assetPath);
    scene.load.once(`filecomplete-image-${assetKey}`, (value) => {
      console.log(`Successfully loaded ${assetKey} at ${assetPath}`);
      // const image = new Phaser.GameObjects.Sprite(scene, screenCenter.x, screenCenter.y, assetKey);
      // scene.add.existing(image);
      resolve(value);
    });
    scene.load.once('loaderror', resolve);
    scene.load.start();
  }
});

/**
 * Waits for a sound (with assetkey, assetpath) to load in scene
 *
 * @param scene scene where to load this asset
 * @param assetKey the key to be used
 * @param assetPath the path to the file
 * @returns {Promise} promise that resolves when sound is loaded.
 */
export const loadSound = (scene: Phaser.Scene, assetKey: AssetKey, assetPath: AssetPath) => new Promise<AssetKey>((resolve) => {
  if (scene.sound.get(assetKey) !== null) {
    resolve(assetKey);
  } else {
    scene.load.audio(assetKey, assetPath)
      .on('filecomplete', resolve);
    scene.load.start();
  }
});

/**
 * Waits for an spritesheet (with assetkey, assetpath, and config) to load in scene
 *
 * @param scene scene where to load this asset
 * @param assetKey the key to be used
 * @param assetPath the path to the file
 * @param config spritesheet config
 * @returns {Promise} promise that resolves when spritesheet is loaded.
 */
export const loadSpritesheet = (
  scene: Phaser.Scene,
  assetKey: AssetKey,
  assetPath: AssetPath,
  config: any,
) => new Promise<AssetKey>((resolve) => {
  if (scene.textures.get(assetKey).key !== '__MISSING') {
    resolve(assetKey);
  } else {
    scene.load.spritesheet(assetKey, assetPath, config);
    scene.load.once(`filecomplete-spritesheet-${assetKey}`, resolve);
    scene.load.once('loaderror', resolve);
    scene.load.start();
  }
});

/**
 * Resize a displayed object to given width and height
 * if both dimensions are specified.
 *
 * If either one of width or height is zero/undefined,
 * then only the given dimension will be used to scale the image
 * proportionally according to aspect-ratio
 *
 * @param obj object to be resized
 * @param width desired width of object
 * @param height desired height of object
 */
export function resize(
  obj: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle,
  width: number,
  height?: number,
) {
  const ratio = obj.displayHeight / obj.displayWidth;
  if (!width) {
    obj.displayWidth = height! / ratio;
    obj.displayHeight = height!;
  } else {
    obj.displayWidth = width;
    obj.displayHeight = height || width * ratio;
  }
}

/**
 * Resize the obj display size such that the shorter side fits
 * the width/height i.e. the other dimension will overflow.
 *
 * @param obj obj to be resized
 * @param width width
 * @param height height
 */
export function resizeOverflow(
  obj: Phaser.GameObjects.Image | Phaser.GameObjects.Rectangle,
  width: number,
  height: number,
) {
  if (obj.displayWidth > obj.displayHeight) {
    resize(obj, 0, height);
  } else {
    resize(obj, width);
  }
}
