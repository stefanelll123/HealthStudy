import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { FormErrorsEnum } from 'src/app/interfaces/form';
import { confirmMatch } from 'src/app/validators/confirm-match.validator';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(5)]],
    lastName: [null, [Validators.required, Validators.minLength(5)]],
    cnp: [null, [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    email: [null, [Validators.required, Validators.email, Validators.minLength(5)]],
    password: [null, [Validators.required, Validators.minLength(8)]],
    confirmPassword: [null, [Validators.required]],
    acceptTermsAndConditions: [false, [Validators.requiredTrue]]
  },{ 
    validator: confirmMatch('password', 'confirmPassword')
  });

  isFormSubmitted = false;
  errors = FormErrorsEnum;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
  }

  submit(): void {

    this.isFormSubmitted = true;

    if (this.form.invalid) {
      return
    }

    this.authService.register(this.form.value).pipe(
      map((response: any) => {

        this.toastService.show({error: false, message: 'You have successfully registered!'});
        this.router.navigate(['login']);
      }),
      catchError(error => {

        this.isFormSubmitted = false;
        this.toastService.show({error: true, message: error.error.error});
        return of(error);
     })).subscribe();
  }
}
