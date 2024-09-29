import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PostCreatorService } from '../../services/postCreator/post-creator.service';
import { ToastComponent } from '../../components/toast/toast/toast.component';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { CreatePostResponse } from '../../services/postCreator/createPostResponse';
import { AuthService } from '../../services/user/auth/authService/auth.service';

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
    private postCreatorService: PostCreatorService,
    private authService: AuthService
  ) {}

  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  public TOAST_MESSAGE: string = '';
  private subscription: Subscription = new Subscription();
  SELECTED_FILE: File | null = null;

  public createPostForm = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    image: [null, Validators.required],
  });

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.SELECTED_FILE = file;
    }
  }

  getUserIdToken() {
    const token = this.authService.getToken();
    if (token) {
      const decodedToken = this.authService.decodedToken(token);
      const userId = decodedToken.user.id;
      return userId;
    }
  }

  onSubmit() {
    if (this.createPostForm.valid) {
      const title = this.createPostForm.get('title')?.value ?? '';
      const description = this.createPostForm.get('description')?.value ?? '';
      const image = this.createPostForm.get('image')?.value?.[0];

      if (image) {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('userId', this.getUserIdToken());

        if (this.SELECTED_FILE) {
          formData.append('image', this.SELECTED_FILE);
        }

        const createPostSub = this.postCreatorService
          .createPost(formData)
          .subscribe({
            next: (response: HttpResponse<CreatePostResponse>) => {
              if (response.status === 200) {
                const responseBody = response.body;
              }
            },
            error: (error) => {},
          });
        this.subscription.add(createPostSub);
      } else {
        this.TOAST_MESSAGE = `Por favor, selecione uma imagem`;
        this.toastComponent.message = this.TOAST_MESSAGE;
        this.toastComponent.showToast();
      }
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
