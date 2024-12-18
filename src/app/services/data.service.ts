import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = '/assets/canciones.json';

  constructor(private http: HttpClient) {}

  getCanciones(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}