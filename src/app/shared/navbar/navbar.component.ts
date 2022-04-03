import { Component, OnInit } from '@angular/core';
import { FA_ICONS} from '../fa-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  faHome = FA_ICONS.solid.faHome;
  faChartLine = FA_ICONS.solid.faChartLine;
  faCog = FA_ICONS.solid.faCog;
  faBook = FA_ICONS.solid.faBook;
  faUsers = FA_ICONS.solid.faUsers;
  faGlobe = FA_ICONS.solid.faGlobe;
  faUser = FA_ICONS.solid.faUser;
  faBookReader = FA_ICONS.solid.faBookReader;
  faBars = FA_ICONS.solid.faBars;

  constructor() { }

  ngOnInit(): void {
  }

}
