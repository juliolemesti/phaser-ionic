/// <reference path="../../../../typings/globals/phaser/index.d.ts" />

import { Preload } from '../preload/preload';
export class Boot extends Phaser.State {

  public preload(): void {

  }

  public create(): void {
    this.game.state.add("Preload", Preload, true);
  }
}
