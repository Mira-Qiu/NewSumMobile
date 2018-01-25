import {Component, ViewChild} from '@angular/core';
import {NavController, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {TabsPage} from '../pages/tabs/tabs';
import {NotificationsProvider} from "../providers/notifications/notifications";
import {GoogleAnalytics} from '@ionic-native/google-analytics';
import {ScreenOrientation} from '@ionic-native/screen-orientation';
import {SearchResultsPage} from "../pages/search-results/search-results";
import {ImageLoadOptionProvider} from "../providers/image-load-option/image-load-option";
import {TranslateService} from "@ngx-translate/core";
import {ApplicationSettings} from "../models/applicationSettings";
import {LoaderProvider} from "../providers/loader/loader";
import {TopicsProvider} from "../providers/topics/topics";
import {ApplicationSettingsProvider} from "../providers/applicationSettings/applicationSettings";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mainNav') navCtrl: NavController;
  rootPage: any = TabsPage;
  availableCategories: Array<string>;

  constructor(platform: Platform,
              private screenOrientation: ScreenOrientation,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen,
              private menuCtrl: MenuController,
              private settingsProvider: ApplicationSettingsProvider,
              private topicsProvider: TopicsProvider,
              private loader: LoaderProvider,
              private ga: GoogleAnalytics,
              private imgLoadProvider: ImageLoadOptionProvider,
              private translate: TranslateService,
              private notification: NotificationsProvider) {

    platform.ready().then(this.platformReadyHandler.bind(this));
  }

  private platformReadyHandler() {
    this.statusBar.styleDefault();
    // lock portrait orientation
    this.screenOrientation.lock('portrait').then(() => console.log('Screen orientation locked successfully'),
      error => console.error('An error occurred while trying to lock screen orientation', error)
    );

    this.loader.showLoader();
    this.rootPage = TabsPage;
    this.settingsProvider.getApplicationSettings().then((applicationSettings: ApplicationSettings) => {
      this.translate.setDefaultLang(applicationSettings.language.toLowerCase());
      this.translate.use(applicationSettings.language.toLowerCase());

      this.availableCategories = applicationSettings.categories;
      this.topicsProvider.refreshTopics(applicationSettings.favoriteCategory);
      this.initGoogleAnalytics();
      this.notification.startCheckingForNotifications();
    });
  }

  private initGoogleAnalytics() {
    this.ga.startTrackerWithId('UA-31632742-8')
      .then(() => {
        console.log("google analytics started");
      })
      .catch(e => console.log('Error starting GoogleAnalytics', e));
  }

  public selectCategory(newSelectedCategory: string) {
    this.loader.showLoader();
    this.topicsProvider.refreshTopics(newSelectedCategory);
  }

  public searchForTopic(e: any, searchInput: string) {
    if (e.keyCode === 13 && searchInput) {
      this.navCtrl.push(SearchResultsPage, {keyword: searchInput});
      this.menuCtrl.close();
    }
  }
}
