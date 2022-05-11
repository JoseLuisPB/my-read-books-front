import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ISnackBar } from "../interfaces/snackBar.interface";

@Injectable({ providedIn:'root'})

export class UtilsService {
  constructor(
    private snackBar: MatSnackBar
  ){}

  markFormGroupTouched(form: FormGroup): void {
    (Object as any).values(form.controls).forEach( (control: any) => {
      control.markAsTouched();
      if(control.controls) {
        this.markFormGroupTouched(control);
      }
    })
  }

  displaySnackBar(snackBarOptions: ISnackBar, error = false): void{
    if(error) snackBarOptions.message = 'Oops something went wrong, try again'
    const time = snackBarOptions.time ?? 3000;
    this.openSnackBar(snackBarOptions, error);
    setTimeout( () => this.closeSnackBar(), time);
  }
  private openSnackBar(snackBarOptions: ISnackBar, error: boolean): void {
    this.snackBar.open(snackBarOptions.message, 'x',
      {
        horizontalPosition: snackBarOptions.horizontalPosition,
        verticalPosition: snackBarOptions.verticalPosition,
        panelClass: error ? 'snackError' : 'snackSuccess'
      });
  }
  private closeSnackBar(): void {
    this.snackBar.dismiss();
  }
}
