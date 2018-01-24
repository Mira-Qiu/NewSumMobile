import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler, Alert} from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { AllTopicsPage } from '../pages/all-topics/all-topics';
import { TabsPage } from '../pages/tabs/tabs';
import { HotTopicsPage } from "../pages/hot-topics/hot-topics";
import { SummaryPage } from "../pages/summary/summary";
import { SearchResultsPage } from "../pages/search-results/search-results";
import { SettingsPage } from "../pages/settings/settings";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NotificationsProvider } from '../providers/notifications/notifications';
import { SoapClientProvider } from '../providers/soap-client/soap-client';
import {HttpClientModule} from "@angular/common/http";
import { ContentLanguagesProvider } from '../providers/content-languages/content-languages';
import { IonicStorageModule } from '@ionic/storage';
import { SourcesProvider } from '../providers/sources/sources';
import { CategoriesProvider } from '../providers/categories/categories';
import { ServiceClientProvider } from '../providers/service-client/service-client';
import { TopicsProvider } from '../providers/topics/topics';
import {ScreenOrientation} from "@ionic-native/screen-orientation";
import {ComponentsModule} from "../components/components.module";
import { GoogleAnalytics } from '@ionic-native/google-analytics';
import { SettingsProvider } from '../providers/settings/settings';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AllTopicsPage,
    TabsPage,
    HotTopicsPage,
    SummaryPage,
    SearchResultsPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AllTopicsPage,
    TabsPage,
    HotTopicsPage,
    SummaryPage,
    SearchResultsPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    GoogleAnalytics,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    NotificationsProvider,
    SoapClientProvider,
    ContentLanguagesProvider,
    SourcesProvider,
    CategoriesProvider,
    ServiceClientProvider,
    TopicsProvider,
    ScreenOrientation,
    SettingsProvider
  ]
})
export class AppModule {}
