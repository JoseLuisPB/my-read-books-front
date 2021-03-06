import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {

  faCheck = FA_ICONS.solid.faCheck;
  faExclamationTriangle = FA_ICONS.solid.faExclamationTriangle;

  constructor(
    private confirmDialog: MatDialogRef<ConfirmDialogComponent>,
  ) {}

  ngOnInit(): void {}

  close(close: boolean): void {
    if(close) {
      this.confirmDialog.close({confirm: true});
      return;
    };
    this.confirmDialog.close({confirm: false});
  }

}
