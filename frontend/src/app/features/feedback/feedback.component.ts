import { Component, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { FeedbackService } from './feedback.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormErrorsEnum } from 'src/app/interfaces/form';
import { UserService } from 'src/app/features/user/user.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  studyId: string;
  modalTitle: string;

  form: FormGroup = this.fb.group({
    content: [null, [Validators.required]],
    score: [null, Validators.required],
  });

  isFormSubmitted = false;
  errors = FormErrorsEnum;

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private toastService: ToastService,
    public userService: UserService
  ) {}

  ngOnInit(): void {}

  counter(i: number): number[] {
    return new Array(i);
  }

  submit(): void {
    this.isFormSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const payload = {
      ...this.form.value,
      userId: this.userService.currentUser.userId,
      creationDate: moment().format('DD-MM-YYYY'),
    };

    this.feedbackService
      .addFeedback(this.userService.currentUser.currentStudy, payload)
      .pipe(
        map((response: any) => {
          this.toastService.show({
            error: false,
            message: 'You have successfully add your feedback!',
          });

          this.isFormSubmitted = false;
          this.form.reset();
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
