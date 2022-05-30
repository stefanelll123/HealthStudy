import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICreateStudyPayload } from 'src/app/interfaces/studies';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StudiesService {
  studies: any;
  study: any;

  baseURL = environment.apiUrl + 'studies';

  constructor(private http: HttpClient) {}

  getStudies(): Observable<any> {
    const apiURL = this.baseURL;

    return this.http.get(apiURL);
  }

  getStudy(studyId: string): Observable<any> {
    const apiURL = this.baseURL + '/' + studyId;

    return this.http.get(apiURL);
  }

  addStudyNote(studyId: string, payload: any): Observable<any> {
    const apiURL = this.baseURL + '/' + studyId + '/notes';

    return this.http.post(apiURL, payload);
  }

  completeStudy(studyId: string): Observable<any> {
    const apiURL = this.baseURL + '/' + studyId + '/complete';

    return this.http.patch(apiURL, {});
  }

  deleteStudy(studyId: string): Observable<any> {
    const apiURL = this.baseURL + '/' + studyId;

    return this.http.delete(apiURL, {});
  }

  createStudy(payload: ICreateStudyPayload): Observable<any> {
    const apiURL = this.baseURL;

    return this.http.post(apiURL, payload);
  }

  setStudies(payload: any): void {
    this.studies = payload;
  }

  setStudy(payload: any): void {
    this.study = payload;
  }

  setStudyNote(payload: any): void {
    this.study.notes.push(payload);
  }
}
