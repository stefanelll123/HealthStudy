import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FeedbackService {
  baseURL = environment.apiUrl + 'studies';

  constructor(private http: HttpClient) {}

  addFeedback(studyId: string, payload: any): Observable<any> {
    const apiURL = this.baseURL + '/' + studyId + '/feedback';

    return this.http.post(apiURL, payload);
  }
}
