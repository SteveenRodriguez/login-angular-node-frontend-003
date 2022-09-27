import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  msjError(e: HttpErrorResponse) {
    if (e.error.msg) {
      alert(e.error.msg);
    } else {
      alert('Upps Ocurrio Un Error!!!');
    }
  }
}
