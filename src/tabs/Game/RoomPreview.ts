import { ImageAssets, screenCenter } from './constants';
import { type GameParams, defaultGameParams } from '../../bundles/game/types';
import { loadImage, loadSound, loadSpritesheet } from './utils';

/**
 * This scene uses the students code as part of its code.
 *
 * Additionally, the scene shares some common functionality as
 * GameManager, in that it incorporates escape menu and collectible
 * menu.
 *
 * Student code is not executed within a layer manager as
 * there are features that do not work well with container
 * e.g. mask, animations.
 *
 * Hence, student code will be executed and added to the scene
 * as per normal. Meanwhile, UI parts of this scene will still
 * make use of the layer manager; separate from student code.
 */
export default class RoomPreview extends Phaser.Scene {
  private sceneLoaded = false;
  private gameContext: GameParams = defaultGameParams;

  constructor() {
    super('RoomPreview');
  }

  public init() {
    this.gameContext = this.scene.settings.data as GameParams;
    this.gameContext.scene = this;
  }

  public preload() {
    // addLoadingScreen(this);
    this.load.image(ImageAssets.sourceCrashedPod.key,
      this.gameContext.remotePath(ImageAssets.sourceCrashedPod.path));
  }

  public async create() {
    this.renderDefaultBackground();
    /**
     * We don't use .eval('preload();') at preload() as
     * .eval() is not awaited by the preload() method i.e. it does not
     * wait for student's preload function to finish.
     *
     * Instead, the students' 'preload()' function simply populate a map
     * of assets key and path to be loaded.
     *
     * We await the students .eval('preload();') at create()
     * to ensure that the .eval('preload();') is fully resolved.
     */
    this.gameContext.lifecycleFuncs.preload();

    // Preload all necessary assets
    await Promise.all(
      Array.from(this.gameContext.preloadImageMap)
        .map(async ([key, path]) => {
          await loadImage(this, key, path);
        }),
    );
    await Promise.all(
      Array.from(this.gameContext.preloadSoundMap)
        .map(async ([key, path]) => {
          await loadSound(this, key, path);
        }),
    );
    await Promise.all(
      Array.from(this.gameContext.preloadSpritesheetMap)
        .map(async ([key, [path, config]]) => {
          await loadSpritesheet(this, key, path, config);
        }),
    );

    // Execute create
    this.gameContext.lifecycleFuncs.create();
    this.sceneLoaded = true;
  }

  public update() {
    this.gameContext.lifecycleFuncs.update();
  }

  /**
   * Clean up on related managers
   */
  public cleanUp() {
  }

  /**
   * Render starting background for the room.
   */
  private renderDefaultBackground() {
    this.add.image(screenCenter.x, screenCenter.y, this.getDefaultBackgroundKey());
  }

  /**
   * Returns the background key to be used, based on the user's assessment
   * progression.
   */
  private getDefaultBackgroundKey() {
    return ImageAssets.sourceCrashedPod.key;
  }
}
