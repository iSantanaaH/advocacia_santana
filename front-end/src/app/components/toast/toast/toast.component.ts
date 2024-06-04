import { NgClass, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
})
export class ToastComponent {
  @Input() message: string = '';
  public isVisible: boolean = false;
  public animationClass: string = '';

  // ngOnInit(): void {
  //   this.showToast();
  // }

  showToast(): void {
    this.isVisible = true;
    setTimeout(() => {
      this.animationClass = 'toastEnter';
    }, 10);

    setTimeout(() => {
      this.isVisible = false;

      setTimeout(() => {
        this.animationClass = 'toastLeave';
      }, 10);
    }, 3000);
  }

  hideToast() {
    setTimeout(() => {
      this.animationClass = 'toastLeave';
    }, 10);
    setTimeout(() => {
      this.isVisible = false;
      this.animationClass = '';
    }, 500);
  }
}
