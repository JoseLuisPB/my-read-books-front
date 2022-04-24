import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { faSort, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { MessageService } from 'src/app/services/message.service';
import { FA_ICONS } from '../fa-icons';

@Component({
  selector: 'app-sort-column',
  templateUrl: './sort-column.component.html',
  styleUrls: ['./sort-column.component.scss']
})
export class SortColumnComponent implements OnInit, OnDestroy {

  @Input() columnName = '';
  @Input() data: any[] = [];
  subscriptions: Subscription[] = [];
  faSort = FA_ICONS.solid.faSort;
  faSortUp = FA_ICONS.solid.faSortUp;
  faSortDown = FA_ICONS.solid.faSortDown;
  selectedSort = faSort;

  constructor(
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.subscriptions.push(
      this.messageService.columnSorted.subscribe( columnSorted => {
        if ( this.columnName !== columnSorted ) this.selectedSort = this.faSort;
      }, error => {
        console.error(error);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  sortData(): void {
    this.sortTypeHandler(this.selectedSort);
    this.messageService.emitColumnSorted(this.columnName);
  }

  sortTypeHandler(selectedSort: IconDefinition): void {
    switch(selectedSort){
      case this.faSort:
        this.selectedSort = this.faSortUp;
        this.data = this.sortAscending(this.columnName, this.data);
        break;
      case this.faSortUp:
        this.selectedSort = this.faSortDown;
        this.data = this.sortDescending(this.columnName, this.data);
        break;
      default:
        this.selectedSort = this.faSort;
        this.data = this.sortAscending('id', this.data);
        break;
    }
  }

  sortAscending(column: string, data: any): any {
    return data.sort( (a: any, b: any) => ( a[column] < b[column] ? -1 : 1));
  }

  sortDescending(column: string, data: any): any {
    return data.sort( (a: any, b: any) => ( a[column] > b[column] ? -1 : 1));
  }
}
