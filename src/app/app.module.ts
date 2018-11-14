import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { CommunityPage } from '../pages/community/community';
import { ProfilePage } from '../pages/profile/profile';
import { MapPage } from '../pages/map/map';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPlacePage } from '../pages/map/searchPlace';
import { AddPicturePage } from '../pages/addPicture/addPicture';
import { GridPicturesPage } from '../pages/gridPictures/gridPictures';
import { ViewPicturePage } from '../pages/viewPicture/viewPicture';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Globalization } from '@ionic-native/globalization';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    CommunityPage,
    ProfilePage,
    MapPage,
    TabsPage,
    SearchPlacePage,
    AddPicturePage,
    GridPicturesPage,
    ViewPicturePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CommunityPage,
    ProfilePage,
    MapPage,
    TabsPage,
    SearchPlacePage,
    AddPicturePage,
    GridPicturesPage,
    ViewPicturePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Globalization,
    Geolocation,
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
