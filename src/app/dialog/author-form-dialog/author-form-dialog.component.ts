import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CountriesService } from 'src/app/services/countries.service';
import { UtilsService } from 'src/app/services/utils.service';
import { FA_ICONS } from 'src/app/shared/fa-icons';

@Component({
  selector: 'app-author-form-dialog',
  templateUrl: './author-form-dialog.component.html',
  styleUrls: ['./author-form-dialog.component.scss']
})
export class AuthorFormDialogComponent implements OnInit, OnDestroy {

  faSave = FA_ICONS.solid.faSave;
  countriesLoaded = false;
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
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.action = this.data.action;
    this.initForm();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.countriesService.getCountries().subscribe( resp => {
        this.countryList = resp.sort( (a: string, b: string) => ( a < b ? -1 : 1));
        this.countriesLoaded = true;
        this.saveDisabled = false;
      })
    );

    if (this.data.id !== null){

    }
  }

  ngOnDestroy(): void {
      this.subscriptions.forEach( subscription => subscription.unsubscribe());
  }

  initForm(): void {
    this.authorForm = this.formBuilder.group({
      fullName:['', Validators.required],
      country:['', Validators.required]
    })
  }

  closeDialog() {
    this.authorDialogForm.close({save: false});
  }

  saveForm():void {
    if (! this.authorForm.valid) {
      this.utilsService.markFormGroupTouched(this.authorForm);
      return;
    }
    this.authorDialogForm.close(
      {
        save: true,
        id: this.data.id,
        fullName: this.authorForm.get('fullName')?.value,
        country: this.authorForm.get('country')?.value
      }
    );
  }

}
