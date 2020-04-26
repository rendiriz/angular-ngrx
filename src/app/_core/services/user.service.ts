import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // API URL
  apiUrl = `${environment.apiUrl}user`;

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient) {}

  getItems(params: string = ''): Observable<any> {
    return this.http.get<any>(this.apiUrl + params, this.httpOptions);
  }

  getItem(id: number, params: string = ''): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id + params);
  }

  createItem(item): Observable<any> {
    return this.http.post<any>(
      this.apiUrl,
      JSON.stringify(item),
      this.httpOptions
    );
  }

  updateItem(id: number, item): Observable<any> {
    return this.http.put<any>(
      this.apiUrl + '/' + id,
      JSON.stringify(item),
      this.httpOptions
    );
  }
}
