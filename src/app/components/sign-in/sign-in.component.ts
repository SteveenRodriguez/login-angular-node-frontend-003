import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorService } from 'src/app/services/error.service';
// import { ToastrService } from 'ngx-toastr';
import { User } from '../../interfaces/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loading: boolean = false;

  constructor(
    private _userService: UserService,
    private router: Router,
    private _errorService: ErrorService
  ) {}

  ngOnInit(): void {}

  addUser() {
    // validar que el usuario digite datos
    if (
      this.username == '' ||
      this.password == '' ||
      this.confirmPassword == ''
    ) {
      return alert('🔴 Todos los campos son obligatorios ❗');
    }

    // Valida que las password sean iguales
    if (this.password != this.confirmPassword) {
      return alert('🔴 Las contraseñas ingresadas son distintas ❗');
    }

    // Se crea objeto
    const user: User = {
      username: this.username,
      password: this.password,
    };

    this.loading = true;

    this._userService.signIn(user).subscribe({
      next: (v) => {
        this.loading = false;
        console.log('Usuario registrado con éxito');
        this.router.navigate(['/login']);
      },
      error: (e) => {
        this.loading = false;
        this._errorService.msjError(e);
      },
      complete: () => console.log('complete, this._userService.signIn()'),
    });
  }
}
