import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { UnPublishedDataModel } from '../../../services/admin/unpublished/unPublishedDataModel';
import { UnpublishedService } from '../../../services/admin/unpublished/unpublished.service';
import { HttpResponse } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { ToastComponent } from '../../../components/toast/toast/toast.component';

@Component({
  selector: 'app-unpublished',
  standalone: true,
  imports: [NgFor],
  templateUrl: './unpublished.component.html',
  styleUrls: ['./unpublished.component.css'],
})
export class UnpublishedComponent implements OnDestroy, OnInit {
  constructor(private unpublishedService: UnpublishedService) {}
  @ViewChild(ToastComponent) toastComponent!: ToastComponent;

  public posts: UnPublishedDataModel[] = [];

  ngOnInit(): void {
    this.GetPosts();
  }

  private subscription: Subscription = new Subscription();

  public GetPosts() {
    const getPostSub = this.unpublishedService.getUnpublishedPosts().subscribe({
      next: (httpResponse: HttpResponse<UnPublishedDataModel[]>) => {
        if (httpResponse.status === 200) {
          try {
            const responseBody = httpResponse.body;
            this.posts = responseBody || [];
          } catch (error: any) {
            const errorMessage = error.message || 'Nenhum post encontrado';
            this.toastComponent.message = errorMessage;
            this.toastComponent.showToast();
          }
        }
      },
    });
    this.subscription.add(getPostSub);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
