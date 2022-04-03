import { Component, OnInit } from '@angular/core';
import {HEADER, DATA} from '../../test-data'
import { IBook } from 'src/app/interfaces/book.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  header: string[] = HEADER;
  data: IBook[] = DATA;

  constructor() {}

  ngOnInit(): void {}

  getTodayDate(): Date {
    const today = new Date();
    return today;
  }
}
