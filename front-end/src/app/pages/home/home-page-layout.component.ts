import { NgOptimizedImage } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-page-layout',
  standalone: true,
  imports: [NgOptimizedImage],
  templateUrl: './home-page-layout.component.html',
  styleUrls: ['./home-page-layout.component.css', './home-page-responsive.css'],
})
export default class HomePageLayoutComponent {
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
