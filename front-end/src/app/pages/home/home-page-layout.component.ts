import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/user/auth/authService/auth.service';

@Component({
  selector: 'app-home-page-layout',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './home-page-layout.component.html',
  styleUrls: ['./home-page-layout.component.css', './home-page-responsive.css'],
})
export default class HomePageLayoutComponent {
  constructor(public authService: AuthService) {}
  @ViewChild('menuHidden') menuHidden!: ElementRef;
  public showMenu: boolean = false;

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  disableMenu(): void {
    this.menuHidden.nativeElement.classList.add('disableMenu');
    setTimeout(() => {
      this.showMenu = false;
    }, 700);
  }
}
