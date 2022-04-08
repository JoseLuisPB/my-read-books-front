import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FA_ICONS } from '../fa-icons';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss']
})
export class CustomTableComponent implements OnInit {

  @Input() headerData: any [] = []
  @Input() tableData: any[] = []
  @Input() width = 100;
  @Input() displayActionColumn = true;
  faEdit = FA_ICONS.solid.faEdit;
  faTrash = FA_ICONS.solid.faTrash;
  @Output() editEntry = new EventEmitter<any>();
  @Output() deleteEntry = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  edit(data: any): void {
    this.editEntry.emit(data);
  }

  delete(data: any): void {
    this.deleteEntry.emit(data);
  }

}
