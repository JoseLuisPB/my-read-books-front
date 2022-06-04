import { HttpClient } from "@angular/common/http";
import {Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({providedIn:'root'})
export class StatisticsService {
  url:string;
  constructor(private http: HttpClient){
    this.url = '/statistics/'
  }

  getYears(): Observable <number[]>{
    return this.http.get(`${this.url}years`).pipe( map(years => years as number[]));
  }

  getAuthors(): Observable<string[]>{
    return this.http.get(`${this.url}authors`).pipe( map(authors => authors as string[]));
  }

  getCountries(): Observable<string[]>{
    return this.http.get(`${this.url}countries`).pipe( map(countries => countries as string[]));
  }
}
