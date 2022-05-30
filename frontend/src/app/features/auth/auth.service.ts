import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ILoginPayload, IRegisterPayload } from 'src/app/interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = environment.apiUrl + 'identity/';
  options: {headers: HttpHeaders};

  constructor(private http: HttpClient) { 
    this.options = {
      headers: new HttpHeaders({
          'Content-Type': 'application/json',
          // 'Access-Control-Allow-Headers': 'Access-Control-Allow-Origin',
      }),
    };
  }

  login(form: ILoginPayload): Observable<any> {

    const apiURL = this.baseURL + 'login';

    return this.http.post(apiURL, form, this.options);  
  }

  register(form: IRegisterPayload): Observable<any> {
   
    const formCopy = Object.assign({}, form);
    delete formCopy.acceptTermsAndConditions;
    delete formCopy.confirmPassword;

    const url = this.baseURL + 'register';

    return this.http.post(url, formCopy, this.options);
  }
}
