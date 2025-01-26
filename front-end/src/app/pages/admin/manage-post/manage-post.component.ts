import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShowUserComponent } from '../../../components/user/showUser/show-user.component';
import { AuthService } from '../../../services/user/auth/authService/auth.service';

@Component({
  selector: 'app-manage-post',
  standalone: true,
  imports: [RouterOutlet, ShowUserComponent],
  templateUrl: './manage-post.component.html',
  styleUrls: [
    './manage-post.component.css',
    './manage-post-responsive.component.css',
  ],
})
export default class ManagePostComponent {
  constructor(public readonly authService: AuthService) {}
}
