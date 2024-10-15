import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/user/auth/authService/auth.service';

@Component({
  selector: 'app-show-user',
  standalone: true,
  imports: [],
  templateUrl: './show-user.component.html',
  styleUrl: './show-user.component.css',
})
export class ShowUserComponent {
  constructor() {}

  public authService = inject(AuthService);
}
