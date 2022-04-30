import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Author } from "../models/author.model";

@Injectable({providedIn:'root'})
export class AuthorService {

  url: string;
  constructor(
    private http: HttpClient
  ){
    this.url='/author/';
  }

  loadAuthors(): Observable<Author[]> {
    return this.http.get(this.url).pipe( map (resp => {
      return resp as Author[];
    }));
  }

  saveAuthor(author: Author): Observable<Author> {
    return this.http.post(this.url, author).pipe( map (resp => {
      return resp as Author;
    }));
  }

  updateAuthor(author: Author): Observable<Author> {
    return this.http.put(this.url, author).pipe( map ( resp => {
      return  resp as Author;
    }));
  }

}
