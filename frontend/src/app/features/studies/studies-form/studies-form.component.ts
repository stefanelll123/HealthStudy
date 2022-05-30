import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map, of, take } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { FormErrorsEnum } from 'src/app/interfaces/form';
import { dateFormat } from 'src/app/validators/date-format.validator';
import { StudiesService } from '../studies.service';

@Component({
  selector: 'app-studies-form',
  templateUrl: './studies-form.component.html',
  styleUrls: ['./studies-form.component.scss'],
})
export class StudiesFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: [null, [Validators.required]],
    medicationTested: [null, [Validators.required]],
    startDate: [null, [Validators.required, dateFormat('DD-MM-YYYY')]],
    flacons: this.fb.array([]),
  });

  isFormSubmitted = false;
  errors = FormErrorsEnum;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private studiesService: StudiesService
  ) {}

  ngOnInit(): void {
    this.addFlacon();
  }

  submit(): void {
    this.isFormSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    const payload = Object.assign({}, this.form.value);
    payload.numberOfParticipans = payload.flacons.length;

    this.studiesService
      .createStudy(payload)
      .pipe(
        take(1),
        map((response: any) => {
          this.toastService.show({
            error: false,
            message: 'You have successfully create a study!',
          });
          this.router.navigate(['/studies']);
        }),
        catchError((error) => {
          this.isFormSubmitted = false;
          this.toastService.show({ error: true, message: error.error.error });
          return of(error);
        })
      )
      .subscribe();
  }

  flaconsAsArray(): FormArray {
    return this.form.get('flacons') as FormArray;
  }

  flacon(): FormGroup {
    return this.fb.group({
      flaconCode: [null, [Validators.required]],
      isPlacebo: [false, [Validators.required]],
    });
  }

  addFlacon(): void {
    this.flaconsAsArray().push(this.flacon());
  }

  removeFlacon(index: number): void {
    this.flaconsAsArray().removeAt(index);
  }
}
