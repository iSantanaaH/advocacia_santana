import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../services/user/auth/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home-page-layout',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule, HeaderComponent],
  templateUrl: './home-page-layout.component.html',
  styleUrls: ['./home-page-layout.component.css', './home-page-responsive.css'],
})
export default class HomePageLayoutComponent {
  constructor(public authService: AuthService) {
    authService.getUserRole();
  }
}
