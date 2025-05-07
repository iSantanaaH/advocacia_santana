import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/user/auth/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgOptimizedImage, FormsModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './home-responsive.component.css'],
})
export default class HomeComponent {
  constructor(public authService: AuthService) {
    authService.getUserRole();
  }

  searchResult: string = '';

  handleResult(query: string): void {
    this.searchResult = query;

    console.log('A query foi:', query);
  }
}
