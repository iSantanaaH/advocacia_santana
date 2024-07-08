import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-home-page-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './home-page-layout.component.html',
  styleUrl: './home-page-layout.component.css',
})
export default class HomePageLayoutComponent {}
