import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-manage-post',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './manage-post.component.html',
  styleUrl: './manage-post.component.css',
})
export default class ManagePostComponent {}
