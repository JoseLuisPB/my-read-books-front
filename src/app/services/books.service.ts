import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { map } from 'rxjs/operators'
import { Book } from "../models/book.model";

@Injectable({providedIn: 'root'})
export class BooksService {

  url: string;
  constructor(private http: HttpClient){
    this.url = '/book/'
  }

  loadBooks(): Observable<Book[]> {
    return this.http.get(this.url).pipe( map(resp => {
      console.log(resp);
      return resp as Book[];
    }) );
  }

  loadLastNBooks(records: number): Observable<Book[]> {
    return this.http.get(`${this.url}lastNBooks/${records}`).pipe( map( resp => {
      return resp as Book[];
    }));
  }
}
