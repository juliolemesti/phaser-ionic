import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Config } from '../providers/config';
import { Boot } from '../states/init/boot/boot';

@Component({
  templateUrl: 'app.component.html'
})
export class App {

  public game: Phaser.Game;

  constructor(platform: Platform, private config: Config) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.startGame();
    });
  }


  startGame() {
    let config: {platforms?: {}, platform?: string, viewport?: {}} = {
      "viewport": {"width": 800, "height": 600},
      "platforms": {
        "browser": {"viewport": {"width": 640, "height": 480}},
        "android": {"viewport": {"width": 320, "height": 200}}
      }
    };

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
    // this.game = new Phaser.App(this.config.get("viewport.width"), this.config.get("viewport.height"), Phaser.AUTO, "game-container", this);
    this.game = new Phaser.Game('100%', '100%', Phaser.AUTO, "game-container", this);
  }

  /**
   * Used to execute once the preload() method is called.
   */
  public create(): void {
    this.onGoFullScreen();

    // Initialize the first state
    this.game.state.add("Boot", Boot, true);
  }

  onGoFullScreen() {
    // tell Phaser how you want it to handle scaling when you go full screen
    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    // and this causes it to actually do it
    this.game.scale.refresh();

  }
}
