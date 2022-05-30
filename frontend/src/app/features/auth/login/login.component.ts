import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, take } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { FormErrorsEnum } from 'src/app/interfaces/form';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(8)]],
  });

  isFormSubmitted = false;
  errors = FormErrorsEnum;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {}

  submit(): void {
    this.isFormSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.authService
      .login(this.form.value)
      .pipe(
        take(1),
        map((response: any) => {
          this.toastService.show({
            error: false,
            message: 'You have successfully logged in!',
          });

          localStorage.setItem('access_token', response.token);
          delete response.token;
          localStorage.setItem('user', JSON.stringify(response));

          this.router.navigate(['/']);
        }),
        catchError((error) => {
          this.isFormSubmitted = false;
          this.toastService.show({ error: true, message: error.error.error });
          return of(error);
        })
      )
      .subscribe();
  }
}
