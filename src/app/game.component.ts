/// <reference path="../../typings/globals/phaser/index.d.ts" />

import { Injectable } from '@angular/core';
import Config from '../providers/config';
import * as States from '../states/states';

@Injectable()
export class Game {

  /**
   * Instance of the Game.
   */
  protected game: Phaser.Game;

  /**
   * Store a pointer to the configuration.
   * @type {Configuration}
   */
  protected config: Config = Config.getInstance();

  /**
   * Default values to include as part of the configuration.
   * @type {{}}
   */
  private defaults: Object = {};

  /**
   * Constructor which incorporates configuration options and instantiates the Phaser Game app.
   * @param config
   */
  constructor() {
    window.appConfig = {"viewport":{"width":800,"height":600},"platforms":{"browser":{"viewport":{"width":640,"height":480}},"android":{"viewport":{"width":320,"height":200}}}};
  }

  start(config: {platforms?: {}, platform?: string} = {}) {
    // Setup our configuration information
    this.config.process(this.defaults);

    // Screen platform-specific configurations into config.platform
    if (config.hasOwnProperty("platforms")) {
      // Keep track of platform configurations
      let platforms = config.platforms;
      delete config.platforms;

      // Removed platforms so that what exists are the defaults
      this.config.process(config);

      // Find the target platform, default to browser (since that's where the build is tested)
      let platformTarget = "browser";

      if (config.hasOwnProperty("platform")) {
        platformTarget = config.platform;
      } else if (window.hasOwnProperty("device") && window.device) {
        platformTarget = window.device.platform.toLowerCase();
      }

      if (platforms.hasOwnProperty(platformTarget)) {
        this.config.process(platforms[platformTarget]);
      }
    } else {
      // No platform-specific configurations
      this.config.process(config);
    }

    // Create the game object
    this.game = new Phaser.Game(this.config.get("viewport.width"), this.config.get("viewport.height"), Phaser.AUTO, "game-container", this);
  }

  /**
   * Preload any necessary assets before moving to the Boot state.
   */
  public preload(): void {
  }

  /**
   * Used to execute once the preload() method is called.
   */
  public create(): void {
    // If a statusbar plugin is provided, let's hide it
    if (window.hasOwnProperty("StatusBar")) {
      window.StatusBar.hide();
    }

    // Set the fullscreen scaling option
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    // Define all of the game states we plan to use
    this.game.state.add("Boot", States.Boot);
    this.game.state.add("Preload", States.Preload);

    // Change to the Boot state to start the real work
    this.game.state.start("Boot");
  }

}
