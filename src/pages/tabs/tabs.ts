import { Component } from '@angular/core';

import { CommunityPage } from '../community/community';
import { ProfilePage } from '../profile/profile';
import { MapPage } from '../map/map';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MapPage;
  tab2Root = ProfilePage;
  tab3Root = CommunityPage;
  private lang = 'en';

  constructor() {
    
  }
}
