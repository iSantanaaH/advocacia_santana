import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent implements OnInit {
  @Input() message: string = '';
  public isVisible: boolean = false;

  ngOnInit(): void {
    this.showToast();
  }

  showToast(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.isVisible = false;
    }, 3000);
  }

  hideToast() {
    this.isVisible = false;
  }
}
