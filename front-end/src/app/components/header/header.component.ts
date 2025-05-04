import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../../services/user/auth/authService/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header-responsive.css'],
})
export class HeaderComponent {
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
