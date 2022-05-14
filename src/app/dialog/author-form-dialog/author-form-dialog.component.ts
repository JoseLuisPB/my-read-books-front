import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FA_ICONS } from 'src/app/shared/fa-icons';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-author-form-dialog',
  templateUrl: './author-form-dialog.component.html',
  styleUrls: ['./author-form-dialog.component.scss']
})
export class AuthorFormDialogComponent implements OnInit, OnDestroy {

  faSave = FA_ICONS.solid.faSave;
  formDataLoaded = false;
  saveDisabled = true;
  authorForm!: FormGroup;
  subscriptions: Subscription[] = [];
  countryList: string[] = [];
  action = '';

  constructor(
    private formBuilder: FormBuilder,
    private countriesService: CountriesService,
    private utilsService: UtilsService,
    private authorDialogForm: MatDialogRef<AuthorFormDialogComponent>,
    private confirmDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.action = this.data.action;
    this.initForm();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.countriesService.getCountries().subscribe( resp => {
        this.countryList = resp.sort( (a: string, b: string) => ( a < b ? -1 : 1));
        if (this.data.author.id) this.formPatchValue();
        this.formDataLoaded = true;
        this.saveDisabled = false;
      })
    );
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  initForm(): void {
    this.authorForm = this.formBuilder.group({
      fullName:['', Validators.required],
      country:['', Validators.required]
    });
  }

  formPatchValue(): void {
    this.authorForm.patchValue(
      {
        fullName: this.data.author.fullName,
        country: this.data.author.country
      }
    )
  }

  closeDialog() {
    if( this.authorForm.touched) {
      const dialogConfirm = this.confirmDialog.open(ConfirmDialogComponent, {
        disableClose: true,
        panelClass: 'remove-dialog-padding'
      });
      dialogConfirm.afterClosed().subscribe(dialog => {
        if (dialog.confirm) this.authorDialogForm.close({save: false});
      });
    } else {
      this.authorDialogForm.close({save: false});
    }
  }

  saveForm():void {
    if (! this.authorForm.valid) {
      this.utilsService.markFormGroupTouched(this.authorForm);
      return;
    }
    this.authorDialogForm.close(
      {
        save: true,
        author: {
          id: this.data.author.id,
          fullName: this.authorForm.get('fullName')?.value,
          country: this.authorForm.get('country')?.value
        }
      }
    );
  }

}
