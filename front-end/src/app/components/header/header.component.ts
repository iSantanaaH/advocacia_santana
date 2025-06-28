import {
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import { AuthService } from '../../services/user/auth/authService/auth.service';
import { FormsModule } from '@angular/forms';
import { ShowUserComponent } from '../user/showUser/show-user.component';
import { Role } from '../../shared/enums/role.enums';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, ShowUserComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css', './header-responsive.css'],
})
export class HeaderComponent {
  constructor(public authService: AuthService) {}
  readonly Role = Role;

  @ViewChild('menuHidden') menuHidden!: ElementRef;
  @Output() search = new EventEmitter<string>();
  public showMenu: boolean = false;
  public searchQuery: string = '';

  toggleMenu(): void {
    this.showMenu = !this.showMenu;
  }

  disableMenu(): void {
    this.menuHidden.nativeElement.classList.add('disableMenu');
    setTimeout(() => {
      this.showMenu = false;
    }, 700);
  }

  onSearch(): void {
    this.search.emit(this.searchQuery);
  }
}
