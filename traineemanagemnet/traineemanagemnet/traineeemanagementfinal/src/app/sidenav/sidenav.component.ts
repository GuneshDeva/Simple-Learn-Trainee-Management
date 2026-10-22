import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { fadeInOut, INavbarData } from './helper';
import { navbarData } from './nav-data';
import { SidenavService } from './sidenav.service';

interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({transform: 'rotate(0deg)', offset: '0'}),
            style({transform: 'rotate(2turn)', offset: '1'})
          ])
        )
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = true;
  screenWidth = 0;
  // navData = navbarData;
  navData: INavbarData[] = [];
  multiple: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768 ) {
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  constructor(public router: Router,private sidenavService:SidenavService) {}

  getIsSidenavVisible() {
    return this.sidenavService.getIsSidenavVisible();
  }

ngOnInit(): void {
  this.screenWidth = window.innerWidth;

  // Remember sidebar state
  const savedState = localStorage.getItem('sidenavCollapsed');

  if (savedState !== null) {
    this.collapsed = savedState === 'true';
  } else {
    this.collapsed = true;
  }

  const role = localStorage.getItem('role');

  if (role?.toLowerCase() === 'admin') {
    this.navData = navbarData;
  } else {
    this.navData = navbarData.filter(
      item => item.label !== 'Back to Administration'
    );
  }
}

toggleCollapse(): void {
  this.collapsed = !this.collapsed;

  localStorage.setItem(
    'sidenavCollapsed',
    this.collapsed.toString()
  );

  this.onToggleSideNav.emit({
    collapsed: this.collapsed,
    screenWidth: this.screenWidth
  });
}

  closeSidenav(): void {
  this.collapsed = false;

  localStorage.setItem(
    'sidenavCollapsed',
    'false'
  );

  this.onToggleSideNav.emit({
    collapsed: this.collapsed,
    screenWidth: this.screenWidth
  });
}

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    item.expanded = !item.expanded
  }

  getActiveClass(data: INavbarData): string {
    return this.router.url.includes(data.routeLink) ? 'active' : '';
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for(let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }
}
