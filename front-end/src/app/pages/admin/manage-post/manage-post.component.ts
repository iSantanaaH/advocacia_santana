import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ShowUserComponent } from '../../../components/user/showUser/show-user.component';

@Component({
  selector: 'app-manage-post',
  standalone: true,
  imports: [RouterOutlet, ShowUserComponent],
  templateUrl: './manage-post.component.html',
  styleUrl: './manage-post.component.css',
})
export default class ManagePostComponent {}
