import { Component, OnInit } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { ToastService } from 'src/app/components/toast/toast.service';
import { StudiesService } from '../studies.service';

@Component({
  selector: 'app-studies-list',
  templateUrl: './studies-list.component.html',
  styleUrls: ['./studies-list.component.scss'],
})
export class StudiesListComponent implements OnInit {
  constructor(
    public studiesService: StudiesService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.studiesService
      .getStudies()
      .pipe(
        map((response: any) => {
          this.studiesService.setStudies(response);
        }),
        catchError((error) => {
          this.toastService.show({ error: true, message: error.error.error });
          return of(error);
        })
      )
      .subscribe();
  }
}
