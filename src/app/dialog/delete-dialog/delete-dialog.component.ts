import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent implements OnInit {

  bookTitle = '';
  faCheck = FA_ICONS.solid.faCheck;
  faExclamationTriangle = FA_ICONS.solid.faExclamationTriangle;

  constructor(
    private deleteDialog: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) { }

  ngOnInit(): void {
    this.bookTitle = this.data?.bookTitle;
  }

  remove(remove: boolean): void {
    if(remove) {
      this.deleteDialog.close({delete: true});
      return;
    };
    this.deleteDialog.close({delete: false});
  }
}
