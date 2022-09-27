import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../interfaces/user';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from 'src/app/services/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loading: boolean = false;

  constructor(
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  login() {
    // Validar usuario ingrese datos
    if (this.username == '' || this.password == '') {
      return alert('🔴 Todos los campos son obligatorios ❗');
    }

    // Body
    const user: User = {
      username: this.username,
      password: this.password,
    };

    this.loading = true;

    this._userService.login(user).subscribe({
      next: (token) => {
        this.router.navigate(['/dashboard']);
        localStorage.setItem('token', token);
      },
      error: (e: HttpErrorResponse) => {
        this._errorService.msjError(e);
        this.loading = false;
      },
    });
  }
}
