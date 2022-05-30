import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { FormErrorsEnum } from 'src/app/interfaces/form';
import { StudiesService } from '../studies.service';
import * as moment from 'moment';
import { ModalService } from 'src/app/components/modal/modal.service';

@Component({
  selector: 'app-studies-details',
  templateUrl: './studies-details.component.html',
  styleUrls: ['./studies-details.component.scss'],
})
export class StudiesDetailsComponent implements OnInit {
  studyId: string;
  modalTitle: string;
  selectedFeedbacks: any;

  form: FormGroup = this.fb.group({
    content: [null, [Validators.required]],
    creationDate: [moment().format('DD-MM-YYYY')],
  });

  isFormSubmitted = false;
  errors = FormErrorsEnum;

  constructor(
    private fb: FormBuilder,
    public studiesService: StudiesService,
    private toastService: ToastService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalSerivce: ModalService
  ) {}

  ngOnInit(): void {
    this.studyId = this.activatedRoute.snapshot.params['studyId'];

    this.studiesService
      .getStudy(this.studyId)
      .pipe(
        map((response: any) => {
          this.studiesService.setStudy(response);
        }),
        catchError((error) => {
          this.toastService.show({ error: true, message: error.error.error });
          return of(error);
        })
      )
      .subscribe();
  }

  addNote(): void {
    this.isFormSubmitted = true;

    if (this.form.invalid) {
      return;
    }

    this.studiesService
      .addStudyNote(this.studyId, this.form.value)
      .pipe(
        map((response: any) => {
          this.toastService.show({
            error: false,
            message: 'You have successfully add a note to study!',
          });

          this.studiesService.setStudyNote(this.form.value);

          this.isFormSubmitted = false;
          this.form.reset();
          this.form.get('creationDate').setValue(moment().format('DD-MM-YYYY'));
        }),
        catchError((error) => {
          this.isFormSubmitted = false;
          this.toastService.show({ error: true, message: error.error.error });
          return of(error);
        })
      )
      .subscribe();
  }

  completeStudy(): void {
    this.studiesService
      .completeStudy(this.studyId)
      .pipe(
        map((response: any) => {
          this.toastService.show({
            error: false,
            message: 'You have successfully complete the study!',
          });
          this.router.navigate(['/studies']);
        }),
        catchError((error) => {
          this.toastService.show({ error: true, message: error.error.error });
          return of(error);
        })
      )
      .subscribe();
  }

  deleteStudy(): void {
    this.studiesService
      .deleteStudy(this.studyId)
      .pipe(
        map((response: any) => {
          this.toastService.show({
            error: false,
            message: 'You have successfully delete the study!',
          });
          this.router.navigate(['/studies']);
        }),
        catchError((error) => {
          this.toastService.show({ error: true, message: error.error.error });
          return of(error);
        })
      )
      .subscribe();
  }

  openModal(participant: any): void {
    this.selectedFeedbacks = [];

    this.modalTitle =
      'Feedback from ' +
      participant.userFirstName +
      ' ' +
      participant.userLastName;

    this.studiesService.study.feedback.forEach((item: any) => {
      if (item.userId === participant.userId) {
        this.selectedFeedbacks.push(item);
      }
    });

    this.modalSerivce.open('feedback-modal');
  }

  closeModal(): void {
    this.modalSerivce.close('feedback-modal');
  }
}
