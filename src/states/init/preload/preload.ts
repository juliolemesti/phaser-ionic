export class Preload extends Phaser.State {
  sprite: Phaser.Sprite;
  cursors: Phaser.CursorKeys;

  public preload(): void {

  }

  public create(): void {
    let style = {
      font: "Arial",
      fontSize: 24,
      fill: "#ffffff",
      align: "center"
    };

    let text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Loading...", style);
    text.anchor.set(0.5);
  }
}
