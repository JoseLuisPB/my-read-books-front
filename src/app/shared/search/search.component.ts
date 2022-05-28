import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FA_ICONS } from '../fa-icons';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Input() placeholder = '';
  search: FormControl;
  faSearch: IconDefinition = FA_ICONS.solid.faSearch;
  @Output() searchEvent =  new EventEmitter<string>();
  constructor() {
    this.search = new FormControl();
  }

  ngOnInit(): void {
  }

  searchWord():void{
    this.searchEvent.emit(this.search.value);
  }

}
