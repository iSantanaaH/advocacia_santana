import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostCreatorService } from '../../services/postCreator/post-creator.service';
import { ToastComponent } from '../../components/toast/toast/toast.component';
import { Subscription } from 'rxjs';
import { error } from 'console';
import { HttpResponse } from '@angular/common/http';
import { CreatePostResponse } from '../../services/postCreator/createPostResponse';

@Component({
  selector: 'app-post-creator',
  standalone: true,
  imports: [ReactiveFormsModule, ToastComponent],
  templateUrl: './post-creator.component.html',
  styleUrls: [
    './post-creator.component.css',
    'post-creator.component-responsive.css',
  ],
})
export default class PostCreatorComponent implements OnDestroy {
  constructor(
    private _fb: FormBuilder,
    private postCreatorService: PostCreatorService
  ) {}

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  public TOAST_MESSAGE: string = '';
  private subscription: Subscription = new Subscription();

  public createPostForm = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: ['', Validators.required],
  });

  onSubmit() {
    if (this.createPostForm.valid) {
      const title = this.createPostForm.get('title')?.value ?? '';
      const description = this.createPostForm.get('description')?.value ?? '';
      const image = this.createPostForm.get('image')?.value ?? '';

      const createPostSubscription = this.postCreatorService
        .createPost(title, description, image)
        .subscribe({
          next: (response: HttpResponse<CreatePostResponse>) => {
            if (response.status === 200) {
              const responseBody = response.body;
              console.log(responseBody);
            }
          },
          error: (error) => {},
        });

      console.log('válido');
    } else {
      this.TOAST_MESSAGE = `Preencha todos os campos`;
      this.toastComponent.message = this.TOAST_MESSAGE;
      this.toastComponent.showToast();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
