import { Component, OnInit } from '@angular/core';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  faPlus = FA_ICONS.solid.faPlus;

  constructor() { }

  ngOnInit(): void {
  }

}
