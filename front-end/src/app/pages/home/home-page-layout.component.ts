import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page-layout',
  standalone: true,
  imports: [],
  templateUrl: './home-page-layout.component.html',
  styleUrls: ['./home-page-layout.component.css', './home-page-responsive.css'],
})
export default class HomePageLayoutComponent {
  public showMenu: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }
}
