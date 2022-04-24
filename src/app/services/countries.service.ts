import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class CountriesService {
  url = 'https://restcountries.com/v3.1/all';

  constructor(
    private http: HttpClient
  ){}

  getCountries(): Observable<string[]> {

    return this.http.get(this.url).pipe( map( (resp: any) => {
      return resp.map( (item: any) => item['name']['common']);
    }));


  }
}
