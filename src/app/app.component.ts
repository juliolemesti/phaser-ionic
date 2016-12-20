import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Game } from './game.component';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  constructor(platform: Platform, game: Game) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();

      game.start(window.appConfig);

    });
  }
}
