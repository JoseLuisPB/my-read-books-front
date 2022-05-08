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

  displaySnackBar(snackBarOptions: ISnackBar): void{
    const time = snackBarOptions.time ?? 3000;
    this.openSnackBar(snackBarOptions);
    setTimeout( () => this.closeSnackBar(), time);
  }
  openSnackBar(snackBarOptions: ISnackBar): void {
    this.snackBar.open(snackBarOptions.message, 'x',
      {
        horizontalPosition: snackBarOptions.horizontalPosition,
        verticalPosition: snackBarOptions.verticalPosition,
        panelClass: snackBarOptions.panel
      });
  }
  closeSnackBar(): void {
    this.snackBar.dismiss();
  }
}
