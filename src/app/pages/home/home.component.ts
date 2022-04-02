import { Component, OnInit } from '@angular/core';
import {HEADER, DATA} from '../../test-data'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  header: string[] = HEADER;
  data: any[] = DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
